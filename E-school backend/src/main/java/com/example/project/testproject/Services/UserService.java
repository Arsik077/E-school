package com.example.project.testproject.Services;

import com.example.project.testproject.entities.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    Users findUserByEmail(String email);
    Users saveUser(Users user);
    Users getUser(Long id);
}
