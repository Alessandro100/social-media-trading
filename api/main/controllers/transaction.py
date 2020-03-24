from flask_restful import reqparse, abort, Api, Resource
from neo4j import GraphDatabase
from ..models.transaction import *
from neomodel import db

parser = reqparse.RequestParser()
parser.add_argument('username')

#config.DATABASE_URL = 'bolt://neo4j:test@localhost:7687'
uri = "bolt://localhost:7687"
driver = GraphDatabase.driver(uri, auth=("neo4j", "test"))

class Transaction(Resource):
    def get(self):
        return {'status': 'good register path'}, 201

    def post(self):
        return {'status': 'good register path'}, 201

class TransactionList(Resource):
    def get(self):
        args = parser.parse_args()
        transactions = UserNode.nodes.first(username=args['username']).transactions.all()
        transactions = neomodel_list_to_json(transactions)
        if len(transactions) > 0:
            return {'transactions': transactions}, 201
        else:
            return {'message': 'no positions'}, 200

class TransactionFeed(Resource):
    def get(self):
        args = parser.parse_args()
        params = {'username': args['username']}
        query = 'MATCH (:UserNode {username: $username})-[:FOLLOWS]->(friend:UserNode)-[:MADE]->(transactions:TransactionNode) RETURN transactions UNION ALL MATCH (:UserNode {username: $username})-[:MADE]->(transactions:TransactionNode) RETURN transactions'
        results, meta = db.cypher_query(query, params)
        transactions = [TransactionNode.inflate(row[0]) for row in results]
        sorted_list = transactions.sort(key=lambda r: r.date)
        return neomodel_list_to_json(transactions)
        
        #