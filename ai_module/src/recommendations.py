
RECOMMENDATIONS = {
    "financial_fraud": {
        "immediate_actions": [
            "Contact your bank or payment provider immediately through its official app or verified phone number.",
            "Ask the bank to secure the affected account, card or payment service.",
            "Report unauthorised transactions through the bank's official process.",
            "Never share another OTP, UPI PIN or password."
        ],
        "follow_up_actions": [
            "Save transaction IDs, messages, receipts and relevant screenshots.",
            "Report the incident through the appropriate official cybercrime channel.",
            "Monitor your bank account for further unauthorised transactions."
        ]
    },

    "phishing": {
        "immediate_actions": [
            "Stop interacting with the suspicious website, message or link.",
            "Do not enter any more passwords, OTPs or personal information.",
            "If you entered your password, change it using the official website or app.",
            "Contact your bank if you shared financial information."
        ],
        "follow_up_actions": [
            "Save the suspicious message, email or website details as evidence.",
            "Enable multi-factor authentication on affected accounts.",
            "Report the suspicious message or website through the appropriate official channel."
        ]
    },

    "social_media_hacking": {
        "immediate_actions": [
            "Use the platform's official account recovery process.",
            "If you can still access the account, change its password immediately.",
            "Secure the linked email account and enable multi-factor authentication.",
            "Inform your contacts if someone may be misusing your account."
        ],
        "follow_up_actions": [
            "Save screenshots of suspicious activity and recovery messages.",
            "Review active sessions and remove unfamiliar devices.",
            "Check account recovery details and privacy settings."
        ]
    },

    "email_compromise": {
        "immediate_actions": [
            "Change your email password using the official email service.",
            "Sign out of unfamiliar active sessions.",
            "Enable multi-factor authentication.",
            "Check whether suspicious messages were sent from your account."
        ],
        "follow_up_actions": [
            "Review email forwarding rules and recovery details.",
            "Check recent account activity.",
            "Warn contacts about suspicious emails sent from your account.",
            "Secure other accounts that use the compromised email."
        ]
    },

    "identity_theft": {
        "immediate_actions": [
            "Preserve messages and documents related to the suspected identity misuse.",
            "Contact your bank or affected service provider if financial details are involved.",
            "Use official government or service-provider channels for assistance.",
            "Do not share additional identity documents or personal details with unknown people."
        ],
        "follow_up_actions": [
            "Monitor your financial and online accounts for suspicious activity.",
            "Keep records of complaints and reference numbers.",
            "Follow up through the appropriate official support channel."
        ]
    },

    "online_harassment": {
        "immediate_actions": [
            "Avoid responding to threatening messages if doing so may increase the risk.",
            "Save screenshots, messages and relevant account details.",
            "Block or report the account if it is safe to do so.",
            "If there is an immediate physical threat, contact local emergency services."
        ],
        "follow_up_actions": [
            "Maintain a record of incidents and evidence.",
            "Review account privacy and security settings.",
            "Report serious threats through the appropriate official channel."
        ]
    },

    "lost_stolen_devices": {
        "immediate_actions": [
            "Use the device's official service to locate, lock or erase it if available.",
            "Contact your mobile operator to block the SIM if necessary.",
            "Change important account passwords using a trusted device.",
            "Contact your bank if banking or payment information may be exposed."
        ],
        "follow_up_actions": [
            "Preserve the device's identifying details and purchase records.",
            "Report the loss or theft through the appropriate official channel.",
            "Monitor important accounts for suspicious activity."
        ]
    }
}


def get_recommendations(category: str) -> dict:
    """Return safety recommendations for a recognised incident category."""

    if not isinstance(category, str):
        category = ""

    category = category.strip().lower()

    if category not in RECOMMENDATIONS:
        return {
            "category": "unknown",
            "immediate_actions": [
                "Avoid sharing passwords, OTPs or financial details.",
                "Preserve relevant evidence.",
                "Seek guidance through an appropriate verified support channel."
            ],
            "follow_up_actions": [
                "Provide a clearer incident description for assessment."
            ],
            "needs_review": True
        }

    return {
        "category": category,
        "immediate_actions": RECOMMENDATIONS[category]["immediate_actions"],
        "follow_up_actions": RECOMMENDATIONS[category]["follow_up_actions"],
        "needs_review": False
    }
