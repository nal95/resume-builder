package com.nal95.resumebuilder.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkExperience {
    private String company;
    private String companyCity;
    private String companyLink;
    private String occupiedPosition;
    private LocalDate startDate;
    private LocalDate endDate;
    private int duration;
    private String summary;
}
