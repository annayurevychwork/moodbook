import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';
import PostItem from './PostItem';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PostsList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  const { posts, status, error } = useSelector((state) => state.posts);
  const { sortBy, searchQuery } = useSelector((state) => state.filters);
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div className="flex justify-center py-10 text-teal-600"><Loader2 className="animate-spin" size={40} /></div>;
  if (status === 'failed') return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  let filteredPosts = posts.filter(post => {
    const canSee = post.privacy === 'Public' || post.author.name === currentUser.name;
    if (!canSee) return false;

    if (searchQuery.trim() !== '') {
      const term = searchQuery.toLowerCase().trim();
      return post.author.name.toLowerCase().includes(term);
    }
    return true;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
      case 'popular': return b.likes - a.likes;
      case 'newest':
      default: return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="space-y-4">
      {sortedPosts.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
          {t('feed.empty_feed')}
        </div>
      ) : (
        sortedPosts.map(post => <PostItem key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostsList;