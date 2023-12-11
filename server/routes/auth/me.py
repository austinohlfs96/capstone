from flask import session
from flask_restful import Resource
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    current_user,
)
from config import db
from models.coaches import Coach
from schemas.coaches_schema import CoachSchema

coach_schema = CoachSchema(session=db.session)


class Me(Resource):
    @jwt_required()
    def get(self):
        # if session.get("coach_id"):
        if coach := db.session.get(Coach, get_jwt_identity()):
            return coach_schema.dump(coach), 200
        return {"message": "Unathorized"}, 403
        # return {"message": "Unathorized"}, 403