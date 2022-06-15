from flask import Flask
from dotenv import load_dotenv
import os

from backend.src.api.api import api
from backend.src.network.cors import cors
from backend.src.authentication.jwt import jwt
from backend.src.models.db import db
from backend.src.models.marshmallow.ma import ma

from backend.src.resources.favicon import FavIcon
from backend.src.resources.register import Register
from backend.src.resources.login import Login
from backend.src.resources.logout import Logout
from backend.src.resources.refresh_token import RefreshToken
from backend.src.resources.current_user import CurrentUser
from backend.src.resources.users import Users 



def create_app():
    app = Flask(__name__)
    
    load_dotenv(dotenv_path=".env")
    
    app.config["ENV"] = "development"
    app.config["DEBUG"] = True
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
    app.config["JWT_COOKIE_SECURE"] = False
    app.config['JWT_TOKEN_LOCATION'] = ["headers", "cookies"]
    app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
    app.config["CORS_HEADERS"] = "Content-Type"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    api.add_resource(FavIcon, "/favicon.ico")
    api.add_resource(Register, "/register")
    api.add_resource(Login, "/login")
    api.add_resource(RefreshToken, "/refresh-token")
    api.add_resource(Logout, "/logout")
    api.add_resource(CurrentUser, "/current-user", endpoint='current-user')
    api.add_resource(Users, "/users")

    api.init_app(app)
    cors.init_app(app)
    jwt.init_app(app)    
    db.init_app(app)
    ma.init_app(app)
    
    return app

