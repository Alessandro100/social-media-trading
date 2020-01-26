from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config, IntegerProperty, UniqueIdProperty
from .user import UserNode

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
    id = UniqueIdProperty()
    date = StringProperty()
    quantity = IntegerProperty()
    total_purchase_price = StringProperty()
    stock = RelationshipTo('Stock', 'POSITION STOCK')
    user = RelationshipFrom('User', 'OWNS')

def neomodel_to_json(neomdel):
    json_string = json.dumps(neomdel.__properties__) 
    return json.loads(json_string)

def createPosition():
    print('hi')
