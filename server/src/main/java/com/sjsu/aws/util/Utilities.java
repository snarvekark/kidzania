package com.sjsu.aws.util;

import java.io.IOException;
import java.util.Properties;

public class Utilities {

	private final Properties properties;
	
	public Utilities() {
		properties = new Properties();

		try {
			properties.load(getClass().getClassLoader().getResourceAsStream("application.properties"));
		} catch (IOException e) {

			e.printStackTrace();
		}
	}

	public Properties getProperties() {
		return properties;
	}

}
