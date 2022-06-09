from flask_restful import Resource
from flask_jwt_extended import jwt_required

from backend.src.models.models import User
from backend.src.models.marshmallow.models.marshmallow_schemas import UserSchema


class Profile(Resource):
    @jwt_required()
    def get(self, username):
        user = User.query.filter(User.username == username).first()
        return {"userProfile": UserSchema().dump(user)}, 200 if user else 404


    