package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Assitence;
import com.uade.seminario2.domain.Message;
import com.uade.seminario2.repository.Impl.AssitenceRepositoryImpl;
import com.uade.seminario2.repository.Impl.MessageRepositoryImpl;
import com.uade.seminario2.service.dto.AssitenceDTO;
import com.uade.seminario2.service.dto.MessageDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssistenceMapper implements IEntityMapper<Assitence,AssitenceDTO> {

    @Autowired
    private AssitenceRepositoryImpl assitenceRepository;

    public AssitenceDTO ToDTO(Assitence assitence){
        return new AssitenceDTO() {{
            setId(assitence.getId());
            setPresent(assitence.isPresent());
            setDate(assitence.getDate());
        }};
    }

    public Assitence ToModel(AssitenceDTO assitenceDTO){
        Assitence assitence = null;
        if(assitenceDTO.getId() == null){
            assitence = new Assitence();
        }
        else{
            assitence = assitenceRepository.findOne(assitenceDTO.getId());
        }

        assitence.setDate(assitenceDTO.getDate());
        assitence.setPresent(assitenceDTO.isPresent());
        return assitence;
    }
}
