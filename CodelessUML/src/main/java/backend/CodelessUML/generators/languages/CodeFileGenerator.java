package backend.CodelessUML.generators.languages;

import java.util.List;

import backend.CodelessUML.model.*;

public interface CodeFileGenerator {

    String generatePackageHeader(String packageName);

    String generateImports(Relation relations);

    String generateHeader(String name, String scope, Relation relations);

    String generateAttributes(List<Attribute> attributes);

    String generateConstructors(String name, List<Constructor> constructors);

    String generateGetters(List<Attribute> attributes);

    String generateSetters(List<Attribute> attributes);

    String generateOverrideFunctions(Relation relations);

    String generateMethods(List<Method> methods);

    String generateEnumConstants(Node node);
}
