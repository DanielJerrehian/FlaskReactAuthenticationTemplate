from flask import request
from flask_restful import Resource
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import datetime, timedelta

from backend.src.models.db import db
from backend.src.models.models import User


class Register(Resource):
    def post(self):
        data = request.json
        existing_user = User.query.filter(User.username == data["username"]).first()
        if existing_user:
            return {"message": "A user with that username already exists"}, 409
        else:
            hashed_password = generate_password_hash(password=data["password"], salt_length=10)
            user = User(username=data["username"], password=hashed_password)
            db.session.add(user)
            db.session.commit()
            return {
                "message": "User created succesfully"
            }, 201