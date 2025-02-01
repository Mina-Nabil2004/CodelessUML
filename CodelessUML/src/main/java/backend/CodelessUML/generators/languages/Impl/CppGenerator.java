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

@Component("CppGenerator")
public class CppGenerator implements CodeFileGenerator {

    @Autowired
    private NodesRepository nodesRepository;

    @Override
    public String generatePackageHeader(String packageName) {
        return ""; // C++ does not have packages
    }

    @Override
    public String generateImports(Relation relations) {
        StringBuilder codeBuilder = new StringBuilder();
        codeBuilder.append("#include <iostream>\n");
        codeBuilder.append("#include <vector>\n");

        if (relations != null) {
            if (relations.getExtendsId() != null) {
                Node node = nodesRepository.getNodeById(relations.getExtendsId());
                if (node != null) {
                    codeBuilder.append("#include \"").append(node.getName()).append(".h\"\n");
                }
            }

            if (relations.getImplementsIds() != null) {
                for (String id : relations.getImplementsIds()) {
                    Node node = nodesRepository.getNodeById(id);
                    if (node != null) {
                        codeBuilder.append("#include \"").append(node.getName()).append(".h\"\n");
                    }
                }
            }
        }

        return codeBuilder.append("\n").toString();
    }

    @Override
    public String generateHeader(String name, String scope, Relation relations) {
        StringBuilder codeBuilder = new StringBuilder();
        codeBuilder.append("class ").append(name);

        if (relations != null && relations.getExtendsId() != null) {
            Node parent = nodesRepository.getNodeById(relations.getExtendsId());
            if (parent != null) {
                codeBuilder.append(" : public ").append(parent.getName());
            }
        }

        return codeBuilder.append(" {\npublic:\n").toString();
    }

    @Override
    public String generateConstructors(String name, List<Constructor> constructors) {
        if (constructors == null || constructors.isEmpty()) {
            return "\t" + name + "() {}\n"; // Default constructor
        }

        StringBuilder codeBuilder = new StringBuilder();
        for (Constructor constructor : constructors) {
            Validator.validate(constructor);
            codeBuilder.append("\t").append(name).append("(");

            if (constructor.getParameters() != null && !constructor.getParameters().isEmpty()) {
                String parameters = constructor.getParameters().stream()
                        .map(param -> param.getType() + " " + param.getName())
                        .collect(Collectors.joining(", "));
                codeBuilder.append(parameters);
            }

            codeBuilder.append(") {}\n");
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

            codeBuilder.append("\t");
            if (attribute.isStatic()) codeBuilder.append("static ");
            if (attribute.isFinal()) codeBuilder.append("const ");
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
            codeBuilder.append("\t").append(attribute.getType()).append(" ").append(methodName).append("() {\n")
                    .append("\t\treturn this->").append(attribute.getName()).append(";\n\t}\n");
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
            codeBuilder.append("\tvoid ").append(methodName).append("(").append(attribute.getType()).append(" ")
                    .append(attribute.getName()).append(") {\n")
                    .append("\t\tthis->").append(attribute.getName()).append(" = ").append(attribute.getName()).append(";\n\t}\n");
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
            codeBuilder.append("\t").append(method.getReturnType()).append(" ").append(method.getName()).append("(");

            String params = method.getParameters().stream()
                    .map(param -> param.getType() + " " + param.getName())
                    .collect(Collectors.joining(", "));

            codeBuilder.append(params).append(") {\n\t\t// Method implementation\n\t}\n");
        }
        return codeBuilder.toString();
    }

    @Override
    public String generateOverrideFunctions(Relation relations) {
        return ""; // Can be implemented if needed
    }

    @Override
    public String generateEnumConstants(Node node) {
        if (node.getAttributes() == null || node.getAttributes().isEmpty()) {
            return "\t// No constants defined for this enum\n";
        }

        return "\t" + node.getAttributes().stream()
                .map(Attribute::getName)
                .filter(name -> name != null && !name.isEmpty())
                .collect(Collectors.joining(",\n\t")) + "\n";
    }
}