package com.sjsu.aws.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import org.springframework.stereotype.Component;

@Component
public class DatabaseConnection {
	 

	public static Connection getDBConnection() {

		Connection con = null;
		Properties properties = new Utilities().getProperties();
		String driverName,dbName,username,password,hostname,port,jdbcUrl = null;
		String url;
		
		if (properties.getProperty("RDS_HOSTNAME") != null) {
			
			driverName = properties.getProperty("RDS_DRIVER_NAME");
			try {
				
				Class.forName(driverName);
				dbName = properties.getProperty("RDS_DB_NAME");
				username = properties.getProperty("RDS_DB_USERNAME");
				password = properties.getProperty("RDS_DB_PASSWORD");
				hostname = properties.getProperty("RDS_HOSTNAME");
				port = properties.getProperty("RDS_PORT");
				jdbcUrl = properties.getProperty("RDS_JDBC_URL");
				url = jdbcUrl + hostname + ":" + port + "/" + dbName;
				
				System.out.println("jdbc " + url);
				con = DriverManager.getConnection(url, username, password);
				
				
			} catch (ClassNotFoundException | SQLException e) {
				
				e.printStackTrace();
			}
		
		}
		
	return con;	
	}
}