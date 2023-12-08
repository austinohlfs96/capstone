from flask import request
from flask_restful import Resource
from config import db
from models.appointments import Appointment
from schemas.appointment_schema import AppointmentSchema

appointment_schema = AppointmentSchema(session=db.session)
appointments_schema = AppointmentSchema(many=True, session=db.session)


class AppointmentById(Resource):
    def get(self, id):
        try:
            if appointment := db.session.get(Appointment, id):
                return appointment_schema.dump(appointment)
            return {"message": "Team not found"}, 404
        except Exception as e:
            return {"message": str(e)}, 500
          
    def patch(self, id):
        if appointment := db.session.get(Appointment, id):
            try:
                data = request.json
                appointment_schema.validate(data)
                appointment = appointment_schema.load(data, instance=appointment, partial=True)
                db.session.commit()
                return appointment_schema.dump(appointment)
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Team not found"}, 404
      
      
    def delete(self, id):
        if appointment := db.session.get(Appointment, id):
            try:
                db.session.delete(appointment)
                db.session.commit()
                return {"message": f"Appointment {id} deleted"}
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Appointment not found"}, 404