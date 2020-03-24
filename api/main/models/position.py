from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config, IntegerProperty, UniqueIdProperty
from .user import UserNode
from .stock import createStock, StockNode, get_or_create_stock

parser = reqparse.RequestParser()
parser.add_argument('username')

class Position(Resource):
    def get(self):
        return {'status': 'good register path'}, 201

    def post(self):
        return {'status': 'good register path'}, 201

class PositionList(Resource):
    def get(self):
        args = parser.parse_args()
        positions = UserNode.nodes.first(username=args['username']).positions
        if len(positions) > 0:
            return neomodel_to_json(positions), 201
        else:
            return {'message': 'no positions'}, 201

class PositionNode(StructuredNode):
    quantity = IntegerProperty()
    avergae_purchase_price = StringProperty()
    stock = RelationshipTo('StockNode', 'POSITION STOCK')
    user = RelationshipFrom('UserNode', 'OWNS')


def add_alpaca_positions_to_user(user, positions):
    for position in positions:
        create_position(user, position)

def neomodel_to_json(neomdel):
    json_string = json.dumps(neomdel.__properties__) 
    return json.loads(json_string)

def create_position(user, position):
    stock = get_or_create_stock(position['symbol'])
    pos = PositionNode(quantity=position['qty'], avergae_purchase_price=position['avg_entry_price']).save()
    pos.stock.connect(stock)
    pos.user.connect(user)
