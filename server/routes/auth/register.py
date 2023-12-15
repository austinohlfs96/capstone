from flask import request, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
from sqlalchemy.exc import IntegrityError
from config import db
from schemas.coaches_schema import CoachSchema

coach_schema = CoachSchema(session=db.session)


class Register(Resource):
    def post(self):
        try:
            data = {
                "name": request.get_json().get("name"),
                "email": request.get_json().get("email"),
                "team": request.get_json().get("team"),
                # "_password_hash": request.get_json().get("password")
            }
            coach_schema.validate(data)
            coach = coach_schema.load(data)
            coach.password_hash = request.get_json().get("password")
            db.session.add(coach)
            db.session.commit()
            jwt = create_access_token(identity=coach.id)
            refresh_token = create_refresh_token(identity=coach.id)
            serialized_coach = coach_schema.dump(coach)
            return make_response(
                {
                    "coach": serialized_coach,
                    "token": jwt,
                    "refresh_token": refresh_token,
                },
                201,
            )
        except (Exception, IntegrityError) as e:
            db.session.rollback() 
            return {"message": str(e)}, 400