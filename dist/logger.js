"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLogToFile = exports.warnLog = exports.severeLog = exports.infoLog = exports.debugLog = exports.welcomeLog = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const ansi_colors_1 = __importDefault(require("ansi-colors"));
let logFileName = `log-${new Date().toISOString().replace(/:/g, "-")}.txt`;
const welcomeLog = (name, version) => {
    console.log(ansi_colors_1.default.green(`┌ Helper Bot • Author: Braiden H • Version: 2.4.1`));
    (0, exports.writeLogToFile)(`--- Log start at ${new Date().toISOString()} ---\n`);
};
exports.welcomeLog = welcomeLog;
const debugLog = (...messages) => {
    console.log(ansi_colors_1.default.gray("└ Debug"), ...messages);
    (0, exports.writeLogToFile)("[Debug]", ...messages);
};
exports.debugLog = debugLog;
const infoLog = (...messages) => {
    console.log(ansi_colors_1.default.blue("└ Info"), ...messages);
    (0, exports.writeLogToFile)("[Info]", ...messages);
};
exports.infoLog = infoLog;
const severeLog = (...messages) => {
    console.log(ansi_colors_1.default.red("└ Severe"), ...messages);
    (0, exports.writeLogToFile)("[Severe]", ...messages);
};
exports.severeLog = severeLog;
const warnLog = (...messages) => {
    console.log(ansi_colors_1.default.yellow("└ Warn"), ...messages);
    (0, exports.writeLogToFile)("[Warn]", ...messages);
};
exports.warnLog = warnLog;
const writeLogToFile = (...messages) => {
    const dir = path_1.default.join(process.cwd(), "logs");
    if (!(0, fs_1.existsSync)(dir))
        (0, fs_1.mkdirSync)(dir);
    const filePath = path_1.default.join(process.cwd(), "logs", logFileName);
    const log = messages.map((m) => (typeof m === "string" ? m : (0, util_1.inspect)(m))).join(" ") + "\n";
    (0, fs_1.writeFile)(filePath, log, { flag: "a" }, (err) => {
        if (err)
            (0, exports.severeLog)("Failed to write log to file.");
    });
};
exports.writeLogToFile = writeLogToFile;
//# sourceMappingURL=logger.js.map