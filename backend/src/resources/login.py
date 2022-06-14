from flask import request, make_response
from flask_restful import Resource
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, set_refresh_cookies
from datetime import timedelta

from backend.src.models.models import User
from backend.src.models.marshmallow.models.marshmallow_schemas import UserSchema


class Login(Resource):
    def post(self):
        data = request.json
        user = User.query.filter(User.username == data["username"]).first()
        if not user:
            return {"message": "No user found"}, 400
        else:
            passwords_match = check_password_hash(pwhash=user.password, password=data["password"])
            if passwords_match:
                access_token = create_access_token(identity=user.username, expires_delta=timedelta(minutes=15))
                refresh_token = create_refresh_token(identity=user.username, expires_delta=timedelta(hours=48))
                response = make_response({"user": UserSchema().dump(user), "accessToken": access_token})               
                set_refresh_cookies(response=response, encoded_refresh_token=refresh_token)                
                return response
            else:
                return {"message": "Password incorrect"}, 401
                
                