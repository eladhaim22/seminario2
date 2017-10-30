package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Student;
import com.uade.seminario2.repository.Impl.StudentRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.mapper.IEntityMapper;
import com.uade.seminario2.service.dto.StudentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper implements IEntityMapper<Student,StudentDTO> {

    @Autowired
    private StudentRepositoryImpl studentRepository;

    @Autowired
    private UserRepository userRepository;

    public StudentDTO ToDTO(Student student){
        return new StudentDTO() {{
            setId(student.getId());
            setBirthDate(student.getBirthDate());
            setUserId(student.getUser().getId());
        }};
    }

    public Student ToModel(StudentDTO studentDTO) {
        Student student = null;
        if (studentDTO.getId() == null) {
            student = new Student();
        }
        else {
            student = studentRepository.findOne(studentDTO.getId());
        }
        student.setBirthDate(studentDTO.getBirthDate());
        student.setUser(userRepository.findOne(studentDTO.getUserId()));
        return student;
    }
}