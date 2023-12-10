from flask_restful import Resource
from flask_jwt_extended import (
    jwt_required,
    current_user,
)
from config import db
from models.coaches import Coach
from schemas.coaches_schema import CoachSchema

coach_schema = CoachSchema(session=db.session)


class Me(Resource):
    @jwt_required()
    def get(self):
        return coach_schema.dump(current_user), 200