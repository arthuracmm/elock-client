import { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import lockinLogo from '/images/lockin-logo.svg';

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
    onLoginSuccess?: (userData: UserData) => void;
}

interface UserData {
    id?: number;
    name: string;
    email: string;
}

interface JWTPayload {
    sub: number;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

function decodeJwtPayload(token: string): JWTPayload | null {
    const [, payload] = token.split('.');

    if (!payload) {
        return null;
    }

    try {
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(window.atob(base64)) as Partial<JWTPayload>;

        if (typeof decodedPayload.sub !== 'number') {
            return null;
        }

        return { sub: decodedPayload.sub };
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
}

export default function LoginModal({ open, handleClose, onLoginSuccess }: LoginModalProps) {
    const [isLoginInterface, setIsLoginInterface] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setError('');
        setSuccessMessage('');
    };

    const handleModalClose = () => {
        resetForm();
        handleClose();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post<{ access_token: string }>(`${API_URL}/auth/login`, {
                email,
                password,
            });

            const token = response.data.access_token;
            const decoded = decodeJwtPayload(token);

            if (!decoded) {
                throw new Error('Token invalido.');
            }

            localStorage.setItem('accessToken', token);

            const userResponse = await axios.get<UserData>(`${API_URL}/users/${decoded.sub}`);
            const userData = userResponse.data;

            localStorage.setItem('userData', JSON.stringify(userData));
            onLoginSuccess?.(userData);
            handleClose();
            resetForm();
        } catch (err) {
            console.error('Erro ao fazer login:', err);
            setError('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            await axios.post(`${API_URL}/users`, {
                name,
                email,
                password,
            });

            setSuccessMessage('Cadastro realizado. Entre com seu e-mail e senha.');
            setIsLoginInterface(true);
            setName('');
            setPassword('');
        } catch (err) {
            console.error('Erro ao cadastrar:', err);
            setError('Erro ao cadastrar. Verifique o e-mail e a senha.');
        }
    };

    const showLogin = () => {
        setError('');
        setSuccessMessage('');
        setIsLoginInterface(true);
    };

    const showSignUp = () => {
        setError('');
        setSuccessMessage('');
        setIsLoginInterface(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="flex min-h-screen items-center justify-center"
        >
            <div className="flex items-center justify-center bg-[var(--surface)] p-2 rounded-xl shadow-2xl shadow-yellow-950/25 border border-[var(--border)] relative gap-28">
                <div className="flex flex-1 flex-col h-full justify-between">
                    {isLoginInterface ? (
                        <form onSubmit={handleSubmit} name="loginForm" className="flex flex-col gap-2 h-full">
                            <div className="flex">
                                <div className="flex flex-col px-28 py-16 justify-between">
                                    <img src={lockinLogo} alt="Lockin logo" width={150} />
                                    <div className="flex flex-col gap-2 w-100">
                                        <div className="flex flex-col gap-2">
                                            <h1 className="text-4xl font-bold text-[var(--primary-dark)]">Ola Usuario, <br /> Bem Vindo De Volta!</h1>
                                            <p className="text-xs text-[var(--muted)]">Seja bem vindo de volta a sua seguranca</p>
                                        </div>
                                        {successMessage && <p className="text-xs text-[var(--success)]">{successMessage}</p>}
                                        {error && <p className="text-xs text-[var(--primary)]">{error}</p>}
                                        <input
                                            type="email"
                                            placeholder="Digite o email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-[var(--border)] text-xs focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-yellow-200 mt-5"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Digite a senha"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-[var(--border)] text-xs focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-yellow-200"
                                        />
                                        <button type="submit" className="bg-[var(--primary)] text-white px-4 py-2 rounded mt-6 hover:bg-[var(--secondary)] hover:text-[var(--primary-dark)] transition-colors">
                                            Enviar
                                        </button>
                                    </div>
                                    <p className="text-xs">
                                        Nao tem uma conta?{' '}
                                        <span className="text-[var(--primary)] underline cursor-pointer" onClick={showSignUp}>
                                            Cadastrar
                                        </span>
                                    </p>
                                </div>
                                <div className="flex h-[30vw] min-w-[28rem] items-center justify-center rounded-xl p-7 bg-gradient-to-br from-[var(--accent-light)] via-[var(--accent)] to-[var(--primary)]">
                                    <img src={lockinLogo} alt="Lockin cadeado" width={360} />
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSignUp} name="signInForm" className="flex flex-col gap-2 h-full">
                            <div className="flex">
                                <div className="flex flex-col px-28 py-16 justify-between">
                                    <img src={lockinLogo} alt="Lockin logo" width={150} />
                                    <div className="flex flex-col gap-2 w-100">
                                        <div className="flex flex-col gap-2">
                                            <h1 className="text-4xl font-bold text-[var(--primary-dark)]">Somos Lockin, <br /> Seja Bem Vindo!</h1>
                                            <p className="text-xs text-[var(--muted)]">Deseja dar um passo com sua seguranca?</p>
                                        </div>
                                        {error && <p className="text-xs text-[var(--primary)]">{error}</p>}
                                        <input
                                            type="text"
                                            placeholder="Digite o seu nome"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-[var(--border)] text-xs focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-yellow-200 mt-5"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Digite o email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-[var(--border)] text-xs focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-yellow-200"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Digite a senha"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-[var(--border)] text-xs focus:outline-none focus:border-[var(--secondary)] focus:ring-2 focus:ring-yellow-200"
                                        />
                                        <button type="submit" className="bg-[var(--primary)] text-white px-4 py-2 rounded mt-6 hover:bg-[var(--secondary)] hover:text-[var(--primary-dark)] transition-colors">
                                            Enviar
                                        </button>
                                    </div>
                                    <p className="text-xs">
                                        Ja tem uma conta?{' '}
                                        <span className="text-[var(--primary)] underline cursor-pointer" onClick={showLogin}>
                                            Entrar
                                        </span>
                                    </p>
                                </div>
                                <div className="flex h-[30vw] min-w-[28rem] items-center justify-center rounded-xl p-7 bg-gradient-to-br from-[var(--accent-light)] via-[var(--accent)] to-[var(--primary)]">
                                    <img src={lockinLogo} alt="Lockin cadeado" width={360} />
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Modal>
    );
}
