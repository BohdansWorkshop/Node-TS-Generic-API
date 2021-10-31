import { inject } from "inversify";
import { TYPES } from "./types";

export const postModelRepository = inject(TYPES.PostModelRepository);
export const postModelSchemaName = inject(TYPES.PostModelSchemaName);