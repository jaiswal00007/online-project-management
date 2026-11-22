package com.example.project_management_app.config;

import com.example.project_management_app.entity.User;
import com.example.project_management_app.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminUserInitializer {

    @Bean
    CommandLineRunner createAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@projectmanager.com");
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                admin.setFirstName("Admin");
                admin.setLastName("User");
                admin.setRole(User.Role.ROLE_ADMIN);
                userRepository.save(admin);
                System.out.println("Admin user created: username=admin password=Admin@123");
            }
        };
    }
}
