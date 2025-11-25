import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSocket } from "../../hooks/useSocket";
import axios from "axios";

export default function DoorLockPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user, isLoading, isLoggedIn } = useAuth();

    const [status, setStatus] = useState<"on" | "off">("off");
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);

    // Usa o hook personalizado
    const { socket, isConnected } = useSocket();

    // Busca o status atual da fechadura do banco de dados
    useEffect(() => {
        if (!id) return;

        const fetchLockStatus = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/door-locks/${id}`);
                console.log('Status da fechadura carregado:', response.data.status);
                setStatus(response.data.status);
            } catch (err) {
                console.error('Erro ao buscar status da fechadura:', err);
            }
        };

        fetchLockStatus();
    }, [id]);

    // Verificação de acesso
    useEffect(() => {
        if (!isLoggedIn || !user || isLoading) return;

        const access = user.doorLockUsers.some(
            (dl) => Number(dl.doorLockId) === Number(id) && dl.status === "active"
        );

        if (!access) {
            setHasAccess(false);
            setTimeout(() => navigate("/"), 3000);
        } else {
            setHasAccess(true);
        }
    }, [user, id, isLoading, isLoggedIn, navigate]);

    // Lógica do WebSocket
    useEffect(() => {
        if (!socket || !isConnected || !hasAccess || !id) return;

        // Entra na sala da fechadura
        console.log(`Entrando na sala lock:${id}`);
        socket.emit('join-lock', { lockId: Number(id) });

        // Escuta atualizações
        const handleUpdate = (data: any) => {
            console.log('Atualização recebida:', data);
            if (data.id === Number(id) && data.status) {
                setStatus(data.status); // Backend já envia 'on' ou 'off'
            }
        };

        socket.on('door-lock-updated', handleUpdate);

        return () => {
            console.log(`Saindo da sala lock:${id}`);
            socket.emit('leave-lock', { lockId: Number(id) });
            socket.off('door-lock-updated', handleUpdate);
        };
    }, [socket, isConnected, hasAccess, id]);


    // Função para alternar status via WebSocket
    const toggleStatus = () => {
        if (!socket || !isConnected) {
            console.warn("Socket não conectado");
            return;
        }

        const newStatus = status === "on" ? "off" : "on";
        console.log(`Emitindo toggle-lock: lockId=${id}, status=${newStatus}`);

        socket.emit('toggle-lock', {
            lockId: Number(id),
            status: newStatus
        });

        // Atualiza otimisticamente (será sobrescrito pelo evento door-lock-updated)
        setStatus(newStatus);
    };

    if (isLoading || hasAccess === null) {
        return <div className="p-4">Carregando...</div>;
    }

    if (hasAccess === false) {
        return (
            <div className="p-4 text-center text-red-600">
                <h1 className="text-xl font-bold mb-2">Acesso negado</h1>
                <p>Você não tem permissão para acessar esta fechadura.</p>
                <p>Redirecionando para a página inicial...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-4 gap-4">
            {/* Botão de voltar */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold w-fit"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Voltar
            </button>

            <h1 className="text-xl font-bold">Fechadura ID: {id}</h1>
            <div className="flex items-center gap-2">
                <span>Status Conexão:</span>
                <span className={`font-bold ${isConnected ? "text-green-600" : "text-red-600"}`}>
                    {isConnected ? "Conectado" : "Desconectado"}
                </span>
            </div>
            <p>
                Status da Porta: <strong>{status.toUpperCase()}</strong>
            </p>
            <button
                onClick={toggleStatus}
                className={`px-4 py-2 rounded font-semibold transition ${status === "on" ? "bg-red-500" : "bg-green-500"
                    } text-white`}
            >
                Alternar para {status === "on" ? "OFF" : "ON"}
            </button>
            <p className="text-sm text-gray-500 mt-2">
                Nota: A alteração de status via botão requer implementação no backend.
                O status atualiza em tempo real se alterado externamente (ex: ESP32).
            </p>
        </div>
    );
}
