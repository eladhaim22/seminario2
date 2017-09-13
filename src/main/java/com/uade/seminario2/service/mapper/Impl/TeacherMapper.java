package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.domain.Teacher;
import com.uade.seminario2.repository.Impl.GradeRepositoryImpl;
import com.uade.seminario2.repository.Impl.TeacherRepositoryImpl;
import com.uade.seminario2.service.IEntityMapper;
import com.uade.seminario2.service.dto.TeacherDTO;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class TeacherMapper implements IEntityMapper<Teacher,TeacherDTO> {

    @Autowired
    private GradeRepositoryImpl gradeRepository;

    @Autowired
    private TeacherRepositoryImpl teacherRepository;

    public TeacherDTO ToDTO(Teacher teacher){
        return new TeacherDTO() {{
            setId(teacher.getId());
            setName(teacher.getName());
            setLastName(teacher.getLastName());
            setGradeIds(teacher.getGrades().stream().map(grade -> grade.getId()).collect(Collectors.toList()));
        }};
    }

    public Teacher ToModel(TeacherDTO teacherDTO) {
        Teacher teacher = null;
        if (StringUtils.isEmpty(teacherDTO.getId())) {
            teacher = new Teacher();
            teacher.setId(new ObjectId().toString());
        }
        else {
            teacher = teacherRepository.findOne(teacherDTO.getId());
        }
        teacher.setName(teacherDTO.getName());
        teacher.setLastName(teacherDTO.getLastName());
        teacher.getGrades().clear();
        teacher.getGrades().addAll(teacherDTO.getGradeIds()
            .stream().map(gradeId -> (Grade)gradeRepository.findOne(gradeId)).collect(Collectors.toSet()));
        return teacher;
    }
}
