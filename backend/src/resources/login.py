from flask import request
from flask_restful import Resource
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta

from backend.src.models.models import User


class Login(Resource):
    def post(self):
        data = request.json
        user = User.query.filter(User.email == data["email"]).first()
        if not user:
            return {"message": "No user found"}, 400
        else:
            passwords_match = check_password_hash(pwhash=user.password, password=data["password"])
            if passwords_match:
                access_token = create_access_token(identity=user.email, expires_delta=timedelta(minutes=20))
                refresh_token = create_refresh_token(identity=user.email)
                return {"accessToken": access_token, "refreshToken": refresh_token}, 200
            else:
                return {"message": "Password incorrect"}, 401
                
                