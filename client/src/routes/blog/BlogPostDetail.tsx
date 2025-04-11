import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogById, addComment, addLike, addRating } from '../../lib/api';
import ReactMarkdown from 'react-markdown'; // For rendering Markdown content
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown support
import { useTranslation } from 'react-i18next';
import { Blog } from '../../types/Blogs';

const BlogPostsDetails: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const { documentId } = useParams<{ documentId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        if (!documentId) {
          throw new Error('Blog documentId is missing');
        }
        const data = await fetchBlogById(locale, documentId);
        setBlog(data.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    getBlog();
  }, [locale, documentId]);

  const handleAddComment = async () => {
    try {
      if (!documentId) return;
      await addComment(documentId, { content: comment });
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleAddLike = async () => {
    try {
      if (!documentId) return;
      await addLike(documentId);
    } catch (err) {
      console.error('Error adding like:', err);
    }
  };

  const handleAddRating = async () => {
    try {
      if (!documentId || rating === null) return;
      await addRating(documentId, rating);
      setRating(null);
    } catch (err) {
      console.error('Error adding rating:', err);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!blog) return <div className="text-center mt-8">Blog not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {blog.coverImage?.[0]?.url && (
          <img src={blog.coverImage[0].url} alt={blog.title} className="w-full h-48 md:h-64 object-cover" />
        )}
        <div className="p-24">
          <h2 className="text-3xl text-center font-bold mb-4">{blog.title}</h2>
          <div className="text-gray-700 mb-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ ...props }) => (
                  <img
                    {...props}
                    className="mx-auto my-4 max-w-full h-auto rounded-lg shadow-md"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      minWidth: '1000px',
                    }}
                  />
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          rows={4}
        ></textarea>
        <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Comment
        </button>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Rate this Blog</h3>
        <input
          type="number"
          value={rating || ''}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded px-3 py-2 mb-4"
          min={1}
          max={5}
        />
        <button onClick={handleAddRating} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Rating
        </button>
      </div>
      <button onClick={handleAddLike} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-500">
        Like
      </button>
      <button
        onClick={() => window.history.back()}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        Back to blogs
      </button>
    </div>
  );
};

export default BlogPostsDetails;
