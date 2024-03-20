package com.nal95.resumebuilder.services;


import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.entities.User;
import com.nal95.resumebuilder.repositories.UserRepository;
import com.nal95.resumebuilder.resumeBuilderExceptions.ResourceAlreadyExistsException;
import com.nal95.resumebuilder.resumeBuilderExceptions.UserNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
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
    public User createUser(UserRequest userRequest) {

        if (repository.existsByEmail(userRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("User with email " + userRequest.getEmail() + " already exists");
        }

        User user = modelMapper.map(userRequest, User.class);

        return repository.save(user);
    }

    @Override
    public User getUser(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new UserNotFoundException("User with ID " + id + " not found"));
    }

    @Override
    public List<User> getUsers() {
        return new ArrayList<>(repository.findAll());
    }

    @Override
    public User updateUser(Long id, UserRequest updatedUserRequest) {
        User existedUser = repository.findById(id).orElseThrow(() ->
                new UserNotFoundException("User with ID " + id + " not found"));

        User updatedUser = mapExistedUserToUpdatedUser(existedUser, updatedUserRequest);

        return repository.save(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    private User mapExistedUserToUpdatedUser(User existedUser, UserRequest updatedUserRequest) {
        existedUser.setFirstName(updatedUserRequest.getFirstName());
        existedUser.setLastName(updatedUserRequest.getLastName());
        existedUser.setEmail(updatedUserRequest.getEmail());
        existedUser.setUserDetails(updatedUserRequest.getUserDetails());

        return existedUser;
    }

    @Override
    public User setUserImage(Long id, MultipartFile image) {

        User existedUser = repository.findById(id).orElseThrow(() ->
                new UserNotFoundException("User with ID " + id + " not found"));

        if (image != null) {
            try {
                existedUser.getUserDetails().setImage(image.getBytes());
            } catch (IOException e) {
                //TODO log error
            }
        } else {
            try {
                File file = ResourceUtils.getFile("classpath:static/john.svg");
                byte[] bytes = Files.readAllBytes(file.toPath());
                existedUser.getUserDetails().setImage(bytes);
            } catch (IOException e) {
                //TODO log error
            }
        }
        return repository.save(existedUser);
    }
}