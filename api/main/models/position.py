from neo4j import GraphDatabase
from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import json
import requests
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config, IntegerProperty, UniqueIdProperty
from .user import UserNode
from .stock import createStock, StockNode, get_or_create_stock

class PositionNode(StructuredNode):
    quantity = IntegerProperty()
    avergae_purchase_price = StringProperty()
    stock = RelationshipTo('StockNode', 'POSITION STOCK')
    user = RelationshipFrom('UserNode', 'OWNS')


def add_alpaca_positions_to_user(user, positions):
    for position in positions:
        create_position(user, position)

def update_user_positions(user):
    URL = 'https://paper-api.alpaca.markets/v2/positions'
    HEADERS = {'Authorization': 'Bearer ' + user.access_token}
    r = requests.get(url = URL, headers=HEADERS)
    positions = r.json()
    for position in user.positions:
        position.delete()
    add_alpaca_positions_to_user(user, positions)

def neomodel_to_json(neomdel):
    json_string = json.dumps(neomdel.__properties__) 
    return json.loads(json_string)

def create_position(user, position):
    stock = get_or_create_stock(position['symbol'])
    pos = PositionNode(quantity=position['qty'], avergae_purchase_price=position['avg_entry_price']).save()
    pos.stock.connect(stock)
    pos.user.connect(user)
