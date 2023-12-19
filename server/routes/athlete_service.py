from flask import request
from flask_restful import Resource
from config import db
from models.athlete_services import AthleteService
from schemas.athlete_service_schema import AthleteServiceSchema
from flask_jwt_extended import (jwt_required)



athlete_service_schema = AthleteServiceSchema(session=db.session)
athlete_services_schema = AthleteServiceSchema(many=True, session=db.session)

class AthleteServices(Resource):
    def get(self):
        try:
            return athlete_services_schema.dump(AthleteService.query)
        except Exception as e:
            return {"message": str(e)}, 500
        
    @jwt_required() 
    def post(self):
        try:
            data = request.json
            athlete_services_schema.validate(data)
            new_athlete_service = athlete_service_schema.load(data)
            db.session.add(new_athlete_service)
            db.session.commit()
            return athlete_service_schema.dump(new_athlete_service), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400  