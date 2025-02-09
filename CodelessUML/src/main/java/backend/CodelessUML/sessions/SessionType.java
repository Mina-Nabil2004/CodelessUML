package backend.CodelessUML.sessions;

import backend.CodelessUML.controllers.SessionWebSocketController;
import backend.CodelessUML.model.Node;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class SessionType {
   @Autowired
   SessionWebSocketController wsSender;

   abstract boolean send(Session current, String sender, Node node);
}
