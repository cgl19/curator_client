import React from 'react';

const postToYouTube = (accessToken, videoFile, title, description) => {
  const url = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status';

  const metadata = {
    snippet: {
      title: title,
      description: description,
      tags: ['test'],
      categoryId: '22' // Category ID for "People & Blogs"
    },
    status: {
      privacyStatus: 'public' // "private", "public", or "unlisted"
    }
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metadata)
  })
    .then(response => {
      if (response.ok) {
        return response.headers.get('Location'); // Get the upload URL
      } else {
        throw new Error('Failed to initiate upload');
      }
    })
    .then(uploadUrl => {
      fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'video/*' // Adjust the content type as needed
        },
        body: videoFile
      })
        .then(response => response.json())
        .then(data => {
          console.log('Video Uploaded:', data);
        })
        .catch(error => {
          console.error('Error uploading video to YouTube:', error);
        });
    })
    .catch(error => {
      console.error('Error initiating video upload:', error);
    });
};

// Example usage
const ExamplePost = () => {
  const accessToken = 'your_access_token'; // Replace with your token
  const videoFile = null; // Replace with your video file
  const title = 'Test Video';
  const description = 'This is a test video';

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            postToYouTube(accessToken, file, title, description);
          }
        }}
      />
      <button onClick={() => postToYouTube(accessToken, videoFile, title, description)}>
        Post to YouTube
      </button>
    </div>
  );
};

export default ExamplePost;
