"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from hashlib import sha256

#create flask app
api = Blueprint('api', __name__)



# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = sha256 (request.json.get("password", None).encode()).hexdigest()
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/signup", methods=['POST'])
def create_account():
    email = request.json.get("email", None)
    password = sha256 (request.json.get("password", None).encode()).hexdigest()
    email_exists = User.query.filter_by(email=email).first()
    if email_exists:
        return jsonify({"msg": "Email already exists"}), 401
    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 201

@api.route("/identity", methods=['GET'])
@jwt_required()
def verify_identity():
    # current_user = get_jwt_identity()
    return jsonify({"msg": "User verified"}), 200



    