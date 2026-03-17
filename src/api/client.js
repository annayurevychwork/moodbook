import { initialPosts } from '../utils/initialData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const client = {
  async getPosts() {
    await delay(1200);
    
    const storedPosts = localStorage.getItem('api_posts');
    if (storedPosts) {
      return JSON.parse(storedPosts);
    }
    
    localStorage.setItem('api_posts', JSON.stringify(initialPosts));
    return initialPosts;
  },

  async addPost(postData) {
    await delay(800);
    
    const newPost = {
      ...postData,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLikedByMe: false,
      comments: []
    };

    const storedPosts = JSON.parse(localStorage.getItem('api_posts') || '[]');
    const updatedPosts = [newPost, ...storedPosts];
    localStorage.setItem('api_posts', JSON.stringify(updatedPosts));
    
    return newPost;
  }
};