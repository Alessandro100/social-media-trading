from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from py2neo import Graph, NodeMatcher
from py2neo.data import Node, Relationship
from flask_cors import CORS
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config
from .stock import createStock, StockNode

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
    stock = RelationshipTo('StockNode', 'POSITION STOCK')
    user = RelationshipFrom('.user.UserNode', 'MADE')


def createTransaction(user_node, action, type, quantity, total_purchase_price, stock_symbol, created_at):
    transaction = TransactionNode(date=created_at, action=action, status='processing', type=type, quantity=quantity).save()
    stock = StockNode.nodes.first_or_none(symbol=stock_symbol)
    if stock == None:
        print("create STOCK CREATE")
        stock = createStock(stock_symbol)

    transaction.stock.connect(stock)
    transaction.user.connect(user_node)

    #get stock, if doesn't exist -> create
