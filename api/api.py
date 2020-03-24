from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config

from main.models.position import Position, PositionList
from main.models.stock import Stock
from main.controllers.user import User, UserFollowRelation
from main.controllers.transaction import Transaction, TransactionList, TransactionFeed
from main.controllers.alpaca import AlpacaRegistrationToken, AlpacaTransaction, AlpacaPositions
from main.controllers.stock import StockSocialInfo

app = Flask(__name__)
api = Api(app)
CORS(app)

config.DATABASE_URL = 'bolt://neo4j:test@localhost:7687'

api.add_resource(User, '/user')
api.add_resource(UserFollowRelation, '/follow')
api.add_resource(AlpacaRegistrationToken, '/alpaca-registration')
api.add_resource(AlpacaTransaction, '/alpaca-transaction')
api.add_resource(AlpacaPositions, '/alpaca-positions')
api.add_resource(PositionList,'/position-list')
api.add_resource(TransactionList, '/transaction-list')
api.add_resource(TransactionFeed, '/feed')
api.add_resource(StockSocialInfo, '/detail-stock-info')

if __name__ == '__main__':
    app.run(debug=True)