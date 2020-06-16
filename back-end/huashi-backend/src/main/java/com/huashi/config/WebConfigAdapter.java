package com.huashi.config;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author xiaoyu
 * @data 2020/6/3.
 */
@Configuration
public class WebConfigAdapter implements WebMvcConfigurer {

    private Logger logger = LogManager.getLogger(AuthTokenInterceptor.class);

    @Bean
    public AuthTokenInterceptor getAccessInterceptor(){
        System.out.println("注入了AccessInterceptor");
        return new AuthTokenInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getAccessInterceptor()).addPathPatterns("/**");
        logger.info("============添加拦截器============");
    }
}
