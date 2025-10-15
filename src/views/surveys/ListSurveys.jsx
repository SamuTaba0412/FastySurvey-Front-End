import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';
import { getData, putData } from '../../utils/api/fetchMetods';
import { toast } from 'react-toastify';

import {
    Box,
    Button,
    Card,
    CardContent,
    InputAdornment,
    TextField,
    Typography,
    Switch,
    Skeleton,
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
    const { startLoading, stopLoading } = useLoader();
    const navigate = useNavigate();

    const [openSurveyModal, setOpenSurveyModal] = useState(false);
    const [openInfoSurveyModal, setOpenInfoSurveyModal] = useState(false);
    const [loadingSurveys, setLoadingSurveys] = useState(false);

    const [idSurvey, setIdSurvey] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const [surveyList, setSurveyList] = useState([]);

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
        },
        {
            id: "state",
            numeric: false,
            disablePadding: false,
            label: t('tables.state'),
            disableSorting: true
        }
    ], [t]);

    const filteredSurveys = useMemo(() => {
        const keyword = searchTerm.toLowerCase();

        return surveyList
            .filter(survey =>
                survey.name.toLowerCase().includes(keyword) ||
                survey.creationDate.toLowerCase().includes(keyword) ||
                survey.configurationDate.toLowerCase().includes(keyword)
            )
            .map(survey => ({
                ...survey,
                state: (
                    <Switch
                        checked={survey.state === 1}
                        onChange={() => handleToggleState(survey.idSurvey, survey.state)}
                        color="success"
                    />
                )
            }));
    }, [searchTerm, surveyList]);

    const handleToggleState = async (idSurvey) => {
        startLoading();

        try {
            const { status, dataResponse } = await putData(`/surveys/state/${idSurvey}`)

            if (status >= 200 && status < 300) {
                setSurveyList(prev =>
                    prev.map(survey =>
                        survey.idSurvey === idSurvey ? { ...survey, state: dataResponse } : survey
                    )
                );

                toast.success(
                    dataResponse === 1
                        ? t('survey.surveyActivated')
                        : t('survey.surveyDeactivated')
                );
            } else if (status >= 400 && status < 500) {
                toast.warning(`${status}: ${dataResponse.detail}`)
            }
        } catch (err) {
            toast.error(err.message);
        }
        finally {
            stopLoading();
        }
    };

    useEffect(() => {
        startLoading();
        setLoadingSurveys(true);

        const loadData = async () => {
            try {
                const { status, dataResponse } = await getData(`/surveys`);

                if (status >= 200 && status < 300) {
                    const mappedSurveys = dataResponse.map(survey => ({
                        idSurvey: survey.id_survey,
                        name: survey.survey_name,
                        state: survey.survey_state,
                        creationDate: survey.creation_date,
                        configurationDate: survey.configuration_date
                    }))

                    setSurveyList(mappedSurveys);
                }
            }
            catch (err) {
                toast.error(err);
            }
            finally {
                stopLoading();
                setLoadingSurveys(false);
            }
        }

        loadData();
    }, []);

    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    {!loadingSurveys ? (
                        <Typography variant="h4" gutterBottom>
                            {t('navigation.surveys')}
                        </Typography>
                    ) : (
                        <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
                    )}
                    <Box sx={{ mt: 2 }}>
                        {!loadingSurveys ? (
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
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <Skeleton variant="rectangular" width="60%" height={40} />
                                <Skeleton variant="rectangular" width="40%" height={40} />
                            </Box>
                        )}

                        {!loadingSurveys ? (
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
                        ) : (
                            <Box>
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        variant="rectangular"
                                        height={50}
                                        sx={{ mb: 1 }}
                                    />
                                ))}
                            </Box>
                        )}
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