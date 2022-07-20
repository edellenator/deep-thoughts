import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';


const Home = () => {
  const loggedIn = Auth.loggedIn();

  // USE OBJECT DESTRUCTURING TO EXTRACT 'DATA' FROM THE 'USEQUERY' HOOK'S RESPONSE AND RENAME IT 'USERDATA' TO BE MORE DESCRIPTIVE
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // USE useQuery HOOK TO MAKE QUERY REQUEST
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || []
  console.log(thoughts);
  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className='col-12 mb-3'>
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {/* PRINT THOUGHT LIST */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Food for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className='col-12 col-lg-3 mb-3'>
            <FriendList 
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>  
        ) : null}
      </div>
    </main>
  );
};

export default Home;
