import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../../context/LoaderContext';
import { getData } from '../../utils/api/fetchMetods';
import { toast } from 'react-toastify';

import {
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Skeleton
} from '@mui/material';

import {
    Add,
    CalendarMonth,
    FormatAlignLeft,
    Poll,
    Settings
} from '@mui/icons-material'

import PageModal from '../../components/PageModal';

const InfoSurveys = ({ idSurvey, open, onClose }) => {
    const { t } = useTranslation();
    const { startLoading, stopLoading } = useLoader();

    const [expandIntroText, setExpandIntroText] = useState(false);
    const [expandTermsText, setExpandTermsText] = useState(false);

    const toggleIntroText = () => setExpandIntroText(!expandIntroText);
    const toggleTermsText = () => setExpandTermsText(!expandTermsText);

    const [infoSurvey, setInfoSurvey] = useState({
        surveyName: "Encuesta Calidad #1",
        creationDate: new Date(),
        createdBy: "Samuel Tabares Patiño",
        configurationDate: new Date(),
        configuredBy: "Samuel Tabares Patiño",
        introductionText: "Con el objetivo de garantizar la excelencia en nuestros procesos y servicios, hemos diseñado la Encuesta Calidad #1. Su participación es fundamental para identificar oportunidades de mejora y mantener los más altos estándares de calidad. Agradecemos de antemano el tiempo dedicado a responder de manera objetiva y responsable. Sus aportes serán tratados con total confidencialidad y contribuirán directamente al fortalecimiento de nuestra gestión.",
        termsConditions: "Al participar en la Encuesta Calidad #1, usted acepta que sus respuestas serán utilizadas únicamente con fines de análisis interno y mejora de nuestros procesos y servicios. La información recolectada será tratada de manera confidencial y no será compartida con terceros ajenos a la organización. La participación es completamente voluntaria y usted podrá abstenerse de responder cualquier pregunta si así lo considera pertinente. Al continuar con la encuesta, confirma que ha leído y aceptado los presentes términos y condiciones."
    });
    const [loadingSurveys, setLoadingSurveys] = useState(false);

    const introText = infoSurvey.introductionText || "";
    const isLongIntroText = introText.length > 120;
    const displayIntroText = expandIntroText || !isLongIntroText
        ? introText
        : introText.slice(0, 120) + "...";

    const termsText = infoSurvey.termsConditions || "";
    const isLongTermsText = termsText.length > 120;
    const displayTermsText = expandTermsText || !isLongTermsText
        ? termsText
        : termsText.slice(0, 120) + "...";

    useEffect(() => {
        if (!open) return;

        startLoading();
        setLoadingSurveys(true);

        const loadData = async () => {
            try {
                const { status, dataResponse } = await getData(`/surveys/${idSurvey}`);

                if (status >= 200 && status < 300) {
                    const mappedSurvey = {
                        surveyName: dataResponse.survey_name,
                        creationDate: dataResponse.creation_date,
                        configurationDate: dataResponse.configuration_date,
                        introductionText: dataResponse.introduction_text,
                        termsConditions: dataResponse.terms_conditions
                    };

                    setInfoSurvey(mappedSurvey);
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
    }, [open, idSurvey]);

    const renderText = (text) => loadingSurveys ? <Skeleton width="80%" /> : text;

    return (
        <>
            <PageModal
                maxWidth="sm"
                open={open}
                onClose={onClose}
                title={t('actions.infoShow')}
                sx={{
                    "& .MuiDialog-container": {
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                    },
                }}
                cancelText={t('navigation.close')}
                showActions
            >
                <List
                    sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 2,
                    }}
                >
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Poll />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.name') + ":"}
                            secondary={renderText(infoSurvey.surveyName)}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FormatAlignLeft />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('survey.introductionText') + ":"}
                            secondary={
                                loadingSurveys ? (
                                    <Skeleton width="80%" />
                                ) : (
                                    <>
                                        <Typography variant="body2" component="span">
                                            {displayIntroText || 'N/A'}
                                        </Typography>
                                        {isLongIntroText && (
                                            <Button
                                                onClick={toggleIntroText}
                                                color="info"
                                                size="small"
                                                disableRipple
                                                sx={{
                                                    textTransform: "none",
                                                    '&:hover': { backgroundColor: "transparent" }
                                                }}
                                            >
                                                {expandIntroText ? t('pagination.showLess') : t('pagination.showMore')}
                                            </Button>
                                        )}
                                    </>
                                )
                            }
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FormatAlignLeft />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('survey.termsConditions') + ":"}
                            secondary={
                                loadingSurveys ? (
                                    <Skeleton width="80%" />
                                ) : (
                                    <>
                                        <Typography variant="body2" component="span">
                                            {displayTermsText || 'N/A'}
                                        </Typography>
                                        {isLongTermsText && (
                                            <Button
                                                onClick={toggleTermsText}
                                                color="info"
                                                size="small"
                                                disableRipple
                                                sx={{
                                                    textTransform: "none",
                                                    '&:hover': { backgroundColor: "transparent" }
                                                }}
                                            >
                                                {expandTermsText ? t('pagination.showLess') : t('pagination.showMore')}
                                            </Button>
                                        )}
                                    </>
                                )
                            }
                        />
                    </ListItem>

                    {/* <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Add />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.createdBy') + ":"}
                            secondary={infoSurvey.createdBy}
                        />
                    </ListItem> */}

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <CalendarMonth />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.creationDate') + ":"}
                            secondary={renderText(infoSurvey.creationDate)}
                        />
                    </ListItem>

                    {/* <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Settings />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.configuratedBy') + ":"}
                            secondary={infoSurvey.configuredBy}
                        />
                    </ListItem> */}

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <CalendarMonth />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.configurationDate') + ":"}
                            secondary={renderText(infoSurvey.configurationDate || 'N/A')}
                        />
                    </ListItem>
                </List>
            </PageModal>
        </>
    );
};

export default InfoSurveys;