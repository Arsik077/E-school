package com.example.project.testproject.Services;

import com.example.project.testproject.entities.Student;

import java.util.List;

public interface StudentService {
    List<Student> allStudents();
    Student saveStudent(Student student);
    Student getStudent(Long id);
    void deleteStudent(Student student);
}
