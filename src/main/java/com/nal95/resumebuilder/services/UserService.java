package com.nal95.resumebuilder.services;


import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.DTOs.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest userRequest);

    List<UserResponse> getUsers();

    UserResponse updateUser(Long userId, UserRequest userRequest);

    void deleteUser(Long userId);

    UserResponse getUser(Long userId);
}
