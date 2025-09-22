import { z } from 'zod';

const createSurveySchema = (t) =>
    z.object({
        surveyName: z
            .string()
            .min(1, t('validations.requiredField'))
            .trim(),
        introductionText: z.string().trim().optional(),
        addTerms: z
            .string()
            .min(1, t('validations.requiredField'))
            .trim(),
        termsConditions: z.string().trim().optional(), // lo marcamos como opcional
    })
        .superRefine((data, ctx) => {
            if (data.addTerms === "yes" && (!data.termsConditions || data.termsConditions.length === 0)) {
                ctx.addIssue({
                    path: ["termsConditions"],
                    code: "custom",
                    message: t("validations.requiredField"),
                });
            }
        });

export default createSurveySchema;
