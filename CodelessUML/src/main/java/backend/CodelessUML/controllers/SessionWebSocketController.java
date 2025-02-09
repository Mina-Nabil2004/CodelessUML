package backend.CodelessUML.controllers;

import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.dto.SessionDiagramDto;
import backend.CodelessUML.services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.UUID;

@Controller
@CrossOrigin("*")
@RequestMapping("/session")
public class SessionWebSocketController {
   @Autowired
   private SimpMessagingTemplate messagingTemplate;

   @Autowired
   private SessionService sessionService;

   @MessageMapping("/update")
   public boolean requestUpdateNode(@Payload SessionDiagramDto diagramDto) {
      return sessionService.updateDiagram(diagramDto);
   }

   public void updateNode(UUID sessionId, Node node) {
      messagingTemplate.convertAndSend("/update/" + sessionId.toString(), node);
   }

   @MessageMapping("/enter-user")
   public void enterUser(UUID sessionId, String username) {
      messagingTemplate.convertAndSend("/enter-user/" + sessionId.toString(), username);
   }

}