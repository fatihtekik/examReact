import React from 'react';
import { TwitterProvider, useTwitterContext } from './TwitterContext';

const TweetList = () => {
  const { posts, deletePost, startEdit, cancelEdit, editPost, editingPost } = useTwitterContext();

  return (
    <div>
      <h1>Tweet List</h1>
      <ul>
        {posts.map(post => (
          <li key={post.postId}>
            {editingPost === post.postId ? (
              <div>
                <input
                  type="text"
                  value={post.postText}
                  onChange={(e) => editPost(post.postId, e.target.value)}
                />
                <button onClick={() => cancelEdit()}>Cancel</button>
              </div>
            ) : (
              <div>
                {post.postText}
                <button onClick={() => deletePost(post.postId)}>Delete</button>
                <button onClick={() => startEdit(post.postId)}>Edit</button>
              </div>
            )}
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