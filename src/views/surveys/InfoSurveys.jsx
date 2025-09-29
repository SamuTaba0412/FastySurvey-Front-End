import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
} from '@mui/material';

import {
    Add,
    CalendarMonth,
    FormatAlignLeft,
    Poll,
    Settings
} from '@mui/icons-material'

import PageModal from '../../components/PageModal';

const InfoSurveys = ({ idSurvey = 0, open, onClose }) => {
    const { t } = useTranslation();

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
                            secondary={`${infoSurvey.surveyName}`}
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
                                <>
                                    <Typography variant="body2" component="span">
                                        {displayIntroText}
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
                                <>
                                    <Typography variant="body2" component="span">
                                        {displayTermsText}
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
                            }
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Add />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.createdBy') + ":"}
                            secondary={infoSurvey.createdBy}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <CalendarMonth />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.creationDate') + ":"}
                            secondary={infoSurvey.creationDate.toDateString()}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Settings />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.configuratedBy') + ":"}
                            secondary={infoSurvey.configuredBy}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <CalendarMonth />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={t('user.configurationDate') + ":"}
                            secondary={infoSurvey.configurationDate.toDateString()}
                        />
                    </ListItem>
                </List>
            </PageModal>
        </>
    );
};

export default InfoSurveys;