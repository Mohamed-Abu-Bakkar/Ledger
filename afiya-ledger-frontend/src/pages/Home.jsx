import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const navBtn = 'bg-green-300 hover:bg-green-400  py-3 rounded-2xl text-lg  justify-center  ';

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-green-100 ">
      <div className="bg-green-200 rounded-2xl shadow-xl border border-green-300 p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-8 text-green-900 tracking-tight text-center drop-shadow-lg">AFIYA Bags <span className='block text-lg font-medium text-green-700 mt-2'>Ledger App</span></h1>
        <div className="flex flex-col gap-6 w-full text-center">
          <Link to="/add" className={navBtn}><b>➕ Add Shop</b></Link>          
          <Link to="/list" className={navBtn}><b>📋 Shop List</b></Link>
          <Link to="/new" className={navBtn}><b>🆕 New Orders</b></Link>
          <Link to="/shop" className={navBtn}><b>🏪 Shop Details</b></Link>
          <Link to="/lorry" className={navBtn}><b>🚚 Lorry Services</b></Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
    