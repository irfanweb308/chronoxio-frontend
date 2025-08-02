import React, { useState } from 'react';

const Leaderboard = () => {

    const [search,setSearch] = useState('')

    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
        
    }
    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4 '>Leaderboard</h2>
            <input type="text" placeholder='Search by user' value={search} onChange={handleSearch} className='input input-bordered w-full max-w-sm mb-6' />
        </div>
    );
};

export default Leaderboard;