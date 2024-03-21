package com.nal95.resumebuilder.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDetails {
    private String location;
    private String summary;
    private String title;
    private String profession;
    private String mobilePhoneNumber;
    private byte[] image;
    private int relevantExperienceYears;
    private Set<Network> networks;
    private Set<Education> educations;
    private Set<WorkExperience> workExperiences;
    private Set<TechnicalExperience> technicalExperiences;
    private Set<String> tools;
    private Set<String> methodologies;
    private Set<String> skills;
    private Set<String> hobbiesAndInterest;
    private Set<String> trainingsAndCertifications;
}