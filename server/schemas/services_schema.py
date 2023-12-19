from marshmallow import fields, validate
from config import ma
from models.services import Service

class ServiceSchema(ma.SQLAlchemySchema):
  class Meta:
    model = Service
    load_instance = True
    fields = ["id", "name", "description", "price", "average_turn_around", "is_available", "image"]
  id = fields.Integer()
  name = fields.String(required=True, validate=validate.Length(min=2, max=25))
  description = fields.String(required=True, validate=validate.Length(min=5, max=250))
  price = fields.Float(required=True, validate=validate.Range(min=0.0, max=2000.0))
  average_turn_around = fields.String(required=True, validate=validate.Length(min=2, max=25))
  is_available = fields.Boolean(required=False)