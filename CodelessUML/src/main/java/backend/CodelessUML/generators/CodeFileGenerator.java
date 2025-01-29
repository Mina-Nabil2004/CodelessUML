package backend.CodelessUML.generators;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Constructor;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.Relation;
import backend.CodelessUML.repository.NodesRepository;
import lombok.Data;

@Data
public abstract class CodeFileGenerator {
    // protected Validator validator;
    @Autowired
    protected NodesRepository nodesRepository;

    protected StringBuilder codeBuilder = new StringBuilder();

    abstract protected void generatePackageHeader(String packageName);

    abstract protected void generateHeader(String name, String scope, Relation relations);

    abstract protected void generateImports(Relation relations);

    abstract protected void generateConstructors(String name, List<Constructor> constructors);

    abstract protected void generateMethods(List<Method> methods);

    // abstract protected String generateConstructor();

    // abstract protected String generateConstructors(String name, List<Constructor>
    // constructors,
    // List<Attribute> attributes);

    abstract protected String generateGetters(List<Attribute> attributes);

    abstract protected String generateSetters(List<Attribute> attributes);

    // abstract protected String generateGetter(String staticStr, String type,
    // String name);

    // abstract protected String generateSetter(String staticStr, String type,
    // String name);

    // abstract protected String generateMethod();

    abstract protected void generateAttributes(List<Attribute> attributes);

    // abstract protected String generateAttribute();

    // abstract protected String generateRelation();

    abstract protected void generateOverrideFunctions(Relation relations);

    public String generate(Node node) throws IllegalArgumentException {

        if (node == null) {
            throw new IllegalArgumentException("Node cannot be null");
        }

        codeBuilder.setLength(0);

        try {
            generatePackageHeader(node.getPackageName());

            generateImports(node.getRelations());

            generateHeader(node.getName(), node.getScope(), node.getRelations());

            generateAttributes(node.getAttributes());

            if (node.getType().equals("class") || node.getType().equals("abstract class")) {

                generateConstructors(node.getName(), node.getConstructors());

                generateSetters(node.getAttributes());

                generateGetters(node.getAttributes());

                generateOverrideFunctions(node.getRelations());
            }

            if (!node.getType().equals("enum")) {
                generateMethods(node.getMethods());
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate class code: " + e.getMessage(), e);
        }

        return codeBuilder.toString();
    }

    public String generateClass(Node node) throws IllegalArgumentException {

        try {

            generateHeader(node.getName(), node.getScope(), node.getRelations());

            generateAttributes(node.getAttributes());

            generateConstructors(node.getName(), node.getConstructors());

            generateSetters(node.getAttributes());

            generateGetters(node.getAttributes());

            generateOverrideFunctions(node.getRelations());

            generateMethods(node.getMethods());

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate class code: " + e.getMessage(), e);
        }

        return codeBuilder.toString();
    }

    public String generateInterface(Node node) throws IllegalArgumentException {

        try {
            generateHeader(node.getName(), node.getScope(), node.getRelations());

            generateMethods(node.getMethods());

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate class code: " + e.getMessage(), e);
        }

        return codeBuilder.toString();
    }

    // public String generateInterface(Node node) throws IllegalArgumentException {

    // try {
    // generateHeader(node.getName(), node.getScope(), node.getRelations());

    // generateMethods(node.getMethods());

    // } catch (Exception e) {
    // throw new RuntimeException("Failed to generate class code: " +
    // e.getMessage(), e);
    // }

    // return codeBuilder.toString();
    // }

    protected String getNodeNameById(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Node ID cannot be null or empty.");
        }
        Node node = nodesRepository.getNodeById(id);
        if (node == null) {
            throw new IllegalArgumentException("No node found with ID: " + id);
        }
        return node.getName();
    }
}
