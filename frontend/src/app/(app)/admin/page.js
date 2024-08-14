"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AccountCircle, AirlineSeatFlat, AirlineSeatIndividualSuite, Dashboard, Group, Masks, MovingSharp, ReceiptLong, SmartButton, ThumbDown, Today, Vaccines } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import { useAuth } from "@/hooks/auth"
import NotAllowed from '@/components/NotAllowed';
import Dropdown from '@/components/Dropdown'
import { DropdownButton } from '@/components/DropdownLink'

const drawerWidth = 240;

const userManagementItems = [
    {
        title: 'Doctors',
        url: '/admin/doctors',
        icon: <Masks />
    },
    {
        title: 'Staffs',
        url: '/admin/staffs',
        icon: <Group />
    },
    {
        title: 'Patients',
        url: '/admin/patients',
        icon: <AirlineSeatIndividualSuite />
    },
];


const companyItems = [
    {
        title: 'Appointments',
        url: '/admin/appointments',
        icon: <Today />
    },
    {
        title: 'Transactions',
        url: '/admin/',
        icon: <ReceiptLong />
    },
];


const settingItems = [
    {
        title: 'Specialization',
        url: '/admin/specializations',
        icon: <SmartButton />
    },
    {
        title: 'Profile',
        url: '/admin/',
        icon: <AccountCircle />
    },
];

const Admin = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const currentPage = usePathname();

    const router = useRouter()
    const { logout } = useAuth()

    React.useEffect(() => {
        console.log(window.location.pathname)
        if (window.location.pathname === '/admin') {
            router.push('/admin/dashboard')
        }
    }, [router])

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            {/* <Toolbar /> */}
            <Divider />
            <div
                className="
                    w-[240px] h-full
                    fixed inset-y-0 start-0 z-[60]
                    bg-white border-e border-gray-200
                    lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
                "
                role="dialog"
                tabIndex="-1"
                aria-label="Sidebar"
            >
                <div className="relative flex flex-col h-full max-h-full">
                    <div className="px-6 py-4">
                        <Link
                            className="flex-none rounded-xl text-xl font-semibold focus:outline-none focus:opacity-80"
                            href="/"
                            aria-label="Preline"
                        >
                            <p>eClinicNexus.</p>
                        </Link>
                        <span className='text-xs'>Hospital Management Software</span>
                    </div>
                    <Divider />

                    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                            <ul className="flex flex-col space-y-1">
                                <li>
                                    <Link
                                        href='/admin/dashboard'
                                        className={
                                            `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg font-medium ${currentPage === '/admin/dashboard'
                                                ? "bg-[#4f46e5] text-white"
                                                : "text-gray-800 hover:bg-gray-100"
                                            }`
                                        }
                                    >
                                        <Dashboard />
                                        Dashboard
                                    </Link>

                                </li>

                                <span className='text-sm !mt-6'>User Management</span>
                                {userManagementItems.map((item) => (
                                    <li key={item.url}>
                                        <Link
                                            href={item.url}
                                            className={
                                                `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg font-medium ${currentPage.startsWith(item.url)
                                                    ? "bg-[#4f46e5] text-white"
                                                    : "text-gray-800 hover:bg-gray-100"
                                                }`
                                            }
                                        >
                                            <span>{item.icon}</span>
                                            {item.title}
                                        </Link>

                                    </li>
                                ))}

                                <span className='text-sm !mt-6'>Company</span>
                                {companyItems.map((item) => (
                                    <li key={item.url}>
                                        <Link
                                            href={item.url}
                                            className={
                                                `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg font-medium ${currentPage === item.url
                                                    ? "bg-[#4f46e5] text-white"
                                                    : "text-gray-800 hover:bg-gray-100"
                                                }`
                                            }
                                        >
                                            <span>{item.icon}</span>
                                            {item.title}
                                        </Link>

                                    </li>
                                ))}

                                <span className='text-sm !mt-6'>Settings</span>
                                {settingItems.map((item) => (
                                    <li key={item.url}>
                                        <Link
                                            href={item.url}
                                            className={
                                                `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg font-medium transition-colors duration-300 ${currentPage === item.url
                                                    ? "bg-[#4f46e5] text-white"
                                                    : "text-gray-800 hover:bg-gray-100"
                                                }`
                                            }
                                        >
                                            <span>{item.icon}</span>
                                            {item.title}
                                        </Link>

                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div >

            < Divider />
        </div >
    );

    return (
        user.role_id == 1 ?
            <Box sx={{ display: 'flex' }}>
                <AppBar
                    position="fixed"
                    // color='#FFFFFF'
                    sx={{
                        backgroundColor: '#FFFFFF',
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        border: 1,
                        borderColor: '#E5E7EB',
                        // backgroundColor: 
                    }}
                    elevation={0}
                >
                    <Toolbar variant="dense">
                        <IconButton
                            color="black"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            color={'black'}
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            HMS
                        </Typography>
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                        <div>{user?.name}</div>

                                        <div className="ml-1">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }>
                                {/* Authentication */}
                                <DropdownButton onClick={logout}>
                                    Logout
                                </DropdownButton>
                            </Dropdown>
                        </div>
                    </Toolbar>
                </AppBar>

                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        // container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, px: 3, py: 8, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                // sx={{ p: 3 }}
                >
                    {children}
                </Box>
            </Box>
            :
            <NotAllowed />
    );
}

export default Admin;
