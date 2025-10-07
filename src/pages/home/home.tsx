import { useState, useEffect } from "react";
import Header from "../../components/global/header"
import LoginModal from "../../components/login/login/login";

interface UserData {
    name: string;
    email: string;
}

export default function HomePage() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        setIsLoggedIn(!!userData);
    }, []);

    const handleLoginSuccess = () => {
        setLoginModalOpen(false);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
    };

    return (
        <div className="flex flex-col flex-1 min-h-screen min-w-screen max-h-screen max-w-screen relative bg-zinc-100/50">
            <Header
                setLoginModalOpen={setLoginModalOpen}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
            />            <div className="flex mt-28 p-2 ">
                <LoginModal open={isLoginModalOpen} handleClose={handleLoginSuccess} />
                <p>home aq</p>
            </div>
        </div>
    )
}
