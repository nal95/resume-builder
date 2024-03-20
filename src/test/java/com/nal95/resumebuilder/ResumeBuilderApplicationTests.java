package com.nal95.resumebuilder;

import com.nal95.resumebuilder.entities.User;
import com.nal95.resumebuilder.helpers.Response;
import com.nal95.resumebuilder.services.UserService;
import org.apache.logging.log4j.util.Strings;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class ResumeBuilderApplicationTests {

    @Mock
    private UserService userService;

    @InjectMocks
    private ResumeBuilderApplication application;

    Response responseHelper = null;

    AutoCloseable autoCloseable = null;

    private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
    private final PrintStream originalOut = System.out;

    @BeforeEach
    void Init() {
        responseHelper = new Response();
        System.setOut(new PrintStream(outContent));
        autoCloseable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    public void restoreStreams() throws Exception {
        System.setOut(originalOut);
        autoCloseable.close();
    }


    @Test
    public void testRunMethod_UserFound() {
        //Given
        // Prepare mock user
        byte[] image = "Test image data".getBytes();
        User user = responseHelper.getUser();
        user.getUserDetails().setImage(image);

        //When
        when(userService.setUserImage(1L, null)).thenReturn(user);
        // Call the run method
        application.run(Strings.EMPTY_ARRAY);

        //Then
        // Verify that "User image updated successfully." is printed
        assertEquals("User image updated successfully.", outContent.toString().trim());
    }

    @Test
    public void testRunMethod_UserNotFound() {
        //When
        // Prepare mock user
        when(userService.setUserImage(1L, null)).thenReturn(null);
        // Call the run method
        application.run(Strings.EMPTY_ARRAY);

        //Then
        // Verify that "User not found." is printed
        assertEquals("User not found.", outContent.toString().trim());
    }

}
