import React from 'react';
import { Outlet } from 'react-router';
import PublicNavBar from '../PublicNavbar/PublicNavbar';
import PublicFooter from '../PublicFooter/PublicFooter';


const LandingLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicNavBar></PublicNavBar>
            <main className="flex-1">
                <Outlet />
            </main>
            <PublicFooter></PublicFooter>
        </div>
    );
};

export default LandingLayout;
