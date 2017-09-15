package com.uade.seminario2.service;

import com.uade.seminario2.domain.EntityImpl;
import com.uade.seminario2.service.dto.EntityDTO;
import sun.font.CreatedFontTracker;

public interface IGenericService<TEntity extends EntityImpl, TDTO extends EntityDTO>
    extends IGenericQueryService<TEntity,TDTO> {
    public void Create(TDTO entityDto);

    public void Update(TDTO entityDto);

    public void Delete(Long id);
}
