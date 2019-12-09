package com.sjsu.aws;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;
import com.sjsu.aws.LambdaHandler.PictureAssignmentLambdaHandler;
import com.sjsu.aws.model.PictureAssignment;
import com.sjsu.aws.model.PictureAssignmentAPIRequest;

public class PictureAssignmentLambdaHandlerTest {

	PictureAssignmentLambdaHandler handler = new PictureAssignmentLambdaHandler();
	
	@Test
	public void testHandleRequest() {
		Context context =  null;
		PictureAssignmentAPIRequest input = new PictureAssignmentAPIRequest();
		
		input.setHttpMethod("GET");
		input.setClassnumber(1);
		
		List<PictureAssignment> listOfPics = handler.handleRequest(input, context);
		System.out.println(listOfPics.size());
		assertTrue(listOfPics.size() > 0);
	}

}
