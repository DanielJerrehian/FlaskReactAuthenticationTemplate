from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, current_user

from backend.src.models.models import db, Tweet
from backend.src.models.marshmallow.models.marshmallow_schemas import TweetSchema


class UserTweet(Resource):
    def get(self, username=None, tweet_id=None):
        tweet = Tweet.query.filter(Tweet.id == int(tweet_id)).first_or_404()
        return {"tweet": TweetSchema().dump(tweet)}, 200
        
    @jwt_required()
    def put(self, username=None, tweet_id=None):
        data = request.json
        tweet = Tweet.query.filter(Tweet.id == int(tweet_id)).first_or_404()
        if not tweet:
            tweet = Tweet(user_id=current_user.id, body=data["tweetBody"])
            db.session.add(tweet)
            db.session.commit()
            return {"tweet": TweetSchema().dump(tweet)}, 200
        elif tweet.user.id == current_user.id:
            tweet.body = data["tweetBody"]
            db.session.commit()
            return {"tweet": TweetSchema().dump(tweet)}, 200
        else:
            return {"message": "Tweet does not belong to user"}, 404
    
    @jwt_required()
    def delete(self, username=None, tweet_id=None):
        tweet = Tweet.query.filter(Tweet.id == int(tweet_id)).first_or_404()
        if tweet:
            if tweet.user.id == current_user.id:
                db.session.delete(tweet)
                db.session.commit()
                return {"message": "Tweet deleted"}, 200
            else:
                return {"message": "Tweet does not belong to user"}, 404
        else:
            return {"message": "Tweet does not exist"}, 404
        