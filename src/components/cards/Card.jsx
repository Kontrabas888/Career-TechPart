import React, { useState } from 'react';
import axios from 'axios';  

import css from './Card.module.css';
import logo from '../assets/logo.png';
import mainpic from '../assets/mainpic.png';
import boypic from '../assets/boy.png';
import circle from '../assets/circle.png';
import { formatNumber } from '../../number/formatNumber';

axios.defaults.baseURL = 'https://6460cfacca2d89f7e75f23cc.mockapi.io';

const Card = ({ user, followUser, unfollowUser }) => {
  const [followed, setFollowed] = useState(user.followed);
  const [followers, setFollowers] = useState(user.followers);

  const handleFollow = () => {
    setFollowed(true);
    setFollowers(prevFollowers => prevFollowers + 1);
    followUser(user.id);
  };

  const handleUnfollow = () => {
    setFollowed(false);
    setFollowers(prevFollowers => prevFollowers - 1);
    unfollowUser(user.id);
  };

  return (
    <div className={css.container}>
      <img className={css.logo} src={logo} alt="logo" />
      <img
        className={css.marks}
        src={mainpic}
        alt="check mark and question mark"
      />
      <div className={css.middleline}>
        <img
          className={css.frontImg}
          src={user.avatar || boypic}
          alt={user.user}
        />
        <img className={css.circle} src={circle} alt="circle" />
      </div>
      <p className={css.tweets}>{user.tweets} tweets</p>
      <p className={css.followers}>{formatNumber(followers)} followers</p>
        {followed ? (
      <button className={css.following} type="button" onClick={handleUnfollow}>
        following
      </button>
    ) : (
      <button className={css.follow} type="button" onClick={handleFollow}>
        follow
      </button>
    )}
    </div>
  );
};

export default Card;
