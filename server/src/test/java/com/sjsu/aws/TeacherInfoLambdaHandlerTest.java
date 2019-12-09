package com.sjsu.aws;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;
import com.sjsu.aws.LambdaHandler.TeacherInfoLambdaHandler;
import com.sjsu.aws.model.TeacherInfo;
import com.sjsu.aws.model.TeacherInfoAPIRequest;

public class TeacherInfoLambdaHandlerTest {

	TeacherInfoLambdaHandler handler = new TeacherInfoLambdaHandler();
	
	@Test
	public void testHandleRequest() {
	
		TeacherInfoAPIRequest input = new TeacherInfoAPIRequest();
		Context context = null;
		
		input.setHttpMethod("GET");
		input.setClassnumber("1");
		
		List<TeacherInfo> teacherList = handler.handleRequest(input, context);
		assertTrue(teacherList.size() > 0);
		
	}

}
