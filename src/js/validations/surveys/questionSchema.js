import { z } from 'zod';

const createQuestionSchema = (t) =>
    z.object({
        questionDescription: z
            .string()
            .min(1, t('validations.requiredField'))
            .trim(),
        questionType: z
            .string()
            .min(1, t('validations.requiredField'))
            .trim(),
        options: z.array(z.string()).optional(),
    })
        .superRefine((data, ctx) => {
            if ((data.questionType === "5" || data.questionType === "6" || data.questionType === "7") && (!data.options || data.options.length === 0))
            {
                ctx.addIssue({
                    path: ["options"],
                    code: "custom",
                    message: t("validations.requiredField"),
                });
            }
        });

export default createQuestionSchema;