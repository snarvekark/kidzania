package com.sjsu.aws.controller;

import java.io.File;
import java.sql.Date;
import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.polly.model.OutputFormat;
import com.sjsu.aws.LambdaHandler.TeacherInfoLambdaHandler;
import com.sjsu.aws.model.TeacherInfo;
import com.sjsu.aws.model.TeacherInfoAPIRequest;
import com.sjsu.aws.service.AppService;
import com.sjsu.aws.service.S3BucketService;
import com.sjsu.aws.util.Utilities;


@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class AppController {

	@Autowired
	S3BucketService s3BucketService;

	@Autowired
	AppService appService;

	@PostMapping("/uploadStory")
	public void updateObject(@RequestPart(value = "file", required = false) MultipartFile file,
			@RequestPart(value = "content") String content, @RequestPart(value = "title") String title,
			@RequestPart(value = "username") String username) throws Exception {
		s3BucketService.uploadFileWithTitle(appService.generateAudioFile(content, OutputFormat.Mp3), title, ".mp3",
				username);
		s3BucketService.uploadFileWithTitle(appService.generateTextFile(content), title, ".txt", username);
		if (file != null) {
			File imageFile = s3BucketService.convertMultiPartToFile(file);
			s3BucketService.uploadFileWithTitle(imageFile, title, ".jpg", username);
		}
		s3BucketService.postDataToDB(username, title);
	}


	@GetMapping("/displayobject")
	public String displayObject(@RequestParam(value = "bucketname") String bucketname,
			@RequestParam(value = "username") String username, @RequestParam(value = "key") String key)
			throws Exception {
		return this.s3BucketService.readFromS3(bucketname, username, key);
	}

	@PostMapping("/uploadImage")
	public List<String> uploadImageForRecognition(@RequestPart(value = "file", required = false) MultipartFile file)
			throws Exception {
		File imageFile = s3BucketService.convertMultiPartToFile(file);
		s3BucketService.uploadFileTos3bucket(file.getOriginalFilename(), imageFile, "Pictures");
		return appService.detectLabelsInFile(imageFile);
		
	}
}
