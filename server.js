require('dotenv').config();

const getComments = require('./services/google.js')

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

const tone_analyzer = new ToneAnalyzerV3({
  username: process.env.TONE_ANALYZER_USERNAME,
  password: process.env.TONE_ANALYZER_PASSWORD,
  version_date: process.env.TONE_ANALYZER_VERSION_DATE
});

const getSentiment = async (videoId) => {
  getComments(videoId).then(res => {
    let params = {
      tone_input: res,
      content_type: 'text/plain',
      sentences: true
    };
    tone_analyzer.tone(params, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log(response.document_tone.tone_categories[0].tones);
      }
    });
  }).catch(console.log);
}

getSentiment('sMxVtOCWWzw')
