package com.nal95.resumebuilder.services;


import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.entities.User;

import java.util.List;

public interface UserService {
    User createUser(UserRequest userRequest);

    List<User> getUsers();

    User updateUser(Long userId, UserRequest userRequest);

    void deleteUser(Long userId);

    User getUser(Long userId);
}
