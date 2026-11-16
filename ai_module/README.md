# CyberFirstAid – AI Module Integration Guide

## 1. Purpose

The AI module analyses a user's cyber incident description and returns:

- Incident category
- Matched keywords
- Preliminary risk level
- Immediate safety actions
- Follow-up actions
- Review requirement

The current implementation uses rule-based keyword matching and predefined recommendations. It is not a trained machine-learning model.

## 2. Import statement

```python
from ai_module.src import assess_incident
```

## 3. Function input

The function accepts one string:

```python
description = "Someone stole money from my bank account after I shared an OTP"
```

## 4. Function call

```python
result = assess_incident(description)
```

## 5. Output format

The function returns a Python dictionary:

```python
{
    "incident_category": "financial_fraud",
    "matched_keywords": ["otp", "bank"],
    "classification_needs_review": False,
    "risk_level": "critical",
    "immediate_actions": [
        "Contact your bank or payment provider immediately through its official app or verified phone number."
    ],
    "follow_up_actions": [
        "Save transaction IDs, messages, receipts and relevant screenshots."
    ],
    "needs_review": False
}
```

The actual action lists may contain multiple recommendations.

## 6. Supported incident categories

- financial_fraud
- phishing
- social_media_hacking
- email_compromise
- identity_theft
- online_harassment
- lost_stolen_devices
- unknown

## 7. Risk levels

- critical
- high
- medium
- unassessed

Risk levels are preliminary rule-based assessments and should not be treated as verified incident severity.

## 8. Integration example

```python
from ai_module.src import assess_incident

def analyse_cyber_incident(description: str):
    result = assess_incident(description)
    return result
```

## 9. Important integration notes

- Pass the user's incident description as a string.
- Return the assessment dictionary to the frontend through the backend API.
- Display immediate actions clearly to the user.
- Display follow-up actions separately.
- If `needs_review` is `True`, indicate that the assessment needs further review.
- Do not expose API keys, passwords, OTPs or other secrets.
- Keep emergency guidance available without depending on an external AI service.
- The backend should validate the input before calling the AI module.

## 10. Current testing status

All five automated assessment tests passed successfully.

Command:

```powershell
python -m unittest discover -s ai_module\tests -v
```