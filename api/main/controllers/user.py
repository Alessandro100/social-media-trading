from flask_restful import reqparse, abort, Api, Resource
from ..models.user import *

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('username_to_follow')
parser.add_argument('password')

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

class UserFollowRelation(Resource):
    def post(self):
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username'])
        user_to_follow = UserNode.nodes.first(username=args['username_to_follow'])
        user.follows.connect(user_to_follow)
        return {'status': 'successful follow'}, 201