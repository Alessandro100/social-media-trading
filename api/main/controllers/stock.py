from flask_restful import reqparse, abort, Api, Resource
from neo4j import GraphDatabase
from ..models.transaction import *
from ..models.stock import *
from neomodel import db
from ..models.user import UserNode

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('stock_symbol')
parser.add_argument('password')

class StockFinancialInfo(Resource):
    def get(self):
        args = parser.parse_args()
        r = requests.get('https://sandbox.iexapis.com/stable/stock/'+args['stock_symbol']+'/quote?token=Tpk_6d7ce216f5fe43ddb3de9ef3259bb550')
        company_info = r.json()
        return company_info

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



