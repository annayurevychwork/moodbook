import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostItem from '../features/posts/PostItem';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SinglePostPage = () => {
  const { postId } = useParams();
  const { t } = useTranslation();

  const post = useSelector((state) => 
    state.posts.posts.find((p) => p.id === postId)
  );

  if (!post) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{t('feed.post_not_found')}</h2>
        <Link to="/" className="text-teal-600 hover:underline">{t('feed.back_to_feed')}</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-teal-600 mb-6 transition-colors font-medium">
        <ArrowLeft size={20} /> {t('feed.back_to_feed')}
      </Link>
      <PostItem post={post} />
    </div>
  );
};

export default SinglePostPage;