package com.sjsu.aws.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({ "com.sjsu.aws.*" })
public class Application
{
    public static void main(String[] args)
    {
        System.out.println( "Inside Application class - Cloud Project" );
        SpringApplication.run(Application.class, args);
    }
}
