from marshmallow import fields, validate
from config import ma
from models.coaches import Coach

class CoachSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Coach
    load_instance = True
    fields = ["id", "email", "name","_password_hash", "bio", "team", "profile_picture", "is_member", "athletes", "appointment"]
  
  id = fields.Integer()
  name = fields.String(required=True, validate=validate.Length(min=2, max=21))
  email = fields.String(required=True, validate=validate.Length(min=7, max=100))
  bio = fields.String(required=False, validate=validate.Length(min=5, max=500))
  team = fields.String(required=False, validate=validate.Length(min=0, max=25))
  profile_picture = fields.String(required=False, allow_none=True)
  is_member = fields.Boolean(required=False)
  athletes = fields.List(fields.Nested("AthleteSchema", only=( "id", "name", "age", "height", "weight", "gender", "stance", "discipline", "profile_picture", "boot_size", "equipment", "athlete_services"), dump_only=True))
  appointment = fields.List(fields.Nested("AppointmentSchema", only=("id", "booking_time", "athlete_services", "pickup_location", "dropoff_location"), dump_only=True))
