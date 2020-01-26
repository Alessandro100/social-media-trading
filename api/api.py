from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config
from main.models.user import User
from main.models.position import Position, PositionList
from main.models.stock import Stock
from main.controllers.transaction import Transaction, TransactionList
from main.controllers.alpaca import AlpacaRegistrationToken, AlpacaTransaction

app = Flask(__name__)
api = Api(app)
CORS(app)

config.DATABASE_URL = 'bolt://neo4j:test@localhost:7687'

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')
api.add_resource(User, '/user')
api.add_resource(AlpacaRegistrationToken, '/alpaca-registration')
api.add_resource(AlpacaTransaction, '/alpaca-transaction')
api.add_resource(PositionList,'/position-list')
api.add_resource(TransactionList, '/transaction-list')

if __name__ == '__main__':
    app.run(debug=True)