package backend.CodelessUML.generators;

import org.springframework.stereotype.Service;

import backend.CodelessUML.model.Node;

@Service
public interface FileGenerator {
   public String generate(Node node);
}
