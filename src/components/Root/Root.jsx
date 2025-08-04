import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router';
import Sidebar from '../Sidebar/Sidebar';

const Root = () => {
    return (
        <div id="outer-container" className="relative min-h-screen flex">
            <Sidebar />  
            <div id='page-wrap' className="flex flex-col flex-1 ">
                <NavBar />
                <main id="page-wrap" className=" flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Root;