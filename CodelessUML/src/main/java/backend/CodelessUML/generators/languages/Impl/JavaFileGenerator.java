package backend.CodelessUML.generators.languages.Impl;

import java.util.List;
import java.util.stream.Collectors;

import backend.CodelessUML.services.Validator;
import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.repository.NodesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Constructor;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.Relation;

@Component("JavaFileGenerator")
public class JavaFileGenerator implements CodeFileGenerator {

    @Autowired
    private NodesRepository nodesRepository;

    @Override
    public String generatePackageHeader(String packageName) {
        if (packageName == null || packageName.trim().isEmpty()) {
            throw new IllegalArgumentException("Package name cannot be null or empty.");
        }
        return "package " + packageName.trim() + ";\n\n";
    }

    @Override
    public String generateImports(Relation relations) {
        if (relations == null) {
            return "";
        }

        StringBuilder codeBuilder = new StringBuilder();

        if (relations.getExtendsId() != null) {
            Node node = nodesRepository.getNodeById(relations.getExtendsId());
            if (node != null) {
                codeBuilder.append("import ").append(node.getPackageName()).append(".").append(node.getName()).append(";\n");
            }
        }

        if (relations.getImplementsIds() != null) {
            for (String id : relations.getImplementsIds()) {
                Node node = nodesRepository.getNodeById(id);
                if (node != null) {
                    codeBuilder.append("import ").append(node.getPackageName()).append(".").append(node.getName()).append(";\n");
                }
            }
        }

        return codeBuilder.append("\n").toString();
    }

    @Override
    public String generateHeader(String name, String scope, Relation relations) {
        StringBuilder codeBuilder = new StringBuilder();
        codeBuilder.append(scope).append(" class ").append(name);

        if (relations != null) {
            if (relations.getExtendsId() != null) {
                Node parent = nodesRepository.getNodeById(relations.getExtendsId());
                if (parent != null) {
                    codeBuilder.append(" extends ").append(parent.getName());
                }
            }

            if (relations.getImplementsIds() != null && !relations.getImplementsIds().isEmpty()) {
                String interfaces = relations.getImplementsIds().stream()
                        .map(id -> nodesRepository.getNodeById(id))
                        .filter(node -> node != null)
                        .map(Node::getName)
                        .collect(Collectors.joining(", "));

                if (!interfaces.isEmpty()) {
                    codeBuilder.append(" implements ").append(interfaces);
                }
            }
        }

        return codeBuilder.append(" {\n").toString();
    }

    @Override
    public String generateConstructors(String name, List<Constructor> constructors) {
        if (constructors == null || constructors.isEmpty()) {
            return ""; // No constructors to generate
        }

        StringBuilder codeBuilder = new StringBuilder();
        for (Constructor constructor : constructors) {
            Validator.validate(constructor);
            codeBuilder.append("\t").append(constructor.getScope()).append(" ").append(name).append("(");

            if (constructor.getParameters() != null && !constructor.getParameters().isEmpty()) {
                String parameters = constructor.getParameters().stream()
                        .map(param -> param.getType() + " " + param.getName())
                        .collect(Collectors.joining(", "));
                codeBuilder.append(parameters);
            }

            codeBuilder.append(") {\n\t}\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateAttributes(List<Attribute> attributes) {
        if (attributes == null || attributes.isEmpty()) {
            return "\t// No attributes defined\n";
        }

        StringBuilder codeBuilder = new StringBuilder();
        for (Attribute attribute : attributes) {
            if (attribute == null) continue;

            codeBuilder.append("\t").append(attribute.getScope()).append(" ");
            if (attribute.isStatic()) codeBuilder.append("static ");
            if (attribute.isFinal()) codeBuilder.append("final ");
            codeBuilder.append(attribute.getType()).append(" ").append(attribute.getName()).append(";\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateGetters(List<Attribute> attributes) {
        if (attributes == null || attributes.isEmpty()) {
            return "\t// No getters\n";
        }

        StringBuilder codeBuilder = new StringBuilder();
        for (Attribute attribute : attributes) {
            String methodName = "get" + Character.toUpperCase(attribute.getName().charAt(0)) + attribute.getName().substring(1);
            codeBuilder.append("\tpublic ").append(attribute.getType()).append(" ").append(methodName).append("() {\n")
                    .append("\t\treturn this.").append(attribute.getName()).append(";\n\t}\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateSetters(List<Attribute> attributes) {
        if (attributes == null || attributes.isEmpty()) {
            return "\t// No setters\n";
        }

        StringBuilder codeBuilder = new StringBuilder();
        for (Attribute attribute : attributes) {
            String methodName = "set" + Character.toUpperCase(attribute.getName().charAt(0)) + attribute.getName().substring(1);
            codeBuilder.append("\tpublic void ").append(methodName).append("(").append(attribute.getType()).append(" ")
                    .append(attribute.getName()).append(") {\n")
                    .append("\t\tthis.").append(attribute.getName()).append(" = ").append(attribute.getName()).append(";\n\t}\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateMethods(List<Method> methods) {
        if (methods == null || methods.isEmpty()) {
            return "\t// No methods defined\n";
        }

        StringBuilder codeBuilder = new StringBuilder();
        for (Method method : methods) {
            codeBuilder.append("\t").append(method.getScope()).append(" ")
                    .append(method.getReturnType()).append(" ").append(method.getName()).append("(");

            String params = method.getParameters().stream()
                    .map(param -> param.getType() + " " + param.getName())
                    .collect(Collectors.joining(", "));

            codeBuilder.append(params).append(") {\n\t\t// Method implementation\n\t}\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateOverrideFunctions(Relation relations) {
        throw new UnsupportedOperationException("Unimplemented method 'generateOverrideFunctions'");
    }

    @Override
    public String generateEnumConstants(Node node) {
        if (node.getAttributes() == null || node.getAttributes().isEmpty()) {
            return "\t// No constants defined for this enum\n";
        }

        return "\t" + node.getAttributes().stream()
                .map(Attribute::getName)
                .filter(name -> name != null && !name.isEmpty())
                .collect(Collectors.joining(",\n\t"));
    }
}
