import { z } from 'zod';

const createUserSchema = (t) =>
    z.object({
        names: z
            .string()
            .min(1, t('validations.requiredField'))
            .trim(),
        lastNames: z
            .string()
            .min(1, t('validations.requiredField'))
            .trim(),
        identificationType: z
            .string()
            .min(1, t('validations.requiredField')),
        identification: z
            .string()
            .min(1, t('validations.requiredField'))
            .max(20, t('validations.notValidDocument'))
            .regex(/^[0-9A-Za-z-]+$/, t('validations.notValidDocument')),
        email: z
            .string()
            .min(1, t('validations.requiredField'))
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t('validations.notValidEmail')),
        role: z.string().min(1, t('validations.requiredField')),
    });

export default createUserSchema;
