package com.nal95.resumebuilder.DTOs;

import com.nal95.resumebuilder.entities.UserDetails;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private UserDetails userDetails;
}