from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from models.coaches import Coach

from config import db

class Appointment(db.Model, SerializerMixin):
  __tablename__ = 'appointments'
  id = db.Column(db.Integer, primary_key=True)
  pickup_location = db.Column(db.String, nullable=False)
  dropoff_location = db.Column(db.String, nullable=False)
  booking_time = db.Column(db.String, nullable=False)
  coaches_id = db.Column(db.Integer, db.ForeignKey('coaches.id'))
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now()) 
  
  coaches = db.relationship("Coach", back_populates="appointment")
  athlete_services = db.relationship("AthleteService", back_populates="appointment", cascade="all, delete-orphan") 
  
  # serialize_rules = ("-coaches.appointments",)
  
  # serialize_only = ("id", "pickup_location", "dropoff_location", "booking_time", "coaches_id", "athlete_services")
  
  @validates("pickup_location")
  def validate_pickup_location(self, _, value):
    if not value:
      raise AssertionError("Pick up location is required")
    elif not isinstance(value, str):
      raise Exception('Pick up location must be a string.')
    elif len(value) < 2:
      raise ValueError("Pick up location must be more than 2 characters")
    return value
  
  @validates("dropoff_location")
  def validate_dropoff_location(self, _, value):
    if not value:
      raise AssertionError("Drop off location is required")
    elif not isinstance(value, str):
      raise Exception('Drop off location must be a string.')
    elif len(value) < 2:
      raise ValueError("Drop off location must be more than 2 characters")
    return value
  
  @validates("booking_time")
  def validate_booking_time(self, _, value):
    if not value:
      raise AssertionError("booking time is required")
    elif not isinstance(value, str):
      raise Exception('Booking time must be a string.')
    elif len(value) < 2:
      raise ValueError("Booking time must be more than 2 characters")
    return value
  
  @validates("coaches")
  def validate_coaches_id(self, _, value):
    if not value:
      raise AssertionError("Athlete id is required")
    return value
    
  
  def __repr__(self):
        return f"Appointment: {self.id}"