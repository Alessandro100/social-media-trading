from flask_restful import reqparse, abort, Api, Resource
from neo4j import GraphDatabase
from ..models.transaction import *
from ..models.stock import *
from ..models.user import *
from neomodel import db
from ..models.user import UserNode

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('stock_symbol')
parser.add_argument('password')


class LeaderboardAll(Resource):
    def get(self):
        #this is not efficient, but its quick for now

        return neomodel_list_to_json(UserNode.nodes.all())

class LeaderboardWidget(Resource):
    def get(self):
        #return user score [done], rank, and percentile
        info = {}
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username'])
        investor_scores = (user.investor_score for user in UserNode.nodes.all())
        investor_scores = sorted(investor_scores)
        info['investor_score'] = user.investor_score
        info['rank'] = investor_scores.index(info['investor_score'])
        info['percentile'] = (info['rank'] / len(investor_scores)) * 100
        return info, 201