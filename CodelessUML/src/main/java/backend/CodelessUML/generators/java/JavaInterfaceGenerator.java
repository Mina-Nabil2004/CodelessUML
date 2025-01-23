package backend.CodelessUML.generators.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import backend.CodelessUML.generators.FileGenerator;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;

@Component("interface")
public class JavaInterfaceGenerator extends FileGenerator {

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
            generatePackageHeader(node.getPackageName());

            generateImports(node.getRelations());

            generateClassHeader(node.getType(), node.getName(), node.getScope(), node.getRelations());

            generateMethodsSafely(node.getType(), node.getMethods());

            codeBuilder.append("}");
            codeBuilder.append("\n");

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate interface code: " + e.getMessage(), e);
        }

        return codeBuilder.toString();
    }

    private void generateMethodsSafely(String type, List<Method> methods) {
        if (methods == null || methods.isEmpty()) {
            codeBuilder.append("\t// No methods defined for this interface\n");
            return;
        }

        for (Method method : methods) {
            if (method == null) {
                continue; // Skip null methods
            }

            try {
                codeBuilder.append("\t")
                .append(method.getScope()).append(" ")
                .append(method.getReturnType()).append(" ")
                .append(method.getName()).append("(");

                // Generate method parameters
                String params = method.getParameters().stream()
                    .map(param -> param.getType() + " " + param.getName())
                    .collect(Collectors.joining(", "));
                
                codeBuilder.append(params);

                codeBuilder.append(");\n");
            } catch (Exception ex) {
                throw new RuntimeException("Error while generating method: " + method, ex);
            }
        }
    }
}
