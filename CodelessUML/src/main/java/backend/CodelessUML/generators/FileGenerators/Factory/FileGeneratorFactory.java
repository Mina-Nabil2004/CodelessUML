package backend.CodelessUML.generators.FileGenerators.Factory;

import backend.CodelessUML.generators.FileGenerators.Impl.AbstractClassGenerator;
import backend.CodelessUML.generators.FileGenerators.Impl.ClassGenerator;
import backend.CodelessUML.generators.languages.Factory.CodeFileGeneratorFactory;
import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.generators.FileGenerators.Impl.EnumGenerator;
import backend.CodelessUML.generators.FileGenerators.FileGenerator;
import backend.CodelessUML.generators.FileGenerators.Impl.InterfaceGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FileGeneratorFactory {
    @Autowired
    private CodeFileGeneratorFactory codeFileGeneratorFactory;

    FileGenerator createFile(String language ,String type) {
        CodeFileGenerator codeFileGenerator = codeFileGeneratorFactory.create(language);
        return switch (type) {
            case "class"            -> new ClassGenerator(codeFileGenerator);
            case "interface"        -> new InterfaceGenerator(codeFileGenerator);
            case "abstract class"   -> new AbstractClassGenerator(codeFileGenerator);
            case "enum"             -> new EnumGenerator(codeFileGenerator);
            default                 -> throw new IllegalArgumentException("Unknown file type: " + type);
        };
    }
}