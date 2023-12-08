from flask import request
from flask_restful import Resource
from config import db
from models.athletes import Athlete
from schemas.athlete_schema import AthleteSchema

athlete_schema = AthleteSchema(session=db.session)
athlete_schema_schema = AthleteSchema(many=True, session=db.session)


class AthleteById(Resource):
    def get(self, id):
        try:
            if athlete := db.session.get(Athlete, id):
                return athlete_schema.dump(athlete)
            return {"message": "Athlete not found"}, 404
        except Exception as e:
            return {"message": str(e)}, 500
          
    def patch(self, id):
        if athlete := db.session.get(Athlete, id):
            try:
                data = request.json
                athlete_schema.validate(data)
                athlete = athlete_schema.load(data, instance=athlete, partial=True)
                db.session.commit()
                return athlete_schema.dump(athlete)
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Athlete not found"}, 404
      
      
    def delete(self, id):
        if athlete := db.session.get(Athlete, id):
            try:
                db.session.delete (athlete)
                db.session.commit()
                return {"message": f"Athlete  {id} deleted"}
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Athlete not found"}, 404