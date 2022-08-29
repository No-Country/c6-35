package com.back.wg_assigner.services.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().disable().csrf().disable();

        http.authorizeRequests().antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and().formLogin()
                .and().httpBasic();

        http.headers().frameOptions().sameOrigin();

        return http.build();
    }

    @Value("${app.client}")
    private String originsClient;
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*")
                        .allowedOrigins(originsClient)
                        .allowedMethods("GET", "POST", "PUT","DELETE")
                        .maxAge(3600);
            }
        };
    }
}


