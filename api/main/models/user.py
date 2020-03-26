from neo4j import GraphDatabase
import json
from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, config

def neomodel_to_json(neomdel):
    json_string = json.dumps(neomdel.__properties__) 
    return json.loads(json_string)

def neomodel_list_to_json(neomodel_list):
    return list(map(neomodel_to_json, neomodel_list))

class UserNode(StructuredNode):
    username = StringProperty(unique_index=True)
    password = StringProperty()
    free_cash = StringProperty()
    img = StringProperty()
    bg_img = StringProperty()
    access_token = StringProperty()#from alpaca
    investor_score = StringProperty()
    positions = RelationshipTo('.position.PositionNode', 'OWNS')
    transactions = RelationshipTo('.transaction.TransactionNode', 'MADE')
    follows = RelationshipTo('UserNode', 'FOLLOWS')