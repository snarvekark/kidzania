package com.sjsu.aws.LambdaHandler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.sjsu.aws.model.TeacherInfo;
import com.sjsu.aws.model.TeacherInfoAPIRequest;
import com.sjsu.aws.util.DatabaseConnection;

public class TeacherStoryLambdaHandler implements RequestHandler<TeacherInfoAPIRequest, List<String>> {
	
	private Connection connection;
	
	public List<String> handleRequest(TeacherInfoAPIRequest input, Context context){
		 
		 
		 List<String> listOfStories = null;
		 
		 this.connection = DatabaseConnection.getDBConnection();
		 
		 switch (input.getHttpMethod()) {

		 case "GET":
		    	System.out.println("Inside GET");
		    	System.out.println("before call " + input.getUsername());
		        listOfStories = getTeacherStory(input.getUsername());
		        System.out.println("GET Completed");
		        break;
		        
		 case "PUT":
		        if (postTeacherStory(input.getTeacher())) {
		        
		        listOfStories = new ArrayList<String>();
		        } 
		        break;
		    
	    }
		 return listOfStories;
		 
	 }
	private List<String> getTeacherStory(String username){
		
		List<String> listOfStories = null;
		System.out.println("username " + username);
	    
	    try {
			PreparedStatement prepareStatement = this.connection.prepareStatement("select StoryTitle from TeacherInfo where UserName=?");
			prepareStatement.setString(1, username);
			ResultSet rs = prepareStatement.executeQuery();
			
			listOfStories = new ArrayList<String>();
			
			while (rs.next()) {
				listOfStories.add(rs.getString("StoryTitle"));
			}
			
		} catch (SQLException e) {
		
			e.printStackTrace();
		}
	    return listOfStories;
	}
	
	
	private boolean postTeacherStory(TeacherInfo teacher) {
	    boolean result = false;
	    
	    try {
			PreparedStatement prepareStatement = this.connection.prepareStatement("UPDATE TeacherInfo SET Classnumber = ? WHERE UserName= ? and StoryTitle=?");
			prepareStatement.setString(1, teacher.getClassnumber());
			prepareStatement.setString(2, teacher.getUsername());
			prepareStatement.setString(3, teacher.getStoryTitle());
			
			int rows = prepareStatement.executeUpdate();
			System.out.println("rows after executeUpdate " + rows);
		      if (rows > 0) {
		        result = true;
		      }
			
		} catch (SQLException e) {
			
		      e.printStackTrace();
		      System.err.format("SQL State: %s\n%s", new Object[] { e.getSQLState(), e.getMessage() });
		}

	   return result; 
	}
	
}

