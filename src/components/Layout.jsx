import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-transparent overflow-hidden relative">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-4 left-4 z-50 w-72 transform transition-all duration-300 ease-in-out lg:static lg:w-72 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'} lg:my-6 lg:ml-6 flex-shrink-0`}>
                <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden relative z-10">
                <div className="pt-4 px-4 lg:pt-6 lg:px-8 z-30 w-full relative">
                    <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                </div>
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:px-8 pb-24">
                    <div className="mx-auto max-w-7xl h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
