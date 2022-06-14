from flask import make_response, request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, set_access_cookies
from datetime import timedelta

class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def get(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity, expires_delta=timedelta(seconds=10))
        return {"accessToken": access_token}, 200