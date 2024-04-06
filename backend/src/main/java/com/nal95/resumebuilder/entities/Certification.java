package com.nal95.resumebuilder.entities;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Certification {
    private String name;
    private LocalDate validity;
}
