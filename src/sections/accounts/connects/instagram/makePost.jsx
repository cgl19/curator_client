import React from 'react';

const postToInstagram = (accessToken, imageUrl, caption) => {
  // Endpoint to create a media object
  const url = `https://graph.instagram.com/v11.0/me/media`;

  const data = {
    image_url: imageUrl,
    caption: caption,
    access_token: accessToken
  };

  fetch(url, {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Media Object Created:', data.id);
      // Now publish the media object
      publishInstagramPost(accessToken, data.id);
    })
    .catch(error => {
      console.error('Error creating media object:', error);
    });
};

const publishInstagramPost = (accessToken, mediaId) => {
  // Endpoint to publish the media object
  const url = `https://graph.instagram.com/v11.0/me/media_publish`;

  const data = {
    creation_id: mediaId,
    access_token: accessToken
  };

  fetch(url, {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('Post Published:', data);
    })
    .catch(error => {
      console.error('Error publishing post to Instagram:', error);
    });
};

// Example usage
const ExamplePost = () => {
  const accessToken = 'your_access_token'; // Replace with your token
  const imageUrl = 'https://example.com/your-image.jpg'; // Replace with your image URL
  const caption = 'Your caption here';

  return (
    <div>
      <button onClick={() => postToInstagram(accessToken, imageUrl, caption)}>
        Post to Instagram
      </button>
    </div>
  );
}; 

export default ExamplePost;
