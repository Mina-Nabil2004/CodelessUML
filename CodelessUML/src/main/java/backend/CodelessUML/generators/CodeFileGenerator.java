package backend.CodelessUML.generators;

import java.util.List;

import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Constructor;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.Relation;
import lombok.Data;

@Data
public abstract class CodeFileGenerator {
    // protected Validator validator;

    protected StringBuilder codeBuilder = new StringBuilder();

    abstract protected void generatePackageHeader(String packageName);

    abstract protected void generateClassHeader(String type, String name, String scope, Relation relations);

    abstract protected void generateImports(Relation relations);

    abstract protected void generateMethods(String type, List<Method> methods);

    abstract protected String generateConstructor();

    abstract protected String generateConstructors(String name, List<Constructor> constructors,
            List<Attribute> attributes);

    abstract protected String generateGetters(List<Attribute> attributes);

    abstract protected String generateSetters(List<Attribute> attributes);

    abstract protected String generateGetter(String staticStr, String type, String name);

    abstract protected String generateSetter(String staticStr, String type, String name);

    abstract protected String generateMethod();

    abstract protected void generateAttributes(List<Attribute> attributes);

    abstract protected String generateAttribute();

    abstract protected String generateRelation();

    abstract protected void generateOverrideFunctions(Relation relations);

    abstract protected void generateConstructors(String name, List<Constructor> constructors);

    public String generate(Node node) throws IllegalArgumentException {

        if (node == null) {
            throw new IllegalArgumentException("Node cannot be null");
        }

        codeBuilder.setLength(0);

        try {
            // Generate package header
            generatePackageHeader(node.getPackageName());

            generateImports(node.getRelations());

            // Generate class header (name, scope, relations)
            generateClassHeader(node.getType(), node.getName(), node.getScope(), node.getRelations());

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
            generateOverrideFunctions(node.getRelations());
            codeBuilder.append("\n");

            generateMethods(node.getType(), node.getMethods());
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
