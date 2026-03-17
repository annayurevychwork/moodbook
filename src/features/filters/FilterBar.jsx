import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setSearchQuery } from './filtersSlice';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next'; 

const FilterBar = () => {
  const dispatch = useDispatch();
  const { sortBy, searchQuery } = useSelector((state) => state.filters); 
  const { t } = useTranslation(); 

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
      <div className="flex-1 flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder={t('feed.search_placeholder')} 
          className="bg-transparent outline-none w-full"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border-l sm:border-l-0">
        <SlidersHorizontal size={18} className="text-gray-400" />
        <select
          className="bg-transparent outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="newest">{t('feed.sort_newest')}</option>
          <option value="oldest">{t('feed.sort_oldest')}</option>
          <option value="popular">{t('feed.sort_popular')}</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;