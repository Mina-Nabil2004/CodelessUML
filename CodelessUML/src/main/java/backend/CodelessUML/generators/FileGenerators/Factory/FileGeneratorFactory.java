package backend.CodelessUML.generators.FileGenerators.Factory;

import backend.CodelessUML.generators.FileGenerators.FileGeneratorType;
import backend.CodelessUML.generators.FileGenerators.Impl.AbstractClassGenerator;
import backend.CodelessUML.generators.FileGenerators.Impl.ClassGenerator;
import backend.CodelessUML.generators.languages.Factory.CodeFileGeneratorFactory;
import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.generators.FileGenerators.Impl.EnumGenerator;
import backend.CodelessUML.generators.FileGenerators.FileGenerator;
import backend.CodelessUML.generators.FileGenerators.Impl.InterfaceGenerator;
import backend.CodelessUML.generators.languages.Langauge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FileGeneratorFactory {
    @Autowired
    private CodeFileGeneratorFactory codeFileGeneratorFactory;

    public FileGenerator createFile(FileGeneratorType type, Langauge language) {
        CodeFileGenerator codeFileGenerator = codeFileGeneratorFactory.create(language);
        return switch (type) {
            case CLASS            -> new ClassGenerator(codeFileGenerator);
            case INTERFACE        -> new InterfaceGenerator(codeFileGenerator);
            case ABSTRACT_CLASS   -> new AbstractClassGenerator(codeFileGenerator);
            case ENUM            -> new EnumGenerator(codeFileGenerator);
        };
    }
}