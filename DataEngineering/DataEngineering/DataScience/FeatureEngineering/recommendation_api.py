from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Load the previously saved models
encoder = joblib.load("onehot_encoder.joblib")
kmeans = joblib.load("kmeans_model.joblib")

# Sample DataFrame structure (used for recommendations)
# In real implementation, you'd load or query a database for this
df = pd.DataFrame(
    {
        "course_name": [
            "Advanced Data Visualization",
            "Data Modeling",
            "Machine Learning",
            "Deep Learning",
        ],
        "outcome_skill": [
            "Data Visualization, Python",
            "SQL, Python, Data Modeling",
            "Machine Learning, Python",
            "Deep Learning, Neural Networks",
        ],
        "role_outcome": [
            "senior data scientist",
            "data engineer",
            "machine learning engineer",
            "deep learning engineer",
        ],
        "current_role": [
            "data analyst",
            "junior data engineer",
            "junior ml engineer",
            "ai engineer",
        ],
        "skills": ["Python, SQL", "SQL, Python", "Python, ML", "AI, Python"],
        "feedback_category": ["Positive", "Neutral", "Positive", "Neutral"],
        "yearofexperience_category": ["5-10", "3-5", "1-3", "5-10"],
    }
)


# Define the structure of input data using Pydantic
class EmployeeData(BaseModel):
    course_name: str
    outcome_skill: str
    role_outcome: str
    current_role: str
    skills: str
    feedback_category: str
    yearofexperience_category: str


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # The origin you want to allow
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


def recommend_courses_based_on_role(new_employee_data, encoder, kmeans, df):
    # Ensure all values are in the expected format (string and stripped)
    new_employee_df = pd.DataFrame([new_employee_data.dict()])

    # Get the desired role outcome and current skills
    desired_role_outcome = new_employee_df["role_outcome"].values[0]
    current_skills = set(new_employee_df["skills"].values[0].split(","))

    # Filter courses based on the desired role outcome
    relevant_courses = df[df["role_outcome"] == desired_role_outcome]

    # Debugging: Print the filtered courses
    print(f"Relevant courses for role {desired_role_outcome}: {relevant_courses}")

    # Further filter by checking if the skills are related to the courses
    recommended_courses = []
    for _, course in relevant_courses.iterrows():
        course_skills = set(course["outcome_skill"].split(","))
        print(f"Checking course {course['course_name']} with skills {course_skills}")
        if not current_skills.intersection(
            course_skills
        ):  # Recommend if no skill match
            recommended_courses.append(course["course_name"])

    return list(set(recommended_courses))  # Return unique course names


# Define a POST route to get the recommendations
@app.post("/recommend")
def recommend_courses(employee_data: EmployeeData):
    try:
        # Use the recommendation function
        recommended_courses = recommend_courses_based_on_role(
            employee_data, encoder, kmeans, df
        )

        # Return the response as JSON
        return {"recommended_courses": recommended_courses}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run the app using Uvicorn
# Command: uvicorn recommendation_api:app --reload
