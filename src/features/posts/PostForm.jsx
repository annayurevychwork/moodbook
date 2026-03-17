import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postsSlice';
import { Send, Loader2, SmilePlus, Globe, Lock } from 'lucide-react';
import { moodOptions } from '../../utils/initialData';
import { useTranslation } from 'react-i18next';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState('Public');
  const [selectedMood, setSelectedMood] = useState(moodOptions[0]);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  const defaultAvatar = `https://ui-avatars.com/api/?name=${user.name}&background=random`;

  const canSave = Boolean(content.trim()) && addRequestStatus === 'idle';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSave) return;

    try {
      setAddRequestStatus('pending');
      await dispatch(addNewPost({ content, privacy, mood: selectedMood })).unwrap();
      setContent('');
      setPrivacy('Public');
      setSelectedMood(moodOptions[0]);
    } catch (err) {
      console.error('Failed to save the post: ', err);
    } finally {
      setAddRequestStatus('idle');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
      
      <div className="flex items-center gap-2 mb-4 pt-2 px-1 overflow-x-auto pb-3 border-b border-gray-50">
        <SmilePlus size={18} className="text-gray-400 shrink-0" />
        <span className="text-sm font-medium text-gray-500 shrink-0 mr-2">{t('form.im_feeling')}</span>
        {moodOptions.map((mood) => (
          <button
            key={mood.key}
            type="button"
            onClick={() => setSelectedMood(mood)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedMood.key === mood.key ? `${mood.color} ring-2 ring-offset-1 ring-current` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-pressed={selectedMood.key === mood.key}
          >
            {mood.emoji} {t(`moods.${mood.key}`)}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-3">
        <img src={user.avatar || defaultAvatar} alt="" className="w-10 h-10 rounded-full bg-gray-100 object-cover" aria-hidden="true" />
        <textarea
          className="w-full bg-gray-50 rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-teal-100 transition-all"
          rows="3"
          placeholder={t('form.placeholder')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ml-13">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setPrivacy('Public')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${privacy === 'Public' ? 'bg-white shadow-sm text-teal-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Globe size={14} /> {t('form.privacy_public')}
          </button>
          <button
            type="button"
            onClick={() => setPrivacy('Journal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${privacy === 'Journal' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Lock size={14} /> {t('form.privacy_journal')}
          </button>
        </div>

        <button
          type="submit"
          disabled={!canSave}
          className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors focus:ring-2 focus:ring-teal-200"
        >
          {addRequestStatus === 'pending' ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} 
          {addRequestStatus === 'pending' ? t('form.sharing') : t('form.share_btn')}
        </button>
      </div>
    </form>
  );
};

export default PostForm;