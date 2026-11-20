
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON
from datetime import datetime, timezone

from database import Base



class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(Text, nullable=False)
    incident_category = Column(String, nullable=False)
    risk_level = Column(String, nullable=False)

    matched_keywords = Column(JSON)
    immediate_actions = Column(JSON)
    follow_up_actions = Column(JSON)
    
    status = Column(String, default="active", nullable=False)
    needs_review = Column(Boolean, default=False, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )
