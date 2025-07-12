"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAIClient = exports.config = exports.eventHandler = exports.commandHandler = exports.client = void 0;
const path = __importStar(require("path"));
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const nhandler_1 = require("nhandler");
const openai_1 = __importDefault(require("openai"));
const configShape_1 = require("./configShape");
const logger_1 = require("./logger");
const util_1 = require("./util");
(0, dotenv_1.config)();
exports.client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildPresences,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
    partials: [discord_js_1.Partials.Channel, discord_js_1.Partials.Message],
});
exports.commandHandler = (0, nhandler_1.createCommands)({ client: exports.client }).registerFromDir(path.join(__dirname, "./commands"));
exports.eventHandler = (0, nhandler_1.createEvents)({ client: exports.client }).registerFromDir(path.join(__dirname, "./events"));
exports.config = (0, util_1.loadConfig)(configShape_1.configShape, path.join(__dirname, "../config.yml"));
exports.openAIClient = exports.config.openAIkey ? new openai_1.default({ apiKey: exports.config.openAIkey }) : null;
const { name, pretty_name: prettyName, version } = (0, util_1.readPackageJson)();
(0, logger_1.welcomeLog)(prettyName || name || "Unknown", version || "Unknown");
process.on("unhandledRejection", (error) => {
    (0, logger_1.severeLog)("Unhandled promise rejection:", error);
});
process.on("uncaughtException", (error) => {
    (0, logger_1.severeLog)("Uncaught exception:", error);
});
exports.client.login(exports.config.token || process.env.DISCORD_BOT_TOKEN);
//# sourceMappingURL=index.js.map