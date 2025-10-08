import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import KeyIcon from '@mui/icons-material/Key';

interface DoorLocksCardProps {
    access: {
        id: number;
        paper: string;
        status: string;
        startsAt: string | null;
        expiresAt: string | null;
        doorLock: {
            name: string;
            localization: string;
            status: string;
        };
        sharedByUser?: {
            name: string;
        } | null;
    };
}

export default function DoorLocksCard({ access }: DoorLocksCardProps) {
    const isActive = access.doorLock.status === 'ON';
    const statusColor = isActive ? 'bg-green-500' : 'bg-red-500';

    return (
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
    );
}
