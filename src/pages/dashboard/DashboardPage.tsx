import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../contexts/AuthContext';
import { statisticsService } from '../../services/statisticsService';
import StatsCards from '../../components/dashboard/StatsCards';
import UsageTimelineChart from '../../components/dashboard/UsageTimelineChart';
import MostUsedLocksChart from '../../components/dashboard/MostUsedLocksChart';
import StatusDistributionChart from '../../components/dashboard/StatusDistributionChart';
import RecentActivityTable from '../../components/dashboard/RecentActivityTable';

export default function DashboardPage() {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading } = useAuth();

    const [overview, setOverview] = useState<any>(null);
    const [timeline, setTimeline] = useState<any[]>([]);
    const [mostUsed, setMostUsed] = useState<any[]>([]);
    const [statusDist, setStatusDist] = useState<any[]>([]);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn && !isLoading) {
            navigate('/');
            return;
        }

        if (isLoggedIn) {
            loadDashboardData();
        }
    }, [isLoggedIn, isLoading, navigate]);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [overviewData, timelineData, mostUsedData, statusDistData, activityData] =
                await Promise.all([
                    statisticsService.getOverview(),
                    statisticsService.getUsageTimeline(),
                    statisticsService.getMostUsed(),
                    statisticsService.getStatusDistribution(),
                    statisticsService.getRecentActivity(),
                ]);

            setOverview(overviewData);
            setTimeline(timelineData);
            setMostUsed(mostUsedData);
            setStatusDist(statusDistData);
            setRecentActivity(activityData);
        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading || loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor="#f5f5f5"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box bgcolor="#f5f5f5" minHeight="100vh" py={4}>
            <Container maxWidth="xl">
                <Box mb={4}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/')}
                        sx={{ mb: 2 }}
                    >
                        Voltar
                    </Button>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Dashboard de Estatísticas
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Visualize métricas e análises do sistema de fechaduras
                    </Typography>
                </Box>

                {/* KPI Cards */}
                {overview && (
                    <Box mb={4}>
                        <StatsCards stats={overview} />
                    </Box>
                )}

                {/* Charts Row 1 */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
                        gap: 3,
                        mb: 3,
                    }}
                >
                    <UsageTimelineChart data={timeline} />
                    <StatusDistributionChart data={statusDist} />
                </Box>

                {/* Charts Row 2 */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                        gap: 3,
                    }}
                >
                    <MostUsedLocksChart data={mostUsed} />
                    <RecentActivityTable data={recentActivity} />
                </Box>
            </Container>
        </Box>
    );
}
