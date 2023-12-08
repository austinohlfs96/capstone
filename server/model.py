from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db


# Models go here!
class Coach(db.Model, SerializerMixin):
  __tablename__ = 'coaches'
  
  id = db.Column(db.Integer, primary_key=True) 
  email = db.Column(db.String, nullable=False)
  _password_hash = db.Column(db.String, nullable=False)
  name = db.Column(db.String, nullable=False)
  bio = db.Column(db.String)
  team = db.Column(db.String, nullable=True)
  profile_picture = db.Column(db.String)
  is_member = db.Column(db.Boolean) 
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())
  
  athletes = db.relationship('Athlete', back_populates='coaches')
  appointments = db.relationship('Appointment', back_populates='coaches')

  def __repr__(self):
        return f"Coach #{self.id}:{self.name}"
      
class Athlete(db.Model, SerializerMixin):
  __tablename__ = 'athletes'
  
  id = db.Column(db.Integer, primary_key=True) 
  name = db.Column(db.String, nullable=False)
  age = db.Column(db.Integer)
  height = db.Column(db.String)
  weight = db.column(db.String)
  gender = db.column(db.String)
  stance= db.column(db.String)
  boot_size = db.column(db.String)
  discipline = db.column(db.String)
  
  profile_picture = db.Column(db.String)
  coaches_id = db.Column(db.Integer, db.ForeignKey('coaches.id'))
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())
  
  equipment = db.relationship("Equipment", back_populates="athletes")
  coaches = db.relationship("Coach", back_populates="athletes")
  athlete_services = db.relationship("AthleteService", back_populates="athletes") 
  
  def __repr__(self):
        return f"Athlete #{self.id}:{self.name}"
  
class Equipment(db.Model, SerializerMixin):
  __tablename__ = 'equipment'
  
  id = db.Column(db.Integer, primary_key=True) 
  type = db.Column(db.String, nullable=False)
  manifacture = db.Column(db.String)
  model = db.Column(db.String)
  year = db.column(db.Integer)
  length = db.column(db.Float)
  width = db.column(db.Float)
  boot_size = db.column(db.String)
  discipline = db.column(db.String)
  athlete_id = db.Column(db.Integer, db.ForeignKey("athletes.id"))
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now())
  
  
  athletes = db.relationship("Athlete", back_populates="equipment")
  athlete_services = db.relationship("AthleteService", back_populates="equipment") 

  def __repr__(self):
        return f"Equipment {self.type}/{self.manifacture}:{self.model}"
      
class Appointment(db.Model, SerializerMixin):
  __tablename__ = 'appointments'
  id = db.Column(db.Integer, primary_key=True)
  pickup_location = db.Column(db.String)
  dropoff_location = db.Column(db.String)
  booking_time = db.Column(db.String)
  coaches_id = db.Column(db.Integer, db.ForeignKey('coaches.id'))
  created_at = db.Column(db.DateTime, server_default=func.now())
  updated_at = db.Column(db.DateTime, onupdate=func.now()) 
  
  coaches = db.relationship("Coach", back_populates="appointments")
  athlete_services = db.relationship("AthleteService", back_populates="appointment") 
  
  
  def __repr__(self):
        return f"Appointment: {self.id}"
      
class AthleteService(db.Model, SerializerMixin):
  __tablename__ = 'athlete_services'
  id = db.Column(db.Integer, primary_key=True)
  discipline = db.Column(db.String)
  notes = db.Column(db.String)
  technician_notes = db.Column(db.String)
  reviews = db.Column(db.String)
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
  
  def __repr__(self):
        return f"AthleteService: #{self.id}" 
      
class Service(db.Model, SerializerMixin):
  __tablename__ = 'services'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  description = db.Column(db.String)
  price = db.Column(db.Float)
  average_turn_around = db.Column(db.String)
  is_available = db.Column(db.String)
  
  athlete_services = db.relationship("AthleteService", back_populates="services") 
  
  def __repr__(self):
        return f"Service: #{self.id}/{self.name}"
      
