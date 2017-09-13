package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Child;
import com.uade.seminario2.repository.Impl.ChildRepositoryImpl;
import com.uade.seminario2.repository.Impl.GradeRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.IEntityMapper;
import com.uade.seminario2.service.dto.ChildDTO;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChildMapper implements IEntityMapper<Child,ChildDTO> {

    @Autowired
    private GradeRepositoryImpl gradeRepository;

    @Autowired
    private ChildRepositoryImpl childRepository;

    @Autowired
    private UserRepository userRepository;

    public ChildDTO ToDTO(Child child){
        return new ChildDTO() {{
            setId(child.getId());
            setName(child.getName());
            setLastName(child.getLastName());
            setBirthDate(child.getBirthDate());
            setUserId(child.getUser().getId());
            setGradeId(child.getGrade().getId());
        }};
    }

    public Child ToModel(ChildDTO childDTO) {
        Child child = null;
        if (StringUtils.isEmpty(childDTO.getId())) {
            child = new Child();
            child.setId(new ObjectId().toString());
        }
        else {
            child = childRepository.findOne(childDTO.getId());
            child.setGrade(gradeRepository.findOne(childDTO.getGradeId()));
        }
        child.setName(childDTO.getName());
        child.setLastName(childDTO.getLastName());
        child.setBirthDate(childDTO.getBirthDate());
        child.setUser(userRepository.findOne(childDTO.getUserId()));
        return child;
    }
}
