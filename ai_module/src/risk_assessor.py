
def assess_risk(description: str, category: str) -> str:
    """Assign a preliminary risk level using transparent rules."""

    if not isinstance(description, str) or not description.strip():
        return "unassessed"

    text = description.lower()

    critical_keywords = [
        "money transferred",
        "money deducted",
        "unauthorized transaction",
        "unauthorised transaction",
        "shared an otp",
        "shared my otp",
        "entered my upi pin",
        "upi pin",
        "bank account drained",
        "physical threat"
    ]

    high_keywords = [
    "account hacked",
    "account compromised",
    "hacked my instagram account",
    "hacked my social media account",
    "someone hacked my",
    "password changed",
    "identity stolen",
    "identity theft",
    "blackmail",
    "phone stolen",
    "device stolen",
    "email hacked"
]

    if any(keyword in text for keyword in critical_keywords):
        return "critical"

    if any(keyword in text for keyword in high_keywords):
        return "high"

    if category == "unknown":
        return "unassessed"

    if category in {"financial_fraud", "identity_theft", "lost_stolen_devices"}:
        return "high"

    if category in {"phishing", "online_harassment", "social_media_hacking", "email_compromise"}:
        return "medium"

    return "unassessed"
