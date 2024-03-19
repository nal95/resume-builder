package com.nal95.resumebuilder.controller;

import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.DTOs.UserResponse;
import com.nal95.resumebuilder.resumeBuilderExceptions.ResourceAlreadyExistsException;
import com.nal95.resumebuilder.resumeBuilderExceptions.UserNotFoundException;
import com.nal95.resumebuilder.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getUser(@PathVariable Long userId) {
        try {
            UserResponse user = userService.getUser(userId);
            return new ResponseEntity<>(user, HttpStatus.OK);

        } catch (UserNotFoundException e) {
            ErrorResponse errorResponse = ErrorResponse.builder(e, HttpStatus.NOT_FOUND,
                    e.getMessage()).build();

            return new ResponseEntity<>(errorResponse.getBody(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Object> updateUser(@PathVariable Long userId, @RequestBody UserRequest userRequest) {
        try {
            UserResponse updatedUser = userService.updateUser(userId, userRequest);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);

        } catch (UserNotFoundException e) {
            ErrorResponse errorResponse = ErrorResponse.builder(e, HttpStatus.NOT_FOUND,
                    e.getMessage()).build();

            return new ResponseEntity<>(errorResponse.getBody(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody UserRequest userRequest) {
        try {
            UserResponse createdUser = userService.createUser(userRequest);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);

        } catch (ResourceAlreadyExistsException e) {
            ErrorResponse errorResponse = ErrorResponse.builder(e, HttpStatus.CONFLICT, e.getMessage()).build();

            return new ResponseEntity<>(errorResponse.getBody(), HttpStatus.CONFLICT);
        }
    }
}