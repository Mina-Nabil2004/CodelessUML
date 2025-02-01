package backend.CodelessUML.generators.FileGenerators;


import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.model.Node;
import lombok.Data;

@Data
public abstract class FileGenerator {
   protected CodeFileGenerator codeFileGenerator;
   protected StringBuilder codeBuilder;

   public FileGenerator(CodeFileGenerator codeFileGenerator) {
      this.codeFileGenerator = codeFileGenerator;
      this.codeBuilder = new StringBuilder();
   }

   protected abstract String generate(Node node);
}