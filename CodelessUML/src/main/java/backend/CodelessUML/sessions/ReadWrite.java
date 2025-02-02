package backend.CodelessUML.sessions;


import backend.CodelessUML.model.Node;

public class ReadWrite implements SessionType {
   /**
    * send to all users subscribed in sessions
    * @param node to be sent to all subscribers in session
    * */
   @Override
   public void send(Session current, Node node) {
      // TODO: send to users
      // send to websocket controller
   }
}
