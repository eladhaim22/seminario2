package com.uade.seminario2.service.mapper;


import com.uade.seminario2.domain.EntityImpl;
import com.uade.seminario2.service.dto.EntityDTO;

public interface IEntityMapper<TEntity extends EntityImpl,TDTO extends EntityDTO> {

    TDTO ToDTO(TEntity entity);

    TEntity ToModel(TDTO model);
}
