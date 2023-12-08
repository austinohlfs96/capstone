from flask import request
from flask_restful import Resource
from config import db
from models.coaches import Coach
from schemas.coaches_schema import CoachSchema

coach_schema = CoachSchema(session=db.session)
coaches_schema_schema = CoachSchema(many=True, session=db.session)


class CoachById(Resource):
    def get(self, id):
        try:
            if coach := db.session.get(Coach, id):
                return coach_schema.dump(coach)
            return {"message": "Athlete service not found"}, 404
        except Exception as e:
            return {"message": str(e)}, 500
          
    def patch(self, id):
        if coach := db.session.get(Coach, id):
            try:
                data = request.json
                coach_schema.validate(data)
                coach = coach_schema.load(data, instance=coach, partial=True)
                db.session.commit()
                return coach_schema.dump(coach)
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "Coach not found"}, 404
      
      
    def delete(self, id):
      if coach := db.session.get(Coach, id):
        try:
          db.session.delete(coach)
          db.session.commit()
          return{"message": f"Coach {id} deleted"}
        except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
      return {"message": "Coach not found"}, 404