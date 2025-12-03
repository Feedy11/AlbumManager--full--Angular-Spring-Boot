package com.fadi.users.users.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
public class SecurityConfig {

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }

  @Bean
  public JWTAuthorizationFilter jwtAuthorizationFilter(UserDetailsService userDetailsService) {
    return new JWTAuthorizationFilter(userDetailsService);
  }

  @Bean
  public SecurityFilterChain filterChain(
    HttpSecurity http,
    AuthenticationManager authMgr,
    JWTAuthorizationFilter jwtAuthorizationFilter
  ) throws Exception {

    JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter(authMgr);
    jwtAuthenticationFilter.setFilterProcessesUrl("/login");

    http
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .csrf(csrf -> csrf.disable())

      .cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
        @Override
        public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
          CorsConfiguration cors = new CorsConfiguration();
          cors.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
          cors.setAllowedMethods(Collections.singletonList("*"));
          cors.setAllowedHeaders(Collections.singletonList("*"));
          cors.setExposedHeaders(Collections.singletonList("Authorization"));
          return cors;
        }
      }))

      .authorizeHttpRequests(req -> req
        .requestMatchers("/login").permitAll()
        .requestMatchers("/register").permitAll()
        .requestMatchers("/verifyEmail/**").permitAll()
        .requestMatchers("/all").hasAuthority("ADMIN")
        .anyRequest().authenticated()
      )

      .addFilter(jwtAuthenticationFilter)
      .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
