from flask_restful import reqparse, abort, Api, Resource
from neo4j import GraphDatabase
from ..models.transaction import *
from ..models.stock import *
from neomodel import db

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('stock_symbol')
parser.add_argument('password')

class StockSocialInfo(Resource):
    def get(self):
        info = {}
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username'])
        stock = get_or_create_stock(args['stock_symbol'])
        info['follower_who_own'] = get_followers_who_own_stock(user.username, stock.symbol)
        info['top_investors_with_stock'] = get_top_investors_with_stock(stock.symbol)
        info['people_also_own'] = people_who_own_this_stock_also_own(stock.symbol)
        return info, 201

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
        RETURN s2
    """
    results, meta = db.cypher_query(query, params)
    stocks = [StockNode.inflate(row[0]) for row in results]
    return neomodel_list_to_json(stocks)

def neomodel_list_to_json(neomodel_list):
    return list(map(neomodel_to_json, neomodel_list))
    
def neomodel_to_json(neomdel):
    json_string = json.dumps(neomdel.__properties__) 
    return json.loads(json_string)
