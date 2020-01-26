from flask_restful import reqparse, abort, Api, Resource
from ..models.transaction import *

parser = reqparse.RequestParser()
parser.add_argument('username')

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