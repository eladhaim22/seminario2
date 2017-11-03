package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.Student;
import com.uade.seminario2.repository.Impl.StudentRepositoryImpl;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.StudentDTO;
import com.uade.seminario2.service.mapper.Impl.StudentMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class StudentService extends GenericService<Student,StudentDTO> implements IGenericService<Student,StudentDTO> {
    public StudentService(StudentMapper studentMapper, StudentRepositoryImpl studentRepository) {
        super(studentMapper, studentRepository);
    }

    public List<CourseDTO> getCoursesByUserId(String login){
        StudentDTO studentDTO = ((StudentMapper)this.entityMapper).ToDTO(((StudentRepositoryImpl)this.repository)
            .findOneByUser_Login(login));
        List<CourseDTO> coursesDTO = studentDTO.getCourses();
        return coursesDTO;
    }
}
