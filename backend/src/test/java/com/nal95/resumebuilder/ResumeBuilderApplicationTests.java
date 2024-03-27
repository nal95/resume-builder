package com.nal95.resumebuilder;

import com.nal95.resumebuilder.entities.User;
import com.nal95.resumebuilder.helpers.Response;
import com.nal95.resumebuilder.services.UserService;
import org.apache.logging.log4j.util.Strings;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;

import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(OutputCaptureExtension.class)
class ResumeBuilderApplicationTests {

    @Mock
    private UserService userService;

    @InjectMocks
    private ResumeBuilderApplication application;

    Response responseHelper = null;

    @BeforeEach
    void Init() {
        responseHelper = new Response();
    }


    @Test
    public void testRunMethod_UserFound(CapturedOutput output) {
        //Given
        // Prepare mock user
        byte[] image = "Test image data".getBytes();
        String imageToSave =  Base64.getEncoder().encodeToString(image);
        User user = responseHelper.getUser();
        user.getUserDetails().setImage(imageToSave);

        //When
        when(userService.setUserImage(1L, null)).thenReturn(user);
        // Call the run method
        application.run(Strings.EMPTY);

        //Then
        // Verify that "User image updated successfully." is printed
        assertThat(output).contains("Init user image updated successfully.");
    }

    @Test
    public void testRunMethod_UserNotFound(CapturedOutput output) {
        //When
        // Prepare mock user
        when(userService.setUserImage(1L, null)).thenReturn(null);
        // Call the run method
        application.run(Strings.EMPTY);

        //Then
        // Verify that "User not found." is printed
        assertThat(output).contains("Init user not found.");
    }

}
