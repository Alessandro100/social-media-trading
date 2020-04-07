from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from py2neo import Graph
import requests
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config, IntegerProperty, UniqueIdProperty
from ..models.transaction import createTransaction
from ..models.user import UserNode, neomodel_to_json
from ..models.position import *
from ..models.alpaca import *
from ..constants.environment_variables import get_environment_variables


#from main.models.user import UserNode


parser = reqparse.RequestParser()
parser.add_argument('code')
parser.add_argument('username')
parser.add_argument('symbol')
parser.add_argument('quantity')
parser.add_argument('action')

class AlpacaRegistrationToken(Resource):
    def get(self):
        return {'status': 'good register path'}, 201

    def post(self):
        args = parser.parse_args()
        PARAMS = {
            'grant_type': 'authorization_code',
            'code':args['code'],
            'client_id': get_environment_variables()['ALPACA_CLIENT_ID'],
            'client_secret': get_environment_variables()['ALPACA_SECRET_KEY'],
            'redirect_uri': get_environment_variables()['ALPACA_REDIRECT']
        }     
        URL = 'https://api.alpaca.markets/oauth/token'   
        r = requests.post(url = URL, params = PARAMS)
        data = r.json() 
        access_token = data['access_token']

        user = UserNode.nodes.first_or_none(access_token=access_token)
        if user == None:
            alpaca_info = get_alpaca_account(access_token)
            user = UserNode(free_cash=alpaca_info['cash'], access_token=access_token, investor_score='0').save()
        else:
            user.access_token = access_token
            user.save()
    
        return neomodel_to_json(user)


class AlpacaTransaction(Resource):
    def post(self):
        args = parser.parse_args()
        #https://docs.alpaca.markets/api-documentation/api-v2/orders/
        user = UserNode.nodes.first(username=args['username'])
        if user.access_token is not None:
            URL = 'https://paper-api.alpaca.markets/v2/orders'
            PARAMS = {
                'symbol': str(args['symbol']).upper(),
                'qty': int(args['quantity']),
                'side': args['action'],
                'type': 'market',
                'time_in_force': 'day',
            }
            HEADERS = {'Authorization': 'Bearer ' + user.access_token}
            r = requests.post(url = URL, json = PARAMS, headers=HEADERS)
            data = r.json()
            total_purchase_price = 420#lmao wtf
            print(data)
            update_user_positions(user)
            createTransaction(user, data['side'], data['type'], data['qty'], total_purchase_price, data['symbol'], data['created_at'])
            return data
        else:
            return {'error': 'Not Authorized'}, 403

class AlpacaPositions(Resource):
    def get(self):
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username']) 
        URL = 'https://paper-api.alpaca.markets/v2/positions'
        HEADERS = {'Authorization': 'Bearer ' + user.access_token}
        r = requests.get(url = URL, headers=HEADERS)
        positions = r.json()
        for position in user.positions:
            position.delete()
        add_alpaca_positions_to_user(user, positions)
        return r.json()

class AlpacaAccount(Resource):
    def get(self):
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username'])
        account_info = get_alpaca_account(user.access_token)
        user.free_cash = account_info['cash']
        user.save()
        return account_info
