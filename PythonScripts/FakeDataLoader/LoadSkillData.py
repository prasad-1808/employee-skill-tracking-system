import random
import requests

# API endpoint to add a skill
API_URL = "http://your-api-url.com/skills"  # Replace with your actual API URL

# Bearer token
TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZG1pbklEIjoiSk1EQWRtaW4xMDEiLCJpYXQiOjE3MjgyODg2MzYsImV4cCI6MTcyODI5MjIzNn0.jniT3b0GmWQNWDilgvw5i8fL8b34JCqPW9CeCYiziZs"

# List of employees (from JMD301 to JMD320)
employee_ids = [f"JMD{str(i).zfill(3)}" for i in range(301, 321)]

# List of course IDs (from 31 to 42)
course_ids = list(range(31, 43))

# Proficiency levels and skill types
proficiencies = ["Basic", "Intermediate", "Advanced"]
skill_types = ["CERTIFICATE", "ASSESSMENT"]

# Headers with Bearer token
headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}


# Function to add a skill for an employee
def add_skill(employee_id, course_id):
    skill_type = random.choice(skill_types)

    # Data for the skill
    skill_data = {
        "EmployeeID": employee_id,
        "CourseID": course_id,
        "Proficiency": random.choice(proficiencies),
        "SkillType": skill_type,
        "Verified": False,
    }

    # Add certificate or score based on skill type
    if skill_type == "CERTIFICATE":
        skill_data["CertificateLink"] = (
            f"http://example.com/certificate/{employee_id}/{course_id}"
        )
    else:
        skill_data["ScoreObtained"] = random.randint(50, 100)

    # Send the request to the API with Bearer token
    response = requests.post(API_URL, json=skill_data, headers=headers)

    if response.status_code == 201:
        print(f"Skill added for {employee_id}: Course {course_id}")
    else:
        print(f"Failed to add skill for {employee_id}: {response.json()}")


# Main function to assign 3-5 random skills per employee
def assign_skills_to_employees():
    for employee_id in employee_ids:
        # Select a random number of skills to assign (between 3 and 5)
        num_skills = random.randint(3, 5)

        # Randomly pick unique course IDs for this employee
        assigned_courses = random.sample(course_ids, num_skills)

        for course_id in assigned_courses:
            add_skill(employee_id, course_id)


if __name__ == "__main__":
    assign_skills_to_employees()
