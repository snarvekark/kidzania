package com.sjsu.aws.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.transfer.Download;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.GetObjectRequest;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class S3BucketService {

	@Value("${cloud.aws.credentials.accessKey}")
	private String key;

	@Value("${cloud.aws.credentials.secretKey}")
	private String secretKey;

	private S3Client s3Client;

	private AmazonS3 s3;
	
	@Value("${AWS_BUCKET}")
	private String AWS_BUCKET;

	private static final String AWS_BUCKET_CDN = "https://cloud-project-studentapp.s3-us-west-1.amazonaws.com";

	@PostConstruct
	public void initialize() {

		AwsBasicCredentials awsBasicCredentials = AwsBasicCredentials.create(key, secretKey);

		s3Client = S3Client.builder().credentialsProvider(StaticCredentialsProvider.create(awsBasicCredentials))
				.region(Region.US_EAST_1).build();

		AWSCredentials cred = new BasicAWSCredentials(key, secretKey);
		s3 = new AmazonS3Client(cred);
	}

	public String uploadFile(MultipartFile multipartFile, String username) {
		String fileUrl = "";
		try {
			System.out.println("inside uploadFile");
			System.out.println("username is " + username);
			File file = convertMultiPartToFile(multipartFile);
			String fileName = generateFileName(multipartFile);
			fileUrl = AWS_BUCKET_CDN + "/" + AWS_BUCKET + "/" + fileName;
			uploadFileTos3bucket(fileName, file, username);
			file.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return fileUrl;

	}
	
	public void uploadFileWithTitle(File file, String title, String format, String username) {
		try {
			System.out.println("inside uploadFileWithTitle");
			title=title+format;
			System.out.println("title is " + title);
			uploadFileTos3bucket(title, file, username);
			file.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public File convertMultiPartToFile(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		return convFile;
	}

	private String generateFileName(MultipartFile multiPart) {
		return multiPart.getOriginalFilename();
	}

	public void uploadFileTos3bucket(String fileName, File file, String username) {
		PutObjectResult putObject = s3.putObject(AWS_BUCKET, username + "/" + fileName, file);
		System.out.println("uploadFileTos3bucket");
		System.out.println(putObject.getETag());
		System.out.println(putObject.getVersionId());
	}

	public void deleteFile(String fileName, String username) {
		System.out.println("Inside delete file");
		try {
			com.amazonaws.services.s3.model.DeleteObjectRequest deleteObjectRequest = new com.amazonaws.services.s3.model.DeleteObjectRequest(
					AWS_BUCKET, username + "/" + fileName);

			s3.deleteObject(deleteObjectRequest);
			System.out.println("delete completed");
		} catch (AmazonServiceException ex) {
			ex.printStackTrace();
		}

	}

	public void downloadFile(String fileName, String username) {
		System.out.println("Inside Download File");
		File file;
		Download download = null;
		try {

			file = File.createTempFile("tempFile", null);

			TransferManager tm = TransferManagerBuilder.standard().withS3Client(s3).build();

			// download the object to file
			download = tm.download(AWS_BUCKET, username + "/" + fileName, file);

			// block until download finished download.waitForCompletion();
			tm.shutdownNow();

		} catch (IOException e) {
			e.printStackTrace();
		} catch (AmazonServiceException e) {
			e.printStackTrace();
		} catch (AmazonClientException e) {
			e.printStackTrace();
		}
	}
	
	//Read text file from S3 bucket
	public String readFromS3(String bucketName, String username, String key) throws IOException {
	    S3Object s3object = s3.getObject(new GetObjectRequest(
	            bucketName, username+ "/" +key));
	    System.out.println(s3object.getObjectMetadata().getContentType());
	    System.out.println(s3object.getObjectMetadata().getContentLength());
	    String text = null;
	    
	    BufferedReader reader = new BufferedReader(new InputStreamReader(s3object.getObjectContent()));
	    String line;
	    while((line = reader.readLine()) != null) {
	      // can copy the content locally as well
	      // using a buffered writer
	      System.out.println(line);
	      text= text+line;
	    }
	    return text;
	  }

}
