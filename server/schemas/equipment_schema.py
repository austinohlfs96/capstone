from marshmallow import fields, validate
from config import ma
from models.equipment import Equipment
from schemas.athlete_service_schema import AthleteServiceSchema


class EquipmentSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Equipment
    load_instance = True
    fields = ["id", "type", "manifacture", "model", "year", "length", "width", "athlete_id", "athlete", "athlete_services"]
  
  type = fields.String(required=True, validate=validate.Length(min=3, max=14))
  manifacture = fields.String(required=True, validate=validate.Length(min=2, max=24))
  model = fields.String(required=True, validate=validate.Length(min=2, max=25))
  year = fields.Integer(required=True, validate=validate.Range(min=1, max=2100))
  length = fields.String(required=True, validate=validate.Length(min=1, max=10))
  width = fields.String(required=True, validate=validate.Length(min=1, max=10))
  athlete_id = fields.Integer(required=True)
  athlete = fields.Nested("AthleteSchema", only=("name", "age", "height", "weight", "gender", "stance", "discipline", "profile_picture", "boot_size", "coaches_id"), dump_only=True)
  athlete_services = fields.List(fields.Nested("AthleteServiceSchema", only=("discipline", "notes", "technician_notes", "reviews", "services", "created_at", "updated_at"), dump_only=True))
  