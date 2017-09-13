package com.uade.seminario2.service;

import com.uade.seminario2.domain.Entity;
import com.uade.seminario2.service.dto.EntityDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public interface  IGenericQueryService<TEntity extends Entity,TDTO extends EntityDTO> {
    TDTO GetById(Long id);

    List<TDTO> GetAll();
}
