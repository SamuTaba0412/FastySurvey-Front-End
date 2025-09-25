import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    TextField,
    Typography
} from '@mui/material';

import { Send } from '@mui/icons-material';

import DeleteSections from './DeleteSections';

import SectionManager from './SectionManager';
import QuestionManager from './QuestionManager';

const StructurationSurveys = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    const [questionTypes, setQuestionTypes] = useState([
        { id: "1", label: "Header" },
        { id: "2", label: "Text" },
        { id: "3", label: "TextArea" },
        { id: "4", label: "DateTime" },
        { id: "5", label: "ComboBox" },
        { id: "6", label: "RadioButton" },
        { id: "7", label: "CheckList" },
    ]);

    const [surveyStructure, setSurveyStructure] = useState([
        { sectionName: "Sección 1", sectionQuestions: [] },
        { sectionName: "Sección 2", sectionQuestions: [] },
        { sectionName: "Sección 3", sectionQuestions: [] },
    ]);

    const [question, setQuestion] = useState({
        questionDescription: "",
        questionType: "",
        options: [],
    });

    const [errorsQuestion, setErrorsQuestion] = useState({});
    const [currentSection, setCurrentSection] = useState(0);
    const [deleteSectionConfirm, setDeleteSectionConfirm] = useState(false);
    const [disableButtons, setDisableButtons] = useState(false);

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

    const saveChanges = () => {
        for (let i = 0; i < surveyStructure.length; i++) {
            const onlyHeaders = surveyStructure[i].sectionQuestions.every(
                (q) => q.questionType === "1"
            );

            if (surveyStructure[i].sectionQuestions.length === 0 || onlyHeaders) {
                toast.error(t("validations.notEmptySections"));
                return;
            }
        }

        toast.success(t("actions.saveChanged"));
    };

    return (
        <>
            <Card variant="elevation">
                <CardContent>
                    <SectionManager
                        t={t}
                        surveyStructure={surveyStructure}
                        setSurveyStructure={setSurveyStructure}
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        disableButtons={disableButtons}
                        setDisableButtons={setDisableButtons}
                        deleteSectionConfirm={deleteSectionConfirm}
                        setDeleteSectionConfirm={setDeleteSectionConfirm}
                    />

                    <QuestionManager
                        t={t}
                        surveyStructure={surveyStructure}
                        setSurveyStructure={setSurveyStructure}
                        currentSection={currentSection}
                        question={question}
                        setQuestion={setQuestion}
                        errorsQuestion={errorsQuestion}
                        setErrorsQuestion={setErrorsQuestion}
                        disableButtons={disableButtons}
                        questionTypes={questionTypes}
                    />

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

            <DeleteSections
                open={deleteSectionConfirm}
                onClose={() => setDeleteSectionConfirm(false)}
                erase={() => { eraseSection(currentSection) }}
            />
        </>
    );
};

export default StructurationSurveys;