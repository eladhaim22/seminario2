package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Teacher;
import com.uade.seminario2.repository.Impl.TeacherRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import com.uade.seminario2.service.dto.TeacherDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sun.security.pkcs11.wrapper.CK_SSL3_KEY_MAT_OUT;

import java.util.stream.Collectors;

@Component
public class TeacherMapper implements IEntityMapper<Teacher,TeacherDTO> {

    @Autowired
    private TeacherRepositoryImpl teacherRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseMapper courseMapper;

    public TeacherDTO ToDTO(Teacher teacher){
        return new TeacherDTO() {{
            setId(teacher.getId());
            setName(teacher.getName());
            setLastName(teacher.getLastName());
            setUserId(teacher.getUser().getId());
            setCourses(teacher.getCourses().stream().map(course -> courseMapper.ToDTO(course)).collect(Collectors.toList()));
        }};
    }

    public Teacher ToModel(TeacherDTO teacherDTO) {
        Teacher teacher = null;
        if (teacherDTO.getId() == null) {
            teacher = new Teacher();
        }
        else {
            teacher = teacherRepository.findOne(teacherDTO.getId());
        }
        teacher.setName(teacherDTO.getName());
        teacher.setLastName(teacherDTO.getLastName());
        teacher.getCourses().clear();
        teacher.getCourses().addAll(teacherDTO.getCourses().stream().map(courseDTO -> courseMapper.ToModel(courseDTO)).collect(Collectors.toList()));
        return teacher;
    }
}
