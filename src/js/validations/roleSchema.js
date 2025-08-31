import { z } from 'zod';

const createRoleSchema = (t) =>
    z.object({
        name: z
            .string()
            .min(1, t('validations.requiredField'))
            .trim(),
        permissions: z
            .array(z.string())
            .min(1, t('validations.requiredField')),
    });

export default createRoleSchema;
