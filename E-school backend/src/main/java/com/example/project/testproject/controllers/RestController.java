package com.example.project.testproject.controllers;
import com.example.project.testproject.Services.StudentService;
import com.example.project.testproject.Services.UserService;
import com.example.project.testproject.entities.Student;
import com.example.project.testproject.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class RestController {

    @Autowired
    private UserService userService;

    @Autowired
    private StudentService studentService;

    @PostMapping(value = "/authorization")
    public ResponseEntity<?> authorization(@RequestBody Users user){
        Users myUser = userService.findUserByEmail(user.getEmail());
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        if(bCryptPasswordEncoder.matches(user.getPassword(),myUser.getPassword())){
            return ResponseEntity.ok(myUser);
        }

        return ResponseEntity.notFound().build();

    }

    @GetMapping(value = "/allStudents")
    public ResponseEntity<?> allStudents(){
        List<Student> students = studentService.allStudents();
        return ResponseEntity.ok(students);
    }

    @PostMapping(value = "/saveStudent")
    public ResponseEntity<?> saveStudent(@RequestBody Student student){
        studentService.saveStudent(student);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/deleteStudent")
    public ResponseEntity<?> deleteStudent(@RequestBody Student student){
        studentService.deleteStudent(student);
        return ResponseEntity.ok().build();
    }


}
