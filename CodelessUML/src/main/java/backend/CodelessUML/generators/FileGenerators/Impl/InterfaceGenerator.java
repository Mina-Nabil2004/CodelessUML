package backend.CodelessUML.generators.FileGenerators.Impl;

import backend.CodelessUML.generators.FileGenerators.FileGenerator;
import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.model.Node;

public class InterfaceGenerator extends FileGenerator {
    public InterfaceGenerator(CodeFileGenerator codeFileGenerator) {
        super(codeFileGenerator);
    }

    @Override
    public String generate(Node node) {
        if (node == null) {
            throw new IllegalArgumentException("Node cannot be null");
        }
        if (!"interface".equalsIgnoreCase(node.getType())) {
            throw new IllegalArgumentException("Invalid node type for InterfaceGenerator: " + node.getType());
        }

        codeBuilder.setLength(0);

        try {
            codeBuilder.append(codeFileGenerator.generatePackageHeader(node.getPackageName()));

            codeBuilder.append(codeFileGenerator.generateImports(node.getRelations()));

            codeBuilder.append(codeFileGenerator.generateHeader(node.getType(), node.getName(), node.getRelations()));

            codeBuilder.append(codeFileGenerator.generateMethods(node.getMethods()));

            codeBuilder.append("}");
            codeBuilder.append("\n");

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate interface code: " + e.getMessage(), e);
        }

        return codeBuilder.toString();
    }

}
