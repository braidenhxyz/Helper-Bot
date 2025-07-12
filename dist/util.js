"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = exports.BaseComponent = exports.BaseCommand = exports.readPackageJson = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const pretty_zod_error_1 = require("@nortex/pretty-zod-error");
const js_yaml_1 = __importDefault(require("js-yaml"));
const embeds_1 = require("./embeds");
const logger_1 = require("./logger");
const readPackageJson = () => {
    const packagePath = path_1.default.join(process.cwd(), "package.json");
    if (!(0, fs_1.existsSync)(packagePath)) {
        (0, logger_1.severeLog)("Fatal: package.json not found. Please make sure you are in the root directory of the project.");
        process.exit(1);
    }
    const pkg = JSON.parse((0, fs_1.readFileSync)(packagePath, "utf-8"));
    return pkg;
};
exports.readPackageJson = readPackageJson;
class BaseCommand {
    client;
    async error(interaction, error) {
        const data = { embeds: [(0, embeds_1.errorEmbed)(error.message)], ephemeral: true };
        if (interaction.replied || interaction.deferred)
            await interaction.editReply(data);
        else
            await interaction.reply(data);
        return;
    }
}
exports.BaseCommand = BaseCommand;
class BaseComponent {
    client;
    findFn = (event) => event.customId.startsWith(this.customId);
    async error(interaction, error) {
        const data = { embeds: [(0, embeds_1.errorEmbed)(error.message)], ephemeral: true };
        if (interaction.replied || interaction.deferred)
            await interaction.editReply(data);
        else
            await interaction.reply(data);
        return;
    }
}
exports.BaseComponent = BaseComponent;
const loadConfig = (configShape, path) => {
    let yamlFile;
    try {
        yamlFile = js_yaml_1.default.load((0, fs_1.readFileSync)(path, "utf-8"));
    }
    catch (err) {
        (0, logger_1.severeLog)("Fatal: config.yml is not a valid YAML file.");
        process.exit(1);
    }
    let result = configShape.safeParse(yamlFile);
    if (!result.success) {
        (0, logger_1.severeLog)("Fatal: Failed to parse configuration file. Errors:");
        (0, logger_1.severeLog)((0, pretty_zod_error_1.prettifyZodError)(result.error));
        process.exit(1);
    }
    let config = result.data;
    return config;
};
exports.loadConfig = loadConfig;
//# sourceMappingURL=util.js.map