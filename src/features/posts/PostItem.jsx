import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, deletePost, addComment, deleteComment } from './postsSlice';
import { Heart, MessageCircle, Trash2, Send, Globe, Lock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '../../components/ConfirmModal';

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); 
  const { t } = useTranslation();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteButtonRef = useRef(null);

  const getAvatar = (avatarUrl, name) => {
    return avatarUrl || `https://ui-avatars.com/api/?name=${name}&background=random`;
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentText.trim()) return;
    
    dispatch(addComment({ postId: post.id, text: commentText, user }));
    setCommentText('');
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
    setTimeout(() => deleteButtonRef.current?.focus(), 10);
  };

  const isMyPost = post.author.name === user.name;

  return (
    <article 
      onClick={() => navigate(`/post/${post.id}`)}
      className="bg-white p-5 rounded-xl shadow-sm mb-4 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow" 
      aria-labelledby={`post-author-${post.id}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3 items-center">
          <img 
            src={getAvatar(post.author.avatar, post.author.name)} 
            alt={`${post.author.name}'s avatar`} 
            className="w-10 h-10 rounded-full bg-gray-100 object-cover" 
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 id={`post-author-${post.id}`} className="font-bold text-gray-900">
                {post.author.name}
              </h4>
              
              {post.mood && post.mood.key && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${post.mood.color}`}>
                  {post.mood.emoji} {t(`moods.${post.mood.key}`)}
                </span>
              )}

              <span className="text-xs text-gray-400 flex items-center gap-1 ml-1" aria-label={`Privacy: ${post.privacy === 'Journal' ? t('post.journal') : t('post.public')}`}>
                {post.privacy === 'Journal' ? <Lock size={12} aria-hidden="true" /> : <Globe size={12} aria-hidden="true" />}
                {post.privacy === 'Journal' ? t('post.journal') : t('post.public')}
              </span>
            </div>
            <span className="text-xs text-gray-500 block mt-0.5">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        
        {isMyPost && (
          <button 
            ref={deleteButtonRef}
            onClick={handleDeleteClick}
            className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 rounded p-1"
            aria-label={t('post.delete_post')}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <p className="text-gray-800 mb-3 whitespace-pre-wrap">{post.content}</p>

      <div className="flex gap-4 border-t pt-3 mt-2">
        <button 
          onClick={(e) => { e.stopPropagation(); dispatch(toggleLike(post.id)); }}
          aria-label={post.isLikedByMe ? t('post.unlike') : t('post.like')}
          aria-pressed={post.isLikedByMe}
          className={`flex items-center gap-1.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 rounded-md p-1 ${post.isLikedByMe ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
        >
          <Heart size={20} fill={post.isLikedByMe ? "currentColor" : "none"} aria-hidden="true" /> 
          <span>{post.likes}</span>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setShowComments(!showComments); }}
          aria-expanded={showComments}
          aria-controls={`comments-${post.id}`}
          className="flex items-center gap-1.5 text-gray-500 hover:text-teal-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200 rounded-md p-1"
        >
          <MessageCircle size={20} aria-hidden="true" /> 
          <span>{post.comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div id={`comments-${post.id}`} className="mt-4 pt-4 border-t border-gray-50" onClick={(e) => e.stopPropagation()}>
          <div className="space-y-3 mb-4" aria-live="polite">
            {post.comments.map(comment => (
              <div key={comment.id} className="flex gap-2">
                <img 
                  src={getAvatar(comment.author.avatar, comment.author.name)} 
                  alt="" 
                  className="w-8 h-8 rounded-full object-cover" 
                  aria-hidden="true"
                />
                <div className="bg-gray-50 px-3 py-2 rounded-2xl rounded-tl-none w-full relative group">
                  <span className="font-bold text-sm block">{comment.author.name}</span>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                  
                  {comment.author.name === user.name && (
                    <button 
                      onClick={() => dispatch(deleteComment({ postId: post.id, commentId: comment.id }))}
                      className="absolute right-2 top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 outline-none focus:ring-2 focus:ring-red-200 rounded p-0.5"
                      aria-label={t('post.delete_comment')}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleAddComment} className="flex gap-2">
            <img 
              src={getAvatar(user.avatar, user.name)} 
              alt="" 
              className="w-8 h-8 rounded-full object-cover" 
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder={t('post.write_comment')}
              aria-label={t('post.write_comment')}
              className="flex-1 bg-gray-100 rounded-full px-4 text-sm outline-none focus:ring-2 focus:ring-teal-200"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button 
              type="submit" 
              disabled={!commentText.trim()} 
              className="text-teal-600 disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-200 rounded-full p-1"
              aria-label={t('post.write_comment')}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={handleModalClose}
        onConfirm={() => dispatch(deletePost(post.id))}
        title={t('modal.delete_title')}
        message={t('modal.delete_desc')}
        confirmText={t('modal.confirm_btn')}
        cancelText={t('modal.cancel_btn')}
      />
    </article>
  );
};

export default React.memo(PostItem);