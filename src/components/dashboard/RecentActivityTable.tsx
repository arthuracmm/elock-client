import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';

interface RecentActivityTableProps {
    data: Array<{
        id: number;
        lockName: string;
        action: string;
        user: string;
        timestamp: string;
    }>;
}

export default function RecentActivityTable({ data }: RecentActivityTableProps) {
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Atividades Recentes
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Fechadura</strong></TableCell>
                                <TableCell><strong>Ação</strong></TableCell>
                                <TableCell><strong>Usuário</strong></TableCell>
                                <TableCell><strong>Data/Hora</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((activity) => (
                                <TableRow key={activity.id} hover>
                                    <TableCell>{activity.lockName}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={activity.action}
                                            color={activity.action === 'OPEN' ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{activity.user}</TableCell>
                                    <TableCell>{formatTimestamp(activity.timestamp)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}
