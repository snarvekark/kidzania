package com.sjsu.aws.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.polly.AmazonPolly;
import com.amazonaws.services.polly.AmazonPollyClientBuilder;
import com.amazonaws.services.polly.model.DescribeVoicesRequest;
import com.amazonaws.services.polly.model.DescribeVoicesResult;
import com.amazonaws.services.polly.model.OutputFormat;
import com.amazonaws.services.polly.model.SynthesizeSpeechRequest;
import com.amazonaws.services.polly.model.SynthesizeSpeechResult;
import com.amazonaws.services.polly.model.Voice;
import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.AmazonRekognitionClientBuilder;
import com.amazonaws.services.rekognition.model.AmazonRekognitionException;
import com.amazonaws.services.rekognition.model.DetectLabelsRequest;
import com.amazonaws.services.rekognition.model.DetectLabelsResult;
import com.amazonaws.services.rekognition.model.Image;
import com.amazonaws.services.rekognition.model.Label;
import com.amazonaws.util.IOUtils;

@Service
public class AppService {

	@Value("${cloud.aws.credentials.accessKey}")
	private String key;

	@Value("${cloud.aws.credentials.secretKey}")
	private String secretKey;

	private static AmazonPolly polly;
	private static Voice voice;
	private static AmazonRekognition rekognitionClient;

	@PostConstruct
	public void initialize() {
		polly = AmazonPollyClientBuilder.standard()
				.withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(key, secretKey)))
				.withRegion("us-west-1").build();

		rekognitionClient = AmazonRekognitionClientBuilder.standard()
				.withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(key, secretKey)))
				.withRegion("us-west-1").build();
	}

	/**
	 * Generates audio file from aws polly
	 * 
	 * @param text
	 * @param format
	 * @return
	 * @throws IOException
	 */
	public static File generateAudioFile(String text, OutputFormat format) throws IOException {
		String outputFileName = "/temp.mp3";
		DescribeVoicesRequest describeVoicesRequest = new DescribeVoicesRequest();
		DescribeVoicesResult describeVoicesResult = polly.describeVoices(describeVoicesRequest);
		voice = describeVoicesResult.getVoices().stream().filter(p -> p.getName().equals("Salli")).findFirst().get();
		SynthesizeSpeechRequest synthReq = new SynthesizeSpeechRequest().withText(text).withVoiceId(voice.getId())
				.withOutputFormat(format);
		File file = new File(outputFileName);
		try {

			FileOutputStream outputStream = new FileOutputStream(new File(outputFileName));
			SynthesizeSpeechResult synthesizeSpeechResult = polly.synthesizeSpeech(synthReq);
			byte[] buffer = new byte[2 * 1024];
			int readBytes;

			try (InputStream in = synthesizeSpeechResult.getAudioStream()) {
				while ((readBytes = in.read(buffer)) > 0) {
					outputStream.write(buffer, 0, readBytes);
				}
			}
			outputStream.close();
			file.deleteOnExit();
		} catch (Exception e) {
			System.err.println("Exception caught: " + e);
		}

		return file;
	}

	/**
	 * Generates a text file for the uploaded story
	 * 
	 * @param text
	 * @return
	 * @throws IOException
	 */
	public static File generateTextFile(String text) throws IOException {
		String outputFileName = "/temp.txt";
		File file = new File(outputFileName);
		try {
			FileWriter fileWriter = new FileWriter(file);
			fileWriter.write(text);
			fileWriter.flush();
			fileWriter.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return file;
	}
	
	/**
	 * Detects objects in an image using AWS rekognition
	 * @param image file
	 * @return List of detected labels
	 * @throws IOException
	 */
	public List<String> detectLabelsInFile(File file) throws IOException {
		ByteBuffer imageBytes;
		InputStream inputStream = new FileInputStream(file);
		imageBytes = ByteBuffer.wrap(IOUtils.toByteArray(inputStream));

		DetectLabelsRequest request = new DetectLabelsRequest().withImage(new Image().withBytes(imageBytes))
				.withMaxLabels(10).withMinConfidence(90F);
		List<String> detectedObjects = new ArrayList<>();
		try {
			DetectLabelsResult result = rekognitionClient.detectLabels(request);
			List<Label> labels = result.getLabels();
			detectedObjects = labels.stream().map(label -> label.getName()).collect(Collectors.toList());
		} catch (AmazonRekognitionException e) {
			e.printStackTrace();
		}
		return detectedObjects;
	}

}
