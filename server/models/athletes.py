from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from models.coaches import Coach


from config import db


class Athlete(db.Model, SerializerMixin):
  __tablename__ = 'athletes'
  
  id = db.Column(db.Integer, primary_key=True) 
  name = db.Column(db.String, nullable=False)
  age = db.Column(db.Integer, nullable=False)
  height = db.Column(db.String, nullable=False)
  weight = db.Column(db.String, nullable=False)
  gender = db.Column(db.String, nullable=True)
  stance= db.Column(db.String, nullable=True)
  boot_size = db.Column(db.Integer, nullable=False)
  discipline = db.Column(db.String, nullable=False)
  
  profile_picture = db.Column(db.String, nullable=True)
  coaches_id = db.Column(db.Integer, db.ForeignKey('coaches.id'))
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())
  
  equipment = db.relationship("Equipment", back_populates="athletes")
  coaches = db.relationship("Coach", back_populates="athletes")
  athlete_services = db.relationship("AthleteService", back_populates="athletes") 
  
  # serialize_rules = ("-coaches.athletes", "-athlete_services.athletes")
  
  # serialize_only = ("id", "name", "age", "height", "weight", "gender", "stance", "discipline", "profile_picture", "boot_size", "coaches_id", "equipment")
  
  @validates("name")
  def validate_name(self, _, value):
      if not value:
        raise AssertionError("Athlete name is required")
      elif not isinstance(value, str):
        raise Exception('Name must be a string.')
      elif len(value) < 2:
        raise ValueError("Name must be more than 2 characters")
      elif len(value) >= 22:
        raise ValueError("Name must be less than 22 characters")
      return value
    
  @validates("age")
  def validate_age(self, _, value):
      if not value:
        raise AssertionError("Athlete age is required")
      elif not isinstance(value, int):
        raise Exception('Age must be a integer.')
      elif value < 1:
        raise ValueError("Age must be atleast 1 characters")
      elif value > 100:
        raise ValueError("Age cannot be more than 3 characters")
      return value
    
  @validates("height")
  def validate_height(self, _, value):
      if not value:
        raise AssertionError("Athlete height is required")
      elif not isinstance(value, str):
        raise Exception('Height must be a string.')
      elif len(value) < 3:
        raise ValueError("Height must be atleast 3 characters")
      elif len(value) > 15:
        raise ValueError("Height cannot be more than 15 characters")
      return value
    
  @validates("weight")
  def validate_weight(self, _, value):
      if not value:
        raise AssertionError("Athlete weight is required")
      elif not isinstance(value, str):
            raise ValueError('Weight must be a string.')
      elif len(value) < 2 or len(value) > 15:
          raise ValueError("Weight size must be between 2 and 15 characters")
      return value
  
  @validates("boot_size")
  def validate_boot_size(self, _, value):
      if not value:
        raise AssertionError("Athlete boot size is required")
      elif not isinstance(value, int):
        raise Exception('Boot size must be a ingeter.')
      elif value < 1:
        raise ValueError("Boot size must be atleast 2 characters")
      elif value > 15:
        raise ValueError("Boot size cannot be more than 10 characters")
      return value
    
  @validates("gender")
  def validate_gender(self, _, value):
        if not isinstance(value, str):
            raise ValueError('Gender must be a string.')
        elif len(value) < 2 or len(value) > 15:
            raise ValueError("Gender size must be between 2 and 15 characters")
        return value
    
  @validates("stance")
  def validate_stance(self, _, value):
      if not isinstance(value, str):
            raise ValueError('Stance must be a string.')
      elif len(value) < 2 or len(value) > 15:
          raise ValueError("Stance size must be between 2 and 15 characters")
      return value
  
  @validates("discipline")
  def validate_discipline(self, _, value):
      if not value:
        raise AssertionError("Athlete discipline is required")
      elif not isinstance(value, str):
            raise ValueError('Gender must be a string.')
      elif len(value) < 2 or len(value) > 40:
          raise ValueError("Gender size must be between 2 and 15 characters")
      return value
    
  @validates("coaches_id")
  def validate_coaches_id(self, _, value):
    if not value:
      raise AssertionError("Coaches id is required")
    return value
  
  def __repr__(self):
        return f"Athlete #{self.id}:{self.name}"