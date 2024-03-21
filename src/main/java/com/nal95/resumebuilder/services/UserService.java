package com.nal95.resumebuilder.services;


import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.entities.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    User createUser(UserRequest userRequest);

    List<User> getUsers();

    User updateUser(Long id, UserRequest userRequest);

    void deleteUser(Long id);

    User getUser(Long id);

    User setUserImage(Long id, MultipartFile image);
}
