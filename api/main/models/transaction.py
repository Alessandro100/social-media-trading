from neo4j import GraphDatabase
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config
from .stock import createStock, StockNode
from .user import UserNode

class TransactionNode(StructuredNode):
    date = StringProperty(unique_index=True)
    action = StringProperty()
    status = StringProperty()
    type = StringProperty()
    quantity = StringProperty()
    total_purchase_price = StringProperty()
    stock = RelationshipTo('StockNode', 'POSITION STOCK')
    user = RelationshipFrom('.user.UserNode', 'MADE')

def neomodel_list_to_json(neomodel_list):
    return list(map(format_neomodel_list_and_add_stock, neomodel_list))

def format_neomodel_list_and_add_stock(neomdel):
    stock = neomodel_to_json(neomdel.stock.all()[0])
    user = neomodel_to_json(neomdel.user.all()[0])
    json_string = json.dumps(neomdel.__properties__) 
    json_object = json.loads(json_string)
    json_object['stock'] = stock
    json_object['username'] = user['username']
    return json_object

def neomodel_to_json(neomdel):
    json_string = json.dumps(neomdel.__properties__) 
    return json.loads(json_string)


def createTransaction(user_node, action, type, quantity, total_purchase_price, stock_symbol, created_at):
    transaction = TransactionNode(date=created_at, action=action, status='processing', type=type, quantity=quantity).save()
    stock = StockNode.nodes.first_or_none(symbol=stock_symbol)
    if stock == None:
        stock = createStock(stock_symbol)

    transaction.stock.connect(stock)
    transaction.user.connect(user_node)

