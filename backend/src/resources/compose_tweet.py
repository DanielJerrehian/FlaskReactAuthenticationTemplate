from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, current_user

from backend.src.models.models import db, Tweet


class ComposeTweet(Resource):
    @jwt_required()
    def post(self):
        data = request.json
        tweet = Tweet(user_id=current_user.id, body=data["body"])
        db.session.add(tweet)
        db.session.commit()
        return {"message": "Tweet created"}, 201