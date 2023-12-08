from flask import request
from flask_restful import Resource
from config import db
from models.services import Service
from schemas.services_schema import ServiceSchema



service_schema = ServiceSchema(session=db.session)
services_schema = ServiceSchema(many=True, session=db.session)

class Services(Resource):
    def get(self):
        try:
            return services_schema.dump(Service.query)
        except Exception as e:
            return {"message": str(e)}, 500