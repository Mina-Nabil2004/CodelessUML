package backend.CodelessUML.sessions;

import backend.CodelessUML.model.Node;

public interface SessionType {
   void send(Session current, Node node);
}
