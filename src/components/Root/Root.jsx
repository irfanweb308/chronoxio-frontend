import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router';
import Sidebar from '../Sidebar/Sidebar';
import { useState } from 'react';

const Root = () => {
    const [reportData, setReportData]=useState([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    return (
        <div id="outer-container" className="relative min-h-screen flex">
            <Sidebar />  
            <div id='page-wrap' className="flex flex-col flex-1 ">
                <NavBar />
                <main id="page-wrap" className=" flex-1 p-6 overflow-y-auto">
                    <Outlet context={{ reportData, setReportData,showTaskModal, setShowTaskModal }}  />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Root;