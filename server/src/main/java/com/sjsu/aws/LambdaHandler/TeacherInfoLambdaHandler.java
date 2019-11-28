package com.sjsu.aws.LambdaHandler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.sjsu.aws.model.TeacherInfo;
import com.sjsu.aws.model.TeacherInfoAPIRequest;
import com.sjsu.aws.util.DatabaseConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class TeacherInfoLambdaHandler implements RequestHandler<TeacherInfoAPIRequest, List<TeacherInfo>>
{
  private Connection connection;
  
  public List<TeacherInfo> handleRequest(TeacherInfoAPIRequest input, Context context) {
    
	TeacherInfo teacherinfo = null;
    
    //LambdaLogger logger = context.getLogger();
    
    this.connection = DatabaseConnection.getDBConnection();
    
    List<TeacherInfo> list = null;
    
    switch (input.getHttpMethod()) {

      
      case "POST":
        if (postTeacherInfo(input.getTeacher())) {
          list = new ArrayList<>();
          teacherinfo = input.getTeacher();
          System.out.println("POST Completed");
          list.add(teacherinfo);
        } 
        break;

      
      case "GET":
    	System.out.println("Inside GET");
    	System.out.println("before call " + input.getUsername());
        list = getTeacherInfo(input.getUsername());
        System.out.println("GET Completed");
        break;
    } 
    return list;
  }

  
  private boolean postTeacherInfo(TeacherInfo teacherinfo) {
    boolean result = false;

    
    try {
      PreparedStatement prepareStatement = this.connection.prepareStatement("INSERT INTO `TeacherInfo` (UserName,StoryTitle,StoryTextFile,cloudFrontTextFile,StoryPicture,Storymp3,CloudFrontmp3,Classnumber,CreatedDate) VALUES (?,?,?,?,?,?,?,?,?)");

      
      System.out.println("teacher req " + teacherinfo);
      prepareStatement.setString(1, teacherinfo.getUsername());
      prepareStatement.setString(2, teacherinfo.getStoryTitle());
      prepareStatement.setString(3, teacherinfo.getStoryTextFile());
      prepareStatement.setString(4, teacherinfo.getCloudFrontTextFile());
      prepareStatement.setString(5, teacherinfo.getStoryPicture());
      prepareStatement.setString(6, teacherinfo.getStoryMp3());
      prepareStatement.setString(7, teacherinfo.getCloudFrontmp3());
      prepareStatement.setString(8, teacherinfo.getClassnumber());
      prepareStatement.setDate(9, teacherinfo.getCreatedDate());
      
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
  
  private List<TeacherInfo> getTeacherInfo(String username) {
    List<TeacherInfo> teacherList = null;
    System.out.println("username " + username);
    TeacherInfo teacherinfo = null;

    
    try {
      PreparedStatement prepareStatement = this.connection.prepareStatement("select * from `TeacherInfo` where UserName = ?");
      prepareStatement.setString(1, username);
      ResultSet rs = prepareStatement.executeQuery();
      
      teacherList = new ArrayList<>();
      while (rs.next()) {
        teacherinfo = new TeacherInfo();
        teacherinfo.setUsername(rs.getString("UserName"));
        teacherinfo.setStoryTitle(rs.getString("StoryTitle"));
        teacherinfo.setStoryTextFile(rs.getString("StoryTextFile"));
        teacherinfo.setCloudFrontTextFile(rs.getString("cloudFrontTextFile"));
        teacherinfo.setStoryPicture(rs.getString("StoryPicture"));
        teacherinfo.setStoryMp3(rs.getString("Storymp3"));
        teacherinfo.setCloudFrontmp3(rs.getString("CloudFrontmp3"));
        teacherinfo.setClassnumber(rs.getString("Classnumber"));
        teacherinfo.setCreatedDate(rs.getDate("CreatedDate"));
        teacherList.add(teacherinfo);
      }
    
    } catch (SQLException e) {
      e.printStackTrace();
    } 
    return teacherList;
  }
}
