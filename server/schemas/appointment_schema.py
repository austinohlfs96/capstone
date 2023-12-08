from marshmallow import fields, validate
from config import ma
from models.appointments import Appointment
from schemas.coaches_schema import CoachSchema
from schemas.athlete_service_schema import AthleteServiceSchema

# class AppointmentSchema(ma.SQLAlchemySchema):
#   class Meta:
#     model = Appointment
#     load_instance = True
#     fields = ["id", "pickup_location", "dropoff_location", "booking_time", "coaches_id", "coaches", "athlete_services"]
    
#   pickup_location = fields.String(required=True, validate=validate.Length(min=2, max=300))
#   dropoff_location = fields.String(required=True, validate=validate.Length(min=2, max=300))
#   booking_time = fields.String(required=True, validate=validate.Length(min=2, max=300))
#   coaches_id = fields.Integer(required=True)
#   profile_photo = fields.String(required=False)
#   is_member = fields.Boolean(required=False)
#   coaches = fields.Nested("CoachSchema", only=("id","email", "name", "team"), dump_only=True)
#   athlete_services = fields.List(fields.Nested("AthleteServiceSchema", only=("id", "discipline", "notes", "technician_notes", "reviews", "services", "equipment","athletes"), dump_only=True))

class AppointmentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Appointment
        load_instance = True
        fields = ["id", "pickup_location", "dropoff_location", "booking_time", "coaches_id", "coaches", "athlete_services"]

    pickup_location = fields.String(required=True, validate=validate.Length(min=2, max=300))
    dropoff_location = fields.String(required=True, validate=validate.Length(min=2, max=300))
    booking_time = fields.String(required=True, validate=validate.Length(min=2, max=300))
    coaches_id = fields.Integer(required=True)
    profile_photo = fields.String(required=False)
    is_member = fields.Boolean(required=False)
    coaches = fields.Nested("CoachSchema", only=("id", "email", "name", "team"), dump_only=True)
    athlete_services = fields.List(fields.Nested("AthleteServiceSchema", only=("id", "discipline", "notes", "technician_notes", "reviews", "services", "equipment", "athletes"), dump_only=True))
    