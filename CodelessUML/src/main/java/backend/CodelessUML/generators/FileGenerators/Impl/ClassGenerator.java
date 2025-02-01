package backend.CodelessUML.generators.FileGenerators.Impl;



import backend.CodelessUML.generators.FileGenerators.FileGenerator;
import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.model.Node;

public class ClassGenerator extends FileGenerator {

    public ClassGenerator(CodeFileGenerator codeFileGenerator) {
        super(codeFileGenerator);
    }

    @Override
    public String generate(Node node) throws IllegalArgumentException {
        if (node == null) {
            throw new IllegalArgumentException("Node cannot be null");
        }

        if (!"class".equalsIgnoreCase(node.getType())) {
            throw new IllegalArgumentException("Invalid node type for ClassGenerator: " + node.getType());
        }

        codeBuilder.setLength(0);

        try {
            // Generate package header
            codeBuilder.append(codeFileGenerator.generatePackageHeader(node.getPackageName()));

            codeBuilder.append(codeFileGenerator.generateImports(node.getRelations()));

            // Generate class header (name, scope, relations)
            codeBuilder.append(codeFileGenerator.generateHeader(node.getType(), node.getName(), node.getRelations()));

            codeBuilder.append("\n");

            // Generate class attributes
            codeBuilder.append(codeFileGenerator.generateAttributes(node.getAttributes()));
            codeBuilder.append("\n");

            // Generate class constructors
            codeBuilder.append(codeFileGenerator.generateConstructors(node.getName(), node.getConstructors()));
            codeBuilder.append("\n");

            codeBuilder.append(codeFileGenerator.generateSetters(node.getAttributes()));
            codeBuilder.append("\n");

            codeBuilder.append(codeFileGenerator.generateGetters(node.getAttributes()));
            codeBuilder.append("\n");

            // Generate class methods
            codeBuilder.append(codeFileGenerator.generateMethods(node.getMethods()));
            codeBuilder.append("\n");

            codeBuilder.append(codeFileGenerator.generateOverrideFunctions(node.getRelations()));
            codeBuilder.append("\n");

            // Closing class brace
            codeBuilder.append("}");
            codeBuilder.append("\n");

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate class code: " + e.getMessage(), e);
        }

        return codeBuilder.toString();
    }

}
