import Header from '../components/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="min-h-dvh flex py-30">
                <div className="container m-auto w-full">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default MainLayout;
