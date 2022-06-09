from backend.src.models.marshmallow.ma import ma

from backend.src.models.models import Tweet, User


class TweetSchema(ma.SQLAlchemyAutoSchema):   
    
    user = ma.Nested("UserSchema", exclude=("tweets",))
     
    class Meta:
        model = Tweet
        load_instance = True


class UserSchema(ma.SQLAlchemyAutoSchema):
    
    tweets = ma.Nested("TweetSchema", many=True)
        
    class Meta:
        model = User
        exclude = ["password"]
        load_instance = True