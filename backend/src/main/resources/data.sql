drop table if exists users cascade;

-- Create users table
create table users
(
    id           bigint generated by default as identity,
    email        varchar(255) unique,
    first_name   varchar(255),
    last_name    varchar(255),
    user_details json,
    primary key (id)
);

-- Insert sample data
INSERT INTO USERS (first_name, last_name, email, user_details)
VALUES ('John',
        'Doe',
        'john.doe@example.com',
        '{
          "location": "New York",
          "summary": "Experienced software engineer",
          "title": "Senior Software Engineer",
          "profession": "Software Development",
          "mobilePhoneNumber": "+1234567890",
          "relevantExperienceYears": 5,
          "networks": [
            {
              "referenceName": "linkedin",
              "link": "https://linkedin.com/in/johndoe"
            },
            {
              "referenceName": "GIT",
              "link": "https://github.com/johndoe"
            }
          ],
          "educations": [
            {
              "school": "University of XYZ",
              "field": "Computer Science",
              "degree": "Bachelor''s",
              "startDate": "2020-01-01",
              "endDate": "2024-01-01",
              "duration": 4,
              "summary": "Graduated with honors"
            }
          ],
          "workExperiences": [
            {
              "company": "ABC Inc.",
              "companyCity": "New York",
              "companyLink": "https://abcinc.com",
              "occupiedPosition": "Software Engineer",
              "startDate": "2024-02-01",
              "endDate": "2025-02-01",
              "duration": 1,
              "summary": "Developed cutting-edge software"
            }
          ],
          "technicalExperiences": [
            {
              "topic": "Programming Languages",
              "technicalDetails": [
                {
                  "name": "Java",
                  "level": 5
                },
                {
                  "name": "JavaScript",
                  "level": 4
                }
              ]
            },
            {
              "topic": "Framework",
              "technicalDetails": [
                {
                  "name": "Spring Boot",
                  "level": 5
                },
                {
                  "name": "Angular",
                  "level": 4
                }
              ]
            }
          ],
          "tools": [
            "Git",
            "Jira"
          ],
          "methodologies": [
            "Agile",
            "Scrum",
            "TDD",
            "MVC"
          ],
          "skills": [
            "SQL",
            "Firebase",
            "Algorithm"
          ],
          "hobbiesAndInterest": [
            "Sport",
            "Reading",
            "Playing the Piano",
            "DIY (Do It Yourself)",
            "Travel"
          ],
          "trainingsAndCertifications": [
            "Google Cloud",
            "Clean Code"
          ]
        }' FORMAT JSON);
