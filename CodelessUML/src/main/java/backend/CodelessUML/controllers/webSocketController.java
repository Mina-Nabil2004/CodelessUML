package backend.CodelessUML.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;


public class WebSocketController {
   private final SimpMessagingTemplate messagingTemplate;

   @Autowired
   public WebSocketController(SimpMessagingTemplate messagingTemplate) {
      this.messagingTemplate = messagingTemplate;
   }

   @MessageMapping("/session")
   public void sendNode(NodeDto node) {
      // System.out.println("Sending memento ");
      messagingTemplate.convertAndSend("/topic/updates", memento);
   }
}