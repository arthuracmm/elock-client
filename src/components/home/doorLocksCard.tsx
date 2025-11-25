import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import KeyIcon from '@mui/icons-material/Key';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface DoorLocksCardProps {
    access: {
        id: number;
        paper: string;
        status: string;
        startsAt: string | null;
        expiresAt: string | null;
        doorLock: {
            id: number;
            name: string;
            localization: string;
            status: string;
        };
        sharedByUser?: {
            name: string;
        } | null;
    };
    onDelete?: () => Promise<void>;
}

export default function DoorLocksCard({ access, onDelete }: DoorLocksCardProps) {
    const isActive = access.doorLock.status === 'ON';
    const statusColor = isActive ? 'bg-green-500' : 'bg-red-500';

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault(); // Previne navegação do Link
        e.stopPropagation();

        if (!confirm(`Tem certeza que deseja excluir a fechadura "${access.doorLock.name}"?`)) {
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/door-locks/${access.doorLock.id}`);
            alert("Fechadura excluída com sucesso!");
            if (onDelete) await onDelete();
        } catch (err) {
            console.error("Erro ao excluir fechadura:", err);
            alert("Erro ao excluir fechadura!");
        }
    };

    return (
        <Link to={`/door-locks/${access.doorLock.id}`} className="card-styles">
            <div className="relative bg-white border border-zinc-400 rounded-lg shadow-sm p-6 min-w-[20rem] max-w-[20rem] cursor-pointer">
                <span className={`absolute top-2 right-2 text-xs text-white px-3 py-1 rounded-full ${statusColor} font-bold`}>
                    {access.doorLock.status}
                </span>

                <span
                    className={`absolute -top-4 -left-4 text-xs text-white p-2 rounded-full
                    ${access.paper === 'owner' ? 'bg-blue-500'
                            : access.paper === 'admin' ? 'bg-[var(--primary)]'
                                : 'bg-yellow-500'}
                    font-bold`}
                >
                    {access.paper === 'owner' ? <LocalPoliceIcon fontSize='small' />
                        : access.paper === 'admin' ? <AdminPanelSettingsIcon fontSize='small' />
                            : <KeyIcon fontSize='small' />}
                </span>

                {/* Botão de deletar (apenas para owners) */}
                {access.paper === 'owner' && onDelete && (
                    <button
                        onClick={handleDelete}
                        className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition"
                        title="Excluir fechadura"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}

                <div className="flex items-center gap-2 text-zinc-600 mb-1">
                    <FmdGoodIcon fontSize="small" />
                    <span className="font-semibold">{access.doorLock.localization}</span>
                </div>

                <h2 className="text-lg font-bold text-zinc-800 mb-2">
                    {access.doorLock.name}
                    <span className="text-sm text-zinc-400 ml-2">/ Nome</span>
                </h2>

                <div className="text-sm text-zinc-700 space-y-1">
                    <p><strong>Status do acesso:</strong> {isActive ? 'Aberta' : 'Trancada'}</p>
                    {access.startsAt && (
                        <p><strong>Início:</strong> {new Date(access.startsAt).toLocaleString()}</p>
                    )}
                    {access.expiresAt && (
                        <p><strong>Expira em:</strong> {new Date(access.expiresAt).toLocaleString()}</p>
                    )}
                    {access.sharedByUser && (
                        <p className='truncate'><strong>Compartilhado por:</strong> {access.sharedByUser.name}</p>
                    )}
                </div>
            </div>
        </Link>
    );
}
