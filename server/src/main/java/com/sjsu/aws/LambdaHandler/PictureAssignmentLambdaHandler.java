package com.sjsu.aws.LambdaHandler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.sjsu.aws.model.PictureAssignment;
import com.sjsu.aws.model.PictureAssignmentAPIRequest;
import com.sjsu.aws.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;




public class PictureAssignmentLambdaHandler implements RequestHandler<PictureAssignmentAPIRequest, List<PictureAssignment>>
{
  private Connection connection;
  
  public List<PictureAssignment> handleRequest(PictureAssignmentAPIRequest input, Context context) {
   
	PictureAssignment picture = null;
    
    LambdaLogger logger = context.getLogger();
    
    this.connection = DatabaseConnection.getDBConnection();
   
    List<PictureAssignment> list = null;
    
    switch (input.getHttpMethod()) {

      
      case "POST":
        if (postPictureAssignment(input.getPicture())) {
          list = new ArrayList<>();
          picture = input.getPicture();
          logger.log("POST Completed");
          list.add(picture);
        } 
        break;

      
      case "GET":
        logger.log("Inside GET");
        
        list = getPictureAssignment(input.getClassnumber());
        logger.log("GET Completed");
        break;
    } 
    
    return list;
  }

  //picture assignment post for picture story page
  private boolean postPictureAssignment(PictureAssignment picture) {
    boolean result = false;

    
    try {
      PreparedStatement prepareStatement = this.connection.prepareStatement("INSERT INTO `PictureAssignment` (username,classnumber,picturename,cloudfrontPictureFile,object1,object2,object3,object4,createddate) VALUES (?,?,?,?,?,?,?,?,?)");
      
      System.out.println("picture assignment - post " + picture);
      prepareStatement.setString(1, picture.getUsername());
      prepareStatement.setInt(2, picture.getClassnumber());
      prepareStatement.setString(3, picture.getPicturename());
      prepareStatement.setString(4, picture.getCloudfrontpicturefile());
      prepareStatement.setString(5, picture.getObject1() + "_T");
      prepareStatement.setString(6, picture.getObject2() + "_T");
      prepareStatement.setString(7, picture.getObject3() + "_F");
      prepareStatement.setString(8, picture.getObject4() + "_F");
      prepareStatement.setDate(9,new Date(new java.util.Date().getTime()));

      
      int rows = prepareStatement.executeUpdate();
      System.out.println("rows after executeUpdate " + rows);
      if (rows > 0) {
        result = true;
      }
    }
    catch (SQLException e) {
      
      e.printStackTrace();
      System.err.format("SQL State: %s\n%s", new Object[] { e.getSQLState(), e.getMessage() });
    } 

    
    return result;
  }

//For Parent page - getting pictures assigned to the classnumber 
  private List<PictureAssignment> getPictureAssignment(int classnumber) {
	  
    List<PictureAssignment> pictureList = null;
   
    PictureAssignment picture = null;

    
    try {
      PreparedStatement prepareStatement = this.connection.prepareStatement("select * from `PictureAssignment` where classnumber= ?");
      prepareStatement.setInt(1, classnumber);
      ResultSet rs = prepareStatement.executeQuery();
      
      pictureList = new ArrayList<>();
      while (rs.next())
      {
        picture = new PictureAssignment();
        
        picture.setUsername(rs.getString("username"));
        picture.setClassnumber(rs.getInt("classnumber"));
        picture.setPicturename(rs.getString("picturename"));
        picture.setCloudfrontpicturefile("cloudfrontpicturefile");
        picture.setObject1(rs.getString("object1"));
        picture.setObject2(rs.getString("object2"));
        picture.setObject3(rs.getString("object3"));
        picture.setObject4(rs.getString("object4"));
        picture.setCreateddate(rs.getDate("createddate"));
        
        pictureList.add(picture);
      }
      
    
    } catch (SQLException e) {
      
      e.printStackTrace();
    } 
    return pictureList;
  }
}
