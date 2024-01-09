from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class Service(db.Model, SerializerMixin):
  __tablename__ = 'services'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  description = db.Column(db.String)
  price = db.Column(db.Float)
  average_turn_around = db.Column(db.String)
  image = db.Column(db.String)
  is_available = db.Column(db.String)
  
  athlete_services = db.relationship("AthleteService", back_populates="services") 
  
  @validates("name")
  def validate_name(self, _, value):
      if not value:
        raise AssertionError("Athlete name is required")
      elif not isinstance(value, str):
        raise Exception('Name must be a string.')
      elif len(value) < 2:
        raise ValueError("Name must be more than 2 characters")
      elif len(value) > 25:
        raise ValueError("Name must be less than 22 characters")
      return value
    
  @validates("description")
  def validate_description(self, _, value):
      if not isinstance(value, str):
        raise Exception('Description must be a string.')
      elif len(value) < 5:
        raise ValueError("Description must be more than 5 characters")
      elif len(value) >= 250:
        raise ValueError("Description must be less than 250 characters")
      return value
    
  @validates("price")
  def validate_price(self, _, value):
    if not value:
      raise AssertionError("Price is required")
    elif not isinstance(value, float):
      raise Exception('Price must be a float.')
    elif value < 50.0:
      raise ValueError("Price must be more than 50.0")
    elif value > 300.0:
      raise ValueError("Price must be less than 300.0")
    return value
  
  @validates("is_available")
  def validate_is_available(self, _, value):
      if not isinstance(value, bool):
        raise Exception('Availablity must be boolean.')
      return value
    
  @validates("average_turn_around")
  def validate_average_turn_around(self, _, value):
      if not value:
        raise AssertionError("Turn around time is required")
      elif not isinstance(value, str):
        raise Exception('Turn around time must be a string.')
      elif len(value) < 2:
        raise ValueError("Turn around time must be more than 2 characters")
      elif len(value) > 25:
        raise ValueError("Turn around time must be less than 22 characters")
      return value
  
  def __repr__(self):
        return f"Service: #{self.id}/{self.name}"