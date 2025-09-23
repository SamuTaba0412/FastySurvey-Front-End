import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Collapse,
    MenuItem,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    Tooltip,
} from '@mui/material';

import {
    Add,
    Cancel,
    Close,
    Edit,
    Delete,
    SaveAs,
    Send
} from '@mui/icons-material';

import createQuestionSchema from '../../js/validations/surveys/questionSchema';

const StructurationSurveys = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const questionSchema = createQuestionSchema(t);

    const [survey, setSurvey] = useState({
        surveyName: "Encuesta Calidad #1",
        introductionText: "Con el objetivo de garantizar la excelencia en nuestros procesos y servicios, hemos diseñado la Encuesta Calidad #1. Su participación es fundamental para identificar oportunidades de mejora y mantener los más altos estándares de calidad. Agradecemos de antemano el tiempo dedicado a responder de manera objetiva y responsable. Sus aportes serán tratados con total confidencialidad y contribuirán directamente al fortalecimiento de nuestra gestión.",
        termsConditions: "Al participar en la Encuesta Calidad #1, usted acepta que sus respuestas serán utilizadas únicamente con fines de análisis interno y mejora de nuestros procesos y servicios. La información recolectada será tratada de manera confidencial y no será compartida con terceros ajenos a la organización. La participación es completamente voluntaria y usted podrá abstenerse de responder cualquier pregunta si así lo considera pertinente. Al continuar con la encuesta, confirma que ha leído y aceptado los presentes términos y condiciones."
    });

    const [questionTypes, setQuestionTypes] = useState([
        { id: "1", label: "Header" },
        { id: "2", label: "Text" },
        { id: "3", label: "TextArea" },
        { id: "4", label: "DateTime" },
        { id: "5", label: "ComboBox" },
        { id: "6", label: "RadioButton" },
        { id: "7", label: "CheckList" }
    ]);

    const [surveyStructure, setSurveyStructure] = useState([
        {
            sectionName: "Sección 1",
            sectionQuestions: []
        },
        {
            sectionName: "Sección 2",
            sectionQuestions: []
        },
        {
            sectionName: "Sección 3",
            sectionQuestions: []
        }
    ]);

    const [question, setQuestion] = useState({
        questionDescription: "",
        questionType: "",
        options: []
    });

    const [errorsQuestion, setErrorsQuestion] = useState({});

    const [currentSection, setCurrentSection] = useState(0);
    const [lastSection, setLastSection] = useState(0);
    const [changeSectionName, setChangeSectionName] = useState(false);
    const [sectionError, setSectionError] = useState(false);

    const [backupName, setBackupName] = useState("");
    const [newSection, setNewSection] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(true);

    const toggleSectionName = () => {
        if (!changeSectionName) {
            setBackupName(surveyStructure[currentSection].sectionName);
        }
        setChangeSectionName(!changeSectionName);
        setDisableButtons(true);
    };

    const handleCancelSection = () => {
        if (newSection) {
            deleteSection(currentSection);
            setCurrentSection(lastSection);

            setLastSection(0);
            setNewSection(false);
        }
        else {
            setSurveyStructure((prev) => {
                const updated = [...prev];
                updated[currentSection] = {
                    ...updated[currentSection],
                    sectionName: backupName
                };
                return updated;
            });
        }

        setDisableButtons(false);
        setChangeSectionName(false);
        setSectionError(false);
    };

    const handleNext = () => {
        if (currentSection < surveyStructure.length - 1) {
            setCurrentSection((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const validateQuestion = (data) => {
        const parsed = questionSchema.safeParse(data);
        if (parsed.success) {
            setErrorsQuestion({});
            return { ok: true, data: parsed.data };
        }

        const fieldErrors = {};
        parsed.error.issues.forEach((issue) => {
            const path = issue.path.join(".") || "form";
            if (!fieldErrors[path]) fieldErrors[path] = issue.message;
        });

        setErrorsQuestion(fieldErrors);
        return { ok: false, errors: fieldErrors };
    };

    const validateSectionName = () => {
        const value = surveyStructure[currentSection].sectionName.trim();

        if (!value) {
            setSectionError(t('validations.requiredField'));
            return false;
        }

        const isDuplicate = surveyStructure.some(
            (section, index) =>
                index !== currentSection &&
                section.sectionName.trim().toLowerCase() === value.toLowerCase()
        );

        if (isDuplicate) {
            setSectionError(t('validations.existingSection'));
            return false;
        }

        setSectionError(false);
        return true;
    };

    const addSection = () => {
        const newSection = {
            sectionName: "",
            sectionQuestions: []
        };

        setLastSection(currentSection);

        const updatedSurvey = [...surveyStructure, newSection];

        setSurveyStructure(updatedSurvey);
        setCurrentSection(updatedSurvey.length - 1);
        setChangeSectionName(true);
        setNewSection(true);
        setDisableButtons(true);
    };

    const deleteSection = (indexToDelete) => {
        if (surveyStructure.length === 1) {
            toast.error(t('validations.needOneSection'));
            return;
        }

        const updatedSurvey = surveyStructure.filter(
            (_, index) => index !== indexToDelete
        );

        setSurveyStructure(updatedSurvey);

        if (currentSection >= updatedSurvey.length) {
            setCurrentSection(updatedSurvey.length - 1);
        }
    };

    const addQuestion = () => {
        const res = validateQuestion(question);
        if (!res.ok) return;

        const questions = surveyStructure[currentSection].sectionQuestions;
        questions.push(question);

        emptyQuestion();
        console.log(surveyStructure);
    };

    const saveChanges = () => {
        for (let i = 0; i < surveyStructure.length; i++) {
            if (surveyStructure[i].sectionQuestions.length === 0) {
                toast.error(t('validations.notEmptySections'));

                return;
            }
        }

        toast.success(t('actions.saveChanged'));
    };

    const emptyQuestion = () => {
        setQuestion({
            questionDescription: "",
            questionType: ""
        });
    }

    const handleSectionNameChange = (event) => {
        const { value } = event.target;

        setSurveyStructure((prev) => {
            const updated = [...prev];
            updated[currentSection] = {
                ...updated[currentSection],
                sectionName: value
            };
            return updated;
        });

        const isDuplicate = surveyStructure.some(
            (section, index) => index !== currentSection && section.sectionName.trim().toLowerCase() === value.trim().toLowerCase()
        );

        if (value.trim() && !isDuplicate) {
            setSectionError(false);
        }
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;

        setQuestion((prev) => {
            let updated = { ...prev, [name]: value };

            if (name === "questionType" && !["5", "6", "7"].includes(value)) {
                delete updated.options;

                if (errorsQuestion.options) {
                    setErrorsQuestion((prev) => {
                        const newErr = { ...prev };
                        delete newErr.options;
                        return newErr;
                    });
                }
            }

            return updated;
        });

        if (errorsQuestion[name]) {
            setErrorsQuestion((prev) => {
                const newErr = { ...prev };
                delete newErr[name];
                return newErr;
            });
        }
    };

    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                fontSize: {
                                    xs: "1.5rem",
                                    sm: "2.0rem",
                                    md: "2.5rem"
                                }
                            }}
                        >

                            {!changeSectionName ? (
                                <>
                                    {surveyStructure[currentSection].sectionName}
                                    <Tooltip title={t('actions.rename')}>
                                        <IconButton size="large" onClick={toggleSectionName}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <FormControl error={Boolean(sectionError)}>
                                        <TextField
                                            id="sectionName"
                                            name="sectionName"
                                            label={t("user.name")}
                                            variant="outlined"
                                            required
                                            value={surveyStructure[currentSection].sectionName}
                                            onChange={handleSectionNameChange}
                                            error={Boolean(sectionError)}
                                        />
                                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                            {sectionError || " "}
                                        </FormHelperText>
                                    </FormControl>

                                    <IconButton
                                        size="large"
                                        color="success"
                                        onClick={() => {
                                            if (validateSectionName()) {
                                                setChangeSectionName(false);
                                                setDisableButtons(false);
                                            }
                                        }}
                                    >
                                        <SaveAs />
                                    </IconButton>
                                    <IconButton size="large" color="error" onClick={handleCancelSection}>
                                        <Cancel />
                                    </IconButton>
                                </>
                            )}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Tooltip title={t('survey.deleteSection')}>
                                <IconButton color="error" onClick={() => deleteSection(currentSection)} disabled={disableButtons}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t('survey.addSection')}>
                                <IconButton color="success" onClick={addSection} disabled={disableButtons}>
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box>
                        <Collapse in={visibleAlert}>
                            <Alert
                                variant="outlined"
                                severity="warning"
                                sx={{ alignItems: "center" }}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setVisibleAlert(false);
                                        }}
                                    >
                                        <Close fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                Recuerde que, después de realizar cualquier modificación en la encuesta,
                                es necesario hacer clic en el botón <strong>“Guardar Cambios”</strong>.
                                De lo contrario, los cambios no serán conservados.
                            </Alert>
                        </Collapse>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
                        <FormControl sx={{ flex: 1, minWidth: 250 }} error={Boolean(errorsQuestion.questionType)}>
                            <InputLabel id="questionTypeLabel">{t('survey.questionType')}</InputLabel>
                            <Select
                                labelId="questionTypeLabel"
                                id="questionType"
                                name="questionType"
                                value={question.questionType}
                                onChange={handleQuestionChange}
                                input={<OutlinedInput label={t('survey.questionType')} />}
                            >
                                {questionTypes.map((questionType) => (
                                    <MenuItem
                                        key={questionType.id}
                                        value={questionType.id}
                                    >
                                        {questionType.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                {errorsQuestion.questionType || " "}
                            </FormHelperText>
                        </FormControl>

                        <FormControl sx={{ flex: 1, minWidth: 250 }} error={Boolean(errorsQuestion.questionDescription)}>
                            <TextField
                                id="questionDescription"
                                name="questionDescription"
                                label={t('survey.questionDescription')}
                                variant="outlined"
                                value={question.questionDescription}
                                onChange={handleQuestionChange}
                                error={Boolean(errorsQuestion.questionDescription)}
                            />
                            <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                {errorsQuestion.questionDescription || " "}
                            </FormHelperText>
                        </FormControl>
                    </Box>

                    {
                        (question.questionType === "5" || question.questionType === "6" || question.questionType === "7") && (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2, mb: 2 }}>
                                <FormControl fullWidth sx={{ flex: 1, minWidth: 250 }} error={Boolean(errorsQuestion.options)}>
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        options={[]}
                                        value={question.options || []}
                                        onChange={(event, newValue) => {
                                            setQuestion((prev) => ({
                                                ...prev,
                                                options: newValue,
                                            }));

                                            if (newValue.length > 0 && errorsQuestion.options) {
                                                setErrorsQuestion((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.options;
                                                    return updated;
                                                });
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <div>
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label={t("survey.surveyAnswers")}
                                                    placeholder={t("survey.answersTip")}
                                                    error={Boolean(errorsQuestion.options)}
                                                />
                                                <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                                    {errorsQuestion.options || " "}
                                                </FormHelperText>
                                            </div>
                                        )}
                                    />
                                </FormControl>
                            </Box>
                        )
                    }

                    <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }} gap={1}>
                        <Button
                            color="success"
                            variant="contained"
                            startIcon={<Add />}
                            onClick={addQuestion}
                            disabled={disableButtons}
                        >
                            {t('user.add')}
                        </Button>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                        <Typography variant="body2" color="secondary">
                            {t('survey.pageInfo', { current: currentSection + 1, total: surveyStructure.length })}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            {currentSection > 0 && (
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={handlePrevious}
                                    disabled={disableButtons}
                                >
                                    {t('navigation.previous')}
                                </Button>
                            )}

                            {currentSection < surveyStructure.length - 1 && (
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={disableButtons}
                                >
                                    {t('navigation.next')}
                                </Button>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }} gap={1}>
                <Button
                    color="success"
                    variant="contained"
                    startIcon={<Send />}
                    onClick={saveChanges}
                    disabled={disableButtons}
                >
                    {t('survey.saveChanges')}
                </Button>
            </Box>
        </>
    );
};

export default StructurationSurveys;