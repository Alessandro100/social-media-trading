from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from py2neo import Graph, NodeMatcher
from py2neo.data import Node, Relationship
from flask_cors import CORS
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config
import requests

parser = reqparse.RequestParser()

class Stock(Resource):
    def get(self):
        return {'status': 'good register path'}, 201

    def post(self):
        return {'status': 'good register path'}, 201

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