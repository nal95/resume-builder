package com.nal95.resumebuilder.services;

import com.nal95.resumebuilder.DTOs.UserRequest;
import com.nal95.resumebuilder.entities.User;
import com.nal95.resumebuilder.helpers.Response;
import com.nal95.resumebuilder.repositories.UserRepository;
import com.nal95.resumebuilder.resumeBuilderExceptions.ResourceAlreadyExistsException;
import com.nal95.resumebuilder.resumeBuilderExceptions.UserNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private UserServiceImpl userService;

    Response responseHelper = null;

    @BeforeEach
    void Init() {
        responseHelper = new Response();
    }

    @Test
    public void createUser_WithNonExistingEmail_ShouldCreateUser() {
        // Given
        User expectedUser = responseHelper.getUser();
        UserRequest userRequest = responseHelper.getUserRequest();

        // When -  action or the behaviour that we are going test
        given(userRepository.existsByEmail(userRequest.getEmail())).willReturn(false);
        given(modelMapper.map(any(UserRequest.class), eq(User.class))).willReturn(expectedUser);
        given(userRepository.save(any(User.class))).willReturn(expectedUser);

        User createdUser = userService.createUser(userRequest);

        // Then
        verify(userRepository, times(1)).save(any(User.class));
        assertThat(createdUser).isNotNull();
        assertEquals(expectedUser.getId(), createdUser.getId());
        assertEquals(expectedUser.getFirstName(), createdUser.getFirstName());
        assertEquals(expectedUser.getLastName(), createdUser.getLastName());
        assertEquals(expectedUser.getEmail(), createdUser.getEmail());
        assertEquals(expectedUser.getUserDetails(), createdUser.getUserDetails());
        assertEquals(expectedUser.getUserDetails(), createdUser.getUserDetails());
    }

    @Test()
    public void createUser_WithExistingEmail_ShouldThrowException() {
        // Given
        UserRequest userRequest = responseHelper.getUserRequest();
        String exceptionMessage = "User with email " + userRequest.getEmail() + " already exists";

        // When -  action or the behaviour that we are going test
        given(userRepository.existsByEmail(anyString())).willReturn(true);

        // Then
        ResourceAlreadyExistsException exception = assertThrows(
                ResourceAlreadyExistsException.class, () -> userService.createUser(userRequest));

        verify(userRepository, never()).save(any(User.class));
        assertEquals(exceptionMessage, exception.getMessage());
    }

    @Test
    public void getUsers_ShouldReturnListOfUserResponses() {

        //Given
        User user = responseHelper.getUser();

        // When -  action or the behaviour that we are going test
        given(userRepository.findAll()).willReturn(Collections.singletonList(user));

        List<User> userList = userService.getUsers();

        // Then
        verify(userRepository, times(1)).findAll();
        assertThat(userList).isNotNull();
        assertThat(userList).hasSize(1);
        assertEquals(user.getId(), userList.get(0).getId());
        assertEquals(user.getFirstName(), userList.get(0).getFirstName());
        assertEquals(user.getLastName(), userList.get(0).getLastName());
        assertEquals(user.getEmail(), userList.get(0).getEmail());
        assertEquals(user.getUserDetails(), userList.get(0).getUserDetails());
    }

    @Test
    public void getUsers_ShouldReturnEmptyListOfUserResponses() {
        // When -  action or the behaviour that we are going test
        given(userRepository.findAll()).willReturn(Collections.emptyList());

        List<User> userList = userService.getUsers();

        // Then
        verify(userRepository, times(1)).findAll();
        assertThat(userList).isEmpty();
        assertThat(userList).hasSize(0);
    }


    @Test
    public void getUser_ShouldReturnUserResponse() {

        //Given
        User expectedUser = responseHelper.getUser();

        // When -  action or the behaviour that we are going test
        given(userRepository.findById(1L)).willReturn(Optional.of(expectedUser));

        User createdUser = userService.getUser(expectedUser.getId());

        // Then
        verify(userRepository, times(1)).findById(expectedUser.getId());
        assertThat(createdUser).isNotNull();
        assertEquals(expectedUser.getId(), createdUser.getId());
        assertEquals(expectedUser.getFirstName(), createdUser.getFirstName());
        assertEquals(expectedUser.getLastName(), createdUser.getLastName());
        assertEquals(expectedUser.getEmail(), createdUser.getEmail());
        assertEquals(expectedUser.getUserDetails(), createdUser.getUserDetails());
    }

    @Test
    public void updateUser_WithExistingUserId_ShouldUpdateUser() {
        // Given
        User user = responseHelper.getUser();

        // When -  action or the behaviour that we are going test
        given(userRepository.findById(1L)).willReturn(Optional.of(user));

        //update user-helper entities
        User expectedUser = responseHelper.getUser();
        expectedUser.setId(user.getId());
        expectedUser.setEmail("new@email.de");
        expectedUser.setFirstName("Jack");
        expectedUser.setLastName("Brown");
        given(userRepository.save(any(User.class))).willReturn(expectedUser);

        User updatedUser = userService.updateUser(1L, responseHelper.getUserRequest());

        // Then
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any(User.class));
        assertThat(updatedUser).isNotNull();
        assertEquals(expectedUser.getId(), updatedUser.getId());
        assertEquals(expectedUser.getFirstName(), updatedUser.getFirstName());
        assertEquals(expectedUser.getLastName(), updatedUser.getLastName());
        assertEquals(expectedUser.getEmail(), updatedUser.getEmail());
    }

    @Test()
    public void updateUser_WithNonExistingUserId_ShouldThrowException() {
        // Given
        UserRequest userRequest = responseHelper.getUserRequest();
        long userId = 1L;
        String exceptionMessage = "User with ID " + userId + " not found";

        // When -  action or the behaviour that we are going test
        given(userRepository.findById(userId)).willReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> userService.updateUser(userId, userRequest));

        // Then
        verify(userRepository, times(1)).findById(userId);
        assertEquals(exceptionMessage, exception.getMessage());
    }

    @Test
    public void deleteUser_WithExistingUserId_ShouldReturnTrue() {
        // When -  action or the behaviour that we are going test
        willDoNothing().given(userRepository).deleteById(1L);

        userService.deleteUser(1L);

        // Then
        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testUpdateUserImage_WithImage() throws IOException {
        // Given
        Long userId = 1L;
        byte[] content = Files.readAllBytes(Paths.get("src/main/resources/static/john.svg"));
        MockMultipartFile imageByte = new MockMultipartFile("image", "john.svg", "image/svg", content);
        User existingUser = responseHelper.getUser();
        String image =  Base64.getEncoder().encodeToString(imageByte.getBytes());

        // When
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));

        //Update user-helper entities
        existingUser.getUserDetails().setImage(image);
        when(userRepository.save(existingUser)).thenReturn(existingUser);

        User updatedUser = userService.setUserImage(userId, imageByte);

        // Then
        assertSame(existingUser, updatedUser);
        assertEquals(image, updatedUser.getUserDetails().getImage());
    }

    @Test
    public void testUpdateUserImage_WithoutImage() throws IOException {
        // Given
        Long userId = 1L;
        byte[] defaultImageData = getDefaultImageData();
        User existingUser = responseHelper.getUser();
        String image =  Base64.getEncoder().encodeToString(defaultImageData);

        // When
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));

        //Update user-helper entities
        existingUser.getUserDetails().setImage(null);
        when(userRepository.save(existingUser)).thenReturn(existingUser);
        existingUser.getUserDetails().setImage(image);
        when(userRepository.save(existingUser)).thenReturn(existingUser);

        User updatedUser = userService.setUserImage(userId, null);

        // Then
        assertSame(existingUser, updatedUser);
        assertEquals(image, updatedUser.getUserDetails().getImage());
    }

    private byte[] getDefaultImageData() throws IOException {
        File file = ResourceUtils.getFile("classpath:static/john.svg");
        return Files.readAllBytes(file.toPath());
    }
}