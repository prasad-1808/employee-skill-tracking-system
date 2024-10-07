import requests

# URL of the course API
url = "http://localhost:5000/api/course"

# Authorization token
headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBZG1pbklEIjoiSk1EQWRtaW4xMDEiLCJpYXQiOjE3MjgyNzU5NjcsImV4cCI6MTcyODI3OTU2N30.Y-ffpmMyfnHwvusV7ygb7_omLiLrbhYz4PoRKcPeF38",
    "Content-Type": "application/json",
}

# Course list generated in the previous step
course_list = [
    {"CourseName": "Introduction to Python", "CourseCode": "PYE101", "Level": "Easy"},
    {
        "CourseName": "Python for Data Analysis",
        "CourseCode": "PYM102",
        "Level": "Medium",
    },
    {
        "CourseName": "Advanced Python Programming",
        "CourseCode": "PYH103",
        "Level": "Hard",
    },
    {"CourseName": "Basic HTML and CSS", "CourseCode": "WDE104", "Level": "Easy"},
    {
        "CourseName": "JavaScript and Front-End Development",
        "CourseCode": "WDM105",
        "Level": "Medium",
    },
    {
        "CourseName": "Full Stack Web Development",
        "CourseCode": "WDH106",
        "Level": "Hard",
    },
    {
        "CourseName": "Introduction to Data Pipelines",
        "CourseCode": "DEE107",
        "Level": "Easy",
    },
    {
        "CourseName": "ETL Processes and Tools",
        "CourseCode": "DEM108",
        "Level": "Medium",
    },
    {
        "CourseName": "Big Data and Distributed Systems",
        "CourseCode": "DEH109",
        "Level": "Hard",
    },
    {
        "CourseName": "Data Science Fundamentals",
        "CourseCode": "DSE110",
        "Level": "Easy",
    },
    {
        "CourseName": "Machine Learning with Python",
        "CourseCode": "DSM111",
        "Level": "Medium",
    },
    {
        "CourseName": "Deep Learning and Neural Networks",
        "CourseCode": "DSH112",
        "Level": "Hard",
    },
]

# Loop through the course_list and send POST requests
for course in course_list:
    # Send POST request to create the course
    response = requests.post(url, json=course, headers=headers)

    # Print the response from the server
    print(
        f"Course {course['CourseCode']} ({course['CourseName']}) registration response: {response.status_code} - {response.text}"
    )
