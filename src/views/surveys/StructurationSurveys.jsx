import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Divider,
    MenuItem,
    FormControl,
    FormGroup,
    FormHelperText,
    IconButton,
    InputLabel,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from '@mui/material';

import {
    Add,
    Cancel,
    Edit,
    SaveAs,
    Send
} from '@mui/icons-material';

const StructurationSurveys = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    const [survey, setSurvey] = useState({
        surveyName: "Encuesta Calidad #1",
        introductionText: "Con el objetivo de garantizar la excelencia en nuestros procesos y servicios, hemos diseñado la Encuesta Calidad #1. Su participación es fundamental para identificar oportunidades de mejora y mantener los más altos estándares de calidad. Agradecemos de antemano el tiempo dedicado a responder de manera objetiva y responsable. Sus aportes serán tratados con total confidencialidad y contribuirán directamente al fortalecimiento de nuestra gestión.",
        termsConditions: "Al participar en la Encuesta Calidad #1, usted acepta que sus respuestas serán utilizadas únicamente con fines de análisis interno y mejora de nuestros procesos y servicios. La información recolectada será tratada de manera confidencial y no será compartida con terceros ajenos a la organización. La participación es completamente voluntaria y usted podrá abstenerse de responder cualquier pregunta si así lo considera pertinente. Al continuar con la encuesta, confirma que ha leído y aceptado los presentes términos y condiciones."
    });

    const [questionTypes, setQuestionTypes] = useState([
        { id: "1", label: "Encabezado" },
        { id: "2", label: "Texto" },
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
        questionType: ""
    });

    const [errorsQuestion, setErrorsQuestion] = useState({});

    const [currentSection, setCurrentSection] = useState(0);
    const [changeSectionName, setChangeSectionName] = useState(false);

    const [backupName, setBackupName] = useState("");

    const toggleSectionName = () => {
        if (!changeSectionName) {
            setBackupName(surveyStructure[currentSection].sectionName);
        }
        setChangeSectionName(!changeSectionName);
    };

    const handleCancelSection = () => {
        setSurveyStructure((prev) => {
            const updated = [...prev];
            updated[currentSection] = {
                ...updated[currentSection],
                sectionName: backupName
            };
            return updated;
        });
        setChangeSectionName(false);
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

    const addQuestion = () => {
        const questions = surveyStructure[currentSection].sectionQuestions;
        questions.push(question);

        emptyQuestion();
        console.log(surveyStructure);
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
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;

        setQuestion((prev) => ({
            ...prev,
            [name]: value,
        }));

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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="h4" gutterBottom>
                            {!changeSectionName ? (
                                <>
                                    {surveyStructure[currentSection].sectionName}
                                    <IconButton
                                        size="large"
                                        onClick={toggleSectionName}
                                    >
                                        <Edit />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <FormControl>
                                        <TextField
                                            id="sectionName"
                                            name="sectionName"
                                            label={t("user.name")}
                                            variant="outlined"
                                            required
                                            value={surveyStructure[currentSection].sectionName}
                                            onChange={handleSectionNameChange}
                                        />
                                    </FormControl>

                                    <IconButton
                                        size="large"
                                        color="success"
                                        onClick={() => setChangeSectionName(false)}
                                    >
                                        <SaveAs />
                                    </IconButton>
                                    <IconButton
                                        size="large"
                                        color="error"
                                        onClick={handleCancelSection}
                                    >
                                        <Cancel />
                                    </IconButton>
                                </>
                            )}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
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

                        <FormControl sx={{ flex: 1, minWidth: 250 }} error={Boolean(errorsQuestion.questionType)}>
                            <TextField
                                id="questionDescription"
                                name="questionDescription"
                                label={t('survey.questionDescription')}
                                variant="outlined"
                                value={question.questionDescription}
                                onChange={handleQuestionChange}
                                error={Boolean(errorsQuestion.questionType)}
                            />
                            <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                {errorsQuestion.questionType || " "}
                            </FormHelperText>
                        </FormControl>
                    </Box>

                    {
                        (question.questionType === "5" || question.questionType === "6" || question.questionType === "7") && (
                            <FormControl fullWidth sx={{ flex: 1, minWidth: 250 }}>
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
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label={t("survey.surveyAnswers")}
                                            placeholder={t("survey.answersTip")}
                                        />
                                    )}
                                />
                                <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                                    {errorsQuestion.questionType || " "}
                                </FormHelperText>
                            </FormControl>

                        )
                    }

                    <Box sx={{ display: "flex", justifyContent: "end" }} gap={1}>
                        <Button
                            color="success"
                            variant="contained"
                            startIcon={<Add />}
                            onClick={addQuestion}
                        >
                            {t('user.add')}
                        </Button>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "end", gap: 1, mt: 2 }}>
                        {currentSection > 0 && (
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => {
                                    if (changeSectionName) handleCancelSection();
                                    handlePrevious();
                                }}
                            >
                                {t('navigation.previous')}
                            </Button>
                        )}

                        {currentSection < surveyStructure.length - 1 && (
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => {
                                    if (changeSectionName) handleCancelSection();
                                    handleNext();
                                }}
                            >
                                {t('navigation.next')}
                            </Button>
                        )}
                    </Box>
                    {/* <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center' }} gutterBottom>
                        {survey.surveyName}
                    </Typography> */}
                    {/* <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" component="p" gutterBottom>
                            {survey.introductionText}
                        </Typography>

                        {survey.termsConditions && (
                            <div>
                                <Typography sx={{ mt: 3 }} variant="body1" component="p" gutterBottom>
                                    {survey.termsConditions}
                                </Typography>

                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Label" />
                                </FormGroup>
                            </div>
                        )}
                    </Box> */}
                </CardContent>
            </Card>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }} gap={1}>
                <Button color="success" variant="contained" startIcon={<Send />}>
                    {t('survey.saveChanges')}
                </Button>
            </Box>
        </>
    );
};

export default StructurationSurveys;