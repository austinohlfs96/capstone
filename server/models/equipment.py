from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from models.athletes import Athlete

from config import db

class Equipment(db.Model, SerializerMixin):
  __tablename__ = 'equipment'
  
  id = db.Column(db.Integer, primary_key=True) 
  type = db.Column(db.String, nullable=False)
  manifacture = db.Column(db.String, nullable=False)
  model = db.Column(db.String, nullable=False)
  year = db.Column(db.Integer, nullable=True)
  length = db.Column(db.String, nullable=False)
  width = db.Column(db.String, nullable=False)
  athlete_id = db.Column(db.Integer, db.ForeignKey("athletes.id"))
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())
  
  
  athletes = db.relationship("Athlete", back_populates="equipment")
  athlete_services = db.relationship("AthleteService", back_populates="equipment") 
  
  # serialize_rules = ("-athletes.equipment", "-athlete_services.equipment")
  
  # serialize_only = ("id", "type", "manifacture", "model", "year", "length", "width", "athletes", "athlete_id")
  
  @validates("type")
  def validate_type(self, _, value):
      if not value:
        raise AssertionError("Equipment type is required")
      elif not isinstance(value, str):
        raise Exception('Type must be a string.')
      elif len(value) <= 2:
        raise ValueError("Type must be more than 2 characters")
      elif len(value) >= 15:
        raise ValueError("Type must be less than 16 characters")
      return value
  
  @validates("manifacture")
  def validate_manifacture(self, _, value):
    if not value:
      raise AssertionError("Equipment manifacture is required")
    elif not isinstance(value, str):
      raise Exception('Manifacture must be a string.')
    elif len(value) < 2:
      raise ValueError("Manifacture must be more than 2 characters")
    elif len(value) >= 25:
      raise ValueError("Manifacture must be less than 25 characters")
    return value
    
  @validates("model")
  def validate_model(self, _, value):
    if not value:
      raise AssertionError("Equipment model is required")
    elif not isinstance(value, str):
      raise Exception('Model must be a string.')
    elif len(value) < 2:
      raise ValueError("Model must be more than 2 characters")
    elif len(value) > 25:
      raise ValueError("Model must be less than 25 characters")
    return value
  
  @validates("year")
  def validate_year(self, _, value):
    if not isinstance(value, int):
      raise Exception('Year must be a integer.')
    elif value <= 0:
      raise ValueError("Year must be more than 0")
    elif value > 2100:
      raise ValueError("Year must be less than 2100")
    return value
  
  @validates("length")
  def validate_lenght(self, _, value):
    if not value:
      raise AssertionError("Equipment length is required")
    elif not isinstance(value, str):
      raise Exception('Length must be a string.')
    elif len(value) < 1:
      raise ValueError("Length must be more than 50.0")
    elif len(value) > 10:
      raise ValueError("Length must be less than 300.0")
    return value
  
  @validates("width")
  def validate_width(self, _, value):
    if not isinstance(value, str):
      raise Exception('Width must be a string.')
    elif len(value) < 1:
      raise ValueError("Width must be more than 0.0")
    elif len(value) > 10:
      raise ValueError("Width must be less than 400.0")
    return value
  
  @validates("athlete_id")
  def validate_athlete_id(self, _, value):
    if not value:
      raise AssertionError("Athlete id is required")
    return value
    

  def __repr__(self):
        return f"Equipment {self.type}/{self.manifacture}:{self.model}"