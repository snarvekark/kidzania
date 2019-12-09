package com.sjsu.aws;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;
import com.sjsu.aws.LambdaHandler.GuessMyNameLambdaHandler;
import com.sjsu.aws.model.PictureAssignmentAPIRequest;

public class GuessMyNameLambdaHandlerTest {

	GuessMyNameLambdaHandler handler = new GuessMyNameLambdaHandler();
	
	
	@Test
	public void testHandleRequest() {
		
		PictureAssignmentAPIRequest input = new PictureAssignmentAPIRequest();
		Context context = null;
		
		input.setHttpMethod("GET");
		input.setUsername("Geethu");	
		
		List<String> listOfLabels = handler.handleRequest(input, context);
		System.out.println(listOfLabels.size());
		assertTrue(listOfLabels.size() > 0);
	}

}
