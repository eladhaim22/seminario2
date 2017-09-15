package com.uade.seminario2.repository;

import com.uade.seminario2.domain.EntityImpl;
import org.springframework.data.jpa.repository.JpaRepository;



public interface IEntityRepository<TEntity extends EntityImpl> extends JpaRepository<TEntity, Long>{
}
