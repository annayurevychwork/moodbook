import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import { Loader2 } from 'lucide-react';

const SinglePostPage = lazy(() => import('./pages/SinglePostPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

const PageLoader = () => (
  <div className="flex justify-center items-center py-20 text-blue-600">
    <Loader2 className="animate-spin" size={40} />
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      <Header />
      <main className="max-w-2xl mx-auto px-4 mt-6">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:postId" element={<SinglePostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;