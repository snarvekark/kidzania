package com.sjsu.aws.LambdaHandler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Date;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.sjsu.aws.model.UserInfo;
import com.sjsu.aws.model.UserInfoAPIRequest;
import com.sjsu.aws.util.DatabaseConnection;


public class UserInfoLambdaHandler implements RequestHandler<UserInfoAPIRequest, UserInfo> {
	
	private Connection connection;
	
	@Override
	public UserInfo handleRequest(UserInfoAPIRequest input, Context context) {
		
		UserInfo userinfo = null;
		
		//LambdaLogger logger = context.getLogger();
		
		connection = DatabaseConnection.getDBConnection();
		
		switch(input.getHttpMethod()) {
			
			case "POST":
				
				if (postUserInfo(input.getUser())) {
					
					userinfo = input.getUser();
					//logger.log("POST Completed");
					break;
				}
			
			case "GET":{}	
		}
		return userinfo;
	}
	
	
	private boolean postUserInfo(UserInfo userinfo) {
	
		boolean result= false;
		
		try {
			
			PreparedStatement prepareStatement = connection.prepareStatement("INSERT INTO `UserInfo` (UserName,Profile,CreatedDate) VALUES (?,?,?)");
			
			System.out.println("student req " + userinfo);
			prepareStatement.setString(1, userinfo.getUsername());
			prepareStatement.setString(2, userinfo.getProfile());
			prepareStatement.setDate(3, userinfo.getCreatedDate());
			
			int rows = prepareStatement.executeUpdate();
			System.out.println("rows after executeUpdate " + rows);
			if (rows > 0)
				result = true;
			
			
		} catch (SQLException e) {
			
			e.printStackTrace();
			System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
		}
		
		
		return result;
	}
}
