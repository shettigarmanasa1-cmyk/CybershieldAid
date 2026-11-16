
import re

# CyberFirstAid incident categories and their matching keywords.
CATEGORY_KEYWORDS = {
    "financial_fraud": [
        "money transferred", "money deducted", "upi", "otp",
        "bank", "debit card", "credit card", "unauthorized transaction",
        "payment fraud", "refund scam", "financial fraud"
    ],
    "phishing": [
        "phishing", "suspicious link", "fake website", "fake login",
        "clicked a link", "malicious link", "fake email",
        "fake sms", "login page"
    ],
    "social_media_hacking": [
        "instagram", "facebook", "social media", "social account",
        "account hacked", "account taken over", "profile hacked",
        "logged out of my account"
    ],
    "email_compromise": [
        "email hacked", "email account", "gmail account",
        "email password", "mailbox", "inbox hacked",
        "unauthorized email access"
    ],
    "identity_theft": [
        "identity theft", "aadhaar", "pan card",
        "personal details stolen", "identity stolen",
        "identity misused", "impersonation"
    ],
    "online_harassment": [
        "online harassment", "cyberbullying", "threatening messages",
        "abusive messages", "online threats", "blackmail",
        "stalking", "harassment"
    ],
    "lost_stolen_devices": [
        "phone lost", "phone stolen", "mobile stolen",
        "laptop stolen", "device lost", "device stolen",
        "lost my phone", "stolen device"
    ]
}


def classify_incident(description: str) -> dict:
    """
    Identify the most likely cyber incident category
    using keyword matching.

    This is a basic prototype classifier, not a trained ML model.
    """

    if not isinstance(description, str) or not description.strip():
        return {
            "category": "unknown",
            "matched_keywords": [],
            "needs_review": True
        }

    text = description.lower()
    scores = {}
    matched = {}

    for category, keywords in CATEGORY_KEYWORDS.items():
        found = []

        for keyword in keywords:
            pattern = r"(?<!\w)" + re.escape(keyword) + r"(?!\w)"

            if re.search(pattern, text):
                found.append(keyword)

        scores[category] = len(found)
        matched[category] = found

    best_category = max(scores, key=scores.get)
    best_score = scores[best_category]

    if best_score == 0:
        return {
            "category": "unknown",
            "matched_keywords": [],
            "needs_review": True
        }

    # Flag equal scores for human review.
    tied_categories = [
        category for category, score in scores.items()
        if score == best_score
    ]

    return {
        "category": best_category,
        "matched_keywords": matched[best_category],
        "needs_review": len(tied_categories) > 1,
        "score": best_score
    }
