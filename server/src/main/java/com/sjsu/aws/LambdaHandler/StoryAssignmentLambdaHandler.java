package com.sjsu.aws.LambdaHandler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.sjsu.aws.model.TeacherInfo;
import com.sjsu.aws.model.TeacherInfoAPIRequest;
import com.sjsu.aws.model.UserInfo;
import com.sjsu.aws.model.UserInfoAPIRequest;
import com.sjsu.aws.util.DatabaseConnection;

public class StoryAssignmentLambdaHandler implements RequestHandler<TeacherInfoAPIRequest, String>  {
	
	private Connection connection;
	public String handleRequest(TeacherInfoAPIRequest input, Context context){
		
		
		this.connection = DatabaseConnection.getDBConnection();
		String teacherUsername = "";
		switch (input.getHttpMethod()) {
			case "GET":
				System.out.println("Inside GET of StoryAssignmentLambdaHandler");
	    		teacherUsername = getTeacherUsername(input.getStoryTitle());
				System.out.println("GET for fetching the teachername is Completed");
	        	break;
		}
		return teacherUsername;
	}
	
	private String getTeacherUsername(String storyTitle) {
		String teacherUsername = "";
		TeacherInfo teacherinfo = null;
		
		 PreparedStatement prepareStatement;
		try {
			prepareStatement = this.connection.prepareStatement("select UserName from `TeacherInfo` where StoryTitle = ?");
			prepareStatement.setString(1, storyTitle);
		    
			ResultSet rs = prepareStatement.executeQuery();
		      
			if (rs.next()) {
		    	  teacherUsername =rs.getString("UserName");
		    	  System.out.println("The Username of Teacher is :"+teacherUsername);
			}
		     } catch (SQLException e) {
			
			e.printStackTrace();
		}
	      
		return teacherUsername;
		
	}
}
