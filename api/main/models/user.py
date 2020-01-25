from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

from flask_restful import Resource, Api
from py2neo import Graph, NodeMatcher
from py2neo.data import Node, Relationship
from flask_cors import CORS
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config
#from app.main.model import user




parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('password')

#class User(StructuredNode):
class User(Resource):
    def get(self):
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username'])
        user = neomodel_to_json(user)
        return user, 201

    def post(self):
        args = parser.parse_args()
        user = UserNode(username=args['username'], password=args['password'], free_cash='0', img="", bg_img="", investor_score='0').save()
        return {'status': 'good register path'}, 201


def neomodel_to_json(neomdel):
    json_string = json.dumps(neomdel.__properties__) 
    return json.loads(json_string)

class UserNode(StructuredNode):
    username = StringProperty(unique_index=True)
    password = StringProperty()
    password = StringProperty()
    free_cash = StringProperty()
    img = StringProperty()
    bg_img = StringProperty()
    investor_score = StringProperty()
    #positions = RelationshipTo('Position', 'OWNS')
    #transactions = RelationshipTo('Transaction', 'MADE')