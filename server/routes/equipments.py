from flask import request
from flask_restful import Resource
from config import db
from models.equipment import Equipment
from schemas.equipment_schema import EquipmentSchema



equipment_schema = EquipmentSchema(session=db.session)
equipments_schema = EquipmentSchema(many=True, session=db.session)

class EquipmentResource(Resource):
    def get(self):
        try:
            return equipments_schema.dump(Equipment.query)
        except Exception as e:
            return {"message": str(e)}, 500
        
    def post(self):
        try:
            data = request.json
            equipments_schema.validate(data)
            new_athlete = equipment_schema.load(data)
            db.session.add(new_athlete)
            db.session.commit()
            return equipment_schema.dump(new_athlete), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400