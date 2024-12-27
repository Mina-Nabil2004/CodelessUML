package backend.CodelessUML.abstraction;

import org.springframework.stereotype.Component;

public interface Generator {
   public String generate(Component node);
}
