import { useState } from "react";
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  FormControl,
  TextField,
  FormHelperText,
  Collapse,
  Alert,
} from "@mui/material";

import { Edit, SaveAs, Cancel, Delete, Add, Close } from "@mui/icons-material";
import { toast } from "react-toastify";

const SectionManager = ({
  t,
  surveyStructure,
  setSurveyStructure,
  currentSection,
  setCurrentSection,
  disableButtons,
  setDisableButtons,
  setDeleteSectionConfirm,
}) => {
  const [changeSectionName, setChangeSectionName] = useState(false);
  const [sectionError, setSectionError] = useState(false);
  const [backupName, setBackupName] = useState("");
  const [lastSection, setLastSection] = useState(0);
  const [newSection, setNewSection] = useState(false);
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
    } else {
      setSurveyStructure((prev) => {
        const updated = [...prev];
        updated[currentSection] = {
          ...updated[currentSection],
          sectionName: backupName,
        };
        return updated;
      });
    }

    setDisableButtons(false);
    setChangeSectionName(false);
    setSectionError(false);
  };

  const validateSectionName = () => {
    const value = surveyStructure[currentSection].sectionName.trim();

    if (!value) {
      setSectionError(t("validations.requiredField"));
      return false;
    }

    const isDuplicate = surveyStructure.some(
      (section, index) =>
        index !== currentSection &&
        section.sectionName.trim().toLowerCase() === value.toLowerCase()
    );

    if (isDuplicate) {
      setSectionError(t("validations.existingSection"));
      return false;
    }

    setSectionError(false);
    return true;
  };

  const addSection = () => {
    const newSection = {
      sectionName: "",
      sectionQuestions: [],
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
      toast.error(t("validations.needOneSection"));
      return;
    }

    if (surveyStructure[currentSection].sectionQuestions.length > 0)
      setDeleteSectionConfirm(true);
    else eraseSection(indexToDelete);
  };

  const eraseSection = (indexToDelete) => {
    const updatedSurvey = surveyStructure.filter(
      (_, index) => index !== indexToDelete
    );

    setSurveyStructure(updatedSurvey);

    if (currentSection >= updatedSurvey.length) {
      setCurrentSection(updatedSurvey.length - 1);
    }

    setDeleteSectionConfirm(false);
  };

  const handleSectionNameChange = (event) => {
    const { value } = event.target;

    setSurveyStructure((prev) => {
      const updated = [...prev];
      updated[currentSection] = {
        ...updated[currentSection],
        sectionName: value,
      };
      return updated;
    });

    const isDuplicate = surveyStructure.some(
      (section, index) =>
        index !== currentSection &&
        section.sectionName.trim().toLowerCase() ===
          value.trim().toLowerCase()
    );

    if (value.trim() && !isDuplicate) {
      setSectionError(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2.0rem",
              md: "2.5rem",
            },
          }}
        >
          {!changeSectionName ? (
            <>
              {surveyStructure[currentSection].sectionName}
              <Tooltip title={t("actions.rename")}>
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

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title={t("survey.deleteSection")}>
            <IconButton
              color="error"
              onClick={() => deleteSection(currentSection)}
              disabled={disableButtons}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("survey.addSection")}>
            <IconButton
              color="success"
              onClick={addSection}
              disabled={disableButtons}
            >
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
            {t("survey.saveReminder")}
          </Alert>
        </Collapse>
      </Box>
    </>
  );
};

export default SectionManager;