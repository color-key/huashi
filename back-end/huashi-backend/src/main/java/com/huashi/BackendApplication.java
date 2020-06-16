package com.huashi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.huashi.entity"})
@EnableJpaRepositories(basePackages ={"com.huashi"})
//@EnableJpaRepositories(basePackages ={"com.huashi.dao", "com.huashi.dao.plus"})
//@ComponentScan(basePackages={
//        "com.huashi"
////        "com.fy"
////        "com.fy.service",
////        "com.fy.converter",
////        "com.fy.dto"
//})
class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
