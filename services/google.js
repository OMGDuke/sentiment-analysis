const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

const getComments = async (videoId) => {
  const res = await youtube.commentThreads.list({
    'videoId': videoId,
    'part': 'snippet'
  });
  const comments = res.data.items.map((comment) => {
    return comment.snippet.topLevelComment.snippet.textOriginal
  })
  return comments.join('. ')
}

module.exports = getComments