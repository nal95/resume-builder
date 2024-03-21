package com.nal95.resumebuilder;

import com.nal95.resumebuilder.entities.User;
import com.nal95.resumebuilder.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class ResumeBuilderApplication implements CommandLineRunner {

    @Autowired
    private UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(ResumeBuilderApplication.class, args);
    }

    @Override
    public void run(String... args) {
        User user = userService.setUserImage(1L, null);
        if (user != null) {
            log.info("Init user image updated successfully.");
        } else {
            log.info("Init user not found.");
        }
    }

}
