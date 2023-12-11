from flask import request, make_response
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
from config import db
from models.coaches import Coach
from schemas.coaches_schema import CoachSchema

coach_schema = CoachSchema(session=db.session)


class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            coach = Coach.query.filter_by(email=data.get("email")).first()

            if coach and coach.authenticate(data.get("password")):
                jwt = create_access_token(identity=coach.id)
                # refresh_token = create_refresh_token(identity=coach.id)
                serialized_coach = coach_schema.dump(coach)
                # res = make_response(serialized_coach, 200)
                # set_access_cookies(res, jwt)
                # set_refresh_cookies(res, refresh_token)
                return {"token": jwt, "coach": serialized_coach}, 201

            return {"message": "Invalid User Credentials"}, 403

        except Exception as e:
            return {"message": "Invalid User Credentials"}, 403