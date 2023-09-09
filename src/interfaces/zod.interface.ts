import * as zod from "zod";
export type InferZodSchema<T extends zod.ZodType<any, any, any>> = zod.infer<T>;
