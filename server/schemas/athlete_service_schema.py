from marshmallow import fields, validate
from config import ma
from models.athlete_services import AthleteService

class AthleteServiceSchema(ma.SQLAlchemySchema):
  class Meta:
    model = AthleteService
    load_instance = True
    fields = ["id", "discipline", "notes", "technician_notes", "reviews", "service_id", "athlete_id", "equipment_id", "service_id", "appointment_id", "athletes", "services", "equipment", "appointment", "created_at", "updated_at"]
    
  discipline = fields.String(required=True, validate=validate.Length(min=2, max=40))
  notes = fields.String(required=False, validate=validate.Length(min=0, max=500))
  technician_notes = fields.String(required=False, validate=validate.Length(min=0, max=500))
  reviews = fields.String(required=False, validate=validate.Length(min=0, max=500))
  athlete_id = fields.Integer(required=True)
  service_id = fields.Integer(required=True)
  equipment_id = fields.Integer(required=True)
  appointment_id = fields.Integer(required=True)
  athletes = fields.Nested("AthleteSchema", only=("id", "name", "age", "height", "weight", "gender", "stance", "discipline", "profile_picture", "boot_size", "coaches_id"), dump_only=True)
  services = fields.Nested("ServiceSchema", only=("id", "name", "description", "price", "average_turn_around", "is_available"), dump_only=True)
  equipment = fields.Nested("EquipmentSchema", only=("id", "type", "manifacture", "model", "year", "length", "width", "athlete_id"), dump_only=True)
  appointment = fields.Nested("AppointmentSchema", only=("id", "pickup_location", "dropoff_location", "booking_time", "coaches_id"), dump_only=True)