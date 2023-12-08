from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from models.athletes import Athlete
from models.services import Service
from models.equipment import Equipment
from models.appointments import Appointment

from config import db

class AthleteService(db.Model, SerializerMixin):
  __tablename__ = 'athlete_services'
  id = db.Column(db.Integer, primary_key=True)
  discipline = db.Column(db.String, nullable=False)
  notes = db.Column(db.String, nullable=True)
  technician_notes = db.Column(db.String, nullable=True)
  reviews = db.Column(db.String, nullable=True)
  service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
  athlete_id = db.Column(db.Integer, db.ForeignKey('athletes.id'))
  equipment_id = db.Column(db.Integer, db.ForeignKey('equipment.id'))
  appointment_id = db.Column(db.Integer, db.ForeignKey('appointments.id'))
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now()) 
  
  services = db.relationship("Service", back_populates="athlete_services")
  athletes = db.relationship("Athlete", back_populates="athlete_services")
  equipment = db.relationship("Equipment", back_populates="athlete_services")
  appointment = db.relationship("Appointment", back_populates="athlete_services")
  
  # serialize_rules = ("-services.athlete_services", "-athletes.athlete_services", "-equipment.athlete_services", "-appointment.athlete_services")
  
  @validates("discipline")
  def validate_discipline(self, _, value):
      if not value:
        raise AssertionError("Athlete discipline is required")
      elif not isinstance(value, str):
        raise Exception('Disipline must be a string.')
      elif len(value) < 2:
        raise ValueError("Disipline size must be atleast 2 characters")
      elif len(value) > 40:
        raise ValueError("Disipline size cannot be more than 40 characters")
      return value
  
  @validates("notes")
  def validate_notes(self, _, value):
      if not isinstance(value, str):
        raise Exception('Notes must be a string.')
      elif len(value) < 0:
        raise ValueError("Notes must be more than 5 characters")
      elif len(value) >= 500:
        raise ValueError("Notes must be less than 250 characters")
      return value
    
  @validates("technician_notes")
  def validate_technician_notes(self, _, value):
      if not isinstance(value, str):
        raise Exception('Technician notes must be a string.')
      elif len(value) < 0:
        raise ValueError("Technician notes must be more than 5 characters")
      elif len(value) >= 500:
        raise ValueError("Technician notes must be less than 250 characters")
      return value
    
  @validates("reviews")
  def validate_reviews(self, _, value):
      if not isinstance(value, str):
        raise Exception('Reviews must be a string.')
      elif len(value) < 0:
        raise ValueError("Reviews must be more than 5 characters")
      elif len(value) >= 500:
        raise ValueError("Reviews must be less than 250 characters")
      return value
  
  @validates("athlete_id")
  def validate_athlete_id(self, _, value):
    if not value:
      raise AssertionError("Athlete id is required")
    return value
  
  @validates("service_id")
  def validate_service_id(self, _, value):
    if not value:
      raise AssertionError("Service id is required")
    return value
  
  @validates("equipment_id")
  def validate_equipment_id(self, _, value):
    if not value:
      raise AssertionError("Equipment id is required")
    return value
  
  @validates("appointment_id")
  def validate_appointment_id(self, _, value):
    if not value:
      raise AssertionError("Appointment id is required")
    return value
  
  def __repr__(self):
        return f"AthleteService: #{self.id}" 