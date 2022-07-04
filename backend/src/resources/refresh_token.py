from flask_restful import Resource
from flask_jwt_extended import jwt_required, current_user, get_jwt_identity, create_access_token
from datetime import timedelta

from backend.src.models.marshmallow.models.marshmallow_schemas import UserSchema


class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def get(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity, expires_delta=timedelta(minutes=10))
        user = UserSchema().dump(current_user)
        return {"user": user, "accessToken": access_token, }, 200