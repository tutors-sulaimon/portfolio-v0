import axios from "axios"

const API_URL = import.meta.env.VITE_API_BASE_URL

interface BlogData {
  title: string
  content: string
  author: string
  coverImage?: File
  date: string // Add the date field
  description: string // Add the description field
}

interface CommentData {
  content: string
}

// Fetch all blogs
export const fetchBlogs = async (locale: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/blogs`, {
      params: {
        locale: locale,
        populate: "*",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching blogs:", error)
    throw error
  }
}

// Fetch a single blog by documentId
export const fetchBlogById = async (locale: string, documentId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/blogs/${documentId}`, {
      params: {
        locale: locale,
        populate: "*",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching blog:", error)
    throw error
  }
}

// Create a new blog post
export const createBlog = async (locale: string, blogData: BlogData) => {
  try {
    const formData = new FormData()

    // Strapi expects data in a specific format - we need to wrap our text fields in a "data" JSON string
    const data = {
      title: blogData.title,
      content: blogData.content,
      author: blogData.author,
      date: blogData.date,
      description: blogData.description,
    }

    // Add the JSON data as a string
    formData.append("data", JSON.stringify(data))

    // Add the file separately - Strapi expects files to be outside the data field
    if (blogData.coverImage) {
      formData.append("files.coverImage", blogData.coverImage)
    }

    // Log the FormData keys and values
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
    }

    const response = await axios.post(`${API_URL}/api/blogs`, formData, {
      params: { locale },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error creating blog:", error)
    throw error
  }
}

// Add a comment to a blog post
export const addComment = async (blogId: string, commentData: CommentData) => {
  try {
    const response = await axios.post(`${API_URL}/api/blogs/${blogId}/comments`, commentData)
    return response.data
  } catch (error) {
    console.error("Error adding comment:", error)
    throw error
  }
}

// Add a like to a blog post
export const addLike = async (blogId: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/blogs/${blogId}/likes`)
    return response.data
  } catch (error) {
    console.error("Error adding like:", error)
    throw error
  }
}

// Add a rating to a blog post
export const addRating = async (blogId: string, rating: number) => {
  try {
    const response = await axios.post(`${API_URL}/api/blogs/${blogId}/ratings`, { rating })
    return response.data
  } catch (error) {
    console.error("Error adding rating:", error)
    throw error
  }
}
