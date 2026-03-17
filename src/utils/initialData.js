export const currentUser = {
  name: "Марко Вовчок",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marko",
};

export const moodOptions = [
  { key: "feeling_good", emoji: "🟢", color: "bg-green-100 text-green-800" },
  { key: "anxious", emoji: "🟡", color: "bg-yellow-100 text-yellow-800" },
  { key: "feeling_down", emoji: "🔵", color: "bg-blue-100 text-blue-800" },
  { key: "need_support", emoji: "🔴", color: "bg-red-100 text-red-800" },
  { key: "grateful", emoji: "🟣", color: "bg-purple-100 text-purple-800" }
];

export const initialPosts = [
  {
    id: "post-1",
    author: {
      name: "Леся Українка",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lesya",
    },
    mood: moodOptions[4], 
    content: "Had a really good therapy session today. Feeling much lighter and ready to tackle the week.",
    privacy: "Public",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    likes: 12,
    isLikedByMe: false,
    comments: [
      {
        id: "comment-1",
        author: currentUser,
        text: "So glad to hear that! Keep it up. 💚",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      }
    ]
  },
  {
    id: "post-2",
    author: {
      name: "Тарас Шевченко",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taras",
    },
    mood: moodOptions[1], 
    content: "Having a tough day with my anxiety. Trying to remember my breathing exercises, but it's hard to focus.",
    privacy: "Public",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likes: 45,
    isLikedByMe: true,
    comments: []
  },
  {
    id: "post-3",
    author: currentUser,
    mood: moodOptions[2], 
    content: "This is a private journal entry. Only I should be able to see this on my feed and profile.",
    privacy: "Journal",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    likes: 0,
    isLikedByMe: false,
    comments: []
  }
];