from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from py2neo import Graph
from flask_cors import CORS
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config
import requests
from neomodel import db
from .user import UserNode

parser = reqparse.RequestParser()

class StockNode(StructuredNode):
    symbol = StringProperty(unique_index=True)
    sector = StringProperty()
    name = StringProperty()
    positions = RelationshipTo('.position.PositionNode', 'POSITION STOCK')
    transactions = RelationshipFrom('.transaction.TransactionNode', 'POSITION STOCK')

def get_or_create_stock(stock_symbol):
    stock = StockNode.nodes.first_or_none(symbol=stock_symbol)
    if stock == None:
        stock = createStock(stock_symbol)
    return stock

def createStock(stock_symbol):
    company_info = getCompany(stock_symbol)
    stock = StockNode(symbol=stock_symbol, sector=company_info['industry'], name=company_info['companyName']).save()
    return stock

def getCompany(stock_symbol):
    r = requests.get('https://sandbox.iexapis.com/stable/stock/'+stock_symbol+'/company?token=Tpk_6d7ce216f5fe43ddb3de9ef3259bb550')
    company_info = r.json()
    return company_info

def get_followers_who_own_stock(username, stock_symbol):
    params = {'username': username, 'stock_symbol': stock_symbol.upper()}
    #This is the cypher query to get the userNodes of the people you follow who own this stock
    query = """
        MATCH(u:UserNode {username: $username})-[:FOLLOWS]->(f:UserNode)-[:OWNS]->(p:PositionNode)-[:`POSITION STOCK`]->(s:StockNode {symbol:$stock_symbol}) 
        RETURN f
    """
    results, meta = db.cypher_query(query, params)
    users = [UserNode.inflate(row[0]) for row in results]
    return neomodel_list_to_json(users)

def get_top_investors_with_stock(stock_symbol):
    params = {'stock_symbol': stock_symbol.upper()}
    #This is the cypher query to get the userNodes of the people you follow who own this stock
    query = """
        MATCH (u:UserNode)-[:OWNS]->(p:PositionNode)-[:`POSITION STOCK`]->(s:StockNode {symbol: $stock_symbol})
        WHERE NOT u.username = ''
        RETURN u
        ORDER BY u.investor_score DESC
        LIMIT 5
    """
    results, meta = db.cypher_query(query, params)
    users = [UserNode.inflate(row[0]) for row in results]
    return neomodel_list_to_json(users)
    

def people_who_own_this_stock_also_own(stock_symbol):
    params = {'stock_symbol': stock_symbol.upper()}
    #This is the cypher query to get the stockNodes of other stocks other own besides the original one
    query = """
        MATCH(u:UserNode)-[:OWNS]->(p:PositionNode)-[:`POSITION STOCK`]->(s:StockNode {symbol: $stock_symbol})
        MATCH(u:UserNode)-[:OWNS]->(p2:PositionNode)-[:`POSITION STOCK`]->(s2:StockNode)
        WHERE s2.symbol <> $stock_symbol
        RETURN DISTINCT s2
        LIMIT 10
    """
    results, meta = db.cypher_query(query, params)
    stocks = [StockNode.inflate(row[0]) for row in results]
    return neomodel_list_to_json(stocks)

def neomodel_list_to_json(neomodel_list):
    return list(map(neomodel_to_json, neomodel_list))
    
def neomodel_to_json(neomdel):
    json_string = json.dumps(neomdel.__properties__) 
    return json.loads(json_string)