package backend.CodelessUML.sessions;

import backend.CodelessUML.model.Node;

public class ReadOnly implements SessionType {
   /**
    * send to all users subscribed in sessions
    * checks if sender is the owner only, otherwise return
    * @param node to be sent to all subscribers in session
    * */
   @Override
   public void send(Session current, Node node) {
      // validate user
      // send to websocket controller
   }
}
