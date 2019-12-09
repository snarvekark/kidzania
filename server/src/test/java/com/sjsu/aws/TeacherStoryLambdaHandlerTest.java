package com.sjsu.aws;

import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;
import com.sjsu.aws.LambdaHandler.TeacherStoryLambdaHandler;
import com.sjsu.aws.model.TeacherInfoAPIRequest;

public class TeacherStoryLambdaHandlerTest {

	TeacherStoryLambdaHandler handler = new TeacherStoryLambdaHandler();
	
	@Test
	public void testHandleRequest() {
		TeacherInfoAPIRequest input = new TeacherInfoAPIRequest();
		Context context = null;
		
		input.setHttpMethod("GET");
		input.setUsername("Geethu");
		
		List<String> stories = handler.handleRequest(input, context);
		System.out.println(stories.size());
		assertTrue(stories.size() > 0);
	}

}
