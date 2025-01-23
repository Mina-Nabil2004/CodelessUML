
@Component
public class Validator {

   public static void validate(Method method) {
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

   public static void validate(Constructor constructor) {
      if (constructor == null) {
         throw new IllegalArgumentException("Constructor cannot be null.");
      }
      if (constructor.getScope() == null || constructor.getScope().isEmpty()) {
         throw new IllegalArgumentException("Constructor scope cannot be null or empty.");
      }
   }

   public static void validate(Attribute attribute) {
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