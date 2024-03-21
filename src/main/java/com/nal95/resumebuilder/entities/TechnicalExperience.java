package com.nal95.resumebuilder.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TechnicalExperience {
    private String topic; // example: programming, framework, database, cloud
    private Set<TechnicalDetail> technicalDetails;
}

