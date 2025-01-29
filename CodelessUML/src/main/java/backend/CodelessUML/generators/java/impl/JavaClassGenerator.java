package backend.CodelessUML.generators.java.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import backend.CodelessUML.generators.FileGenerator;
import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;

@Component("class")
public class JavaClassGenerator extends FileGenerator {

    @Override
    public String generate(Node node) throws IllegalArgumentException {
        // System.out.println("--------------------------------------------###################-----------------");
        // System.out.println(node.toString());
        // System.out.println("--------------------------------------------###################3-------");
        if (node == null) {
            throw new IllegalArgumentException("Node cannot be null");
        }

        if (!"class".equalsIgnoreCase(node.getType())) {
            throw new IllegalArgumentException("Invalid node type for ClassGenerator: " + node.getType());
        }

        codeBuilder.setLength(0);

        try {
            // Generate package header
            generatePackageHeader(node.getPackageName());

            generateImports(node.getRelations());

            // Generate class header (name, scope, relations)
            generateHeader(node.getType(), node.getName(), node.getScope(), node.getRelations());

            codeBuilder.append("\n");

            // Generate class attributes
            generateAttributes(node.getAttributes());
            codeBuilder.append("\n");

            // Generate class constructors
            generateConstructors(node.getName(), node.getConstructors(), node.getAttributes());
            codeBuilder.append("\n");

            generateSetters(node.getAttributes());
            codeBuilder.append("\n");

            generateGetters(node.getAttributes());
            codeBuilder.append("\n");

            // Generate class methods
            generateMethods(node.getType(), node.getMethods());
            codeBuilder.append("\n");

            generateOverrideFunctions(node.getRelations());
            codeBuilder.append("\n");

            // Closing class brace
            codeBuilder.append("}");
            codeBuilder.append("\n");

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate class code: " + e.getMessage(), e);
        }

        return codeBuilder.toString();
    }

    /**
     * Generates the class attributes, ensuring proper formatting and error
     * handling.
     */
    @Override
    protected void generateAttributes(List<Attribute> attributes) {
        if (attributes == null || attributes.isEmpty()) {
            codeBuilder.append("\t// No attributes defined for this class\n");
            return;
        }

        for (Attribute attribute : attributes) {
            if (attribute == null) {
                continue; // Skip null attributes if any
            }
            codeBuilder.append("\t");
            codeBuilder.append(attribute.getScope()).append(" ");
            if (attribute.isStatic()) {
                codeBuilder.append("static ");
            }
            if (attribute.isFinal()) {
                codeBuilder.append("final ");
            }
            codeBuilder.append(attribute.getType()).append(" ")
                    .append(attribute.getName())
                    .append(";\n");
        }
    }

    /**
     * Generates the class methods, ensuring proper formatting and error
     * handling.
     */
    @Override
    protected void generateMethods(String type, List<Method> methods) {
        if (methods == null || methods.isEmpty()) {
            codeBuilder.append("\t// No methods defined for this class\n");
            return;
        }

        for (Method method : methods) {
            if (method == null) {
                continue; // Skip null methods if any
            }

            codeBuilder.append("\t");
            codeBuilder.append(method.getScope()).append(" ");

            if (method.isStatic()) {
                codeBuilder.append("static ");
            }

            if (type.equals("interface")) {
                codeBuilder.append(method.getReturnType()).append(" ")
                        .append(method.getName())
                        .append("();\n");
            } else {
                codeBuilder.append(method.getReturnType()).append(" ")
                        .append(method.getName())
                        .append("(");

                String params = method.getParameters().stream()
                        .map(param -> param.getType() + " " + param.getName())
                        .collect(Collectors.joining(", "));
                codeBuilder.append(params);
                codeBuilder.append(") {\n");

                codeBuilder.append("\t\t// TODO: Implement method\n");
                codeBuilder.append("\t\tthrow new UnsupportedOperationException(\"Unimplemented method '")
                        .append(method.getName()).append("'\");\n");
                codeBuilder.append("\t}\n");
            }
        }
    }
}
