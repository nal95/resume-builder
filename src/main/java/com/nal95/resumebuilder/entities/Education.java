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
public class Education {
    private String school;
    private String field;
    private String degree;
    private LocalDate startDate;
    private LocalDate endDate;
    private int duration;
    private String summary;
}

