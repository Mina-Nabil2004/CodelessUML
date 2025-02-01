package backend.CodelessUML.generators.FileGenerators.Impl;

import backend.CodelessUML.generators.FileGenerators.FileGenerator;
import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.model.Node;

public class EnumGenerator extends FileGenerator {
    public EnumGenerator(CodeFileGenerator codeFileGenerator) {
        super(codeFileGenerator);
    }

    @Override
    public String generate(Node node) {
        if (node == null) {
            throw new IllegalArgumentException("Node cannot be null");
        }
        if (!"enum".equalsIgnoreCase(node.getType())) {
            throw new IllegalArgumentException("Invalid node type for EnumGenerator: " + node.getType());
        }

        codeBuilder.setLength(0);

        try {
            codeFileGenerator.generatePackageHeader(node.getPackageName());
            codeBuilder.append("\n\n");

            codeBuilder.append(codeFileGenerator.generateHeader(node.getName(), node.getScope(), null));
            codeBuilder.append("\n");

            codeBuilder.append(codeFileGenerator.generateEnumConstants(node));
            codeBuilder.append("\n}");

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate enum code: " + e.getMessage(), e);
        }

        return codeBuilder.toString();
    }
}
