package com.uade.seminario2.web.rest;

import com.uade.seminario2.service.Impl.MessageDetailService;
import com.uade.seminario2.service.dto.MessageDetailDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/messageDetail")
@Controller
public class MessageDetailController extends GenericController<MessageDetailDTO> {

    public MessageDetailController(MessageDetailService entityService) {
        super(entityService);
    }

    @GetMapping("/inbox/")
    public  ResponseEntity<List<MessageDetailDTO>> getInbox(){
        return new ResponseEntity<List<MessageDetailDTO>>
            (((MessageDetailService)this.entityService).getMessageByTargerUser(),HttpStatus.OK);
    }


    @GetMapping("/shipped/")
    public ResponseEntity<List<MessageDetailDTO>> getShipped(){
        return new ResponseEntity<List<MessageDetailDTO>>
            (((MessageDetailService)entityService).getMessageByOwnerUser(), HttpStatus.OK);
    }

    @GetMapping("/inbox/{courseId}")
    public  ResponseEntity<List<MessageDetailDTO>> getInboxByCourseId(@PathVariable Long  courseId){
        return new ResponseEntity<List<MessageDetailDTO>>
            (((MessageDetailService)this.entityService).getMessageByTargerUserAndCourseId(courseId),HttpStatus.OK);
    }

    @GetMapping("/shipped/{courseId}")
    public ResponseEntity<List<MessageDetailDTO>> getShippedByCourseId(@PathVariable Long  courseId){
        return new ResponseEntity<List<MessageDetailDTO>>
            (((MessageDetailService)entityService).getMessageByOwnerUserAndCourseId(courseId), HttpStatus.OK);
    }

}

