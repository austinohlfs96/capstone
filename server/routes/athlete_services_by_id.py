from flask import request
from flask_restful import Resource
from config import db
from models.athlete_services import AthleteService
from schemas.athlete_service_schema import AthleteServiceSchema

athlete_service_schema = AthleteServiceSchema(session=db.session)
athlete_service_schema_schema = AthleteServiceSchema(many=True, session=db.session)


class AthleteServiceById(Resource):
    def get(self, id):
        try:
            if athlete_service := db.session.get(AthleteService, id):
                return athlete_service_schema.dump(athlete_service)
            return {"message": "Athlete service not found"}, 404
        except Exception as e:
            return {"message": str(e)}, 500
          
    def patch(self, id):
        if athlete_service := db.session.get(AthleteService, id):
            try:
                data = request.json
                athlete_service_schema.validate(data)
                athlete_service = athlete_service_schema.load(data, instance=athlete_service, partial=True)
                db.session.commit()
                return athlete_service_schema.dump(athlete_service)
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Team not found"}, 404
      
      
    def delete(self, id):
        if athlete_service := db.session.get(AthleteService, id):
            try:
                db.session.delete (athlete_service)
                db.session.commit()
                return {"message": f"Athlete Service {id} deleted"}
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Appointment not found"}, 404