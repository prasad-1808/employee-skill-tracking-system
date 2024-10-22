import pandas as pd

# Load the data from the CSV files
employee_df = pd.read_csv(
    "C:/Users/Admin/Desktop/JMD327_MainProject/JMD327_JElite/PythonScripts/DataEngineering/PREP/prep_employee.csv"
)
skill_df = pd.read_csv(
    "C:/Users/Admin/Desktop/JMD327_MainProject/JMD327_JElite/PythonScripts/DataEngineering/PREP/prep_skill.csv"
)
course_df = pd.read_csv(
    "C:/Users/Admin/Desktop/JMD327_MainProject/JMD327_JElite/PythonScripts/DataEngineering/PREP/prep_course.csv"
)

# Merge employee data with skill data on EmployeeID
merged_df = pd.merge(skill_df, employee_df, on="EmployeeID", how="left")

# Merge the result with course data on CourseID
final_df = pd.merge(merged_df, course_df, on="CourseID", how="left")

print(final_df)


# Select the required columns
final_table = final_df[
    [
        "EmployeeID",
        "Firstname",
        "Lastname",
        "Designation",
        "YearOfJoining",
        "CourseName",
        "Proficiency",
        "SkillType",
        "CertificateLink",
        "ScoreObtained",
        "ScoreCategory",
        "Verified",
    ]
]

final_table = final_table.sort_values(by=["EmployeeID"])[1:]

# Show the final table
print(final_table)
final_table.to_csv("report_data.csv", index=False)
