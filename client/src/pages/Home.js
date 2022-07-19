import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // USE useQuery HOOK TO MAKE QUERY REQUEST
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || []
  console.log(thoughts);
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {/* PRINT THOUGHT LIST */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Food for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
