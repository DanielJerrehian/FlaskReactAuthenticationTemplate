from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, current_user
import json

from backend.src.models.marshmallow.models.marshmallow_schemas import UserSchema

class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        include_user_tweets = json.loads(request.args["includeTweets"])
        if include_user_tweets:
            user = UserSchema().dump(current_user)
        else:
            user = UserSchema(exclude=["tweets"]).dump(current_user)
        return {"user": user}, 200