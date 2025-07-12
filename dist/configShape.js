"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configShape = void 0;
const zod_1 = require("zod");
let isHexColor = (str) => /^#[0-9A-F]{6}$/i.test(str);
exports.configShape = zod_1.z.object({
    token: zod_1.z.string().optional(),
    openAIkey: zod_1.z.string().optional(),
    bbbKey: zod_1.z.string().optional(),
    permittedIds: zod_1.z.array(zod_1.z.string()),
    embeds: zod_1.z.object({
        colors: zod_1.z.object({
            normal: zod_1.z.string().refine(isHexColor, { message: "Invalid hex color." }),
            error: zod_1.z.string().refine(isHexColor, { message: "Invalid hex color." }),
            success: zod_1.z.string().refine(isHexColor, { message: "Invalid hex color." }),
        }),
    }),
});
//# sourceMappingURL=configShape.js.map