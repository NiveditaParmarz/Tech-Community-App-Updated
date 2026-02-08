package com.nagarro.product_community_api.service;

import com.nagarro.product_community_api.dto.RegisterRequest;
import com.nagarro.product_community_api.model.User;
import com.nagarro.product_community_api.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegister_Success() {
        
        RegisterRequest request = new RegisterRequest();
        request.setName("John Doe");
        request.setEmail("john@example.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(new User());

        
        String result = userService.register(request);

        
        assertEquals("User registered successfully", result);
        verify(userRepository).save(any(User.class));
        verify(passwordEncoder).encode("password123");
    }

    @Test
    void testRegister_EmailAlreadyExists() {
        
        RegisterRequest request = new RegisterRequest();
        request.setName("John Doe");
        request.setEmail("john@example.com");
        request.setPassword("password123");

        User existingUser = new User();
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(existingUser));

        
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.register(request);
        });

        assertEquals("Email already exists", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testLogin_Success() {
        
        com.nagarro.product_community_api.dto.LoginRequest request = new com.nagarro.product_community_api.dto.LoginRequest();
        request.setEmail("john@example.com");
        request.setPassword("password123");

        User user = new User();
        user.setEmail("john@example.com");
        user.setPassword("encodedPassword");

        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);

    
        String result = userService.login(request);

        
        assertEquals("Login successful", result);
        verify(userRepository).findByEmail("john@example.com");
        verify(passwordEncoder).matches("password123", "encodedPassword");
    }

    @Test
    void testLogin_UserNotFound() {
      
        com.nagarro.product_community_api.dto.LoginRequest request = new com.nagarro.product_community_api.dto.LoginRequest();
        request.setEmail("nonexistent@example.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.login(request);
        });

        assertEquals("Invalid credentials", exception.getMessage());
        verify(passwordEncoder, never()).matches(any(), any());
    }
}
