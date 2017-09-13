package com.uade.seminario2.service.mapper.Impl;

import com.uade.seminario2.domain.Message;
import com.uade.seminario2.repository.IEntityRepository;
import com.uade.seminario2.repository.Impl.MessageRepositoryImpl;
import com.uade.seminario2.repository.UserRepository;
import com.uade.seminario2.service.IEntityMapper;
import com.uade.seminario2.service.dto.MessageDTO;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class MessageMapper implements IEntityMapper<Message,MessageDTO> {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private MessageRepositoryImpl messageRepository;

    @Autowired
    private UserRepository userRepository;

    public MessageDTO ToDTO(Message message){
        return new MessageDTO() {{
            setId(message.getId());
            setMessage(message.getMessage());
            setOwner(userMapper.userToUserDTO(message.getOwner()));
            setTargetUsersIds(message.getTargetUsers().stream().map(user -> Long.parseLong(user.getId())).collect(Collectors.toList()));
        }};
    }

    public Message ToModel(MessageDTO messageDTO){
        Message message = messageRepository.findOne(messageDTO.getId());
        if(message == null){
            message = new Message();
            message.setId(new ObjectId().toString());
        }

        message.setOwner(userMapper.userDTOToUser(messageDTO.getOwner()));
        //message.setTargetUsers(userRepository.findAllByIdsIn(messageDTO.getTargetUsersIds()).stream()
        //.collect(Collectors.toSet()));
        message.setMessage(messageDTO.getMessage());
        return message;
    }
}
