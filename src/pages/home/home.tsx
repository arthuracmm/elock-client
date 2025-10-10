import { useState } from "react";
import Header from "../../components/global/header";
import LoginModal from "../../components/login/login/login";
import DoorLocksHome from "../../components/home/doorLocksHome";
import remote from "/svgs/remote.svg";
import iotconnect from "/svgs/iotconnect.svg";
import everywhere from "/svgs/everywhere.svg";
import elock from "/images/elock.png";
export default function HomePage() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState("Home");

  const handleLoginSuccess = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen w-full h-full relative bg-zinc-100/50">
      <Header
        setLoginModalOpen={setLoginModalOpen}
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
      />
      <LoginModal open={isLoginModalOpen} handleClose={handleLoginSuccess} />
      <div className="flex mt-28 p-2">
        {itemSelected === "Home" && (
          <div className="flex flex-col items-center justify-center w-full px-6 md:px-20 lg:px-40 text-center mt-10">
            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
              <div className="flex flex-col items-start text-left md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-color)] mb-4">
                  Bem-vindo à{" "}
                  <span className="text-[var(--primary)]">Elock</span>
                </h1>
                <p className="text-[var(--text-color)]/70 text-lg mb-6 max-w-lg">
                  A{" "}
                  <span className="font-semibold text-[var(--primary)]">
                    Elock
                  </span>{" "}
                  é uma solução de
                  <span className="text-[var(--text-color)]">
                    {" "}
                    fechaduras inteligentes IoT{" "}
                  </span>
                  que une segurança, tecnologia e praticidade. Controle suas
                  portas remotamente e monitore o acesso em tempo real — tudo em
                  um só lugar.
                </p>

                <button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition text-white font-semibold px-6 py-3 rounded-xl shadow">
                  Saiba mais
                </button>
              </div>

              <div className="flex justify-center">
                <img src={elock} width="200" height="200" />
              </div>
            </section>
            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full">
              <div className="bg-[var(--background-alt)] rounded-2xl p-6 shadow flex flex-col items-center border border-[var(--border-color)]">
                <img
                  src={everywhere}
                  alt="Controle remoto"
                  className="w-50 h-50 mb-4"
                />
                <h3 className="text-xl font-semibold text-[var(--primary-dark)] mb-2">
                  Controle Remoto
                </h3>
                <p className="text-[var(--text-color)]/70 text-sm">
                  Tranque e destranque suas portas pelo app ou site — com apenas
                  um toque.
                </p>
              </div>

              <div className="bg-[var(--background-alt)] rounded-2xl p-6 shadow flex flex-col items-center border border-[var(--border-color)]">
                <img
                  src={iotconnect}
                  alt="Conectividade IoT"
                  className="w-60 h-50 mb-4"
                />
                <h3 className="text-xl font-semibold text-[var(--primary-dark)] mb-2">
                  Conectividade IoT
                </h3>
                <p className="text-[var(--text-color)]/70 text-sm">
                  Conexão estável via Wi-Fi, com comunicação criptografada e
                  controle em tempo real.
                </p>
              </div>

              <div className="bg-[var(--background-alt)] rounded-2xl p-6 shadow flex flex-col items-center border border-[var(--border-color)]">
                <img src={remote} alt="Segurança" className=" h-50 w-50 mb-4" />
                <h3 className="text-xl font-semibold text-[var(--primary-dark)] mb-2">
                  Segurança Avançada
                </h3>
                <p className="text-[var(--text-color)]/70 text-sm">
                  Sistema protegido com autenticação forte e monitoramento de
                  acessos 24h.
                </p>
              </div>
            </section>
            {/* Call to Action Section */}
            <section className="mt-24 bg-[var(--primary)] text-[var(--secondary)] py-10 px-6 rounded-3xl shadow-lg w-full max-w-4xl">
              <h2 className="text-3xl font-bold mb-4">
                Transforme sua casa em um ambiente inteligente com a Elock
              </h2>
              <p className="text-[var(--accent-light)] mb-6">
                Cadastre-se e comece a conectar suas fechaduras agora mesmo.
              </p>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="bg-[var(--secondary)] text-[var(--primary)] font-semibold px-6 py-3 rounded-xl hover:bg-[var(--neutral)] transition"
              >
                Entrar na plataforma
              </button>
            </section>
            {/* Footer */}
            <footer className="bg-[var(--background-alt)] border-t border-[var(--border-color)] text-center text-[var(--text-color)]/70 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-20 lg:px-40">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--primary)] font-bold text-lg">
                    Elock
                  </span>
                  <span className="text-sm">
                    © {new Date().getFullYear()} Todos os direitos reservados
                    TG-02-13 🐵🇧🇷.
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <a
                    href="#sobre"
                    className="hover:text-[var(--primary)] transition"
                  >
                    Sobre
                  </a>
                  <a
                    href="#contato"
                    className="hover:text-[var(--primary)] transition"
                  >
                    Contato
                  </a>
                  <a
                    href="#privacidade"
                    className="hover:text-[var(--primary)] transition"
                  >
                    Privacidade
                  </a>
                </div>
              </div>
            </footer>
          </div>
        )}

        {itemSelected === "Fechaduras" && <DoorLocksHome />}
      </div>
    </div>
  );
}
