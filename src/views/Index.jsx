import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';

import { AssignmentLate } from '@mui/icons-material';
import PageTable from '../components/PageTable';

const Index = () => {
    const { t } = useTranslation();

    const [surveyList, setSurveyList] = useState([
        {
            name: "Encuesta #1",
            language: "Español",
            deathline: "30/07/2025 - 12:00 PM"
        },
        {
            name: "Encuesta #2",
            language: "Español",
            deathline: "30/07/2025 - 12:00 PM"
        }
    ]);

    const [groupSelect, setGroupSelect] = useState([
        { value: "1", label: "Grupo 1" },
        { value: "2", label: "Grupo 2" },
        { value: "3", label: "Grupo 3" }
    ]);

    const [selectedGroup, setSelectedGroup] = useState("0");

    const surveyHeaders = useMemo(() => [
        {
            id: "name",
            numeric: false,
            disablePadding: false,
            label: t('user.name'),
            disableSorting: false
        },
        {
            id: "language",
            numeric: false,
            disablePadding: false,
            label: t('navigation.language'),
            disableSorting: false
        },
        {
            id: "deathline",
            numeric: false,
            disablePadding: false,
            label: t('survey.deathline'),
            disableSorting: false
        }
    ], [t]);

    const handleGroupChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    function Actions() {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
            >
                <Button variant="contained" startIcon={<AssignmentLate />}>
                    {t('actions.fillOut')}
                </Button>
            </Box>
        );
    }

    return (
        <Card variant="elevation">
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {t('welcome.welcome')}
                </Typography>
                <Typography variant="body1" component="p">
                    {t('welcome.welcomeFastySurvey').split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                            <br />
                        </span>
                    ))}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h4" gutterBottom>
                    {t('survey.surveyResolve')}
                </Typography>

                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <TextField
                        select
                        label={t('survey.selectGroup')}
                        value={selectedGroup}
                        onChange={handleGroupChange}
                        helperText={t('survey.helperSelectGroup')}
                        size="small"
                    >
                        <MenuItem value="0">{t('survey.selectOption')}</MenuItem>
                        {groupSelect.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <PageTable headCells={surveyHeaders} rows={surveyList} actions={<Actions />} />
            </CardContent>
        </Card>
    );
};

export default Index;