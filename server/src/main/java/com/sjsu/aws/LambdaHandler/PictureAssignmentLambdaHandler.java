package com.sjsu.aws.LambdaHandler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.sjsu.aws.model.PictureAssignment;
import com.sjsu.aws.model.PictureAssignmentAPIRequest;
import com.sjsu.aws.util.DatabaseConnection;

public class PictureAssignmentLambdaHandler implements RequestHandler<PictureAssignmentAPIRequest, PictureAssignment> {
	
	private Connection connection;

	@Override
	public PictureAssignment handleRequest(PictureAssignmentAPIRequest input, Context context) {
		
		PictureAssignment picture = null;
		
		LambdaLogger logger = context.getLogger();
		
		connection = DatabaseConnection.getDBConnection();
		
		switch(input.getHttpMethod()) {
			
			case "POST":
				
				if (postPictureAssignment(input.getPicture())) {
					
					picture = input.getPicture();
					logger.log("POST Completed");
					break;
				}
			
			case "GET":
				
				logger.log("Inside GET");
				logger.log("before call " + input.getUsername());
				picture = getPictureAssignment(input.getUsername(), input.getClassnumber());
				logger.log("GET Completed");
				break;
				
		}
		return picture;
	}

	private boolean postPictureAssignment(PictureAssignment picture) {
	
		boolean result= false;
		
		try {
			
			PreparedStatement prepareStatement = connection.prepareStatement("INSERT INTO `PictureAssignment` (username,classnumber,picturename,object1,object2,object3,object4,createddate) VALUES (?,?,?,?,?,?,?,?)");
			
			System.out.println("teacher req " + picture);
			prepareStatement.setString(1, picture.getUsername());
			prepareStatement.setInt(2, 1);
			prepareStatement.setString(3, picture.getPicturename());
			prepareStatement.setString(4, picture.getObject1());
			prepareStatement.setString(5, picture.getObject2());
			prepareStatement.setString(6, picture.getObject3());
			prepareStatement.setString(7, picture.getObject4());
			prepareStatement.setDate(8, picture.getCreateddate());
			
			
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
	

	private PictureAssignment getPictureAssignment(String username, int classnumber) {
		
		System.out.println("username "+username);
		PictureAssignment picture = null;
		
		try {
			PreparedStatement prepareStatement = connection
					.prepareStatement("select * from `PictureAssignment` where username = ? and classnumber= ?");
			prepareStatement.setString(1, username);
			prepareStatement.setInt(2, classnumber);
			ResultSet rs = prepareStatement.executeQuery();
			
			if (rs.next()) {
				
				picture = new PictureAssignment();
				picture.setPicturename(rs.getString("picturename"));
				picture.setObject1(rs.getString("object1"));
				picture.setObject2(rs.getString("object2"));
				picture.setObject3(rs.getString("object3"));
				picture.setObject4(rs.getString("object4"));
				picture.setCreateddate(rs.getDate("createddate"));
				
				
			}
			else {
				System.out.println("rs is null");
			}

		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return picture;
	}

	
}
