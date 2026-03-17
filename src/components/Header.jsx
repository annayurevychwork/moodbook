import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Activity, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const user = useSelector((state) => state.user);
  const defaultAvatar = `https://ui-avatars.com/api/?name=${user.name}&background=random`;
  
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10" role="banner">
      <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-teal-600 hover:opacity-80 transition-opacity"
          aria-label="Moodbook Home"
        >
          <h1 className="text-xl font-bold">{t('header.app_name')}</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-gray-500 hover:text-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-200 rounded p-1"
            aria-label="Toggle language"
          >
            <Globe size={18} />
            <span className="text-sm font-bold uppercase">{i18n.language}</span>
          </button>

          <Link 
            to="/profile" 
            className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-200"
            aria-label={`View profile of ${user.name}`}
          >
            <span className="font-medium text-gray-700 hidden sm:block">{user.name}</span>
            <img 
              src={user.avatar || defaultAvatar} 
              alt={`${user.name}'s avatar`} 
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 object-cover" 
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;