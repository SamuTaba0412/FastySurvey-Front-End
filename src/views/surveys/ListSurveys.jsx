import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
    Box,
    Button,
    Card,
    CardContent,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';

import {
    Add,
    Search,
    Settings
} from '@mui/icons-material';

import PageActionButtons from '../../components/PageActionButtons';
import PageTable from '../../components/PageTable';

import InfoSurveys from './InfoSurveys';
import ModalSurveys from './ModalSurveys';

const ListSurveys = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [openSurveyModal, setOpenSurveyModal] = useState(false);SS
    const [openInfoSurveyModal, setOpenInfoSurveyModal] = useState(false);

    const [idSurvey, setIdSurvey] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const [surveyList, setSurveyList] = useState([
        {
            idSurvey: 1,
            name: "Encuesta Calidad #1",
            creationDate: new Date().toDateString(),
            configurationDate: new Date().toDateString()
        }
    ]);

    const surveyHeaders = useMemo(() => [
        {
            id: "name",
            numeric: false,
            disablePadding: false,
            label: t('user.name'),
            disableSorting: false
        },
        {
            id: "creationDate",
            numeric: false,
            disablePadding: false,
            label: t('user.creationDate'),
            disableSorting: false
        },
        {
            id: "configurationDate",
            numeric: false,
            disablePadding: false,
            label: t('user.configurationDate'),
            disableSorting: false
        }
    ], [t]);

    const filteredSurveys = useMemo(() => {
        const keyword = searchTerm.toLowerCase();

        return surveyList.filter(survey =>
            survey.name.toLowerCase().includes(keyword) ||
            survey.creationDate.toLowerCase().includes(keyword) ||
            survey.configurationDate.toLowerCase().includes(keyword)
        );
    }, [searchTerm, surveyList]);

    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {t('navigation.surveys')}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Box
                            sx={{
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                size="small"
                                variant="outlined"
                                placeholder={t('navigation.search')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                sx={{
                                    width: { xs: '60%', sm: '250px' },
                                }}
                            />

                            <Button
                                color="success"
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => {
                                    setIdSurvey(0);
                                    setOpenSurveyModal(true);
                                }}
                                sx={{ ml: 'auto' }}
                            >
                                {t('user.add')}
                            </Button>
                        </Box>

                        <PageTable
                            headCells={surveyHeaders}
                            rows={filteredSurveys}
                            actions={(row) => (
                                <PageActionButtons
                                    showView
                                    showEdit
                                    onView={() => {
                                        setIdSurvey(row.idSurvey);
                                        setOpenInfoSurveyModal(true);
                                    }}
                                    onEdit={() => {
                                        setIdSurvey(row.idSurvey);
                                        setOpenSurveyModal(true);
                                    }}
                                    customButtons={[
                                        {
                                            tooltip: t('survey.structuration'),
                                            color: "secondary",
                                            onClick: () => navigate(`/surveys/structuration/${row.idSurvey}`),
                                            icon: <Settings />
                                        }
                                    ]}
                                />
                            )}
                        />
                    </Box>
                </CardContent>
            </Card>

            <InfoSurveys
                open={openInfoSurveyModal}
                onClose={() => setOpenInfoSurveyModal(false)}
                idSurvey={idSurvey}
            />

            <ModalSurveys
                open={openSurveyModal}
                onClose={() => setOpenSurveyModal(false)}
                idSurvey={idSurvey}
            />
        </>
    );
}

export default ListSurveys;