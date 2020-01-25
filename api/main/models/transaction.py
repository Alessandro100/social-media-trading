from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from py2neo import Graph, NodeMatcher
from py2neo.data import Node, Relationship
from flask_cors import CORS
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config

parser = reqparse.RequestParser()

class Transaction(Resource):
    def get(self):
        return {'status': 'good register path'}, 201

    def post(self):
        return {'status': 'good register path'}, 201

class TransactionNode(StructuredNode):
    date = StringProperty(unique_index=True)
    action = StringProperty()
    status = StringProperty()
    type = StringProperty()
    quantity = StringProperty()
    total_purchase_price = StringProperty()
    positions = RelationshipFrom('Stock', 'POSITION STOCK')
    user = RelationshipTo('User', 'MADE')