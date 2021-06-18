package com.example.project.testproject.Services.ServiceImplementation;

import com.example.project.testproject.Services.StudentService;
import com.example.project.testproject.entities.Student;
import com.example.project.testproject.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<Student> allStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student getStudent(Long id) {
        return studentRepository.getById(id);
    }

    @Override
    public void deleteStudent(Student student) {
            studentRepository.delete(student);
    }
}
