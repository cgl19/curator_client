import React from 'react';

const postToTikTok = (accessToken, videoFile) => {
  const url = `https://open-api.tiktok.com/share/video/upload/`;

  const formData = new FormData();
  formData.append('video', videoFile);

  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Video Uploaded:', data);
    })
    .catch(error => {
      console.error('Error uploading video to TikTok:', error);
    });
};

// Example usage
const ExamplePost = () => {
  const accessToken = 'your_access_token'; // Replace with your token
  const videoFile = null; // Replace with your video file

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            postToTikTok(accessToken, file);
          }
        }}
      />
      <button onClick={() => postToTikTok(accessToken, videoFile)}>
        Post to TikTok
      </button>
    </div>
  );
};

export default ExamplePost;
