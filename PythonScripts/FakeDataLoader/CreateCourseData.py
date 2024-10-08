import requests
import random

# Course categories with prefixes and topics (as given)
course_categories = {
    "Python": {
        "prefix": "PY",
        "courses": {
            "Easy": [
                "Introduction to Python",
                "Python Basics for Beginners",
                "Python Scripting Essentials",
                "Python for Automation",
            ],
            "Medium": [
                "Python for Data Analysis",
                "Intermediate Python Programming",
                "Object-Oriented Programming with Python",
                "Python for Web Scraping",
            ],
            "Hard": [
                "Advanced Python Programming",
                "Python for Machine Learning",
                "Python for Software Design Patterns",
                "Python Performance Optimization",
            ],
        },
    },
    "Web Development": {
        "prefix": "WD",
        "courses": {
            "Easy": [
                "Basic HTML and CSS",
                "Responsive Web Design with HTML and CSS",
                "HTML5 Fundamentals",
                "Introduction to Web Design",
            ],
            "Medium": [
                "JavaScript and Front-End Development",
                "React for Beginners",
                "Intermediate CSS & Sass",
                "JavaScript: The DOM and Event Handling",
            ],
            "Hard": [
                "Full Stack Web Development",
                "Building Web Apps with Node.js and Express",
                "Advanced JavaScript Frameworks (Vue, Angular, React)",
                "Web Performance Optimization",
            ],
        },
    },
    "Data Engineering": {
        "prefix": "DE",
        "courses": {
            "Easy": [
                "Introduction to Data Pipelines",
                "Fundamentals of SQL",
                "Data Warehousing Basics",
                "Data Modeling for Beginners",
            ],
            "Medium": [
                "ETL Processes and Tools",
                "Data Integration with Apache Kafka",
                "Data Lakes and Big Data Systems",
                "Advanced SQL for Data Engineering",
            ],
            "Hard": [
                "Big Data and Distributed Systems",
                "Building Data Pipelines with Apache Airflow",
                "Data Engineering with Apache Spark",
                "Advanced ETL Design and Optimization",
            ],
        },
    },
    "Data Science": {
        "prefix": "DS",
        "courses": {
            "Easy": [
                "Data Science Fundamentals",
                "Introduction to Data Visualization",
                "Statistics for Data Science",
                "Exploratory Data Analysis with Python",
            ],
            "Medium": [
                "Machine Learning with Python",
                "Intermediate Data Visualization with Python",
                "Applied Data Science with R",
                "Data Wrangling and Preprocessing",
            ],
            "Hard": [
                "Deep Learning and Neural Networks",
                "Reinforcement Learning with Python",
                "Natural Language Processing with Python",
                "Advanced Machine Learning Algorithms",
            ],
        },
    },
    "Cloud Computing": {
        "prefix": "CC",
        "courses": {
            "Easy": [
                "Introduction to Cloud Computing",
                "Cloud Storage Fundamentals",
                "Getting Started with AWS",
                "Cloud Security Basics",
            ],
            "Medium": [
                "AWS Solutions Architect: Associate",
                "Azure DevOps for Cloud Engineering",
                "Cloud Infrastructure Automation with Terraform",
                "Building Scalable Applications on AWS",
            ],
            "Hard": [
                "AWS Solutions Architect: Professional",
                "Advanced Cloud Networking",
                "Cloud Security and Compliance",
                "Kubernetes in the Cloud",
            ],
        },
    },
    "Cybersecurity": {
        "prefix": "CS",
        "courses": {
            "Easy": [
                "Introduction to Cybersecurity",
                "Fundamentals of Ethical Hacking",
                "Cyber Threat Intelligence",
                "Network Security Essentials",
            ],
            "Medium": [
                "Penetration Testing with Kali Linux",
                "Security Operations and Incident Response",
                "Intermediate Network Security",
                "Secure Coding Practices",
            ],
            "Hard": [
                "Advanced Ethical Hacking",
                "Cybersecurity Risk Management",
                "Advanced Threat Hunting",
                "Cryptography and Security Protocols",
            ],
        },
    },
}

# URL of the course API
url = "http://localhost:5000/api/course"

# Authorization token
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZG1pbklEIjoiSk1EQWRtaW4xMDEiLCJpYXQiOjE3MjgyMzQ2MjIsImV4cCI6MTcyODIzODIyMn0.-ikN6aRe8Sntj7faRJRGLvMjkqGXB8IPKJURyFuhT9c",
    "Content-Type": "application/json",
}

# List to hold generated courses
course_list = []


# Function to generate course code
def generate_course_code(course_prefix, level, count):
    return f"{course_prefix}{level[0]}{100 + count}"


# Generate 50 courses
course_count = 1
for category, data in course_categories.items():
    prefix = data["prefix"]
    for level, courses in data["courses"].items():
        for course_name in courses:
            course_code = generate_course_code(prefix, level, course_count)
            course_data = {
                "CourseName": course_name,
                "CourseCode": course_code,
                "Level": level,
            }
            course_list.append(course_data)
            course_count += 1

            if course_count > 100:  # Stop after 50 courses
                break
        if course_count > 100:
            break
    if course_count > 100:
        break

# Output generated courses (for debugging, you can remove this part later)
for course in course_list:
    print(course)

# Loop through the course_list and send POST requests to load the data
for course in course_list:
    response = requests.post(url, json=course, headers=headers)
    print(
        f"Course {course['CourseCode']} ({course['CourseName']}) registration response: {response.status_code} - {response.text}"
    )
