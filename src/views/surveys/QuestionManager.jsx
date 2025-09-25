import {
    Box,
    Checkbox,
    Typography,
    Tooltip,
    IconButton,
    FormControl,
    TextField,
    FormHelperText,
    Divider,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Button,
    Autocomplete,
} from "@mui/material";

import {
    Add,
    ArrowUpward,
    ArrowDownward,
    Delete,
} from "@mui/icons-material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import createQuestionSchema from '../../js/validations/surveys/questionSchema';

const QuestionManager = ({
    t,
    surveyStructure,
    setSurveyStructure,
    currentSection,
    question,
    setQuestion,
    errorsQuestion,
    setErrorsQuestion,
    disableButtons,
    questionTypes = [],
}) => {
    const questionSchema = createQuestionSchema(t);

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

    const handleDeleteQuestion = (index) => {
        setSurveyStructure((prev) => {
            const updated = [...prev];
            updated[currentSection].sectionQuestions.splice(index, 1);
            return updated;
        });
    };

    const moveQuestionUp = (index) => {
        if (index === 0) return;
        setSurveyStructure((prev) => {
            const updated = [...prev];
            const questions = [...updated[currentSection].sectionQuestions];

            const temp = questions[index - 1];
            questions[index - 1] = questions[index];
            questions[index] = temp;

            updated[currentSection] = {
                ...updated[currentSection],
                sectionQuestions: questions,
            };

            return updated;
        });
    };

    const moveQuestionDown = (index) => {
        setSurveyStructure((prev) => {
            const updated = [...prev];
            const questions = [...updated[currentSection].sectionQuestions];

            if (index < questions.length - 1) {
                const temp = questions[index + 1];
                questions[index + 1] = questions[index];
                questions[index] = temp;
            }

            updated[currentSection] = {
                ...updated[currentSection],
                sectionQuestions: questions,
            };

            return updated;
        });
    };

    const addQuestion = () => {
        const res = validateQuestion(question);
        if (!res.ok) return;

        const existing = surveyStructure[currentSection].sectionQuestions.some(
            (q) =>
                q.questionDescription.trim().toLowerCase() === question.questionDescription.trim().toLowerCase()
        );

        if (existing) {
            setErrorsQuestion((prev) => ({
                ...prev,
                questionDescription: t("validations.duplicatedQuestion"),
            }));
            return;
        }

        setSurveyStructure((prev) => {
            const updated = [...prev];
            updated[currentSection] = {
                ...updated[currentSection],
                sectionQuestions: [
                    ...updated[currentSection].sectionQuestions,
                    { ...question },
                ],
            };
            return updated;
        });

        emptyQuestion();
    };

    const emptyQuestion = () => {
        setQuestion({
            questionDescription: "",
            questionType: "",
        });
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;

        setQuestion((prev) => {
            let updated = { ...prev, [name]: value };

            if (name === "questionType") {
                if (!["5", "6", "7"].includes(value)) {
                    delete updated.options;
                } else if (!prev.options) {
                    updated.options = [];
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
            {/* ================= LISTA DE PREGUNTAS EXISTENTES ================= */}
            {surveyStructure[currentSection].sectionQuestions.map((section, idx) => {
                let questionContent;

                switch (section.questionType) {
                    case "1":
                        questionContent = (
                            <Typography variant="h5" gutterBottom>
                                {section.questionDescription}
                            </Typography>
                        );
                        break;
                    case "2":
                        questionContent = (
                            <FormControl fullWidth>
                                <TextField
                                    label={section.questionDescription}
                                    variant="outlined"
                                    disabled
                                />
                            </FormControl>
                        );
                        break;
                    case "3":
                        questionContent = (
                            <FormControl fullWidth>
                                <TextField
                                    label={section.questionDescription}
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    disabled
                                />
                            </FormControl>
                        );
                        break;
                    case "4":
                        questionContent = (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={section.questionDescription}
                                    slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
                                    disabled
                                />
                            </LocalizationProvider>
                        );
                        break;
                    case "5":
                        questionContent = (
                            <FormControl fullWidth>
                                <InputLabel>{section.questionDescription}</InputLabel>
                                <Select
                                    value=""
                                    input={<OutlinedInput label={section.questionDescription} />}
                                >
                                    {section.options?.map((option, i) => (
                                        <MenuItem key={i} disabled>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                        break;
                    case "6":
                        questionContent = (
                            <FormControl fullWidth>
                                <FormLabel>{section.questionDescription}</FormLabel>
                                <RadioGroup>
                                    {section.options?.map((option, i) => (
                                        <FormControlLabel
                                            key={i}
                                            value={i}
                                            control={<Radio />}
                                            label={option}
                                            disabled
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        );
                        break;
                    case "7":
                        questionContent = (
                            <FormControl fullWidth>
                                <FormLabel>{section.questionDescription}</FormLabel>
                                <FormGroup>
                                    {section.options?.map((option, i) => (
                                        <FormControlLabel
                                            key={i}
                                            value={i}
                                            control={<Checkbox />}
                                            label={option}
                                            disabled
                                        />
                                    ))}
                                </FormGroup>
                            </FormControl>
                        );
                        break;
                    default:
                        questionContent = null;
                        break;
                }

                return (
                    <Box
                        key={idx}
                        sx={{
                            mt: 3,
                            mb: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 1,
                            flexWrap: "nowrap",
                        }}
                    >
                        <Box sx={{ flexGrow: 1, minWidth: 0, mr: 1 }}>
                            {questionContent}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 0,
                                flexShrink: 0
                            }}
                        >
                            <Tooltip title={t("actions.moveUp")}>
                                <IconButton
                                    color="secondary"
                                    size="small" // Puedes usar size="small" para que ocupen menos
                                    disabled={idx === 0}
                                    onClick={() => moveQuestionUp(idx)}
                                >
                                    <ArrowUpward fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t("actions.moveDown")}>
                                <IconButton
                                    color="secondary"
                                    size="small"
                                    disabled={
                                        idx === surveyStructure[currentSection].sectionQuestions.length - 1
                                    }
                                    onClick={() => moveQuestionDown(idx)}
                                >
                                    <ArrowDownward fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box sx={{ display: "flex", flexShrink: 0, alignSelf: "center" }}>
                            <Tooltip title={t("actions.delete")}>
                                <IconButton color="error" onClick={() => handleDeleteQuestion(idx)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                );
            })}

            {surveyStructure[currentSection].sectionQuestions.length > 0 && <Divider />}

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
                <FormControl
                    sx={{ flex: 1, minWidth: 250 }}
                    error={Boolean(errorsQuestion.questionType)}
                >
                    <InputLabel id="questionTypeLabel">{t("survey.questionType")}</InputLabel>
                    <Select
                        labelId="questionTypeLabel"
                        id="questionType"
                        name="questionType"
                        value={question.questionType}
                        onChange={handleQuestionChange}
                        input={<OutlinedInput label={t("survey.questionType")} />}
                    >
                        {questionTypes.map((q) => (
                            <MenuItem key={q.id} value={q.id}>
                                {q.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                        {errorsQuestion.questionType || " "}
                    </FormHelperText>
                </FormControl>

                <FormControl
                    sx={{ flex: 1, minWidth: 250 }}
                    error={Boolean(errorsQuestion.questionDescription)}
                >
                    <TextField
                        id="questionDescription"
                        name="questionDescription"
                        label={t("survey.questionDescription")}
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

            {(question.questionType === "5" ||
                question.questionType === "6" ||
                question.questionType === "7") && (
                    <FormControl fullWidth sx={{ mt: 2 }} error={Boolean(errorsQuestion.options)}>
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
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label={t("survey.surveyAnswers")}
                                    placeholder={t("survey.answersTip")}
                                    error={Boolean(errorsQuestion.options)}
                                />
                            )}
                        />
                        <FormHelperText sx={{ minHeight: "1.5em", m: 0 }}>
                            {errorsQuestion.options || " "}
                        </FormHelperText>
                    </FormControl>
                )}

            <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }} gap={1}>
                <Button
                    color="success"
                    variant="contained"
                    startIcon={<Add />}
                    onClick={addQuestion}
                    disabled={disableButtons}
                >
                    {t("user.add")}
                </Button>
            </Box>
        </>
    );
};

export default QuestionManager;