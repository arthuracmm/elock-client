import { useState } from "react";
import Header from "../../components/global/header";
import LoginModal from "../../components/login/login/login";
import DoorLocksHome from "../../components/home/doorLocksHome";

export default function HomePage() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState("Home");

    const handleLoginSuccess = () => {
        setLoginModalOpen(false);
    };

    return (
        <div className="flex flex-col flex-1 min-h-screen min-w-screen max-h-screen max-w-screen relative bg-zinc-100/50">
            <Header
                setLoginModalOpen={setLoginModalOpen}
                itemSelected={itemSelected}
                setItemSelected={setItemSelected}
            />
            <LoginModal
                open={isLoginModalOpen}
                handleClose={handleLoginSuccess}
            />
            <div className="flex mt-28 p-2">
                {itemSelected === "Home" &&
                <div>HOME CONTENT AQ</div>
                }
                {itemSelected === "Fechaduras" &&
                    <DoorLocksHome />
                }
            </div>
        </div>
    );
}
