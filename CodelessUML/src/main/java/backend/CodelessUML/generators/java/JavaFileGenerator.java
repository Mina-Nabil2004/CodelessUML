package backend.CodelessUML.generators.java;

import java.util.List;

import org.springframework.stereotype.Component;

import backend.CodelessUML.generators.CodeFileGenerator;
import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Constructor;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.Relation;

@Component("JavaFileGenerator")
public abstract class JavaFileGenerator extends CodeFileGenerator {

    @Override
    protected void generatePackageHeader(String packageName) {
        if (packageName == null || packageName.trim().isEmpty()) {
            throw new IllegalArgumentException("Package name cannot be null or empty.");
        }
        codeBuilder.append("package ").append(packageName.trim()).append(";").append("\n\n");
    }

    @Override
    protected void generateImports(Relation relations) {
        if (relations == null) {
            return;
        }

        if (relations.getExtendsId() != null) {
            Node node = nodesRepository.getNodeById(relations.getExtendsId());
            if (node != null) {
                codeBuilder.append("import ").append(node.getPackageName() + ".").append(node.getName()).append(";\n");
            }
        }

        if (relations.getImplementsIds() != null) {
            for (String id : relations.getImplementsIds()) {
                Node node = nodesRepository.getNodeById(id);
                if (node != null) {
                    codeBuilder.append("import ").append(node.getPackageName() + ".").append(node.getName())
                            .append(";\n");
                }
            }
        }
        codeBuilder.append("\n");
    }

    @Override
    abstract protected void generateHeader(String name, String scope, Relation relations);

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

    @Override
    protected void generateConstructors(String name, List<Constructor> constructors) {
        throw new UnsupportedOperationException("Unimplemented method 'generateConstructors'");
    }

    @Override
    protected String generateGetters(List<Attribute> attributes) {
        throw new UnsupportedOperationException("Unimplemented method 'generateGetters'");
    }

    @Override
    protected String generateSetters(List<Attribute> attributes) {
        throw new UnsupportedOperationException("Unimplemented method 'generateSetters'");
    }

    @Override
    abstract protected void generateMethods(List<Method> methods);
    // {
    // if (methods == null || methods.isEmpty()) {
    // codeBuilder.append("\t// No methods defined for this class\n");
    // return;
    // }

    // for (Method method : methods) {
    // if (method == null) {
    // continue; // Skip null methods if any
    // }

    // codeBuilder.append("\t");
    // codeBuilder.append(method.getScope()).append(" ");

    // if (method.isStatic()) {
    // codeBuilder.append("static ");
    // }

    // if (type.equals("interface")) {
    // codeBuilder.append(method.getReturnType()).append(" ")
    // .append(method.getName())
    // .append("();\n");
    // } else {
    // codeBuilder.append(method.getReturnType()).append(" ")
    // .append(method.getName())
    // .append("(");

    // String params = method.getParameters().stream()
    // .map(param -> param.getType() + " " + param.getName())
    // .collect(Collectors.joining(", "));
    // codeBuilder.append(params);
    // codeBuilder.append(") {\n");

    // codeBuilder.append("\t\t// TODO: Implement method\n");
    // codeBuilder.append("\t\tthrow new
    // UnsupportedOperationException(\"Unimplemented method '")
    // .append(method.getName()).append("'\");\n");
    // codeBuilder.append("\t}\n");
    // }
    // }
    // }

    @Override
    protected void generateOverrideFunctions(Relation relations) {
        throw new UnsupportedOperationException("Unimplemented method 'generateOverrideFunctions'");
    }
}
