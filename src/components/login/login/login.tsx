import { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { jwtDecode } from 'jwt-decode';
import elockPurpleText from '/images/elock-texto.png'
import WelcomeSVG from '/svgs/welcome.svg'
import LoginSVG from '/svgs/signin.svg'

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
    onLoginSuccess?: (userData: any) => void;
}

interface JWTPayload {
    sub: number;
    name: string;
    email: string;
    iat: number;
    exp: number;
}

export default function LoginModal({ open, handleClose, onLoginSuccess }: LoginModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [error, setError] = useState('');
    const [isLoginInterface, setIsLoginInterface] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });

            const token = response.data.access_token;

            const decoded = jwtDecode<JWTPayload>(token);
            const userId = decoded.sub;

            localStorage.setItem('accessToken', token);
            const userResponse = await axios.get(`${API_URL}/users/${userId}`);

            const userData = userResponse.data;

            localStorage.setItem('userData', JSON.stringify(userData));

            if (onLoginSuccess) {
                onLoginSuccess(userData);
            }


            handleClose();
            setEmail('');
            setPassword('');

        } catch (err) {
            console.error('Erro ao fazer login:', err);
            setError('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Envia os dados para a API
            const response = await axios.post(`${API_URL}/users`, {
                name,
                email,
                password
            });


            setAccessToken(response.data.access_token);
        } catch (err) {
            console.error(err);
            setError('Erro ao fazer login. Verifique o e-mail e a senha.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='flex min-h-screen items-center justify-center'
        >
            <div className="flex items-center justify-center bg-white p-2 rounded-xl shadow-md relative gap-28 ">
                <div className="flex flex-1 flex-col h-full justify-between">
                    {isLoginInterface ? (
                        <form onSubmit={handleSubmit} name="loginForm" className="flex flex-col gap-2 h-full">
                            <div className="flex">
                                <div className="flex flex-col px-28 py-16 justify-between">
                                    <img src={elockPurpleText} alt="elock text logo" width={100} />
                                    <div className="flex flex-col gap-2 w-100">
                                        <div className="flex flex-col gap-2">
                                            <h1 className='text-4xl font-bold'>Olá Usuário, <br /> Bem Vindo De Volta!</h1>

                                            <p className='text-xs text-zinc-400'>Seja bem vindo de volta a sua segurança</p>
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Digite o email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-zinc-300 text-xs focus:outline-none mt-5"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Digite a senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-zinc-300 text-xs focus:outline-none"
                                        />

                                        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded mt-6">
                                            Enviar
                                        </button>
                                    </div>



                                    <p
                                        className='text-xs'>Não tem uma conta? <span
                                            className='text-[var(--primary)] underline cursor-pointer'
                                            onClick={() => { setIsLoginInterface(false) }}
                                        >
                                            Cadastrar
                                        </span>
                                    </p>
                                </div>
                                <div
                                    className="flex h-[30vw] rounded-xl p-7 bg-[var(--accent-light)]"
                                >
                                    <img src={LoginSVG} alt="a" width={500} />
                                </div>
                            </div>

                        </form>

                    ) : (
                        <form onSubmit={handleSignUp} name="signInForm" className="flex flex-col gap-2 h-full">
                            <div className="flex">
                                <div className="flex flex-col px-28 py-16 justify-between">
                                    <img src={elockPurpleText} alt="elock text logo" width={100} />
                                    <div className="flex flex-col gap-2 w-100">
                                        <div className="flex flex-col gap-2">
                                            <h1 className='text-4xl font-bold'>Somos ELOCK, <br /> Seja Bem Vindo!</h1>

                                            <p className='text-xs text-zinc-400'>Deseja dar um passo com sua segurança?</p>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Digite o seu nome"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-zinc-300 text-xs focus:outline-none mt-5"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Digite o email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-zinc-300 text-xs focus:outline-none"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Digite a senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="border px-4 py-2 rounded border-zinc-300 text-xs focus:outline-none"
                                        />

                                        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded mt-6">
                                            Enviar
                                        </button>
                                    </div>



                                    <p
                                        className='text-xs'>Já tem uma conta? <span
                                            className='text-[var(--primary)] underline cursor-pointer'
                                            onClick={() => { setIsLoginInterface(true) }}
                                        >
                                            Entrar
                                        </span>
                                    </p>
                                </div>
                                <div
                                    className="flex h-[30vw] rounded-xl p-7 bg-[var(--accent-light)]"
                                >
                                    <img src={WelcomeSVG} alt="a" width={500} />
                                </div>
                            </div>

                        </form>
                    )}
                </div>

            </div>

        </Modal>
    );
}
