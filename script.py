#!/usr/bin/env python3
import requests
import csv

# Define the API endpoint and headers
url = "https://api.sender.net/v2/subscribers"
headers = {
    "Authorization": "ASK SHIVEN",
    "Content-Type": "application/json",
    "Accept": "application/json",
}

# Define the group ID
group_id = "axVjkz"

# List of subscribers
subscribers = [
    #Add your subscribers here in the format below
    #{"First Name": "John", "Last Name": "Doe", "Email": "johndoe@umass.edu"},
    
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