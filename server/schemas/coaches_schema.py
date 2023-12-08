from marshmallow import fields, validate
from config import ma
from models.coaches import Coach

class CoachSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Coach
    load_instance = True
    fields = ["id", "email", "name","_password_hash", "bio", "team", "profile_picture", "is_member", "athletes", "appointments"]
    
  name = fields.String(required=True, validate=validate.Length(min=2, max=21))
  email = fields.String(required=True, validate=validate.Length(min=2, max=256))
  bio = fields.String(required=False, validate=validate.Length(min=5, max=500))
  team = fields.String(required=False, validate=validate.Length(min=2, max=25))
  is_member = fields.Boolean(required=False)
  athletes = fields.List(fields.Nested("AthleteSchema", only=("name", "age", "height", "weight", "gender", "stance", "discipline", "profile_picture", "boot_size", "equipment", "athlete_services"), dump_only=True))
  appointments = fields.List(fields.Nested("AppointmentSchema", only=("booking_time", "athlete_services"), dump_only=True))
