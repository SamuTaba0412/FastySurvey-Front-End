import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
    Grid,
    FormLabel,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';

import PageModal from '../../components/PageModal';
import createSurveySchema from '../../js/validations/surveySchema';

const ModalSurveys = ({ idSurvey = 0, open, onClose }) => {
    const { t } = useTranslation();
    const surveySchema = createSurveySchema(t);
    
    const initialSurveyState = {
        surveyName: "",
        introductionText: "",
        addTerms: "",
        termsConditions: ""
    };

    const [infoSurvey, setInfoSurvey] = useState(initialSurveyState);
    const [errors, setErrors] = useState({});

    const validate = (data) => {
        const parsed = surveySchema.safeParse(data);
        if (parsed.success) {
            setErrors({});
            return { ok: true, data: parsed.data };
        }

        const fieldErrors = {};
        parsed.error.issues.forEach((issue) => {
            const path = issue.path.join(".") || "form";
            if (!fieldErrors[path]) fieldErrors[path] = issue.message;
        });

        setErrors(fieldErrors);
        return { ok: false, errors: fieldErrors };
    };

    const addSurvey = async () => {
        const res = validate(infoSurvey);
        if (!res.ok) return;
        toast.success(t('survey.surveyCreated'));
        onClose();
    };

    const editSurvey = async () => {
        const res = validate(infoSurvey);
        if (!res.ok) return;
        toast.success(t('survey.surveyEdited'));
        onClose();
    };

    const handleSurveyChange = (e) => {
        const { name, value } = e.target;

        setInfoSurvey((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => {
                const newErr = { ...prev };
                delete newErr[name];
                return newErr;
            });
        }
    };

    useEffect(() => {
        if (!open) return;

        if (idSurvey == 0) {
            setInfoSurvey(initialSurveyState);
            setErrors({});
        } else {
            setInfoSurvey({
                surveyName: "Encuesta Calidad #1",
                introductionText: "Con el objetivo de garantizar la excelencia en nuestros procesos y servicios, hemos diseñado la Encuesta Calidad #1. Su participación es fundamental para identificar oportunidades de mejora y mantener los más altos estándares de calidad. Agradecemos de antemano el tiempo dedicado a responder de manera objetiva y responsable. Sus aportes serán tratados con total confidencialidad y contribuirán directamente al fortalecimiento de nuestra gestión.",
                addTerms: "yes",
                termsConditions: "Al participar en la Encuesta Calidad #1, usted acepta que sus respuestas serán utilizadas únicamente con fines de análisis interno y mejora de nuestros procesos y servicios. La información recolectada será tratada de manera confidencial y no será compartida con terceros ajenos a la organización. La participación es completamente voluntaria y usted podrá abstenerse de responder cualquier pregunta si así lo considera pertinente. Al continuar con la encuesta, confirma que ha leído y aceptado los presentes términos y condiciones."
            });
            setErrors({});
        }
    }, [open, idSurvey]);

    return (
        <>
            <PageModal
                maxWidth="md"
                open={open}
                onClose={onClose}
                title={idSurvey != 0 ? t('survey.editSurvey') : t('survey.addSurvey')}
                onConfirm={idSurvey != 0 ? editSurvey : addSurvey}
                sx={{
                    "& .MuiDialog-container": {
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                    },
                }}
                confirmText={t('actions.save')}
                cancelText={t('actions.cancel')}
                showActions
            >
                <Grid container spacing={2} alignItems="center" columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 6, sm: 12, md: 12 }}>
                        <FormControl fullWidth error={Boolean(errors.surveyName)}>
                            <TextField
                                id="surveyName"
                                name="surveyName"
                                label={t('user.name')}
                                variant="outlined"
                                value={infoSurvey.surveyName}
                                onChange={handleSurveyChange}
                                error={Boolean(errors.surveyName)}
                                required
                            />

                            <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                {errors.surveyName || " "}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12, md: 12 }}>
                        <FormControl fullWidth error={Boolean(errors.introductionText)}>
                            <TextField
                                id="introductionText"
                                name="introductionText"
                                label={t('survey.introductionText')}
                                variant="outlined"
                                value={infoSurvey.introductionText}
                                multiline
                                rows={4}
                                onChange={handleSurveyChange}
                                error={Boolean(errors.introductionText)}
                            />

                            <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                {errors.introductionText || " "}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12, md: 12 }}>
                        <FormControl fullWidth error={Boolean(errors.addTerms)}>
                            <FormLabel id="radioTermsLabel">{t('survey.addTerms')}</FormLabel>
                            <RadioGroup
                                aria-labelledby="radioTermsLabel"
                                id="addTerms"
                                name="addTerms"
                                row
                                value={infoSurvey.addTerms}
                                onChange={handleSurveyChange}
                            >
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio />}
                                    label={t('navigation.yes')}
                                />
                                <FormControlLabel
                                    value="no"
                                    onClick={() => {
                                        setInfoSurvey({
                                            ...infoSurvey,
                                            termsConditions: ""
                                        })
                                        setErrors({
                                            ...errors,
                                            termsConditions: ""
                                        })
                                    }}
                                    control={<Radio />}
                                    label="No"
                                />
                            </RadioGroup>

                            <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                {errors.addTerms || " "}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12, md: 12 }} sx={{ display: infoSurvey.addTerms === 'yes' ? 'block' : 'none' }}>
                        <FormControl fullWidth error={Boolean(errors.termsConditions)}>
                            <TextField
                                id="termsConditions"
                                name="termsConditions"
                                label={t('survey.termsConditions')}
                                variant="outlined"
                                value={infoSurvey.termsConditions}
                                multiline
                                rows={4}
                                onChange={handleSurveyChange}
                                error={Boolean(errors.termsConditions)}
                            />

                            <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                {errors.termsConditions || " "}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </PageModal>
        </>
    );
};

export default ModalSurveys;