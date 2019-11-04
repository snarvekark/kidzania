package com.sjsu.aws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.services.polly.model.OutputFormat;
import com.sjsu.aws.service.AppService;
import com.sjsu.aws.service.S3BucketService;

@RestController
@RequestMapping(value = "/api")
public class AppController {
	
	@Autowired
	S3BucketService s3BucketService;
	
	@PostMapping("/uploadStory")
	public void updateObject(@RequestPart(value = "content") String content,
			@RequestPart(value = "title") String title,
			@RequestPart(value = "username") String username ) throws Exception { 
		this.s3BucketService.uploadFileWithTitle(AppService.generateAudioFile(content, OutputFormat.Mp3), title,".mp3", username);
		this.s3BucketService.uploadFileWithTitle(AppService.generateTextFile(content), title ,".txt", username);
	}
}
