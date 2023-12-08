from flask import request
from flask_restful import Resource
from config import db
from models.coaches import Coach
from schemas.coaches_schema import CoachSchema



coach_schema = CoachSchema(session=db.session)
coaches_schema = CoachSchema(many=True, session=db.session)

class Coaches(Resource):
    def get(self):
        try:
            return coaches_schema.dump(Coach.query)
        except Exception as e:
            return {"message": str(e)}, 500
          
    def post(self):
        try:
            data = request.json
            coaches_schema.validate(data)
            new_coach= coach_schema.load(data)
            db.session.add(new_coach)
            db.session.commit()
            return coach_schema.dump(new_coach), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400  