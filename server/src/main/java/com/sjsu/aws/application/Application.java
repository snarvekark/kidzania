package com.sjsu.aws.application;

import java.sql.Date;
import java.util.Calendar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.sjsu.aws.LambdaHandler.UserInfoLambdaHandler;
import com.sjsu.aws.model.UserInfo;
import com.sjsu.aws.model.UserInfoAPIRequest;

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
