from flask_restful import Resource
from flask import make_response
from flask_jwt_extended import (
    jwt_required,
    current_user,
    create_access_token,
    set_access_cookies,
    get_jwt_identity,
)
from config import db
from schemas.coaches_schema import CoachSchema

coach_schema = CoachSchema(session=db.session)


class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        id_ = get_jwt_identity()
        res = coach_schema.dump(current_user)
        access_token = create_access_token(identity=id_)
        return {
            "coach": res,
            "jwt_token": access_token
        }