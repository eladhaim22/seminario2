package com.uade.seminario2.web.rest;

import com.uade.seminario2.service.dto.MessageDetailDTO;
import com.uade.seminario2.service.dto.UserDTO;

import java.util.ArrayList;
import java.util.List;

public class MessageDetailWrapper {

    private MessageDetailDTO messageDetail;

    private List<UserDTO> users = new ArrayList<>();

    public MessageDetailDTO getMessageDetail() {
        return messageDetail;
    }

    public void setMessageDetail(MessageDetailDTO messageDetail) {
        this.messageDetail = messageDetail;
    }

    public List<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserDTO> users) {
        this.users = users;
    }
}
