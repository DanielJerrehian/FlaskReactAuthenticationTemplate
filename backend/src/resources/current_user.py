from flask_restful import Resource
from flask_jwt_extended import jwt_required, current_user

from backend.src.models.marshmallow.models.marshmallow_schemas import UserSchema


class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        user = UserSchema().dump(current_user)
        return {"user": user}, 200