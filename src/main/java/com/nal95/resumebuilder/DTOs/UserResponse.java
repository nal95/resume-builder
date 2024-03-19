package com.nal95.resumebuilder.DTOs;

import com.nal95.resumebuilder.entities.UserDetails;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private UserDetails userDetails;
}
