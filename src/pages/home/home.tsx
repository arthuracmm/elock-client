import { useState } from "react";
import Header from "../../components/global/header"
import LoginModal from "../../components/login/login/login";

export default function HomePage() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    return (
        <div className="flex flex-col flex-1 min-h-screen min-w-screen max-h-screen max-w-screen relative bg-zinc-100/50">
            <Header setLoginModalOpen={setLoginModalOpen} />
            <div className="flex mt-28 p-2 ">
                <LoginModal open={isLoginModalOpen} handleClose={() => setLoginModalOpen(false)} />
                <p>home aq</p>
            </div>

        </div>
    )
}