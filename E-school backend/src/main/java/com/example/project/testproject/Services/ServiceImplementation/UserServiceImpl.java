package com.example.project.testproject.Services.ServiceImplementation;

import com.example.project.testproject.Services.UserService;
import com.example.project.testproject.entities.Users;
import com.example.project.testproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Users findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Users myUser = userRepository.findByEmail(s);
        if(myUser!=null){
            User secUser = new User(myUser.getEmail(),myUser.getPassword(),null);
            return secUser;
        }
        throw  new UsernameNotFoundException("User not found");
    }

    @Override
    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    @Override
    public Users getUser(Long id) {
        return userRepository.getById(id);
    }
}
