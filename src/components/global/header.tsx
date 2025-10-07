import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import elockPurpleText from '/images/elock-texto.png'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

interface HeaderProps {
    setLoginModalOpen: (open: boolean) => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function Header({ setLoginModalOpen, isLoggedIn, onLogout }: HeaderProps) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string | null>(null);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const menuItems = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Fechaduras',
            path: '/door-locks'
        }
    ]

    useEffect(() => {
        if (isLoggedIn) {
            const userDataString = localStorage.getItem('userData');
            if (userDataString) {
                try {
                    const userData = JSON.parse(userDataString);
                    const firstName = (userData.name.split(' ')[0]);
                    setUserName(firstName)
                } catch (error) {
                    console.error("Erro ao analisar userData:", error);
                }
            }
        }
    }, [isLoggedIn]);

    return (
        <div className="flex justify-between p-6 px-14 bg-white items-center absolute right-10 top-4 w-[calc(100vw-5rem)] rounded-full font-semibold">
            <img
                src={elockPurpleText}
                alt="elock-logo"
                width={150}
                onClick={() => { navigate('/') }}
                className='cursor-pointer'
            />

            <div className="flex gap-4">
                {menuItems.map((item, index) => (
                    <div key={item.path} className="flex gap-4" onClick={() => navigate(item.path)}>
                        <div className="flex flex-col items-center hover:-translate-y-1 transition-transform">
                            <p className="cursor-pointer hover:text-[var(--primary)]">{item.name}</p>
                            {location.pathname === item.path && (
                                <div className="flex h-0.5 w-[60%] bg-[var(--accent)]" />
                            )}
                        </div>

                        {index !== menuItems.length - 1 && <Divider orientation="vertical" />}
                    </div>
                ))}
            </div>
            {userName ? (
                <div className="flex gap-4">
                    <div
                        className="flex text-lg items-center gap-1 cursor-pointer bg-[var(--accent)] hover:bg-[var(--primary-light)] px-5 py-2 transition-colors rounded-full"
                    >
                        <p>Olá, <span className="font-bold">{userName}</span></p>
                    </div>
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className='cursor-pointer hover:text-red-700 transition-colors duration-300'
                    >
                        <ExitToAppIcon />
                    </button>
                    <Modal
                        open={logoutModalOpen}
                        onClose={() => setLogoutModalOpen(false)}
                        className="flex items-center justify-center"
                    >
                        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm text-center flex flex-col items-center gap-6">
                            <h2 className="text-xl font-semibold">Tem certeza que deseja sair da conta?</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        onLogout();
                                        setUserName(null);
                                        setLogoutModalOpen(false);
                                    }}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                                >
                                    Sim, sair
                                </button>
                                <button
                                    onClick={() => setLogoutModalOpen(false)}
                                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            ) : (
                <button
                    className="flex text-lg items-center gap-2 cursor-pointer hover:bg-[var(--accent)] px-5 py-2 transition-colors rounded-full"
                    onClick={() => setLoginModalOpen(true)}
                >
                    <PersonOutlineOutlinedIcon />
                    <p>Criar conta</p>
                </button>
            )}
        </div>
    )
}