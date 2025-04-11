import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface BlogData {
  title: string;
  content: string;
  author: string;
  coverImage?: File;
  date: string; // Add the date field
  description: string; // Add the description field
}

interface CommentData {
  content: string;
}

// Fetch all blogs
export const fetchBlogs = async (locale: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/blogs`, {
      params: {
        locale: locale,
        populate: '*',      
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

// Fetch a single blog by documentId
export const fetchBlogById = async (locale: string, documentId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/blogs/${documentId}`, {
      params: {
        locale: locale,
        populate: '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw error;
  }
};

// Create a new blog post
export const createBlog = async (locale: string, blogData: BlogData) => {
  try {
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('content', blogData.content);
    formData.append('author', blogData.author);
    formData.append('date', blogData.date);
    formData.append('description', blogData.description);

    if (blogData.coverImage) {
      formData.append('coverImage', blogData.coverImage); // Add coverImage if it exists
    }

    const response = await axios.post(`${API_URL}/api/blogs`, formData, {
      params: { locale },
      headers: {
        'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

// Add a comment to a blog post
export const addComment = async (blogId: string, commentData: CommentData) => {
  try {
    const response = await axios.post(`${API_URL}/api/blogs/${blogId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// Add a like to a blog post
export const addLike = async (blogId: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/blogs/${blogId}/likes`);
    return response.data;
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};

// Add a rating to a blog post
export const addRating = async (blogId: string, rating: number) => {
  try {
    const response = await axios.post(`${API_URL}/api/blogs/${blogId}/ratings`, { rating });
    return response.data;
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};