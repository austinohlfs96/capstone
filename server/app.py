#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session, jsonify
from flask_restful import Resource, Api

# Local imports
from config import app, db, api, jwt
from werkzeug.exceptions import NotFound


from models.coaches import Coach
from routes.auth.check_token import CheckToken
from routes.service import Services
from routes.athlete import Athletes
from routes.athlete_by_id import AthleteById
from routes.equipments import EquipmentResource
from routes.equipment_by_id import EquipmentById
from routes.coach import Coaches
from routes.coach_by_id import CoachById
from routes.appointment import Appointments
from routes.appointment_by_id import AppointmentById
from routes.athlete_service import AthleteServices
from routes.athlete_services_by_id import AthleteServiceById
from routes.auth.login import Login
from routes.auth.logout import Logout
from routes.auth.me import Me
from routes.auth.refresh import Refresh
from routes.auth.register import Register



api.add_resource(CheckToken, "/auth/check")
api.add_resource(Me, "/auth/me")
api.add_resource(Login, "/auth/login")
api.add_resource(Logout, "/auth/logout")
api.add_resource(Refresh, "/auth/refresh")
api.add_resource(Register, "/auth/register")
api.add_resource(Services, '/services') 
api.add_resource(Athletes, '/athletes') 
api.add_resource(AthleteById, '/athlete/<int:id>')
api.add_resource(EquipmentResource, '/equipment')
api.add_resource(EquipmentById, "/equipment/<int:id>")
api.add_resource(Coaches, '/coaches')
api.add_resource(CoachById, '/coach/<int:id>')
api.add_resource(Appointments, '/appointments')
api.add_resource(AppointmentById, '/appointment/<int:id>')
api.add_resource(AthleteServices, '/athlete-services')
api.add_resource(AthleteServiceById,"/athlete-service/<int:id>")

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return db.session.get(Coach, identity)  


if __name__ == '__main__':
    app.run(port=5555, debug=True)