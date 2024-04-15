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
          "basic": {
            "location": "New York",
            "summary": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>",
            "title": "Senior Software Engineer",
            "profession": "Software Development",
            "mobilePhoneNumber": "+1234567890",
            "website": "www.johndoe.com",
            "relevantExperienceYears": 5
          },
          "languages": [
            {
              "name": "German",
              "level": "Beginner"
            },
            {
              "name": "French",
              "level": "Proficiency"
            }
          ],
          "networks": [
            {
              "name": "johndoe",
              "referenceName": "linkedin",
              "link": "https://linkedin.com/in/johndoe"
            },
            {
              "name": "johndoe",
              "referenceName": "GIT",
              "link": "https://github.com/johndoe"
            }
          ],
          "educations": [
            {
              "school": "University of XYZ",
              "field": "Computer Science",
              "degree": "Bachelor''''s",
              "startDate": "2020-01-01",
              "endDate": "2024-01-01",
              "duration": 4,
              "summary": "Graduated with honors"
            },
            {
              "school": "University of XYZ",
              "field": "Computer Science",
              "degree": "Bachelor''''s",
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
              "duration": "1 year",
              "summary": "<ul><li>Developed cutting-edge software</li><li>Developed cutting-edge software</li><li>Developed cutting-edge software</li></ul>"
            },
            {
              "company": "ABC Inc.",
              "companyCity": "New York",
              "companyLink": "https://abcinc.com",
              "occupiedPosition": "Software Engineer",
              "startDate": "2024-02-01",
              "endDate": "2025-02-01",
              "duration": "1 year",
              "summary": "<ul><li>Developed cutting-edge software</li><li>Developed cutting-edge software</li><li>Developed cutting-edge software</li></ul>"
            },
            {
              "company": "ABC Inc.",
              "companyCity": "New York",
              "companyLink": "https://abcinc.com",
              "occupiedPosition": "Software Engineer",
              "startDate": "2024-02-01",
              "endDate": "2025-02-01",
              "duration": "1 year",
              "summary": "<ul><li>Developed cutting-edge software</li><li>Developed cutting-edge software</li><li>Developed cutting-edge software</li></ul>"
            }
          ],
          "technicalExperiences": [
            {
              "topic": "Programming Languages",
              "technicalDetails": [
                {
                  "name": "Java",
                  "level": 3
                },
                {
                  "name": "JavaScript",
                  "level": 3
                },
                {
                  "name": "TypeScript",
                  "level": 3
                },
                {
                  "name": "C/C++",
                  "level": 2
                },
                {
                  "name": "Python",
                  "level": 2
                }
              ]
            },
            {
              "topic": "Backend Development",
              "technicalDetails": [
                {
                  "name": "Spring Boot",
                  "level": 5
                },
                {
                  "name": "NodeJs",
                  "level": 4
                }
              ]
            },
            {
              "topic": "Frontend Development",
              "technicalDetails": [
                {
                  "name": "React",
                  "level": 1
                },
                {
                  "name": "Angular",
                  "level": 4
                }
              ]
            },
            {
              "topic": "Database",
              "technicalDetails": [
                {
                  "name": "MySQL",
                  "level": 3
                },
                {
                  "name": "MongoDB",
                  "level": 2
                },
                {
                  "name": "BigQuery",
                  "level": 2
                }
              ]
            },
            {
              "topic": "Cloud",
              "technicalDetails": [
                {
                  "name": "AWS",
                  "level": 3
                },
                {
                  "name": "Google Cloud Platform",
                  "level": 2
                },
                {
                  "name": "Azure",
                  "level": 2
                }
              ]
            },
            {
              "topic": "DevOps",
              "technicalDetails": [
                {
                  "name": "Docker",
                  "level": 3
                },
                {
                  "name": "Kubernetes",
                  "level": 2
                },
                {
                  "name": "Terraform",
                  "level": 3
                },
                {
                  "name": "GitHub Actions",
                  "level": 3
                },
                {
                  "name": "Jenkins",
                  "level": 3
                },
                {
                  "name": "Helm",
                  "level": 2
                }
              ]
            },
            {
              "topic": "Testing",
              "technicalDetails": [
                {
                  "name": "JUnit",
                  "level": 3
                },
                {
                  "name": "Jest",
                  "level": 2
                }
              ]
            },
            {
              "topic": "Message Brokers",
              "technicalDetails": [
                {
                  "name": "RabbitMQ",
                  "level": 3
                },
                {
                  "name": "Kafka",
                  "level": 2
                },
                {
                  "name": "Nats.io",
                  "level": 2
                }
              ]
            }
          ],
          "certifications": [
            {
              "name": "Google Cloud Associate Cloud Engineer",
              "validity": "2026-01-01"
            }
          ],
          "trainings": [
            {
              "title": "Java Design Pattern",
              "platform": "Udemy"
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
            "Travel",
            "Another One"
          ]
        }' FORMAT JSON);

