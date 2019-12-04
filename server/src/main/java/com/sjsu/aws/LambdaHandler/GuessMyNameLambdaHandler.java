package com.sjsu.aws.LambdaHandler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.sjsu.aws.model.PictureAssignmentAPIRequest;
import com.sjsu.aws.util.DatabaseConnection;

public class GuessMyNameLambdaHandler implements RequestHandler<PictureAssignmentAPIRequest, List<String>> {
	
	private Connection connection;
	
	@Override
	public List<String> handleRequest(PictureAssignmentAPIRequest input, Context context) {
		
		List<String>  listOfLabels = null;
		this.connection = DatabaseConnection.getDBConnection();
		
		switch (input.getHttpMethod()) {

		 case "GET":
		    	System.out.println("Inside GuessMyName GET");
		    	System.out.println("before call " + input.getUsername());
		        listOfLabels = getLabels(input.getPicturename(),input.getClassnumber());
		        System.out.println("GET Completed");
		        break;
		        
		 
	    }
		
		return listOfLabels;
	}
	
	private List<String>  getLabels(String picturename,int classnumber){
		
		List<String> listOfLabels = null;
		
		
		System.out.println("picture name is " + picturename);
		System.out.println("class number is " + classnumber);
		
		try {
			PreparedStatement prepareStatement = this.connection.prepareStatement
					("SELECT REPLACE(object1,'_T','') as object1, RIGHT(object1,1) as object1val,\n" + 
					"REPLACE(object2,'_T','') as object2, RIGHT(object2,1) as object2val,\n" + 
					"REPLACE(object3,'_F','') as object3, RIGHT(object3,1) as object3val,\n" + 
					"REPLACE(object4,'_F','') as object4, RIGHT(object4,1) as object4val\n" + 
					"from kidzania.PictureAssignment where picturename = ? and classnumber = ?;");
			
			prepareStatement.setString(1, picturename);
			prepareStatement.setInt(2, classnumber);
			ResultSet rs = prepareStatement.executeQuery();
			listOfLabels= new ArrayList<String>();
			
			while (rs.next()) {
				listOfLabels.add(rs.getString("object1"));
				listOfLabels.add(rs.getString("object1val"));
				listOfLabels.add(rs.getString("object2"));
				listOfLabels.add(rs.getString("object2val"));
				listOfLabels.add(rs.getString("object3"));
				listOfLabels.add(rs.getString("object3val"));
				listOfLabels.add(rs.getString("object4"));
				listOfLabels.add(rs.getString("object4val"));
				
				
				System.out.println("Labels is "+ rs.getString("object1") +"and the labelvalue is" +rs.getString("object1val"));
				System.out.println("Labels is "+ rs.getString("object2") +"and the labelvalue is" +rs.getString("object2val"));
				System.out.println("Labels is "+ rs.getString("object3") +"and the labelvalue is" +rs.getString("object3val"));
				System.out.println("Labels is "+ rs.getString("object4") +"and the labelvalue is" +rs.getString("object4val"));
			}
			
			
		} catch (SQLException e) {
		
			e.printStackTrace();
		}
		listOfLabels.add(picturename);
	    return listOfLabels;
	}
}
 

   
