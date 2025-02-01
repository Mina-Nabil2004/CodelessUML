package backend.CodelessUML.generators.languages.Impl;

import java.util.List;
import java.util.stream.Collectors;
import backend.CodelessUML.generators.languages.CodeFileGenerator;
import backend.CodelessUML.repository.NodesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Constructor;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.Relation;

@Component("CSharpFileGenerator")
public class CSharpFileGenerator implements CodeFileGenerator {

    @Autowired
    private NodesRepository nodesRepository;

    @Override
    public String generatePackageHeader(String namespace) {
        if (namespace == null || namespace.trim().isEmpty()) {
            throw new IllegalArgumentException("Namespace cannot be null or empty.");
        }
        return "namespace " + namespace.trim() + " {\n\n";
    }

    @Override
    public String generateImports(Relation relations) {
        StringBuilder codeBuilder = new StringBuilder();

        if (relations == null) {
            return "";
        }

        if (relations.getExtendsId() != null) {
            Node node = nodesRepository.getNodeById(relations.getExtendsId());
            if (node != null) {
                codeBuilder.append("using ").append(node.getPackageName()).append(";");
            }
        }

        if (relations.getImplementsIds() != null) {
            for (String id : relations.getImplementsIds()) {
                Node node = nodesRepository.getNodeById(id);
                if (node != null) {
                    codeBuilder.append("using ").append(node.getPackageName()).append(";");
                }
            }
        }
        codeBuilder.append("\n");
        return codeBuilder.toString();
    }

    @Override
    public String generateHeader(String name, String scope, Relation relations) {
        StringBuilder codeBuilder = new StringBuilder();
        codeBuilder.append(scope).append(" class ").append(name);

        if (relations != null) {
            if (relations.getExtendsId() != null) {
                Node node = nodesRepository.getNodeById(relations.getExtendsId());
                if (node != null) {
                    codeBuilder.append(" : ").append(node.getName());
                }
            }
        }
        codeBuilder.append(" {\n");
        return codeBuilder.toString();
    }

    @Override
    public String generateAttributes(List<Attribute> attributes) {
        StringBuilder codeBuilder = new StringBuilder();
        if (attributes == null || attributes.isEmpty()) {
            return "\t// No attributes defined\n";
        }

        for (Attribute attribute : attributes) {
            codeBuilder.append("\tprivate ")
                    .append(attribute.getType()).append(" ")
                    .append(attribute.getName()).append(";\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateConstructors(String name, List<Constructor> constructors) {
        StringBuilder codeBuilder = new StringBuilder();
        if (constructors == null || constructors.isEmpty()) {
            return "\t// No constructors defined\n";
        }

        for (Constructor constructor : constructors) {
            codeBuilder.append("\tpublic ").append(name).append("(");
            String parameters = constructor.getParameters().stream()
                    .map(param -> param.getType() + " " + param.getName())
                    .collect(Collectors.joining(", "));
            codeBuilder.append(parameters).append(") { }\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateMethods(List<Method> methods) {
        StringBuilder codeBuilder = new StringBuilder();
        if (methods == null || methods.isEmpty()) {
            return "\t// No methods defined\n";
        }

        for (Method method : methods) {
            codeBuilder.append("\tpublic ")
                    .append(method.getReturnType()).append(" ")
                    .append(method.getName()).append("(");
            String parameters = method.getParameters().stream()
                    .map(param -> param.getType() + " " + param.getName())
                    .collect(Collectors.joining(", "));
            codeBuilder.append(parameters).append(") { }\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateGetters(List<Attribute> attributes) {
        StringBuilder codeBuilder = new StringBuilder();
        for (Attribute attribute : attributes) {
            codeBuilder.append("\tpublic ")
                    .append(attribute.getType()).append(" get")
                    .append(Character.toUpperCase(attribute.getName().charAt(0)))
                    .append(attribute.getName().substring(1)).append("() {\n")
                    .append("\t\treturn ").append(attribute.getName()).append(";\n")
                    .append("\t}\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateSetters(List<Attribute> attributes) {
        StringBuilder codeBuilder = new StringBuilder();
        for (Attribute attribute : attributes) {
            codeBuilder.append("\tpublic void set")
                    .append(Character.toUpperCase(attribute.getName().charAt(0)))
                    .append(attribute.getName().substring(1)).append("(")
                    .append(attribute.getType()).append(" ")
                    .append(attribute.getName()).append(") {\n")
                    .append("\t\tthis.").append(attribute.getName()).append(" = ")
                    .append(attribute.getName()).append(";\n")
                    .append("\t}\n");
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
            return "\t// No constants defined\n";
        }
        return node.getAttributes().stream()
                .map(Attribute::getName)
                .filter(name -> name != null && !name.isEmpty())
                .collect(Collectors.joining(", ", "\t", "\n"));
    }
}
