package backend.CodelessUML.generators.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import backend.CodelessUML.generators.FileGenerator;
import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Constructor;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;

@Component("abstract class")
public class AbstractClassGenerator extends FileGenerator {

   @Override
   public String generate(Node node) {
      if (node == null) {
         throw new IllegalArgumentException("Node cannot be null");
      }
      if (!"abstract class".equalsIgnoreCase(node.getType())) {
         throw new IllegalArgumentException("Invalid node type for AbstractClassGenerator: " + node.getType());
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

         // Generate abstract class methods
         generateMethods(node.getType(), node.getMethods());
         codeBuilder.append("\n");

         // Closing class brace
         codeBuilder.append("}");
         codeBuilder.append("\n");

      } catch (Exception e) {
         throw new RuntimeException("Failed to generate abstract class code: " + e.getMessage(), e);
      }

      return codeBuilder.toString();
   }

   /**
    * Generates the class attributes, ensuring proper formatting.
    */
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
         codeBuilder.append(attribute.getScope() + " ");
         
         if (attribute.isStatic()) {
            codeBuilder.append("static ");
         }
         
         if (attribute.isFinal()) {
            codeBuilder.append("final ");
         }

         codeBuilder.append(attribute.getType() + " ")
                    .append(attribute.getName())
                    .append(";\n");
      }
   }

   /**
    * Generates the constructors for the class, ensuring proper formatting.
    */
   @Override
   protected void generateConstructors(String name, List<Constructor> constructors, List<Attribute> attributes) {
      if (constructors == null || constructors.isEmpty()) {
         codeBuilder.append("\t// No constructors defined for this class\n");
         return;
      }

      for (Constructor constructor : constructors) {
         if (constructor == null) {
            continue; // Skip null constructors if any
         }

         codeBuilder.append("\t").append(constructor.getScope()).append(" ")
                    .append(name).append("(");
         
         // Generate constructor parameters
         String params = constructor.getParameters().stream()
                .map(param -> param.getType() + " " + param.getName())
                .collect(Collectors.joining(", "));
         codeBuilder.append(params);
         codeBuilder.append(") {\n");

         // Generate constructor body (if any)
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

   // /**
   //  * Generates the abstract class methods, ensuring proper formatting and handling abstract methods.
   //  */
   // @Override
   // protected void generateMethods(String type, List<Method> methods) {
   //    if (methods == null || methods.isEmpty()) {
   //       codeBuilder.append("\t// No methods defined for this class\n");
   //       return;
   //    }

   //    for (Method method : methods) {
   //       if (method == null) {
   //          continue; // Skip null methods if any
   //       }

   //       codeBuilder.append("\t");
   //       codeBuilder.append(method.getScope() + " ");
         
   //       if (method.isStatic()) {
   //          codeBuilder.append("static ");
   //       }

   //       // For abstract methods, don't include body
   //       if ("abstract class".equalsIgnoreCase(type) ) {
   //          codeBuilder.append("abstract ");
   //       }

   //       codeBuilder.append(method.getReturnType() + " ")
   //                  .append(method.getName())
   //                  .append("(");
         
   //       String params = method.getParameters().stream()
   //               .map(param -> param.getType() + " " + param.getName())
   //               .collect(Collectors.joining(", "));
   //       codeBuilder.append(params);
   //       codeBuilder.append(");");
   //       codeBuilder.append("\n");
   //    }
   // }
}
