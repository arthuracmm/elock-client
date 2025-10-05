import { useState } from "react";
import Header from "../../components/global/header"
import LoginModal from "../../components/login/login/login";

interface UserData {
    name: string;
    email: string;
}

export default function HomePage() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        try {
            setUser(JSON.parse(storedUserData));
        } catch (e) {
            console.error("Erro ao carregar userData", e);
        }
    }
}, []);

    return (
        <div className="flex flex-col flex-1 min-h-screen min-w-screen max-h-screen max-w-screen relative bg-zinc-100/50">
            <Header setLoginModalOpen={setLoginModalOpen} user={user} />
            <div className="flex mt-28 p-2 ">
                <LoginModal open={isLoginModalOpen} handleClose={() => setLoginModalOpen(false)} onLoginSuccess={setUser} />
                <p>home aq</p>
            </div>

        </div>
    )
}