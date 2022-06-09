from flask_restful import Resource

from backend.src.models.models import db, Tweet
from backend.src.models.marshmallow.models.marshmallow_schemas import TweetSchema

class Tweets(Resource):
    def get(self):
        tweets = Tweet.query.order_by(Tweet.id.desc()).all()
        return {"tweets": TweetSchema().dump(tweets, many=True)}, 200
    