from flask import request
from flask_restful import Resource
from config import db
from models.appointments import Appointment
from schemas.appointment_schema import AppointmentSchema





appointment_schema = AppointmentSchema(session=db.session)
appointments_schema = AppointmentSchema(many=True, session=db.session)

class Appointments(Resource):
    def get(self):
        try:
            return appointments_schema.dump(Appointment.query)
        except Exception as e:
            return {"message": str(e)}, 500
          
    def post(self):
        try:
            data = request.json
            appointments_schema.validate(data)
            new_appointment = appointment_schema.load(data)
            db.session.add(new_appointment)
            db.session.commit()
            return appointment_schema.dump(new_appointment), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400 