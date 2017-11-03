package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Message;
import com.uade.seminario2.domain.Teacher;
import com.uade.seminario2.repository.Impl.MessageRepositoryImpl;
import com.uade.seminario2.repository.Impl.TeacherRepositoryImpl;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.MessageDTO;
import com.uade.seminario2.service.dto.TeacherDTO;
import com.uade.seminario2.service.mapper.Impl.MessageMapper;
import com.uade.seminario2.service.mapper.Impl.TeacherMapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TeacherService extends GenericService<Teacher,TeacherDTO> implements IGenericService<Teacher,TeacherDTO> {
    public TeacherService(TeacherMapper teacherMapper, TeacherRepositoryImpl teacherRepository) {
        super(teacherMapper, teacherRepository);
    }

    public List<CourseDTO> getCoursesByUserId(String login){
        TeacherDTO teacherDTO = ((TeacherMapper)this.entityMapper).ToDTO(((TeacherRepositoryImpl)this.repository)
            .findOneByUser_Login(login));
        List<CourseDTO> coursesDTO = teacherDTO.getCourses();
        return coursesDTO;
    }
}
