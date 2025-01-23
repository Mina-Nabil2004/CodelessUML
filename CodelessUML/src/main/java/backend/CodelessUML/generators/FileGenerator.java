package backend.CodelessUML.generators;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Constructor;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.Relation;
import backend.CodelessUML.repository.NodesRepository;
import lombok.Data;

@Data
public abstract class FileGenerator {
   
   @Autowired
   NodesRepository nodesRepository;

   protected StringBuilder codeBuilder = new StringBuilder();

   public abstract String generate(Node node);

   protected String generateGetter(String staticStr, String type, String name) {
      StringBuilder getter = new StringBuilder("\tpublic %s".formatted(staticStr));
      getter.append(type + " ");
      getter.append("get");
      getter.append(name.substring(0, 1).toUpperCase());
      getter.append(name.substring(1));
      getter.append("() {\n");

      getter.append("\t\treturn %s;\n".formatted(name));

      getter.append("\t}\n");

      return getter.toString();
   }

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
               codeBuilder.append("import ").append(node.getPackageName() + ".").append(node.getName()).append(";\n");
            }
         }
      }
      codeBuilder.append("\n");
   }


   protected void generateGetters(List<Attribute> attributes) {
      for (Attribute attribute : attributes) {
         if (attribute.isGetter()) {
            // codeBuilder.append(generateGetter(attribute.getType(), attribute.getName())).append("\n");
            codeBuilder.append(generateGetter(attribute.isStatic() ? "static " : "", attribute.getType(), attribute.getName()))
                       .append("\n");
         }
      }
   }


   protected String generateSetter(String staticStr, String type, String name) {
      StringBuilder setter = new StringBuilder("\tpublic %s".formatted(staticStr));
      // setter.append(type + " ");
      setter.append("void set");
      setter.append(name.substring(0, 1).toUpperCase());
      setter.append(name.substring(1));
      setter.append("(%s %s) {\n".formatted(type, name));

      String thisStr = staticStr.equals("") ? "this." : "";
      setter.append("\t\t%s%s = %s".formatted(thisStr, name, name)).append(";\n");

      setter.append("\t}\n");

      return setter.toString();
   }


   protected void generateSetters(List<Attribute> attributes) {
      for (Attribute attribute : attributes) {
         if (attribute.isSetter()) {
            codeBuilder.append(generateSetter(attribute.isStatic() ? "static " : "", attribute.getType(), attribute.getName()))
                       .append("\n");
         }
      }
   }


   protected void generateOverrideFunctions(Relation relations) {
      if (relations == null) {
         return;
      }

      // Handle "extends" relationship
      if (relations.getExtendsId() != null) {
         Node node = nodesRepository.getNodeById(relations.getExtendsId());
         if (node != null) {
            List<Method> methods = node.getMethods();
            for (Method method : methods) {
               if (method.isAbstract()) {
                  codeBuilder.append("\n\t@Override\n");
                  codeBuilder.append("\t").append(method.getScope()).append(" ");
                  if (method.isStatic()) {
                     codeBuilder.append("static ");
                  }
                  codeBuilder.append(method.getReturnType())
                        .append(" ")
                        .append(method.getName())
                        .append("(");
                  if (method.getParameters() != null && !method.getParameters().isEmpty()) {
                     String parameters = method.getParameters().stream()
                           .map(param -> param.getType() + " " + param.getName())
                           .collect(Collectors.joining(", "));
                     codeBuilder.append(parameters);
                  }

                  codeBuilder.append(") {\n");

                  codeBuilder.append("\t\t// TODO: Implement logic for ")
                        .append(method.getName())
                        .append("\n");

                  codeBuilder.append("\t\tthrow new UnsupportedOperationException(\"Unimplemented method: ")
                        .append(method.getName())
                        .append("\");\n");

                  codeBuilder.append("\t}\n");
               }
            }
         }
      }

      // Handle "implements" relationships
      if (relations.getImplementsIds() != null) {
         for (String id : relations.getImplementsIds()) {
            Node node = nodesRepository.getNodeById(id);
            if (node != null) {
               List<Method> methods = node.getMethods();
               for (Method method : methods) {
                  codeBuilder.append("\n\t@Override\n");
                  codeBuilder.append("\t").append(method.getScope()).append(" ");
                  if (method.isStatic()) {
                     codeBuilder.append("static ");
                  }
                  codeBuilder.append(method.getReturnType())
                        .append(" ")
                        .append(method.getName())
                        .append("(");
                  if (method.getParameters() != null && !method.getParameters().isEmpty()) {
                     String parameters = method.getParameters().stream()
                           .map(param -> param.getType() + " " + param.getName())
                           .collect(Collectors.joining(", "));
                     codeBuilder.append(parameters);
                  }
                  codeBuilder.append(") {\n");
                  codeBuilder.append("\t\t// TODO: Implement logic for ")
                        .append(method.getName())
                        .append("\n");
                  codeBuilder.append("\t\tthrow new UnsupportedOperationException(\"Unimplemented method: ")
                        .append(method.getName())
                        .append("\");\n");
                  codeBuilder.append("\t}\n");
               }
            }
         }
      }
   }


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


   protected void generatePackageHeader(String packageName) {
      if (packageName == null || packageName.trim().isEmpty()) {
         throw new IllegalArgumentException("Package name cannot be null or empty.");
      }
      codeBuilder.append("package ").append(packageName.trim()).append(";").append("\n\n");
   }


   protected void generateClassHeader(String type, String name, String scope, Relation relations) {
      if (type == null || name == null || scope == null) {
         throw new IllegalArgumentException("Type, name, and scope cannot be null.");
      }

      codeBuilder.append(scope).append(" ").append(type).append(" ").append(name);

      if (relations != null) {
         if (relations.getExtendsId() != null && !relations.getExtendsId().isEmpty()) {
            codeBuilder.append(" extends ").append(getNodeNameById(relations.getExtendsId()));
         }

         if (relations.getImplementsIds() != null && !relations.getImplementsIds().isEmpty()
               && !type.equals("interface") && !type.equals("enum")) {
            String implementsList = relations.getImplementsIds().stream()
                  .map(this::getNodeNameById)
                  .collect(Collectors.joining(", "));
            codeBuilder.append(" implements ").append(implementsList);
         }
      }

      codeBuilder.append(" {\n");
   }

   protected void generateMethods(String type, List<Method> methods) {
      if (methods == null || methods.isEmpty()) {
         return; // No methods to generate
      }

      for (Method method : methods) {
         validateMethod(method);

         codeBuilder.append("\t").append(method.getScope()).append(" ");

         if (method.isStatic()) {
            codeBuilder.append("static ");
         }

         if ("interface".equals(type)) {
            codeBuilder.append(method.getReturnType()).append(" ").append(method.getName()).append("();\n");
            continue;
         }

         System.out.println(method.isAbstract());
         System.out.println(type);

         if (method.isAbstract() && "abstract class".equals(type)) {
            codeBuilder.append("abstract ");
         }

         codeBuilder.append(method.getReturnType()).append(" ").append(method.getName()).append("(");

         if (method.getParameters() != null && !method.getParameters().isEmpty()) {
            String parameters = method.getParameters().stream()
                  .map(param -> param.getType() + " " + param.getName())
                  .collect(Collectors.joining(", "));
            codeBuilder.append(parameters);
         }

         codeBuilder.append(")");
         if(method.isAbstract()) {
            codeBuilder.append(";");
            return;
         }
         codeBuilder.append(" {\n");
         codeBuilder.append("\t\t// TODO: Implement logic for ").append(method.getName()).append("\n");
         codeBuilder.append("\t\tthrow new UnsupportedOperationException(\"Unimplemented method: ")
                    .append(method.getName()).append("\");\n");
         codeBuilder.append("\t}\n");
      }

   }

   protected void generateConstructors(String name, List<Constructor> constructors,List<Attribute> attributes) {
      if (constructors == null || constructors.isEmpty()) {
         return; // No constructors to generate
      }

      for (Constructor constructor : constructors) {
         validateConstructor(constructor);

         codeBuilder.append("\t").append(constructor.getScope()).append(" ").append(name).append("(");

         if (constructor.getParameters() != null && !constructor.getParameters().isEmpty()) {
            String parameters = constructor.getParameters().stream()
                  .map(param -> param.getType() + " " + param.getName())
                  .collect(Collectors.joining(", "));
            codeBuilder.append(parameters);
         }

         codeBuilder.append(") {\n");

         if (constructor.getParameters() != null && !constructor.getParameters().isEmpty()) {
            if(attributes != null && !attributes.isEmpty()) {
               for (Attribute attribute : attributes) {
                  if (constructor.getParameters().stream().noneMatch(param -> param.getName().equals(attribute.getName()))) {
                     codeBuilder.append("\t\tthis.").append(attribute.getName()).append(" = ").append(attribute.getName()).append(";\n");
                  }
               }
            }
         }

         codeBuilder.append("\t}\n");
      }
   }

   protected void generateAttributes(List<Attribute> attributes) {
      if (attributes == null || attributes.isEmpty()) {
         return; // No attributes to generate
      }

      for (Attribute attribute : attributes) {
         validateAttribute(attribute);

         codeBuilder.append("\t").append(attribute.getScope()).append(" ");

         if (attribute.isStatic()) {
            codeBuilder.append("static ");
         }

         if (attribute.isFinal()) {
            codeBuilder.append("final ");
         }

         codeBuilder.append(attribute.getType()).append(" ").append(attribute.getName()).append(";\n");
      }
   }

   private void validateMethod(Method method) {
      if (method == null) {
         throw new IllegalArgumentException("Method cannot be null.");
      }
      
      if (method.getName() == null || method.getName().isEmpty()) {
         throw new IllegalArgumentException("Method name cannot be null or empty.");
      }
      
      if (method.getReturnType() == null || method.getReturnType().isEmpty()) {
         throw new IllegalArgumentException("Method return type cannot be null or empty.");
      }
      
      if (method.getScope() == null || method.getScope().isEmpty()) {
         throw new IllegalArgumentException("Method scope cannot be null or empty.");
      }
   }

   private void validateConstructor(Constructor constructor) {
      if (constructor == null) {
         throw new IllegalArgumentException("Constructor cannot be null.");
      }
      if (constructor.getScope() == null || constructor.getScope().isEmpty()) {
         throw new IllegalArgumentException("Constructor scope cannot be null or empty.");
      }
   }

   private void validateAttribute(Attribute attribute) {
      if (attribute == null) {
         throw new IllegalArgumentException("Attribute cannot be null.");
      }
      
      if (attribute.getName() == null || attribute.getName().isEmpty()) {
         throw new IllegalArgumentException("Attribute name cannot be null or empty.");
      }

      if (attribute.getType() == null || attribute.getType().isEmpty()) {
         throw new IllegalArgumentException("Attribute type cannot be null or empty.");
      }

      if (attribute.getScope() == null || attribute.getScope().isEmpty()) {
         throw new IllegalArgumentException("Attribute scope cannot be null or empty.");
      }
   }
}
