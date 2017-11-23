package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.domain.Material;
import com.uade.seminario2.repository.Impl.GradeRepositoryImpl;
import com.uade.seminario2.repository.Impl.MaterialRepositoryImpl;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.GradeDTO;
import com.uade.seminario2.service.dto.MaterialDTO;
import com.uade.seminario2.service.mapper.Impl.GradeMapper;
import com.uade.seminario2.service.mapper.Impl.MaterialMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MaterialService extends GenericService<Material,MaterialDTO> implements IGenericService<Material,MaterialDTO> {
    public MaterialService(MaterialMapper materialMapper, MaterialRepositoryImpl materialRepository) {
        super(materialMapper, materialRepository);
    }
}
