package backend.CodelessUML.services;

import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.dto.SessionDiagramDto;
import backend.CodelessUML.sessions.Session;
import backend.CodelessUML.sessions.SessionPool;
import backend.CodelessUML.sessions.SessionTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

@Service
public class SessionService {
   @Autowired
   private SessionPool sessionPool;

   private HashMap<UUID, Session> sessions = new HashMap<>();

   public Session createSession(String username, SessionTypes type) {
      Session newSession = sessionPool.reuseSession(username, type);
      sessions.put(newSession.getId(), newSession);
      return newSession;
   }

   public void closeSession(UUID id) {
      Session session = getSession(id);
      sessionPool.storeSession(session);
      sessions.remove(id);
   }

   public boolean acceptUser(UUID id, String username) {
      Session session = getSession(id);
      return session.acceptUser(username.toLowerCase());
   }

   public Session getSession(UUID id) {
      return sessions.getOrDefault(id, null);
   }

   public boolean updateDiagram(SessionDiagramDto diagramDto) {
      Session session = getSession(diagramDto.getSessionId());
      return session.send(diagramDto.getSender(), diagramDto.getNode());
   }

}
