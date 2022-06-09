from flask import jsonify
from flask_jwt_extended import JWTManager
from backend.src.models.models import User


jwt = JWTManager()


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter(User.email == identity).first()

@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    return {"message": "Token has expired"}, 401

