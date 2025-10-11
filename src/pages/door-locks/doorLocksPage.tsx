import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // ajuste o caminho conforme sua estrutura

export default function DoorLockPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user, isLoading, isLoggedIn } = useAuth();

    const [status, setStatus] = useState<"on" | "off">("off");
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

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

    // 🔗 Conexão com WebSocket
    useEffect(() => {
        if (hasAccess !== true || !id) return;

        const ws = new WebSocket(`ws://localhost:8080?doorLockId=${id}`);
        socketRef.current = ws;


        ws.onmessage = (event) => {
            const message = event.data.toString();

            // 👇 Novo formato: "doorLockId:5 status:on"
            const match = message.match(/doorLockId:(\d+)\sstatus:(on|off)/);
            if (match) {
                const [, , newStatus] = match;
                setStatus(newStatus as "on" | "off");
            }
        };

        ws.onerror = (err) => console.error("⚠️ Erro no WebSocket:", err);

        return () => ws.close();
    }, [id, hasAccess]);

    const toggleStatus = () => {
        const newStatus = status === "on" ? "off" : "on";
        socketRef.current?.send(`status:${newStatus}`);
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

    // ✅ Usuário autorizado
    return (
        <div className="flex flex-col p-4 gap-4">
            <h1 className="text-xl font-bold">Fechadura ID: {id}</h1>
            <p>
                Status atual: <strong>{status.toUpperCase()}</strong>
            </p>
            <button
                onClick={toggleStatus}
                className={`px-4 py-2 rounded font-semibold transition ${status === "on" ? "bg-red-500" : "bg-green-500"
                    } text-white`}
            >
                Alternar para {status === "on" ? "OFF" : "ON"}
            </button>
        </div>
    );
}
