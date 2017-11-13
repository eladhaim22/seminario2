package com.uade.seminario2.service.mapper.Impl;

import com.netflix.discovery.converters.Auto;
import com.uade.seminario2.domain.Message;
import com.uade.seminario2.domain.MessageDetail;
import com.uade.seminario2.repository.Impl.MessageDetailRepositoryImpl;
import com.uade.seminario2.repository.Impl.MessageRepositoryImpl;
import com.uade.seminario2.service.dto.MessageDTO;
import com.uade.seminario2.service.dto.MessageDetailDTO;
import com.uade.seminario2.service.mapper.IEntityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessageDetailMapper implements IEntityMapper<MessageDetail,MessageDetailDTO> {

    @Autowired
    private MessageDetailRepositoryImpl messageDetailRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private MessageMapper messageMapper;

    public MessageDetailDTO ToDTO(MessageDetail messageDetail){
        return new MessageDetailDTO() {{
            setId(messageDetail.getId());
            setMessage(messageMapper.ToDTO(messageDetail.getMessage()));
            setOwner(userMapper.userToUserDTO(messageDetail.getOwner()));
            setCourse(courseMapper.ToDTO(messageDetail.getCourse()));
            setTargetUser(userMapper.userToUserDTO(messageDetail.getTargetUser()));
            setNew(messageDetail.isNew());
        }};
    }

    public MessageDetail ToModel(MessageDetailDTO messageDetailDTO){
        MessageDetail messageDetail = messageDetailRepository.findOne(messageDetailDTO.getId());
        if(messageDetail == null){
            messageDetail = new MessageDetail();
        }

        messageDetail.setNew(messageDetail.isNew());
        messageDetail.setMessage(messageMapper.ToModel(messageDetailDTO.getMessage()));
        messageDetail.setCourse(courseMapper.ToModel(messageDetailDTO.getCourse()));
        messageDetail.setOwner(userMapper.userDTOToUser(messageDetailDTO.getOwner()));
        messageDetail.setTargetUser(userMapper.userDTOToUser(messageDetailDTO.getTargetUser()));
        return messageDetail;
    }
}
