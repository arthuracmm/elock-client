import { Box, Card, CardContent, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PeopleIcon from '@mui/icons-material/People';
import DoorFrontIcon from '@mui/icons-material/DoorFront';

interface StatsCardsProps {
    stats: {
        totalLocks: number;
        activeLocks: number;
        inactiveLocks: number;
        totalUsers: number;
    };
}

export default function StatsCards({ stats }: StatsCardsProps) {
    const cards = [
        {
            title: 'Total de Fechaduras',
            value: stats.totalLocks,
            icon: <DoorFrontIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
            color: '#e3f2fd',
        },
        {
            title: 'Fechaduras Ativas',
            value: stats.activeLocks,
            icon: <LockOpenIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
            color: '#e8f5e9',
        },
        {
            title: 'Fechaduras Inativas',
            value: stats.inactiveLocks,
            icon: <LockIcon sx={{ fontSize: 40, color: '#d32f2f' }} />,
            color: '#ffebee',
        },
        {
            title: 'Total de Usuários',
            value: stats.totalUsers,
            icon: <PeopleIcon sx={{ fontSize: 40, color: '#f57c00' }} />,
            color: '#fff3e0',
        },
    ];

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: 3,
            }}
        >
            {cards.map((card, index) => (
                <Card
                    key={index}
                    sx={{
                        backgroundColor: card.color,
                        boxShadow: 3,
                        borderRadius: 2,
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 6,
                        },
                    }}
                >
                    <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {card.title}
                                </Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    {card.value}
                                </Typography>
                            </Box>
                            <Box>{card.icon}</Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
