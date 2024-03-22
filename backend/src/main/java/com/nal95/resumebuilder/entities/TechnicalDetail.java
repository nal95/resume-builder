package com.nal95.resumebuilder.entities;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TechnicalDetail {
    private String name;
    private int level;
}
