package com.kaisha.SekouManagement;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication  //(scanBasePackages = "com.kaisha")
//@ComponentScan("com.kaisha")
//@MapperScan("com.kaisha.SekouManagement.mapper")
@PropertySource("classpath:application.properties")
public class SekouManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(SekouManagementApplication.class, args);
	}

}
