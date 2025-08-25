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

import { AssignmentLate } from '@mui/icons-material'

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

    const surveyHeaders = useMemo(() => [
        {
            id: "name",
            numeric: false,
            disablePadding: false,
            label: t('name'),
            disableSorting: false
        },
        {
            id: "language",
            numeric: false,
            disablePadding: false,
            label: t('language'),
            disableSorting: false
        },
        {
            id: "deathline",
            numeric: false,
            disablePadding: false,
            label: t('deathline'),
            disableSorting: false
        }
    ], [t]);

    function Actions() {
        return (
            <>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                >
                    <Button variant="contained" startIcon={<AssignmentLate />}>
                        Diligenciar
                    </Button>
                </Box>
            </>
        );
    }

    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {t('welcome')}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {t('welcomeFastySurvey').split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                                <br />
                            </span>
                        ))}
                    </Typography>
                    <Divider />
                    <Typography variant="h4" mt={2} gutterBottom>
                        {t('surveyResolve')}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label={t('selectGroup')}
                            defaultValue="0"
                            helperText={t('helperSelectGroup')}
                        >
                            <MenuItem key="0" value="0">{t('selectOption')}</MenuItem>
                            {groupSelect.map((option) => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <PageTable headCells={surveyHeaders} rows={surveyList} actions={<Actions />} />
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default Index;