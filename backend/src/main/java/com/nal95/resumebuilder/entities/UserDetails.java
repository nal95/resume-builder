package com.nal95.resumebuilder.entities;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDetails {
    private UserBasic basic;
    private String image; // this is convert to base64
    private Set<Network> networks;
    private Set<Education> educations;
    private Set<WorkExperience> workExperiences;
    private Set<TechnicalExperience> technicalExperiences;
    private Set<Language> languages;
    private Set<Certification> certifications;
    private Set<Training> trainings;
    private Set<String> interests;
    private Set<String> tools;
    private Set<String> methodologies;
    private Set<String> skills;
}