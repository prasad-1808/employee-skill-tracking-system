import requests
from faker import Faker

# Initialize Faker instance
fake = Faker()

# URL of the registration page
url = "http://localhost:5000/api/admin/register"

# Create the body for the request
employee_data = {
    "AdminID": "JMDAdmin101",
    "AdminEmail": "admin@jmangroup.com",
    "AdminName": "Admin101",
    "AdminPassword": "admin123",
}

# Send POST request to register the employee
response = requests.post(url, json=employee_data)

print("Admin Added Successfully")
