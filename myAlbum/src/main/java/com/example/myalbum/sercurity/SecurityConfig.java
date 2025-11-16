package com.example.myalbum.sercurity;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .sessionManagement(session ->
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .csrf(csrf -> csrf.disable())
      .cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
        @Override
        public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
          CorsConfiguration corsConfig = new CorsConfiguration();
          // Autoriser les requêtes depuis Angular (localhost:4200)
          corsConfig.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
          // Autoriser toutes les méthodes HTTP
          corsConfig.setAllowedMethods(Collections.singletonList("*"));
          // Autoriser tous les headers
          corsConfig.setAllowedHeaders(Collections.singletonList("*"));
          // Exposer le header Authorization
          corsConfig.setExposedHeaders(Collections.singletonList("Authorization"));
          return corsConfig;
        }
      }))
      .authorizeHttpRequests(requests -> requests
        // Tout le monde (ADMIN et USER) peut lire tous les albums
        .requestMatchers("/api/all/**").hasAnyAuthority("ADMIN", "USER")

        // Tout le monde (ADMIN et USER) peut lire un album par ID
        .requestMatchers(HttpMethod.GET, "/api/getbyid/**").hasAnyAuthority("ADMIN", "USER")

        // Seulement ADMIN peut ajouter un album
        .requestMatchers(HttpMethod.POST, "/api/addalbum/**").hasAuthority("ADMIN")

        // Seulement ADMIN peut modifier un album
        .requestMatchers(HttpMethod.PUT, "/api/updatealbum/**").hasAuthority("ADMIN")

        // Seulement ADMIN peut supprimer un album
        .requestMatchers(HttpMethod.DELETE, "/api/delalbum/**").hasAuthority("ADMIN")

        // Toutes les autres requêtes nécessitent une authentification
        .anyRequest().authenticated()
      )
      .addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
