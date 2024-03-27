package com.nal95.resumebuilder.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserBasic {
    private String location;
    private String summary;
    private String title;
    private String profession;
    private String mobilePhoneNumber;
    private int relevantExperienceYears;
}
