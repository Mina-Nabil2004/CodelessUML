package backend.CodelessUML.config;

// import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.NonNull;

@Configuration
public class WebConfig implements WebMvcConfigurer {

   @Override
   public void addCorsMappings(@SuppressWarnings("null") @NonNull CorsRegistry registry) {
      registry.addMapping("/**")
            .allowedOrigins(Front.ORIGIN)
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowCredentials(true);
   }
}
