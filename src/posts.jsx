import React from 'react';
import { create } from 'zustand';

  
const usePosts = create((set) => ({
  posts: [{
    postId: 1,
    postAuthor: '1 ',
    postText: 'dawdawdwa'
  }],
  push: (post) => set(state => ({ posts: [...state.posts, post] })),
  deletePost: (postId) => set(state => ({
    posts: state.posts.filter(post => post.postId !== postId)
  }))
  ,
  editPost: (postId, newText) => {
    set(state => ({
      posts: state.posts.map(post =>
        post.postId === postId ? { ...post, postText: newText } : post
      )
    }));
  }
}));

const TwitterContext = React.createContext();

const TwitterProvider = ({ children }) => {
  const { posts, push, deletePost } = usePosts();

  return (
    <TwitterContext.Provider value={{ posts, push, deletePost }}>
      {children}
    </TwitterContext.Provider>
  );
};

const useTwitterContext = () => {
  return React.useContext(TwitterContext);
};

const TweetList = () => {
  const { posts, deletePost } = useTwitterContext();

  return (
    <div>
      <h1>Tweet List</h1>
      <ul>
        {posts.map(post => (
          <li key={post.postId}>
            {post.postText}
            <button onClick={() => deletePost(post.postId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <TwitterProvider>
      <TweetList />
    </TwitterProvider>
  );
};

export default App;