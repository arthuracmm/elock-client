import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Modal from '@mui/material/Modal';
import lockinLogo from '/images/lockin-logo.svg';

interface HeaderProps {
    setLoginModalOpen: (open: boolean) => void;
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function Header({ setLoginModalOpen, isLoggedIn, onLogout }: HeaderProps) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string | null>(null);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            setUserName(null);
            return;
        }

        const userDataString = localStorage.getItem('userData');

        if (!userDataString) {
            return;
        }

        try {
            const userData = JSON.parse(userDataString) as { name?: string };
            const firstName = userData.name?.split(' ')[0] ?? null;
            setUserName(firstName);
        } catch (error) {
            console.error('Erro ao analisar userData:', error);
            setUserName(null);
        }
    }, [isLoggedIn]);

    return (
        <div className="flex justify-between p-5 px-12 bg-[var(--surface)]/95 items-center absolute right-10 top-4 w-[calc(100vw-5rem)] rounded-full font-semibold shadow-lg shadow-yellow-950/20 border border-[var(--border)]">
            <img
                src={lockinLogo}
                alt="lockin-logo"
                width={170}
                onClick={() => { navigate('/') }}
                className="cursor-pointer"
            />
            {userName ? (
                <div className="flex gap-4">
                    <div className="flex text-lg items-center gap-1 cursor-pointer bg-[var(--accent)] text-[var(--primary-dark)] hover:bg-[var(--primary-light)] hover:text-white px-5 py-2 transition-colors rounded-full">
                        <p>Ola, <span className="font-bold">{userName}</span></p>
                    </div>
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="cursor-pointer text-[var(--secondary)] hover:text-[var(--primary)] transition-colors duration-300"
                    >
                        <ExitToAppIcon />
                    </button>
                    <Modal
                        open={logoutModalOpen}
                        onClose={() => setLogoutModalOpen(false)}
                        className="flex items-center justify-center"
                    >
                        <div className="bg-[var(--surface)] rounded-lg shadow-xl shadow-yellow-950/25 border border-[var(--border)] p-8 w-full max-w-sm text-center flex flex-col items-center gap-6">
                            <h2 className="text-xl font-semibold text-[var(--primary-dark)]">Tem certeza que deseja sair da conta?</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        onLogout();
                                        setUserName(null);
                                        setLogoutModalOpen(false);
                                    }}
                                    className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--primary-dark)] transition-colors"
                                >
                                    Sim, sair
                                </button>
                                <button
                                    onClick={() => setLogoutModalOpen(false)}
                                    className="bg-[var(--accent)] text-[var(--secondary-dark)] px-4 py-2 rounded hover:bg-[var(--secondary-light)] hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            ) : (
                <button
                    className="flex text-lg items-center gap-2 cursor-pointer text-[var(--primary-dark)] hover:bg-[var(--accent)] hover:text-[var(--secondary-dark)] px-5 py-2 transition-colors rounded-full"
                    onClick={() => setLoginModalOpen(true)}
                >
                    <PersonOutlineOutlinedIcon />
                    <p>Criar conta</p>
                </button>
            )}
        </div>
    );
}
