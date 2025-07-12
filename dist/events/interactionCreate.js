"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nhandler_1 = require("nhandler");
const __1 = require("..");
class default_1 {
    client;
    name = "interactionCreate";
    async run(interaction) {
        if ((0, nhandler_1.isCommandInteraction)(interaction)) {
            __1.commandHandler.runCommand(interaction);
        }
        else if ((0, nhandler_1.isAutocompleteInteraction)(interaction)) {
            __1.commandHandler.runAutocomplete(interaction);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=interactionCreate.js.map