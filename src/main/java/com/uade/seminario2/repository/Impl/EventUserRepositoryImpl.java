package com.uade.seminario2.repository.Impl;

import com.uade.seminario2.domain.Event;
import com.uade.seminario2.domain.EventUser;
import com.uade.seminario2.repository.IEntityRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface EventUserRepositoryImpl extends IEntityRepository<EventUser> {
    List<EventUser> findAllByUser_Id(Long Id);
}

