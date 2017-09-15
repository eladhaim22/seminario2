package com.uade.seminario2.service;


import com.uade.seminario2.domain.EntityImpl;
import com.uade.seminario2.service.dto.EntityDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public interface  IGenericQueryService<TEntity extends EntityImpl,TDTO extends EntityDTO> {
    TDTO GetById(String id);

    List<TDTO> GetAll();
}
