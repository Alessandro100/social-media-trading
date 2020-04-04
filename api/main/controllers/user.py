from flask_restful import reqparse, abort, Api, Resource
from flask import abort
from ..models.user import *
import json

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('username_to_follow')
parser.add_argument('password')
parser.add_argument('img')
parser.add_argument('bg_img')
parser.add_argument('access_token')

class User(Resource):
    def get(self):
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username'])
        return neomodel_to_json(user), 201

    def put(self):
        args = parser.parse_args()

        unique_username_check = UserNode.nodes.first_or_none(username=args['username'])
        if(unique_username_check is not None):
            abort(406, 'username taken')

        user = UserNode.nodes.first(access_token=args['access_token'])
        #this is dumb, neomdel won't allow user[key] syntax
        for key, value in args.items():
            if key == 'username':
                user.username = value
            if key == 'password':
                user.password = value
            if key == 'img':
                user.img = value
            if key == 'bg_img':
                user.bg_img = value
        user.save()

        return neomodel_to_json(user)

class AuthenticateUser(Resource):
    def get(self):
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username'], password=args['password'])
        return neomodel_to_json(user), 201

class AuthenticateUserAccessToken(Resource):
    def get(self):
        args = parser.parse_args()
        user = UserNode.nodes.first(access_token=args['access_token'])
        return neomodel_to_json(user), 201

class UserFollowRelation(Resource):
    def post(self):
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username'])
        user_to_follow = UserNode.nodes.first(username=args['username_to_follow'])
        user.follows.connect(user_to_follow)
        return json.dumps({'status': 'successful follow'}), 201

    def get(self):
        args = parser.parse_args()
        user = UserNode.nodes.first(username=args['username'])
        return neomodel_list_to_json(user.follows)