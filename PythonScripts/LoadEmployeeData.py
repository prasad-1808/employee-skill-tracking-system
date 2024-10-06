import requests
from faker import Faker

# Initialize Faker instance
fake = Faker()

# URL of the registration page
url = "http://localhost:5000/api/employees/register"

# Designation and YearOfJoining options
designations = ['Software Engineer', 'Solution Enabler', 'IT Support']
id=300
years_of_joining = [2020, 2021, 2022, 2023, 2024]

# Create 20 users
for i in range(1, 21):
    employee_id = 'JMD'+str(id+i)
    firstname = fake.first_name()
    lastname = fake.last_name()
    designation = fake.random_element(designations)  # Random designation from the list
    year_of_joining = fake.random_element(years_of_joining)  # Random year of joining
    password = employee_id  # Password is the EmployeeID
    
    # Create the body for the request
    employee_data = {
        "EmployeeID": employee_id,
        "Firstname": firstname,
        "Lastname": lastname,
        "Designation": designation,
        "YearOfJoining": year_of_joining,
        "Password": password
    }
    print(employee_data)

    # Send POST request to register the employee
    response = requests.post(url, json=employee_data)

    # Print the response from the server
    print(f"Employee {employee_id} registration response: {response.status_code} - {response.text}")
