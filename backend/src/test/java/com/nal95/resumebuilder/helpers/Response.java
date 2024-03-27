package com.nal95.resumebuilder.helpers;

import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.entities.*;

import java.time.LocalDate;
import java.util.Set;

public class Response {

    UserRequest userRequest;
    User user;

    public Response() {
        setUser(null);
        setUserRequest(null);
    }

    public User getUser() {
        return user;
    }

    public UserRequest getUserRequest() {
        return userRequest;
    }

    public void setUser(User user) {

        if (user != null) {
            this.user = user;
        } else {
            this.user = User.builder()
                    .id(1L)
                    .firstName("John")
                    .lastName("Doe")
                    .email("john.doe@example.com")
                    .userDetails(getUserDetails())
                    .build();
        }


    }

    public void setUserRequest(UserRequest userRequest) {
        if (userRequest != null) {
            this.userRequest = userRequest;
        } else {
            this.userRequest = UserRequest.builder()
                    .firstName("John")
                    .lastName("Doe")
                    .email("john.doe@example.com")
                    .userDetails(getUserDetails())
                    .build();
        }
    }

    public UserDetails getUserDetails() {
        UserBasic b = new UserBasic("New York","Experienced software engineer","Senior Software Engineer","Software Development","+1234567890",5);
        Network n = new Network("Linkedin", "https://linkedin.com/in/johndoe");
        Education e = new Education("University of XYZ", "Computer Science", "Bachelor's", LocalDate.of(2020, 1, 1), LocalDate.of(2024, 1, 1), 4, "Graduated with honors");
        WorkExperience w = new WorkExperience("ABC Inc.", "New York", "https://abcinc.com", "Software Engineer", LocalDate.of(2024, 2, 1), LocalDate.of(2025, 2, 1), 1, "Developed cutting-edge software");
        TechnicalExperience t = new TechnicalExperience("PROGRAMMING", Set.of(TechnicalDetail.builder().name("java").level(5).build(), TechnicalDetail.builder().name("JavaScript").level(4).build()));
        return UserDetails.builder()
                .basic(b)
                .image(null)
                .networks((Set.of(n)))
                .educations(Set.of(e))
                .workExperiences(Set.of(w))
                .technicalExperiences(Set.of(t))
                .tools(Set.of("Git", "Jira", "Webpack", "TDD", "MVC"))
                .methodologies(Set.of("Agile", "Scrum"))
                .skills(Set.of("SQL", "Firebase", "Algorithm"))
                .hobbiesAndInterest(Set.of("Sport", "Travel"))
                .trainingsAndCertifications(Set.of("Google Cloud", "Clean Code"))
                .build();
    }
}
