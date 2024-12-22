package backend.CodelessUML.generators.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import backend.CodelessUML.generators.FileGenerator;
import backend.CodelessUML.model.Attribute;
import backend.CodelessUML.model.Constructor;
import backend.CodelessUML.model.Method;
import backend.CodelessUML.model.Node;
import backend.CodelessUML.model.Parameter;
import backend.CodelessUML.model.Relation;
import lombok.Data;


@Data
@Service
public class ClassGenerator implements FileGenerator {
   private StringBuilder codeBuilder = new StringBuilder();

   @Override
   public String generate(Node node) {
      generatePackageHeader(node.getPackageName());
      codeBuilder.append("\n");
      
      generateClassHeader(node.getPackageName(), node.getScope(), node.getRelations());
      codeBuilder.append("\n");
      
      generateAttributes(node.getAttributes());
      codeBuilder.append("\n");
      
      generateConstructors(node.getName(), node.getConstructors());
      codeBuilder.append("\n");

      generateMethods(node.getMethods());
      codeBuilder.append("\n");

      return codeBuilder.toString();
   }

   public void generatePackageHeader(String packageName) {
      codeBuilder.append("package ").append(packageName).append(";\n\n");
   }
   
   public void generateClassHeader(String name, String scope, Relation relations) {
      codeBuilder.append(scope).append(" class ").append(name);
      if (relations.getExtendsId() != null) {
            codeBuilder.append(" extends ").append(getNodeNameById(relations.getExtendsId()));
      }
      if (!relations.getImplementsIds().isEmpty()) {
            codeBuilder.append(" implements ").append(
                relations.getImplementsIds().stream()
                    .map(this::getNodeNameById)
                    .collect(Collectors.joining(", "))
            );
        }
   }

   public String getNodeNameById(String id) {return "not done yet";}
   
   public void generateAttributes(List<Attribute> attributes) {
      for(Attribute attribute : attributes) {
         codeBuilder.append("\t");
         
         codeBuilder.append(attribute.getScope() + " ")
                    .append(attribute.getType() + " ")
                    .append(attribute.isStatic() ? "static " : "")
                    .append(attribute.getName())
                    .append(";");
         
         codeBuilder.append("\n");
      }
      codeBuilder.append("\n");
   }

   public void generateConstructors(String name, List<Constructor> constructors) {
        for (Constructor constructor : constructors) {
            codeBuilder.append("\t").append(constructor.getScope()).append(" ").append(name).append("(");
            codeBuilder.append(constructor.getParameters().stream()
                    .map(param -> param.getType() + " " + param.getName())
                    .collect(Collectors.joining(", "))
            );
            codeBuilder.append(") {\n\t\t// TODO: Constructor logic\n\t}\n");
        }
   }
   
   public void generateMethods(List<Method> methods) {
      String end;
      for(Method method : methods) {
         codeBuilder.append("\t");
         end = " {\n\t\t}\n\n";
         
         codeBuilder.append(method.getScope() + " ");
         
         if(method.isAbstract()) {
            end = " ;\n\n";
            codeBuilder.append("abstract ");
         
         } else if (method.isStatic()) {
            codeBuilder.append("static ");
         }
         
         codeBuilder.append(method.getReturnType() + " ");
         codeBuilder.append(method.getName());
         
         codeBuilder.append("(");
         for(Parameter param : method.getParameters()) {
            codeBuilder.append(param.getType() + " ")
                       .append(param.getName());
         }
         codeBuilder.append(")");
         
         codeBuilder.append(end);
      }
      codeBuilder.append("\n");
   }
   
   /**
    * package
    * public class ..............
    * Attributes
    * constructors
    * methods (header)
   */
}