"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const logger_1 = require("../logger");
class default_1 {
    client;
    name = "ready";
    async run() {
        (0, logger_1.infoLog)(`The bot is ready in as ${this.client.user?.tag}.`);
        __1.commandHandler.updateApplicationCommands(true).then((r) => {
            (0, logger_1.warnLog)("Updated application commands.");
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=ready.js.map