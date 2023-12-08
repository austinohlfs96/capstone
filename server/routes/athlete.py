from flask import request
from flask_restful import Resource
from config import db
from models.athletes import Athlete
from schemas.athlete_schema import AthleteSchema



athlete_schema = AthleteSchema(session=db.session)
athletes_schema = AthleteSchema(many=True, session=db.session)

class Athletes(Resource):
    def get(self):
        try:
            return athletes_schema.dump(Athlete.query)
        except Exception as e:
            return {"message": str(e)}, 500
          
    def post(self):
        try:
            data = request.json
            athletes_schema.validate(data)
            new_athlete = athlete_schema.load(data)
            db.session.add(new_athlete)
            db.session.commit()
            return athlete_schema.dump(new_athlete), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400      