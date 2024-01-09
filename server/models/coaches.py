from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import UniqueConstraint
import re

from config import db, bcrypt

# Models go here!
class Coach(db.Model, SerializerMixin):
  __tablename__ = 'coaches'
  
  id = db.Column(db.Integer, primary_key=True) 
  email = db.Column(db.String, nullable=False, unique=True)
  _password_hash = db.Column(db.String, nullable=False)
  name = db.Column(db.String, nullable=False)
  bio = db.Column(db.String, nullable=True)
  team = db.Column(db.String, nullable=True)
  profile_picture = db.Column(db.String, nullable=True)
  is_member = db.Column(db.Boolean) 
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())
  
  athletes = db.relationship('Athlete', back_populates='coaches', cascade="all, delete-orphan")
  appointment = db.relationship('Appointment', back_populates='coaches')
  
  __table_args__ = (UniqueConstraint('email', name='_coach_email_uc'),)

  # serialize_only = ("name", "team", "athletes", "bio", "appointments")
  # serialize_rules = ("-athletes.coaches",)

  @validates('email')
  def validate_email(self, _, value):
    if not value:
      raise AssertionError("Email is required")
    elif not isinstance(value, str):
        raise Exception('Email must be a valid string.')
    elif '@' not in value:
        raise Exception('Email must contain @.')
    elif '.' not in value:
      raise Exception('Email must contain a period.')
    elif len(value) < 7:
        raise ValueError("Email must be more than 7 characters")
    elif len(value) >= 100:
      raise ValueError("Name must be less than 100 characters")
    return value
  
  
  @validates("name")
  def validate_name(self, _, value):
      if not value:
        raise AssertionError("Athlete name is required")
      elif not isinstance(value, str):
        raise Exception('Name must be a string.')
      elif len(value.strip()) < 2:
        raise ValueError("Name must be more than 2 characters")
      elif len(value.strip()) >= 22:
        raise ValueError("Name must be less than 22 characters")
      return value
    
  @validates("bio")
  def validate_bio(self, _, value):
      if not isinstance(value, str):
        raise Exception('Bio must be a string.')
      elif len(value) < 5:
        raise ValueError("Bio must be more than 5 characters")
      elif len(value) >= 500:
        raise ValueError("Bio must be less than 250 characters")
      return value
    
  @hybrid_property
  def password_hash(self):
      raise AttributeError("Password hash is not readable")

  @password_hash.setter
  def password_hash(self, new_password):
      if not isinstance(new_password, str):
          raise ValueError('Password must be a string.')
      elif len(new_password) < 8:
          raise ValueError('Password must be more than 8 characters.')
      elif len(new_password) >= 100:
          raise ValueError('Password must be less than 100 characters.')
      elif not re.search(r'\d', new_password):
          raise ValueError('Password must include at least one number.')
      elif not re.search(r'[A-Z]', new_password):
          raise ValueError('Password must include at least one uppercase letter.')
      elif not re.search(r'[!@#$%^&*]', new_password):
          raise ValueError('Password must include at least one symbol (!@#$%^&*).')

      hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
      self._password_hash = hashed_password


  def authenticate(self, password_to_check):
        return bcrypt.check_password_hash(self._password_hash, password_to_check)
      
  # @validates("new_password")
  # def validate_password_hash(self, _, value):
  #     if not isinstance(value, str):
  #       raise Exception('Password must be a string.')
  #     elif len(value) < 8:
  #       raise ValueError("Password must be more than 8 characters")
  #     elif len(value) >= 100:
  #       raise ValueError("Password must be less than 100 characters")
  #     return value

  def __repr__(self):
        return f"Coach #{self.id}:{self.name}"