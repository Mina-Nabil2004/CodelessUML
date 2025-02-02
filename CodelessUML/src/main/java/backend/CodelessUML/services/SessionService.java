package backend.CodelessUML.services;

import backend.CodelessUML.model.Node;
import backend.CodelessUML.sessions.Session;
import backend.CodelessUML.sessions.SessionPool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

@Service
public class SessionService {
   @Autowired
   private SessionPool sessionPool;

   private HashMap<UUID, Session> sessions = new HashMap<>();

   public Session createSession(String username, String type) {
      return sessionPool.reuseSession(username, type);
   }

   public void closeSession(UUID id) {
      Session session = getSession(id);
      sessionPool.storeSession(session);
      sessions.remove(id);
   }

   public Session getSession(UUID id) {
      return sessions.getOrDefault(id, null);
   }

   public void updateDiagram(UUID sessionId, Node node) {
      Session session = getSession(sessionId);
      session.send(node);
   }

}
