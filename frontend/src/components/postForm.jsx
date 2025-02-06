import { useState } from 'react';

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  // Handle input change and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/submit/', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json', // Tell the server we are sending JSON
            // "Cookie": "=cookie_value1"
        },
        
        body: JSON.stringify({
            title: formData.title,
            content: formData.content
        }), // Convert the data object to a JSON string
        
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Failed to submit post');
        }
        return response.json(); // Parse the response as JSON
    })
    .then(responseData => {
        console.log('Post created:', responseData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    console.log('Form submitted with data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="title" className="block">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 border border-gray-300"
        />
      </div>
      <div>
        <label htmlFor="content" className="block">Content</label>
        <input
          type="text"
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="p-2 border border-gray-300"
        />
      </div>
      <button type="submit" className="!bg-gray-300 text-bg-gray-400 !p-2 !rounded-full">
        Submit
      </button>
    </form>
  );
};

export default PostForm;