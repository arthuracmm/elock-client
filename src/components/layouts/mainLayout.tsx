import { useState } from "react";
import Header from "../global/header";
import LoginModal from "../login/login/login";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleLoginSuccess = () => {
        setLoginModalOpen(false);
    };

    return (
        <div className="flex flex-col flex-1 min-h-screen min-w-screen max-h-screen max-w-screen relative bg-zinc-100/50">
            <Header setLoginModalOpen={setLoginModalOpen} />
            <LoginModal open={isLoginModalOpen} handleClose={handleLoginSuccess} />
            <div className="flex mt-28 p-2">
                {children}
            </div>
        </div>
    );
}
