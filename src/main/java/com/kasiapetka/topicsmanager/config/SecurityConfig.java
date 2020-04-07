package com.kasiapetka.topicsmanager.config;

import com.kasiapetka.topicsmanager.filter.JwtFilter;
import com.kasiapetka.topicsmanager.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    JwtFilter jwtFilter;

    private final String[] WHITELIST = {
            "/h2-console/**",
    };

    //@Value("${spring.queries.users-query}")
    @Value("select email, password, active from users where email=?")
    private String usersQuery;

    @Value("${spring.queries.roles-query}")
    private String rolesQuery;

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication()
//                .withUser("student").password("{noop}test123").roles("Student")
//                .and()
//                .withUser("teacher").password("{noop}test123").roles("Teacher");

     /*   auth. jdbcAuthentication()
                .usersByUsernameQuery(usersQuery)
                .authoritiesByUsernameQuery(rolesQuery)
                .passwordEncoder(this.bCryptPasswordEncoder)
                .dataSource(this.dataSource);*/

        auth.userDetailsService(userDetailsServiceImpl);
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
       /* http
                //HTTP Basic authentication
                .httpBasic()
                .authenticationEntryPoint(new NoPopupBasicAuthenticationEntryPoint())
               .and()
                .authorizeRequests()
                .antMatchers("/api/login").permitAll()
                .and()
                .csrf().disable()
                .formLogin().disable();*/

       //hasPermission hasRole - sprawdzac przed kontrolerem/serwisem

       http
               .csrf().disable()
               .authorizeRequests().antMatchers("/api/login","/api/register").permitAll()
               .antMatchers(WHITELIST).permitAll()
               .anyRequest().authenticated()
               .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

         http
                 .headers().frameOptions().disable();

         http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }
}