package backend.CodelessUML.generators.FileGenerators;

import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.generators.languages.Factory.CodeFileGeneratorFactory;
import backend.CodelessUML.generators.languages.Langauge;
import backend.CodelessUML.model.Node;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
public abstract class FileGenerator {
   @Autowired
   private CodeFileGeneratorFactory codeFileGeneratorFactory;
   protected CodeFileGenerator codeFileGenerator;
   protected StringBuilder codeBuilder;

   public FileGenerator(CodeFileGenerator codeFileGenerator) {
      this.codeFileGenerator = codeFileGenerator;
      this.codeBuilder = new StringBuilder();
   }

   public void setLanguage(CodeFileGenerator codeFileGenerator) {
      this.codeFileGenerator = codeFileGenerator;
   }
   public void setLanguage(Langauge language) {
      this.codeFileGenerator = codeFileGeneratorFactory.create(language);
   }
   protected abstract String generate(Node node);
}