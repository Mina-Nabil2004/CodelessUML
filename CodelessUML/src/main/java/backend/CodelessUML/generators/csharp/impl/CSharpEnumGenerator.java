package backend.CodelessUML.generators.csharp.impl;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import backend.CodelessUML.generators.FileGenerator;
import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Node;

@Component("enum")
public class CSharpEnumGenerator extends FileGenerator {

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
            generatePackageHeader(node.getPackageName());
            codeBuilder.append("\n\n");

            generateHeader(node.getType(), node.getName(), node.getScope(), null);

            generateEnumConstants(node);

            codeBuilder.append("\n}");
            codeBuilder.append("\n");

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate enum code: " + e.getMessage(), e);
        }

        return codeBuilder.toString();
    }

    /**
     * Generates the constants for the enum, ensuring proper formatting and
     * error handling.
     */
    private void generateEnumConstants(Node node) {
        if (node.getAttributes() == null || node.getAttributes().isEmpty()) {
            codeBuilder.append("\t// No constants defined for this enum\n");
            return;
        }

        String constants = node.getAttributes().stream()
                .map(Attribute::getName)
                .filter(name -> name != null && !name.isEmpty())
                .collect(Collectors.joining(",\n\t"));

        if (constants.isEmpty()) {
            codeBuilder.append("\t// No valid constants defined\n");
        } else {
            codeBuilder.append("\t").append(constants);// .append(";");
        }
    }
}
