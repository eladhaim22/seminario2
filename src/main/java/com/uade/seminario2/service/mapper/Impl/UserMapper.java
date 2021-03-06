package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Assitence;
import com.uade.seminario2.domain.Authority;
import com.uade.seminario2.domain.Grade;
import com.uade.seminario2.domain.User;
import com.uade.seminario2.service.dto.AssitenceDTO;
import com.uade.seminario2.service.dto.UserDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Mapper for the entity User and its DTO called UserDTO.
 *
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class UserMapper {

    @Autowired
    private GradeMapper gradeMapper;

    @Autowired
    private AssistenceMapper assistenceMapper;


    public UserDTO userToUserDTO(User user) {
        return new UserDTO(){{
            setId(user.getId());
            setLogin(user.getLogin());
            setFirstName(user.getFirstName());
            setLastName(user.getLastName());
            setEmail(user.getEmail());
            setActivated(user.getActivated());
            setImageUrl(user.getImageUrl());
            setLangKey(user.getLangKey());
            setCreatedBy(user.getCreatedBy());
            setCreatedDate(user.getCreatedDate());
            setLastModifiedBy(user.getLastModifiedBy());
            setLastModifiedDate(user.getLastModifiedDate());
            setAuthorities(user.getAuthorities().stream().map(Authority::getName)
                .collect(Collectors.toSet()));
            setAssitenceDTOS(user.getAssitence().stream().map(assitence ->
            assistenceMapper.ToDTO(assitence)).collect(Collectors.toList()));
            if(user.getGrade() != null) {
                setGrade(gradeMapper.ToDTO(user.getGrade()));
            }
        }};
    }

    public List<UserDTO> usersToUserDTOs(List<User> users) {
        return users.stream()
            .filter(Objects::nonNull)
            .map(user -> this.userToUserDTO(user))
            .collect(Collectors.toList());
    }

    public User userDTOToUser(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        } else {
            User user = new User();
            user.setId(userDTO.getId());
            user.setLogin(userDTO.getLogin());
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setEmail(userDTO.getEmail());
            user.setImageUrl(userDTO.getImageUrl());
            user.setActivated(userDTO.isActivated());
            user.setLangKey(userDTO.getLangKey());
            Set<Authority> authorities = this.authoritiesFromStrings(userDTO.getAuthorities());
            if(authorities != null) {
                user.setAuthorities(authorities);
            }
            user.getAssitence().clear();
            user.getAssitence().addAll(userDTO.getAssitenceDTOS().stream().map(
                assitenceDTO -> assistenceMapper.ToModel(assitenceDTO))
                .collect(Collectors.toList()));
            if(user.getGrade() != null) {
                user.setGrade(gradeMapper.ToModel(userDTO.getGrade()));
            }
            return user;
        }
    }

    public List<User> userDTOsToUsers(List<UserDTO> userDTOs) {
        return userDTOs.stream()
            .filter(Objects::nonNull)
            .map(this::userDTOToUser)
            .collect(Collectors.toList());
    }

    public User userFromId(Long id) {
        if (id == null) {
            return null;
        }
        User user = new User();
        user.setId(id);
        return user;
    }

    public Set<Authority> authoritiesFromStrings(Set<String> strings) {
        return strings.stream().map(string -> {
            Authority auth = new Authority();
            auth.setName(string);
            return auth;
        }).collect(Collectors.toSet());
    }
}
