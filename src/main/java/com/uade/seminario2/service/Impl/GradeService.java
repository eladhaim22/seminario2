package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.repository.Impl.GradeRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.GradeDTO;
import com.uade.seminario2.service.mapper.Impl.CourseMapper;
import com.uade.seminario2.service.mapper.Impl.GradeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class GradeService extends GenericService<Grade,GradeDTO> implements IGenericService<Grade,GradeDTO> {
    public GradeService(GradeMapper gradeMapper, GradeRepositoryImpl gradeRepository) {
        super(gradeMapper, gradeRepository);
    }
}
