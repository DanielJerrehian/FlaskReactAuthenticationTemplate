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
            email = f"{data['username']}@gmail.com"
            hashed_password = generate_password_hash(password=data["password"], salt_length=10)
            birthday = datetime.strptime("2020-04-20", "%Y-%m-%d").date()
            user = User(email=email, username=data["username"], password=hashed_password, birthday=birthday, profile_picture=None)
            db.session.add(user)
            db.session.commit()
            access_token = create_access_token(identity=user.email, expires_delta=timedelta(minutes=20))
            refresh_token = create_refresh_token(identity=user.email)
            return {"message": "User created succesfully", "accessToken": access_token, "refreshToken": refresh_token}, 201