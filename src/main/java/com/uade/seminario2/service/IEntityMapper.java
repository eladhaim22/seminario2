package com.uade.seminario2.service;

import com.uade.seminario2.domain.Entity;
import com.uade.seminario2.service.dto.EntityDTO;

public interface IEntityMapper<TEntity extends Entity,TDTO extends EntityDTO> {

    TDTO ToDTO(TEntity entity);

    TEntity ToModel(TDTO model);
}
