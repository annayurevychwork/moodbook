import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import PostItem from '../features/posts/PostItem';
import { Save, Settings, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();
  
  const userPosts = useSelector((state) => state.posts.posts.filter(post => post.author.name === user.name));

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name: editName, avatar: editAvatar }));
    setIsEditing(false);
  };

  const defaultAvatar = `https://ui-avatars.com/api/?name=${user.name}&background=random`;

  const chartData = useMemo(() => {
    const counts = {};
    userPosts.forEach(post => {
      if (post.mood && post.mood.key) {
        counts[post.mood.key] = (counts[post.mood.key] || 0) + 1;
      }
    });

    return Object.keys(counts).map(key => {
      let color = '#9ca3af'; 
      if (key === 'feeling_good') color = '#22c55e'; 
      if (key === 'anxious') color = '#eab308'; 
      if (key === 'feeling_down') color = '#3b82f6'; 
      if (key === 'need_support') color = '#ef4444'; 
      if (key === 'grateful') color = '#a855f7'; 

      return { name: t(`moods.${key}`), count: counts[key], fill: color };
    });
  }, [userPosts, t]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.display_name')}</label>
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-gray-50 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('profile.avatar_url')}</label>
              <input type="text" value={editAvatar} onChange={(e) => setEditAvatar(e.target.value)} className="w-full bg-gray-50 rounded-lg p-2 outline-none focus:ring-2 focus:ring-teal-200" />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex items-center gap-1 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700">
                <Save size={16} /> {t('profile.save_changes')}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-medium">
                {t('profile.cancel')}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img src={user.avatar || defaultAvatar} alt="" className="w-24 h-24 rounded-full border-4 border-gray-50 object-cover" />
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500 mb-3">{t('profile.community_member')} • {userPosts.length} {t('profile.updates')}</p>
              <button onClick={() => setIsEditing(true)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                <Settings size={16} /> {t('profile.edit_profile')}
              </button>
            </div>
          </div>
        )}
      </div>

      {chartData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4 text-gray-800">
            <BarChart2 size={20} className="text-teal-600" />
            <h3 className="text-lg font-bold">{t('profile.mood_analytics')}</h3>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [value, '']}
                  separator=""
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">{t('profile.history')}</h3>
      <div className="space-y-4">
        {userPosts.length === 0 ? (
          <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">{t('profile.no_updates')}</div>
        ) : (
          [...userPosts].reverse().map(post => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default ProfilePage;