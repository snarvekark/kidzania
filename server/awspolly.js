const express = require("express");
const AWSreturn = express.Router();
const cors = require("cors");
var AWS = require("aws-sdk");
const Fs = require('fs');


AWSreturn.use(cors());

let awsConfig = {
    region: "us-east-2",
    accessKeyId: "AKIAJB4VPCPQ2ACAKNVA",
    secretAccessKey: "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"
};
AWS.config.update(awsConfig);
var polly = new AWS.Polly();

AWSreturn.get("/", (req, res)=>{
    var params = {
        OutputFormat: "mp3", 
        SampleRate: "8000", 
        Text: "My Name is Juhi Nayak and this is my first polly.",
        //Text: req.query,
        TextType: "text", 
        VoiceId: "Joanna"
       };
       polly.synthesizeSpeech(params, (err, data) => {
          if (err) {
              console.log(err.code)
          } else if (data) {
              if (data.AudioStream instanceof Buffer) {
                  Fs.writeFile("./speech.mp3", data.AudioStream, function(err) {
                      if (err) {
                          return console.log(err)
                      }
                      console.log("The file was saved!")
                  })
              }
          }
      })
});

/*AWSreturn.get("/", (req, res)=>{

/**
 * Use as proxy between front and AWS Polly API
 * Everything come in querystring
 * voiceId : see Polly API for the list http://docs.aws.amazon.com/fr_fr/polly/latest/dg/API_Voice.html#API_Voice_Contents
 * type :
 *   - file (default) : generate mp3 file on public bucket
 *   - stream : stream response
 *
export const textToSpeech = async (req, res) => {

    const { voiceId = 'Kimberly', text = 'My Name is Juhi Nayak. I am polly from amazon services.', filename = 'speech.mp3', type = 'file' } = req.query
  
    try {
      const audio = await generatePollyAudio(text, voiceId)
  
      if(type === 'file') {
        const data = await writeAudioStreamToS3(audio.AudioStream, filename)
        res.send(data)
      }
      else if (type === 'stream') {
        res.send(audio.AudioStream)
      }
      else throw { errorCode: 400, error: 'Wrong type for output provided.' }
    }
    catch (e) {
      if(e.errorCode && e.error) res.status(e.errorCode).send(e.error)
      else res.status(500).send(e)
    }
  }
  
  // Generate audio from Polly and check if output is a Buffer
  const generatePollyAudio = (text, voiceId) => {
    const params = {
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: voiceId
    }
  
    return polly.synthesizeSpeech(params).promise().then( audio => {
      if (audio.AudioStream instanceof Buffer) return audio
      else throw 'AudioStream is not a Buffer.'
    })
  
  }
  
  const writeAudioStreamToS3 = ( audioStream, filename ) =>
    putObject(aws_publicBucket, filename, audioStream,'audio/mp3').then( res => {
      if(!res.ETag) throw res
      else return {
        msg: 'File successfully generated.',
        ETag: res.ETag,
        url: 'https://kidzaniapolly.s3.us-east-2.amazonaws.com/${filename}'
      }
    })
  
  const putObject = (bucket, key, body, ContentType) =>
    s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType
    }).promise()

});*/



module.exports = AWSreturn;