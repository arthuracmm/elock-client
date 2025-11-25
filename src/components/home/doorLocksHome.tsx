import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import DoorLocksCard from "./doorLocksCard";
import axios from "axios";

export default function DoorLocksHome() {
    const { user, fetchUserData } = useAuth();
    const [isCreating, setIsCreating] = useState(false);
    const [newLockName, setNewLockName] = useState("");
    const [newLockLocation, setNewLockLocation] = useState("");

    const ownerLocks = user?.doorLockUsers?.filter(dl => dl.paper === "owner") || [];
    const sharedLocks = user?.doorLockUsers?.filter(dl => dl.paper !== "owner") || [];

    const handleCreateLock = async () => {
        if (!newLockName.trim() || !newLockLocation.trim()) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/door-locks`, {
                name: newLockName,
                localization: newLockLocation,
                status: "off"
            });

            // Recarrega os dados do usuário para atualizar a lista
            if (fetchUserData) await fetchUserData();

            // Limpa o formulário e fecha o modal
            setNewLockName("");
            setNewLockLocation("");
            setIsCreating(false);
            alert("Fechadura criada com sucesso!");
        } catch (err) {
            console.error("Erro ao criar fechadura:", err);
            alert("Erro ao criar fechadura!");
        }
    };

    return (
        <div className="flex flex-1 flex-col gap-6 justify-center">
            <div className="flex flex-col w-full items-center gap-4">
                <div className="flex items-center justify-between w-full max-w-6xl">
                    <h3 className="text-4xl font-bold mb-2 text-[var(--primary)]">Suas Fechaduras</h3>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold px-4 py-2 rounded-lg transition flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Criar Fechadura
                    </button>
                </div>

                {ownerLocks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {ownerLocks.map((access) => (
                            <DoorLocksCard key={access.id} access={access} onDelete={fetchUserData} />
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

            {/* Modal de Criação */}
            {isCreating && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]">Criar Nova Fechadura</h2>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Nome</label>
                                <input
                                    type="text"
                                    value={newLockName}
                                    onChange={(e) => setNewLockName(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Ex: Porta Principal"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Localização</label>
                                <input
                                    type="text"
                                    value={newLockLocation}
                                    onChange={(e) => setNewLockLocation(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                    placeholder="Ex: Entrada da Casa"
                                />
                            </div>

                            <div className="flex gap-2 justify-end mt-4">
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreateLock}
                                    className="px-4 py-2 bg-[var(--primary)] text-white rounded hover:bg-[var(--primary-dark)] transition"
                                >
                                    Criar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
