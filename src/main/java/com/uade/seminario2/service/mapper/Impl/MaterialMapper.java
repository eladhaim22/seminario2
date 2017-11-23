package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Course;
import com.uade.seminario2.domain.Material;
import com.uade.seminario2.repository.Impl.CourseRepositoryImpl;
import com.uade.seminario2.repository.Impl.MaterialRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.dto.CourseDTO;
import com.uade.seminario2.service.dto.MaterialDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaterialMapper implements IEntityMapper<Material,MaterialDTO>{

    @Autowired
    private MaterialRepositoryImpl materialRepository;

    @Autowired
    private CourseRepositoryImpl courseRepository;

    public MaterialDTO ToDTO(Material entity) {
        return new MaterialDTO(){{
            setId(entity.getId());
            setTitle(entity.getTitle());
            setCourse(entity.getCourse().getId());
            setVideoId(entity.getVideoId());
        }};
    }

    public Material ToModel(MaterialDTO model) {
        Material material = null;
        if (model.getId() == null) {
            material = new Material();
        }
        else {
            material = materialRepository.findOne(model.getId());
        }
        material.setCourse(courseRepository.getOne(model.getCourse()));
        material.setTitle(model.getTitle());
        material.setVideoId(model.getVideoId());
        return material;
    }
}
