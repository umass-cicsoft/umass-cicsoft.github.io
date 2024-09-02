#!/usr/bin/env python3
import requests
import csv

# Define the API endpoint and headers
url = "https://api.sender.net/v2/subscribers"
headers = {
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmMwNTUyNDJhYmNkZTdkMjUyMDM2M2JlYzE3YjQzY2E4YTQ1OWRhNzQyMThiZDA2ZjU5NzkxOGVkMzUyZDI2MTM0YTQwODM4NjYxMWUyNjUiLCJpYXQiOiIxNzI1MzA1MjM5LjEzNjkyNiIsIm5iZiI6IjE3MjUzMDUyMzkuMTM2OTI5IiwiZXhwIjoiNDg3ODkwNTIzOS4xMzQxOTkiLCJzdWIiOiI3NTIxNjEiLCJzY29wZXMiOltdfQ.kVAitlePYLJvXO5iln-zHFPG9h3IXnru1vN5v_oH-L4DfJyBaU3QZ5903Up_jEnPT75y62XONRtYxmtPVnYdew",  # Replace [your-token] with your actual API token
    "Content-Type": "application/json",
    "Accept": "application/json",
}

# Define the group ID
group_id = "axVjkz"

# List of subscribers
subscribers = [
    {"First Name": "Arsen", "Last Name": "Sekmokas", "Email": "asekmokas@umass.edu"},
    {"First Name": "Aurum", "Last Name": "Mandal", "Email": "aurummandal@umass.edu"},
    {"First Name": "Chengwei", "Last Name": "Wang", "Email": "chengweiwang@umass.edu"},
    {"First Name": "Dhruv", "Last Name": "Rohilla", "Email": "drohilla@umass.edu"},
    {"First Name": "Dominik", "Last Name": "Stefanski", "Email": "dstefanski@umass.edu"},
    {"First Name": "Euba", "Last Name": "Tafese", "Email": "etafese@umass.edu"},
    {"First Name": "Heo", "Last Name": "Feliz", "Email": "hfeliz@umass.edu"},
    {"First Name": "Hari", "Last Name": "Umapathy", "Email": "humapathy@umass.edu"},
    {"First Name": "Ivan", "Last Name": "Romero", "Email": "iromero@umass.edu"},
    {"First Name": "J.", "Last Name": "Doe", "Email": "jdoe@umass.edu"},
    {"First Name": "Jack", "Last Name": "Forman", "Email": "jforman@umass.edu"},
    {"First Name": "John", "Last Name": "Park", "Email": "jjpark@umass.edu"},
    {"First Name": "Josh", "Last Name": "Wechlser", "Email": "jwechsler@umass.edu"},
    {"First Name": "Kyle", "Last Name": "Frassetto", "Email": "kfrassetto@umass.edu"},
    {"First Name": "Kevin", "Last Name": "Shan", "Email": "kshan@umass.edu"},
    {"First Name": "Logan", "Last Name": "Keenan", "Email": "logankeenan@umass.edu"},
    {"First Name": "Minh Tiep", "Last Name": "Nguyen", "Email": "minhtiepnguy@umass.edu"},
    {"First Name": "Mike", "Last Name": "Lachtara", "Email": "mlachtara@umass.edu"},
    {"First Name": "Mehul", "Last Name": "Patwari", "Email": "mpateari@umass.edu"},
    {"First Name": "Nicholas", "Last Name": "Belous", "Email": "nbelous@umass.edu"},
]

# Function to send subscriber data
def send_subscriber_data(subscriber):
    payload = {
        "email": subscriber["Email"],
        "firstname": subscriber["First Name"],
        "lastname": subscriber["Last Name"],
        "groups": [group_id],
        "trigger_automation": True
    }
    response = requests.post(url, headers=headers, json=payload)
    return response.json()

# Iterate over subscribers and send data
for subscriber in subscribers:
    print(f"Sending data for {subscriber['First Name']} {subscriber['Last Name']}...")
    result = send_subscriber_data(subscriber)
    print(result)