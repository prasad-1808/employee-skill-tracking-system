import random

# Course categories with prefixes and basic topics
course_categories = {
    "Python": {
        "prefix": "PY",
        "courses": {
            "Easy": "Introduction to Python",
            "Medium": "Python for Data Analysis",
            "Hard": "Advanced Python Programming"
        }
    },
    "Web Development": {
        "prefix": "WD",
        "courses": {
            "Easy": "Basic HTML and CSS",
            "Medium": "JavaScript and Front-End Development",
            "Hard": "Full Stack Web Development"
        }
    },
    "Data Engineering": {
        "prefix": "DE",
        "courses": {
            "Easy": "Introduction to Data Pipelines",
            "Medium": "ETL Processes and Tools",
            "Hard": "Big Data and Distributed Systems"
        }
    },
    "Data Science": {
        "prefix": "DS",
        "courses": {
            "Easy": "Data Science Fundamentals",
            "Medium": "Machine Learning with Python",
            "Hard": "Deep Learning and Neural Networks"
        }
    }
}

# Levels of difficulty
levels = ['Easy', 'Medium', 'Hard']

# Create a list to hold the course data
course_list = []

# Function to generate course code
def generate_course_code(course_prefix, level, count):
    return f"{course_prefix}{level[0]}{100 + count}"

# Generate 20 courses
course_count = 1
for category, data in course_categories.items():
    prefix = data["prefix"]
    for level in levels:
        course_name = data["courses"][level]
        course_code = generate_course_code(prefix, level, course_count)
        course_level = level
        
        # Create course data and add it to the list
        course_data = {
            "CourseName": course_name,
            "CourseCode": course_code,
            "Level": course_level
        }
        course_list.append(course_data)
        course_count += 1

# Output the generated list of courses
print(course_list)
