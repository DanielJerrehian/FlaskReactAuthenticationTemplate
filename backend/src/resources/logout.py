from flask import request, make_response
from flask_restful import Resource
from flask_jwt_extended import jwt_required, unset_refresh_cookies

from backend.src.models.models import User
from backend.src.models.marshmallow.models.marshmallow_schemas import UserSchema


class Logout(Resource):
    @jwt_required(refresh=True)
    def get(self):
        response = make_response({"message": "User succesfully logged out"})               
        unset_refresh_cookies(response=response)
        return response


    