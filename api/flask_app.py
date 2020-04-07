from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config
from neo4j import GraphDatabase
from py2neo import authenticate, Graph

from main.controllers.position import Position, PositionList
from main.models.stock import Stock
from main.models.leaderboard import *
from main.controllers.user import User, UserFollowRelation, AuthenticateUser, AuthenticateUserAccessToken
from main.controllers.transaction import Transaction, TransactionList, TransactionFeed
from main.controllers.alpaca import AlpacaRegistrationToken, AlpacaTransaction, AlpacaPositions, AlpacaAccount
from main.controllers.stock import StockSocialInfo, StockFinancialInfo
from main.controllers.leaderboard import LeaderboardWidget, LeaderboardAll

app = Flask(__name__)
api = Api(app)
CORS(app)

#config.DATABASE_URL = 'bolt://neo4j:test@localhost:7687'
config.DATABASE_URL = 'bolt://alessandro-admin:b.MoZwhe8WMRed.iQo9jJauPPjoowto@hobby-jffbmdhpafecgbkeaiinbnel.dbs.graphenedb.com:24787'
#config.DATABASE_URL = 'https://hobby-jffbmdhpafecgbkeaiinbnel.dbs.graphenedb.com:24780/db/data/'

#uri = 'bolt://alessandro-admin:b.MoZwhe8WMRed.iQo9jJauPPjoowto@hobby-jffbmdhpafecgbkeaiinbnel.dbs.graphenedb.com:24787'
#uri2 = 'https://alessandro-admin:b.MoZwhe8WMRed.iQo9jJauPPjoowto@hobby-jffbmdhpafecgbkeaiinbnel.dbs.graphenedb.com:24780/db/data/'
#uri3 = 'https://alessandro-admin:b.MoZwhe8WMRed.iQo9jJauPPjoowto@hobby-jffbmdhpafecgbkeaiinbnel.dbs.graphenedb.com:24780'
uri4 = 'https://hobby-jffbmdhpafecgbkeaiinbnel.dbs.graphenedb.com:24780/db/data/'
authenticate("hobby-jffbmdhpafecgbkeaiinbnel.dbs.graphenedb.com:24780", "alessandro-admin", "b.MoZwhe8WMRed.iQo9jJauPPjoowto")
driver = Graph(uri4)

api.add_resource(User, '/user')
api.add_resource(AuthenticateUser, '/authenticate')
api.add_resource(AuthenticateUserAccessToken, '/access-token-authenticate')
api.add_resource(UserFollowRelation, '/follow')
api.add_resource(AlpacaRegistrationToken, '/alpaca-registration')
api.add_resource(AlpacaTransaction, '/alpaca-transaction')
api.add_resource(AlpacaPositions, '/alpaca-positions')
api.add_resource(PositionList,'/position-list')
api.add_resource(TransactionList, '/transaction-list')
api.add_resource(TransactionFeed, '/feed')
api.add_resource(StockSocialInfo, '/detail-stock-info')
api.add_resource(StockFinancialInfo, '/financial-stock-info')
api.add_resource(AlpacaAccount, '/update-and-get-alpaca-account')
api.add_resource(LeaderboardWidget, '/leaderboard-widget')
api.add_resource(LeaderboardAll, '/leaderboard')

#update_all_leaderboard_scores()

if __name__ == '__main__':
    app.run(debug=True)