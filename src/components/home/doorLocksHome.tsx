import { useAuth } from "../../contexts/AuthContext";
import DoorLocksCard from "../door-locks/doorLocksCard";

export default function DoorLocksHome() {
    const { user } = useAuth();

    const ownerLocks = user?.doorLockUsers?.filter(dl => dl.paper === "owner") || [];
    const sharedLocks = user?.doorLockUsers?.filter(dl => dl.paper !== "owner") || [];

    return (
        <div className="flex flex-1 flex-col gap-6 justify-center">
            <div className="flex flex-col w-full items-center gap-4">
                <h3 className="text-4xl font-bold mb-2 text-[var(--primary)]">Suas Fechaduras</h3>
                {ownerLocks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {ownerLocks.map((access) => (
                            <DoorLocksCard key={access.id} access={access} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">Você não possui nenhuma fechadura.</p>
                )}
            </div>

            <div className="flex flex-col w-full items-center gap-4">
                <h3 className="text-4xl font-bold mb-2 text-[var(--primary)]">Fechaduras Compartilhadas</h3>
                {sharedLocks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {sharedLocks.map((access) => (
                            <DoorLocksCard key={access.id} access={access} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">Nenhuma fechadura foi compartilhada com você.</p>
                )}
            </div>
        </div>
    );
}
