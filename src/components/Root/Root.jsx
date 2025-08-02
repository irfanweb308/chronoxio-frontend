import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router';
import Sidebar from '../Sidebar/Sidebar';


const Root = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <NavBar></NavBar>
            <div className="flex flex-1">

                <Sidebar></Sidebar>
                <main className="flex-1 p-6 overflow-y-auto">

                    <Outlet></Outlet>
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;