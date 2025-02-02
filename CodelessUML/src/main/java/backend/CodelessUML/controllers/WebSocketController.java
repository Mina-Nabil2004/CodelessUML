package backend.CodelessUML.controllers;

import backend.CodelessUML.model.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
   @Autowired
   private SimpMessagingTemplate messagingTemplate;

   @MessageMapping("/session")
   public void sendNode(Node node) {
      // System.out.println("Sending memento ");
      messagingTemplate.convertAndSend("/topic/updates", node);
   }
}