package com.nal95.resumebuilder.services;


import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.DTOs.UserResponse;
import com.nal95.resumebuilder.entities.User;
import com.nal95.resumebuilder.resumeBuilderExceptions.ResourceAlreadyExistsException;
import com.nal95.resumebuilder.resumeBuilderExceptions.UserNotFoundException;
import com.nal95.resumebuilder.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final ModelMapper modelMapper;


    public UserServiceImpl(UserRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public UserResponse createUser(UserRequest userRequest) {

        if (repository.existsByEmail(userRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("User with email " + userRequest.getEmail() + " already exists");
        }

        User user = modelMapper.map(userRequest, User.class);

        user = repository.save(user);

        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public UserResponse getUser(Long userId) {

        User user = repository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("User with ID " + userId + " not found"));

        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public List<UserResponse> getUsers() {
        List<UserResponse> userList = new ArrayList<>();
        repository.findAll()
                .forEach(user -> userList.add(modelMapper.map(user, UserResponse.class)));

        return userList;
    }

    @Override
    public UserResponse updateUser(Long userId, UserRequest updatedUserRequest) {
        User existedUser = repository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("User with ID " + userId + " not found"));

        User updatedUser = mapExistedUserToUpdatedUser(existedUser, updatedUserRequest);

        return modelMapper.map(repository.save(updatedUser), UserResponse.class);
    }

    @Override
    public void deleteUser(Long userId) {
        repository.deleteById(userId);
    }

    private User mapExistedUserToUpdatedUser(User existedUser, UserRequest updatedUserRequest) {
        existedUser.setFirstName(updatedUserRequest.getFirstName());
        existedUser.setLastName(updatedUserRequest.getLastName());
        existedUser.setEmail(updatedUserRequest.getEmail());
        existedUser.setUserDetails(updatedUserRequest.getUserDetails());

        return existedUser;
    }
}