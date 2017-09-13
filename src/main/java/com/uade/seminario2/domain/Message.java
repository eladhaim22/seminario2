package com.uade.seminario2.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uade.seminario2.config.Constants;
import com.uade.seminario2.repository.CascadeSupport.CascadeSave;
import jdk.nashorn.internal.objects.annotations.Property;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "message")
public class Message extends Entity {

    @NotNull
    private User Owner;

    @DBRef
    private List<User> targetUsers;

    @NotNull
    @Property(name ="message")
    private String message;

    public User getOwner() {
        return Owner;
    }

    public void setOwner(User owner) {
        Owner = owner;
    }

    public List<User> getTargetUsers() {
        return targetUsers;
    }

    public void setTargetUsers(List<User> targetUsers) {
        this.targetUsers = targetUsers;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
