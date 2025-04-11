import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '../../lib/api';
import { Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Blog } from '../../types/Blogs';

const BlogPosts: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs(locale);
        console.log('Fetched blogs:', data);

        setBlogs(data.data);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, [locale]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl text-gray-500 text-center mb-8">Blogs</h2>
      <div className="text-center mb-8">
        <Link to="/blog/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Blog Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.documentId}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            style={{ minHeight: '400px' }}
          >
            {blog.coverImage?.[0]?.url && (
              <img src={blog.coverImage[0].url} alt={blog.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500 mb-4">{blog.author}</p>
                <p className="text-sm text-gray-500 mb-4">{new Date(blog.date).toLocaleDateString()}</p>
              </div>
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">{blog.description}</p>
              <Link to={`/blog/${blog.documentId}`} className="text-sm text-gray-700 hover:text-blue-700 self-start">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
