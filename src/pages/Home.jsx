import PostForm from '../features/posts/PostForm';
import FilterBar from '../features/filters/FilterBar';
import PostsList from '../features/posts/PostsList';

const Home = () => {
  return (
    <>
      <PostForm />
      <FilterBar />
      <PostsList />
    </>
  );
};

export default Home;