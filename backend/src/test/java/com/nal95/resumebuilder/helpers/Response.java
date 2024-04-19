package com.nal95.resumebuilder.helpers;

import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.entities.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Set;

@Getter
public class Response {

    UserRequest userRequest;
    User user;

    public Response() {
        setUser(null);
        setUserRequest(null);
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
        UserBasic b = new UserBasic("New York", "About Me", "B. Eng", "Senior Software Engineer", "+1234567890", "www.ab@tes.de", 5);
        Network n = new Network("john doe","Linkedin", "https://linkedin.com/in/johndoe");
        Education e = new Education("University of XYZ", "Computer Science", "Bachelor's", LocalDate.of(2020, 1, 1), LocalDate.of(2024, 1, 1), 4, "Graduated with honors", "About this faculty");
        WorkExperience w = new WorkExperience("ABC Inc.", "New York", "https://abcinc.com", "Software Engineer", LocalDate.of(2024, 2, 1), LocalDate.of(2025, 2, 1), 1, "Developed cutting-edge software", false);
        TechnicalExperience t = new TechnicalExperience("PROGRAMMING", Set.of(TechnicalDetail.builder().name("java").level(5).build(), TechnicalDetail.builder().name("JavaScript").level(4).build()));
        Language l = new Language("french","beginner");
        Certification c = new Certification("myCertification", LocalDate.of(2020, 1, 1));
        Training tn = new Training("myTraining", "myPlatform");

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
                .interests(Set.of("Sport", "Travel"))
                .languages(Set.of(l))
                .certifications(Set.of(c))
                .trainings(Set.of(tn))
                .build();
    }
}
