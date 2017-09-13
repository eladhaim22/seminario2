package com.uade.seminario2.service.dto;

import com.uade.seminario2.domain.User;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MessageDTO extends EntityDTO {

    private UserDTO Owner;

    private List<Long> targetUsersIds = new ArrayList<>();

    private String message;

    public UserDTO getOwner() {
        return Owner;
    }

    public void setOwner(UserDTO owner) {
        Owner = owner;
    }

    public List<Long> getTargetUsersIds() {
        return targetUsersIds;
    }

    public void setTargetUsersIds(List<Long> targetUsersIds) {
        this.targetUsersIds = targetUsersIds;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
