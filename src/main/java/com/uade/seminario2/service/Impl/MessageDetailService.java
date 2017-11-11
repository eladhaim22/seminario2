package com.uade.seminario2.service.Impl;


import com.uade.seminario2.domain.MessageDetail;
import com.uade.seminario2.repository.Impl.MessageDetailRepositoryImpl;
import com.uade.seminario2.security.SecurityUtils;
import com.uade.seminario2.service.IGenericService;
import com.uade.seminario2.service.dto.MessageDetailDTO;
import com.uade.seminario2.service.mapper.Impl.MessageDetailMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MessageDetailService extends GenericService<MessageDetail,MessageDetailDTO> implements IGenericService<MessageDetail,MessageDetailDTO> {
    public MessageDetailService(MessageDetailMapper messageDetailMapper, MessageDetailRepositoryImpl messageDetailRepository) {
        super(messageDetailMapper, messageDetailRepository);

    }

    public List<MessageDetailDTO> getMessageByTargerUserAndCourseId(Long courseId) {
        List<MessageDetail> messageDetails = ((MessageDetailRepositoryImpl) this.repository)
            .findAllByTargetUser_LoginAndCourse_Id(SecurityUtils.getCurrentUserLogin(), courseId);

        return messageDetails.stream().map(md -> ((MessageDetailMapper)this.entityMapper).ToDTO(md))
            .collect(Collectors.toList());
    }

    public List<MessageDetailDTO> getMessageByOwnerUserAndCourseId(Long courseId){
        List<MessageDetail> messageDetails = ((MessageDetailRepositoryImpl) this.repository)
            .findAllByOwner_LoginAndCourse_Id(SecurityUtils.getCurrentUserLogin(), courseId);

        return messageDetails.stream().map(md -> ((MessageDetailMapper)this.entityMapper).ToDTO(md))
            .collect(Collectors.toList());
    }
}
