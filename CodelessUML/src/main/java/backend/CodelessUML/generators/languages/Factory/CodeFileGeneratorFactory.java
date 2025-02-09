package backend.CodelessUML.generators.languages.Factory;

import java.util.HashMap;
import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.generators.languages.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CodeFileGeneratorFactory {
   @Autowired
   private HashMap<String, CodeFileGenerator> fileGenerators;

    public CodeFileGeneratorFactory(HashMap<String, CodeFileGenerator> fileGenerators) {
        this.fileGenerators = fileGenerators;
    }

    public CodeFileGenerator create(Language language) {
      CodeFileGenerator generator = this.fileGenerators.get(language.getFiletype());
      if (generator == null) {
         throw new UnsupportedOperationException("Unsupported language: " + language);
      }
      return generator;
   }
}