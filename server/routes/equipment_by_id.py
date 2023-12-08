from flask import request
from flask_restful import Resource
from config import db
from models.equipment import Equipment
from schemas.equipment_schema import EquipmentSchema

equipment_schema = EquipmentSchema(session=db.session)
equipments_schema_schema = EquipmentSchema(many=True, session=db.session)


class EquipmentById(Resource):
    def get(self, id):
        try:
            if equipment := db.session.get(Equipment, id):
                return equipment_schema.dump(equipment)
            return {"message": "equipment service not found"}, 404
        except Exception as e:
            return {"message": str(e)}, 500

      
      
    def delete(self, id):
        if equipment := db.session.get(Equipment, id):
            try:
                db.session.delete (equipment)
                db.session.commit()
                return {"message": f"Equipment {id} deleted"}
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Equipment not found"}, 404