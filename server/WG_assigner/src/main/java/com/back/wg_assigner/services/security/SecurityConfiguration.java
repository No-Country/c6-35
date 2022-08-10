package com.back.wg_assigner.services.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

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
}
