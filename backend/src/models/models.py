from sqlalchemy.orm import backref

from backend.src.models.db import db


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.Integer, nullable=False, default=1)
    tweets = db.relationship("Tweet", uselist=True, order_by="desc(Tweet.id)", backref=backref('user', uselist=False), lazy=True)
    

class Tweet(db.Model):
    __tablename__ = "tweet"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    body = db.Column(db.String(140), nullable=False)
    
