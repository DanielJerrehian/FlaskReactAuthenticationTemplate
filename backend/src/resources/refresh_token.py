from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from datetime import timedelta

class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def get(self):
        identity = get_jwt_identity()
        access_token = create_access_token(identity=identity, expires_delta=timedelta(days=7))
        return {"accessToken": access_token}, 200