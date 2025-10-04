import { useState } from 'react';
import axios from 'axios';

export default function LoginModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setAccessToken('');

        console.log(email + password)

        try {
            const response = await axios.post(`http://localhost:3000/auth/login`, {
                "email": email,
                "password": password
            });


            setAccessToken(response.data.access_token);
        } catch (err) {
            console.error(err);
            setError('Erro ao fazer login. Verifique o e-mail e a senha.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} name="loginForm" className="flex flex-col gap-2">
                <input
                    type="email"
                    placeholder="Digite o email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Enviar</button>
            </form>

            {accessToken && (
                <div className="mt-4 text-green-600">
                    <p>Access Token:</p>
                    <code className="break-words">{accessToken}</code>
                </div>
            )}

            {error && (
                <div className="mt-4 text-red-600">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
