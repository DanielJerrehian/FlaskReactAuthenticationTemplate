from flask_restful import Resource
from flask_jwt_extended import jwt_required
from sqlalchemy import func
from time import sleep

from backend.src.models.models import User
from backend.src.models.marshmallow.models.marshmallow_schemas import UserSchema


class Profile(Resource):
    @jwt_required()
    def get(self, username : str = None):
        sleep(.25)
        user = User.query.filter(func.lower(User.username) == func.lower(username)).first_or_404()
        return {"profile": UserSchema().dump(user)}, 200