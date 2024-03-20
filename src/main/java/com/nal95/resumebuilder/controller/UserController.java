package com.nal95.resumebuilder.controller;

import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.entities.User;
import com.nal95.resumebuilder.resumeBuilderExceptions.ResourceAlreadyExistsException;
import com.nal95.resumebuilder.resumeBuilderExceptions.UserNotFoundException;
import com.nal95.resumebuilder.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        try {
            User user = userService.getUser(userId);
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (UserNotFoundException e) {
            //TODO: log exception here

            ErrorResponse errorResponse = ErrorResponse.builder(e, HttpStatus.NOT_FOUND,
                    e.getMessage()).build();

            return ResponseEntity.of(errorResponse.getBody()).build();
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody UserRequest userRequest) {
        try {
            User updatedUser = userService.updateUser(userId, userRequest);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);

        } catch (UserNotFoundException e) {
            //TODO: log exception here

            ErrorResponse errorResponse = ErrorResponse.builder(e, HttpStatus.NOT_FOUND,
                    e.getMessage()).build();

            return ResponseEntity.of(errorResponse.getBody()).build();
        }
    }

    //TODO: test this methode
    @PostMapping("/{id}/image")
    public ResponseEntity<User> setUserImage(@PathVariable Long id, @RequestParam(value = "image", required = true) MultipartFile image) {
        try {
            User updatedUser = userService.setUserImage(id, image);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);

        } catch (UserNotFoundException e) {
            //TODO: log exception here

            ErrorResponse errorResponse = ErrorResponse.builder(e, HttpStatus.NOT_FOUND,
                    e.getMessage()).build();

            return ResponseEntity.of(errorResponse.getBody()).build();
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserRequest userRequest) {
        try {
            User createdUser = userService.createUser(userRequest);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);

        } catch (ResourceAlreadyExistsException e) {
            //TODO: log exception here

            ErrorResponse errorResponse = ErrorResponse.builder(e, HttpStatus.CONFLICT,
                    e.getMessage()).build();

            return ResponseEntity.of(errorResponse.getBody()).build();
        }
    }
}