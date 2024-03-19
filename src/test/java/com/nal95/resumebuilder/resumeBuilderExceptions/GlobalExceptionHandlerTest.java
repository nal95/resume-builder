package com.nal95.resumebuilder.resumeBuilderExceptions;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class GlobalExceptionHandlerTest {

    @InjectMocks
    private GlobalExceptionHandler handler;


    @Test
    void handleResourceAlreadyExists() {
        // Assert the response entity
        ResponseEntity<Object> response = handler.handleResourceAlreadyExists(new ResourceAlreadyExistsException("Test exception"));
        assertNotNull(response);
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertInstanceOf(Map.class, response.getBody());
    }

    @Test
    void handleUserNotFoundException() {
        // Assert the response entity
        ResponseEntity<Object> response = handler.handleUserNotFoundException(new UserNotFoundException("Test exception"));
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertInstanceOf(Map.class, response.getBody());
    }
}