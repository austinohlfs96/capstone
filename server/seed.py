#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models.coaches import db, Coach
from models.athletes import db, Athlete
from models.equipment import db, Equipment
from models.appointments import db, Appointment
from models.athlete_services import db, AthleteService
from models.services import db, Service

if __name__ == '__main__':
    fake = Faker()
    
    def seed_data():
        data = []
#  ________________________________________Coaches____________________________________ 
        coach1 = Coach(
            name = 'Robert',
            email = 'robert@fis.com',
            _password_hash = 'password',
            profile_picture = 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            team = 'K2',
            bio = "Educated, with a passion for pushing boundaries in both life and learning. I'm an avid rock climber who loves the thrill of scaling new heights. My goals include publishing groundbreaking research and exploring the world's wonders. Whether it's a cozy night in with a good book or an adrenaline-fueled outdoor adventure, I'm game. Seeking someone who appreciates intellectual conversations and isn't afraid to join me on spontaneous escapades.",
            is_member = False
        )
        
        data.append(coach1)
        
        coach1 = Coach(
            name = 'James',
            email = 'james@fis.com',
            _password_hash = 'password',
            profile_picture = 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            team = 'Burton',
            bio = "Educated, with a passion for pushing boundaries in both life and learning. I'm an avid rock climber who loves the thrill of scaling new heights. My goals include publishing groundbreaking research and exploring the world's wonders. Whether it's a cozy night in with a good book or an adrenaline-fueled outdoor adventure, I'm game. Seeking someone who appreciates intellectual conversations and isn't afraid to join me on spontaneous escapades.",
            is_member = False
        )
        
        data.append(coach1)
#  ________________________________________Athletes____________________________________       
        athlete1 = Athlete(
            name = 'Tom',
            age = 24,
            height = "5'9",
            weight = "145lbs",
            gender = "male",
            stance = "goofy",
            boot_size = 9,
            discipline = "halfpipe",
            coaches_id = 1
            
        )
        data.append(athlete1)
        
        athlete2 = Athlete(
            name = 'Mark',
            age = 25,
            height = "5'11",
            weight = "155lbs",
            gender = "male",
            stance = "goofy",
            boot_size = 10,
            discipline = "Boarder-cross, slope-style",
            coaches_id = 1
            
        )
        data.append(athlete2)
        
        athlete3 = Athlete(
            name = 'Sam',
            age = 19,
            height = "5'6",
            weight = "115lbs",
            gender = "female",
            stance = "regular",
            boot_size = 8,
            discipline = "big-mountain",
            coaches_id = 1
            
        )
        data.append(athlete3)
        
        athlete4 = Athlete(
          name = 'Alex',
          age = 22,
          height = "6'0",
          weight = "145lbs",
          gender = "male",
          stance = "goofy",
          boot_size = 8,
          discipline = "halfpipe",
          coaches_id = 2
            
        )
        data.append(athlete4)
        
        athlete5 = Athlete(
            name = 'Pat',
            age = 25,
            height = "5'11",
            weight = "155lbs",
            gender = "male",
            stance = "goofy",
            boot_size = 8,
            discipline = "Boarder-cross, slope-style",
            coaches_id = 2
            
        )
        data.append(athlete5)
        
        athlete6 = Athlete(
            name = 'Kat',
            age = 19,
            height = "5'6",
            weight = "115lbs",
            gender = "female",
            stance = "regular",
            boot_size = 8,
            discipline = "Slope-style",
            coaches_id = 2
            
        )
        data.append(athlete6)
#  ________________________________________Equipment____________________________________ 
        
        equipment1 = Equipment(
            type = 'Snowboard',
            manifacture = "Burton",
            model = "Custom",
            year = 2022,
            length = 155.0,
            width = 26.5,
            athlete_id = 1
            
        )
        data.append(equipment1)
        
        equipment2 = Equipment(
            type = 'Snowboard',
            manifacture = "NeverSummer",
            model = "Proto",
            year = 2022,
            length = 160.0,
            width = 28.5,
            athlete_id = 2
            
        )
        data.append(equipment2)
        
        equipment3 = Equipment(
            type = 'ski',
            manifacture = "K2",
            model = "Mindbender",
            year = 2022,
            length = 182.5,
            width = 100.5,
            athlete_id = 4
            
        )
        data.append(equipment3)
        
#  ________________________________________Appt_____________________________

        appointment3 = Appointment(
            coaches_id = 1,
            pickup_location = "Coppper",
            dropoff_location = "Copper",
            booking_time = "12/12/24",
        )
        data.append(appointment3)

#  ________________________________________athlete_services_____________________________

        athlete_service1 = AthleteService(
            appointment_id = 1,
            athlete_id = 1,
            equipment_id = 1,
            service_id = 4,
            discipline = "halfpipe",
            notes = "Need fast base and sharp edges for icy halfpipe",
            technician_notes = "Extra hard base wax and waxed for colder temps to handle the friction from the ice. One degree edges to grip the walls of the pipe",
            reviews = "This tune was wicked fast!",
        )
        data.append(athlete_service1)
        
        athlete_service2 = AthleteService(
            appointment_id = 1,
            athlete_id = 2,
            equipment_id = 2,
            service_id = 4,
            discipline = "slope",
            notes = "soft edges for rails going to be riding Copper for dew tour on the 15th",
            technician_notes = "board looks good base bevel set to 2 degree for jibbing rails ",
            reviews = "The tune rocked! I took 1st place!!!",
        )
        data.append(athlete_service2)
        
#  ________________________________________Services_____________________________
        
        service1 = Service(
            name='Wax',
            description="Three layer swix hot wax for base durability and top speed",
            price=75.00,
            average_turn_around="24 hours",
            is_available=True,
        )
        data.append(service1)

        service2 = Service(
            name='Edge/Wax',
            description="Side and base edge bevel and hand sharpened, and three layer swix wax",
            price=100.00,
            average_turn_around="24 hours",
            is_available=True,
        )
        data.append(service2)

        service3 = Service(
            name='Machine Base Grind',
            description="Flatten the base and adds structure to reduce suction and friction, also allows the base to absorb wax better for more longevity from your wax",
            price=150.00,
            average_turn_around="24 hours",
            is_available=True,
        )
        data.append(service3)

        service4 = Service(
            name='Competition Tune',
            description="Base grind and redress the structure, side and base edge hand sharpen, and 10 layer hot wax with overlays for extreme longevity and unmatched top speeds",
            price=200.00,
            average_turn_around="4 days",
            is_available=True,
        )
        data.append(service4)

        
        db.session.add_all(data)
        db.session.commit()

    with app.app_context():
        print("Starting seed...")
        # Seed code goes here
        seed_data()