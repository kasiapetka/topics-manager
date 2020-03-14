//package com.kasiapetka.topicsmanager.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.*;
//
//@EnableWebMvc
//@Configuration
//public class MvcConfig extends WebMvcConfigurerAdapter {
//
//    @Override
//    public void addResourceHandlers(
//            ResourceHandlerRegistry registry) {
//
//        registry.addResourceHandler("/*.js")
//                .addResourceLocations("/src/");
//        registry.addResourceHandler("/*.json")
//                .addResourceLocations("/public/");
//        registry.addResourceHandler("/*.ico")
//                .addResourceLocations("/public/");
//        registry.addResourceHandler("/index.html")
//                .addResourceLocations("/public/index.html");
//    }
//}