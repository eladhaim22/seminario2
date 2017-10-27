package com.uade.seminario2.service.mapper.Impl;


import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.repository.Impl.ChildRepositoryImpl;
import com.uade.seminario2.repository.Impl.GradeRepositoryImpl;
import com.uade.seminario2.service.mapper.IEntityMapper;
import com.uade.seminario2.service.dto.GradeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class GradeMapper implements IEntityMapper<Grade,GradeDTO> {

    @Autowired
    GradeRepositoryImpl gradeRepository;

    @Autowired
    ChildRepositoryImpl chileRepository;

    @Autowired
    TeacherMapper teacherMapper;

    @Autowired
    ChildMapper childMapper;

    public GradeDTO ToDTO(Grade grade) {
        GradeDTO gradeDTO = new GradeDTO();
        gradeDTO.setId(grade.getId());
        gradeDTO.setTeachers(grade.getTeachers()
            .stream().map(teacher -> teacherMapper.ToDTO(teacher)).collect(Collectors.toList()));
        gradeDTO.setChilds(grade.getStudents()
            .stream().map(child -> childMapper.ToDTO(child)).collect(Collectors.toList()));
        return gradeDTO;
    }

    public Grade ToModel(GradeDTO gradeDTO) {
        Grade grade = null;
        if (gradeDTO.getId() == null) {
            grade = new Grade();
        }
        else {
            grade = gradeRepository.findOne(gradeDTO.getId());
        }
        grade.getStudents().clear();
        grade.getTeachers().clear();
        grade.getTeachers().addAll(gradeDTO.getTeachers()
            .stream().map(teacher -> teacherMapper.ToModel(teacher)).collect(Collectors.toList()));
        grade.getStudents().addAll(gradeDTO.getChilds()
            .stream().map(child -> childMapper.ToModel(child)).collect(Collectors.toList()));
        return grade;
    }
}
