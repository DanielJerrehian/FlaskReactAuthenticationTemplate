from flask_restful import Resource
from flask_jwt_extended import jwt_required
from time import sleep

from backend.src.models.models import User
from backend.src.models.marshmallow.models.marshmallow_schemas import UserSchema


class Users(Resource):
    @jwt_required()
    def get(self):
        sleep(.25)
        users = User.query.filter(User.username != 'Admin').all()
        return {"users": UserSchema().dump(users, many=True)}, 200