package backend.CodelessUML.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import lombok.NonNull;

// import io.micrometer.common.lang.NonNull;
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(@SuppressWarnings("null") @NonNull MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // Enables a simple in-memory broker
        config.setApplicationDestinationPrefixes("/ws"); // Prefix for messages bound for methods annotated with
    }

    @Override
    public void registerStompEndpoints(@SuppressWarnings("null") @NonNull StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOrigins(Front.ORIGIN)
                .withSockJS(); // Endpoint for WebSocket clients to connect
    }
}
