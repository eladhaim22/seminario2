package com.uade.seminario2.service.Impl;

import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.repository.Impl.GradeRepositoryImpl;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.GradeDTO;
import com.uade.seminario2.service.mapper.Impl.GradeMapper;
import org.springframework.stereotype.Service;

@Service
public class GradeService extends GenericService<Grade,GradeDTO> implements IGenericService<Grade,GradeDTO> {
    public GradeService(GradeMapper gradeMapper, GradeRepositoryImpl gradeRepositoryImpl) {
        super(gradeMapper, gradeRepositoryImpl);
    }
}
