package com.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.api")
@EntityScan("com.api.model")
public class ExpertusApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpertusApiApplication.class, args);
	}

}

