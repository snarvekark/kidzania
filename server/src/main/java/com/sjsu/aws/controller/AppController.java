package com.sjsu.aws.controller;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.polly.model.OutputFormat;
import com.sjsu.aws.service.AppService;
import com.sjsu.aws.service.S3BucketService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(value = "/api")
public class AppController {
	
	@Autowired
	S3BucketService s3BucketService;
	
	@PostMapping("/uploadStory")
	public void updateObject(@RequestPart(value = "file",required = false) MultipartFile file,
			@RequestPart(value = "content") String content,
			@RequestPart(value = "title") String title,
			@RequestPart(value = "username") String username ) throws Exception { 
		System.out.println(content);
		s3BucketService.uploadFileWithTitle(AppService.generateAudioFile(content, OutputFormat.Mp3), title,".mp3", username);
		s3BucketService.uploadFileWithTitle(AppService.generateTextFile(content), title ,".txt", username);
		if(file != null) {
			File imageFile = s3BucketService.convertMultiPartToFile(file);
			s3BucketService.uploadFileWithTitle(imageFile, title ,".jpg", username);
		}
	}
	
	@GetMapping("/displayobject")
	public void displayObject(@RequestParam(value = "bucketname") String bucketname, @RequestParam(value = "username") String username,
			@RequestParam(value = "key") String key) throws Exception {
		this.s3BucketService.readFromS3(bucketname,username, key);
	}
}
