import { useNavigate } from 'react-router-dom';
import elockPurpleText from '../../../public/images/elock-texto.png'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

interface HeaderProps {
    setLoginModalOpen: (open: boolean) => void;
}

export default function Header({ setLoginModalOpen }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between p-6 px-14 bg-white items-center absolute right-10 top-4 w-[calc(100vw-5rem)] rounded-full font-semibold">
            <img
                src={elockPurpleText}
                alt="elock-logo"
                width={150}
                onClick={() => { navigate('/') }}
                className='cursor-pointer'
            />
            <button
                className="flex text-lg items-center gap-2 cursor-pointer hover:bg-[var(--accent)] px-5 py-2 transition-colors rounded-full"
                onClick={() => setLoginModalOpen(true)}
            >
                <PersonOutlineOutlinedIcon />
                <p>Criar conta</p>
            </button>
        </div>
    )
}