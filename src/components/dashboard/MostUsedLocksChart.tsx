import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MostUsedLocksChartProps {
    data: Array<{
        id: number;
        name: string;
        usageCount: number;
    }>;
}

export default function MostUsedLocksChart({ data }: MostUsedLocksChartProps) {
    return (
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Fechaduras Mais Utilizadas
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="usageCount" fill="#1976d2" name="Número de Usos" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
