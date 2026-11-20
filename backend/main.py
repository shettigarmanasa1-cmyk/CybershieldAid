
import sys
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

# Find the main CyberShieldAid project folder
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

# Import database tools
from database import Base, engine, SessionLocal
from models import Incident
import models

# Import Member 3's AI function
from ai_module.src import assess_incident

# Create the FastAPI application
app = FastAPI(title="CyberFirstAid Backend")

# Allow the frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


# Define the information we expect from the user

class IncidentRequest(BaseModel):
    description: str = Field(..., min_length=5, max_length=5000)

    @field_validator("description")
    @classmethod
    def validate_description(cls, value):
        value = value.strip()

        if len(value) < 10:
            raise ValueError(
                "Please provide a more detailed incident description."
            )

        if value.lower() in ["string", "test", "hello", "unknown"]:
            raise ValueError(
                "Please enter a meaningful incident description."
            )

        return value


class IncidentUpdate(BaseModel):
    description: str = Field(..., min_length=5, max_length=5000)

    @field_validator("description")
    @classmethod
    def validate_description(cls, value):
        value = value.strip()

        if len(value) < 10:
            raise ValueError(
                "Please provide a more detailed incident description."
            )

        if value.lower() in ["string", "test", "hello", "unknown"]:
            raise ValueError(
                "Please enter a meaningful incident description."
            )

        return value





# Home API
@app.get("/")
def home():
    return {"message": "Welcome to CyberFirstAid Backend!"}


# Analyse an incident and save it
@app.post("/api/assessment")
def analyse_incident(request: IncidentRequest):

    db = SessionLocal()

    try:
        result = assess_incident(request.description)

        new_incident = Incident(
            description=request.description,
            incident_category=result["incident_category"],
            risk_level=result["risk_level"],
            matched_keywords=result["matched_keywords"],
            immediate_actions=result["immediate_actions"],
            follow_up_actions=result["follow_up_actions"],
            needs_review=result["needs_review"]
        )

        db.add(new_incident)
        db.commit()
        db.refresh(new_incident)

        return {
            "incident_id": new_incident.id,
            **result
        }

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Incident assessment could not be completed."
        )

    finally:
        db.close()

# Update an existing incident
@app.put("/api/incidents/{incident_id}")
def update_incident(
    incident_id: int,
    request: IncidentUpdate
):

    db = SessionLocal()

    try:
        incident = db.query(Incident).filter(
            Incident.id == incident_id
        ).first()

        if incident is None:
            raise HTTPException(
                status_code=404,
                detail="Incident not found."
            )

        incident.description = request.description

        db.commit()
        db.refresh(incident)

        return {
            "message": "Incident updated successfully.",
            "incident_id": incident.id,
            "description": incident.description
        }

    finally:
        db.close()


# Get all previously saved incidents


# Get all previously saved incidents
@app.get("/api/incidents")
def get_incidents():

    db = SessionLocal()

    try:
        incidents = db.query(Incident).order_by(
            Incident.id.desc()
        ).all()

        return [
            {
                "incident_id": incident.id,
                "description": incident.description,
                "incident_category": incident.incident_category,
                "risk_level": incident.risk_level,
                "matched_keywords": incident.matched_keywords,
                "immediate_actions": incident.immediate_actions,
                "follow_up_actions": incident.follow_up_actions,
                "needs_review": incident.needs_review,
                "status": incident.status,
                "created_at": incident.created_at
            }
            for incident in incidents
        ]

    finally:
        db.close()


# Get one incident using its ID
@app.get("/api/incidents/{incident_id}")
def get_incident(incident_id: int):

    db = SessionLocal()

    try:
        incident = db.query(Incident).filter(
            Incident.id == incident_id
        ).first()

        if incident is None:
            raise HTTPException(
                status_code=404,
                detail="Incident not found."
            )

        return {
            "incident_id": incident.id,
            "description": incident.description,
            "incident_category": incident.incident_category,
            "risk_level": incident.risk_level,
            "matched_keywords": incident.matched_keywords,
            "immediate_actions": incident.immediate_actions,
            "follow_up_actions": incident.follow_up_actions,
            "needs_review": incident.needs_review,
            "status": incident.status,
            "created_at": incident.created_at
        }

    finally:
        db.close()


# Delete an incident using its ID
@app.delete("/api/incidents/{incident_id}")
def delete_incident(incident_id: int):

    db = SessionLocal()

    try:
        incident = db.query(Incident).filter(
            Incident.id == incident_id
        ).first()

        if incident is None:
            raise HTTPException(
                status_code=404,
                detail="Incident not found."
            )

        db.delete(incident)
        db.commit()

        return {
            "message": "Incident deleted successfully.",
            "incident_id": incident_id
        }

    finally:
        db.close()
        

# Mark an incident as resolved
@app.put("/api/incidents/{incident_id}/resolve")
def resolve_incident(incident_id: int):
    db = SessionLocal()

    try:
        incident = db.query(Incident).filter(
            Incident.id == incident_id
        ).first()

        if incident is None:
            raise HTTPException(
                status_code=404,
                detail="Incident not found."
            )

        incident.status = "resolved"
        db.commit()
        db.refresh(incident)

        return {
            "message": "Incident marked as resolved.",
            "incident_id": incident.id,
            "status": incident.status
        }

    finally:
        db.close()

