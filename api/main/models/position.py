from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from py2neo import Graph, NodeMatcher
from py2neo.data import Node, Relationship
from flask_cors import CORS
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config, IntegerProperty, UniqueIdProperty

parser = reqparse.RequestParser()

class Position(Resource):
    def get(self):
        return {'status': 'good register path'}, 201

    def post(self):
        return {'status': 'good register path'}, 201

class PositionNode(StructuredNode):
    id = UniqueIdProperty()
    date = StringProperty()
    quantity = IntegerProperty()
    total_purchase_price = StringProperty()
    stock = RelationshipTo('Stock', 'POSITION STOCK')
    user = RelationshipFrom('User', 'OWNS')
