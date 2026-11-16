
from ai_module.src.classifier import classify_incident
from ai_module.src.recommendations import get_recommendations
from ai_module.src.risk_assessor import assess_risk


def assess_incident(description: str) -> dict:
    """Classify an incident, assess preliminary risk and return guidance."""

    classification = classify_incident(description)
    category = classification["category"]

    recommendations = get_recommendations(category)
    risk_level = assess_risk(description, category)

    return {
        "incident_category": category,
        "matched_keywords": classification.get("matched_keywords", []),
        "classification_needs_review": classification.get("needs_review", True),
        "risk_level": risk_level,
        "immediate_actions": recommendations["immediate_actions"],
        "follow_up_actions": recommendations["follow_up_actions"],
        "needs_review": (
            classification.get("needs_review", True)
            or recommendations.get("needs_review", False)
            or risk_level == "unassessed"
        )
    }
