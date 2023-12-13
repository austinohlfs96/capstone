from marshmallow import fields, validate
from config import ma
from models.athletes import Athlete
from schemas.athlete_service_schema import AthleteServiceSchema

class AthleteSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Athlete
    load_instance = True
    fields = ["id", "name", "age", "height", "weight", "gender", "stance", "discipline", "profile_picture", "boot_size", "coaches_id", "equipment", "athlete_services"]
    
  id = fields.Integer()
  name = fields.String(required=True, validate=validate.Length(min=2, max=21))
  age = fields.Integer(required=True, validate=validate.Range(min=1, max=100))
  height = fields.String(required=True, validate=validate.Length(min=3, max=15))
  weight = fields.String(required=True, validate=validate.Length(min=2, max=15))
  boot_size = fields.String(required=True, validate=validate.Length(min=2, max=15))
  gender = fields.String(required=False, validate=validate.Length(min=2, max=15))
  stance = fields.String(required=False, validate=validate.Length(min=2, max=15))
  discipline = fields.String(required=True, validate=validate.Length(min=2, max=40))
  profile_picture = fields.String(required=False)
  coaches_id_id = fields.Integer(required=True)
  equipment = fields.List(fields.Nested("EquipmentSchema", only=("id", "type", "manifacture", "model", "year", "length", "width"), dump_only=True))
  athlete_services = fields.List(fields.Nested("AthleteServiceSchema", only=("discipline", "notes", "technician_notes", "reviews", "services", "created_at", "updated_at", "equipment"), dump_only=True))