import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface UsageTimelineChartProps {
    data: Array<{
        date: string;
        opens: number;
        closes: number;
    }>;
}

export default function UsageTimelineChart({ data }: UsageTimelineChartProps) {
    return (
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Histórico de Uso (Últimos 7 dias)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="opens" stroke="#2e7d32" strokeWidth={2} name="Aberturas" />
                        <Line type="monotone" dataKey="closes" stroke="#d32f2f" strokeWidth={2} name="Fechamentos" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
