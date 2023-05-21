import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sasha from '../assets/Sasha.jpg';

import Card from '../cards/Card';
import css from './App.module.css';

axios.defaults.baseURL = 'https://6460cfacca2d89f7e75f23cc.mockapi.io';
const CARDS_LIMIT = 3;

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [page, setPage] = useState(1);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/users?limit=${CARDS_LIMIT}&page=${page}`);
      const data = response.data;
      setUsers(prevUsers => [...prevUsers, ...data]);
      setIsLoading(false);
      if (data.length < CARDS_LIMIT) {
        setIsAllLoaded(true);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const followUser = async (userId) => {
    try {
      const userToUpdate = users.find(user => user.id === userId);
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, followed: true, followers: user.followers + 1 };
        }
        return user;
      });
      setUsers(updatedUsers);

      await axios.put(`/users/${userId}`, {
        followed: true,
        followers: userToUpdate.followers + 1,
      });
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const userToUpdate = users.find(user => user.id === userId);
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, followed: false, followers: user.followers - 1 };
        }
        return user;
      });
      setUsers(updatedUsers);

      await axios.put(`/users/${userId}`, {
        followed: false,
        followers: userToUpdate.followers - 1,
      });
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.cardset}>
        <Card
          key="my-card"
          user={{
            id: 'my-card',
            avatar: sasha,
            user: 'Oleksandr',
            tweets: 777,
            followers: 100500,
            followed: false,
          }}
          followUser={followUser}
          unfollowUser={unfollowUser}
        />
        {users.map(user => (
          <Card key={user.id} user={user} followUser={followUser} unfollowUser={unfollowUser} />
        ))}
      </div>

      {!isAllLoaded && (
        <button className={css.button} type="button" onClick={loadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}

      {isAllLoaded && <p className={css.message}>All cards are loaded!</p>}
    </div>
  );
};

export default App;
