package com.nal95.resumebuilder.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.entities.User;
import com.nal95.resumebuilder.helpers.Response;
import com.nal95.resumebuilder.resumeBuilderExceptions.ResourceAlreadyExistsException;
import com.nal95.resumebuilder.resumeBuilderExceptions.UserNotFoundException;
import com.nal95.resumebuilder.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    Response responseHelper = null;

    @BeforeEach
    void Init() {
        responseHelper = new Response();
    }

    @Test
    void createUser_Success() throws Exception {
        // Given
        UserRequest userRequest = responseHelper.getUserRequest();
        User expectedUserResponse = responseHelper.getUser();

        // When
        given(userService.createUser(any(UserRequest.class)))
                .willReturn(expectedUserResponse);

        ResultActions response = mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRequest)));

        // Then
        response.andDo(print())
                .andExpect(status().isCreated());

        assertEquals(objectMapper.writeValueAsString(expectedUserResponse), response.andReturn().getResponse().getContentAsString());
    }

    @Test
    void createUser_Conflict() throws Exception {
        // Given
        UserRequest userRequest = responseHelper.getUserRequest();
        String conflictMessage = "User with email " + userRequest.getEmail() + " already exists";

        // When
        given(userService.createUser(any(UserRequest.class)))
                .willThrow(new ResourceAlreadyExistsException(conflictMessage));

        ResultActions response = mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRequest)));

        // Then
        response.andDo(print())
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.type", is("about:blank")))
                .andExpect(jsonPath("$.title", is("Conflict")))
                .andExpect(jsonPath("$.status", is(409)))
                .andExpect(jsonPath("$.detail", is(conflictMessage)));
    }

    @Test
    void getUser_Success() throws Exception {
        // Given
        Long userId = 1L;
        User expectedUserResponse = responseHelper.getUser();

        // When
        given(userService.getUser(userId))
                .willReturn(expectedUserResponse);

        ResultActions response = mockMvc.perform(get("/users/{userId}", userId));

        // Then
        response.andDo(print())
                .andExpect(status().isOk());

        assertEquals(objectMapper.writeValueAsString(expectedUserResponse), response.andReturn().getResponse().getContentAsString());
    }

    @Test
    void getUser_NotFound() throws Exception {
        // Given
        Long userId = 1L;
        String notFoundMessage = "User with ID " + userId + " not found";

        // When
        given(userService.getUser(userId))
                .willThrow(new UserNotFoundException(notFoundMessage));

        ResultActions response = mockMvc.perform(get("/users/{userId}", userId));

        // Then
        response.andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.type", is("about:blank")))
                .andExpect(jsonPath("$.title", is("Not Found")))
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.detail", is(notFoundMessage)));
    }

    @Test
    void updateUser_Success() throws Exception {
        // Given
        Long userId = 1L;
        UserRequest userRequest = responseHelper.getUserRequest();
        User expectedUserResponse = responseHelper.getUser();

        userRequest.setEmail("new@email.de");
        userRequest.setFirstName("Jack");
        userRequest.setLastName("Brown");

        expectedUserResponse.setEmail("new@email.de");
        expectedUserResponse.setFirstName("Jack");
        expectedUserResponse.setLastName("Brown");

        // When
        given(userService.updateUser(eq(userId), any(UserRequest.class)))
                .willReturn(expectedUserResponse);

        ResultActions response = mockMvc.perform(put("/users/{userId}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRequest)));

        // Then
        response.andDo(print())
                .andExpect(status().isOk());

        assertEquals(objectMapper.writeValueAsString(expectedUserResponse),
                response.andReturn().getResponse().getContentAsString());
    }

    @Test
    void updateUserImage_Success() throws Exception {
        // Given
        Long userId = 1L;
        byte[] content = "Test image data".getBytes();
        MultipartFile image = new MockMultipartFile("file", "image.jpg", "image/jpeg", content);
        User expectedUserResponse = responseHelper.getUser();
        expectedUserResponse.getUserDetails().setImage(image.getBytes());

        // When
        given(userService.setUserImage(eq(userId), any(MultipartFile.class)))
                .willReturn(expectedUserResponse);

        ResultActions response = mockMvc.perform(multipart(HttpMethod.POST, "/users/{id}/image", userId)
                .file("image", image.getBytes())
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE));

        // Then
        response.andDo(print())
                .andExpect(status().isOk());

        assertEquals(objectMapper.writeValueAsString(expectedUserResponse),
                response.andReturn().getResponse().getContentAsString());
    }

    @Test
    void updateUserImage_UserNotFound() throws Exception {
        //Given
        String notFoundMessage = "User with ID " + 1L + " not found";

        //When
        given(userService.setUserImage(anyLong(), any(MultipartFile.class)))
                .willThrow(new UserNotFoundException(notFoundMessage));

        ResultActions response = mockMvc.perform(multipart(HttpMethod.POST, "/users/{id}/image", 1L)
                .file("image", new byte[10])
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE));

        // Then
        response.andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.type", is("about:blank")))
                .andExpect(jsonPath("$.title", is("Not Found")))
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.detail", is(notFoundMessage)));
    }

    @Test
    void updateUser_NotFound() throws Exception {
        // Given
        Long userId = 1L;
        UserRequest userRequest = responseHelper.getUserRequest();
        String notFoundMessage = "User with ID " + userId + " not found";

        // When
        given(userService.updateUser(eq(userId), any(UserRequest.class)))
                .willThrow(new UserNotFoundException(notFoundMessage));

        ResultActions response = mockMvc.perform(put("/users/{userId}", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRequest)));

        // Then
        response.andDo(print())
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.type", is("about:blank")))
                .andExpect(jsonPath("$.title", is("Not Found")))
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.detail", is(notFoundMessage)));
    }

    @Test
    void deleteUser_Success() throws Exception {
        // Mocking userService behavior to delete user successfully
        doNothing().when(userService).deleteUser(anyLong());

        // Perform DELETE request
        mockMvc.perform(delete("/users/{userId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
}