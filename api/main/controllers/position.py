from ..models.transaction import *
from ..models.position import *

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