import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import elockPurpleText from '/images/elock-texto.png'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

interface HeaderProps {
    setLoginModalOpen: (open: boolean) => void;
    user: {
        name: string;
        email: string;
    } | null;
}

export default function Header({ setLoginModalOpen, user }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between p-6 px-14 bg-white items-center absolute right-10 top-4 w-[calc(100vw-5rem)] rounded-full font-semibold">
            <img
                src={elockPurpleText}
                alt="elock-logo"
                width={150}
                onClick={() => { navigate('/') }}
                className='cursor-pointer'
            />
            {user ? (
                <div className="flex items-center gap-2 text-lg px-5 py-2 rounded-full bg-[var(--primary-light)]">
                    <PersonOutlineOutlinedIcon />
                    <span>Olá, {user.name.split(' ')[0]}</span>
                </div>
            ) : (
                <button
                    className="flex text-lg items-center gap-2 cursor-pointer hover:bg-[var(--primary-light)] px-5 py-2 transition-colors duration-200 rounded-full"
                    onClick={() => setLoginModalOpen(true)}
                >
                    <PersonOutlineOutlinedIcon />
                    <p>Criar conta</p>
                </button>
            )}
        </div>
    )
}