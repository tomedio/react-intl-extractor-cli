import {createCallbacks} from "../compareExtracted/callbacks";
import compareLangFile from "../compareExtracted/compareLangFile";
import readLangFile, {getLangFile} from "./readLangFile";
import saveLanguageFile from "./saveLanguageFile";
import {writeStdout} from "@formatjs/cli-lib/src/console_utils";

const extractLangFile = async (extractedMessages, outputFolder, language, options) => {
    const currentMessages = await readLangFile(outputFolder, language);
    const compilationResults = {};

    const callbacks = createCallbacks({
        added: (id, messageObject) => {
            if (options.verbose) {
                writeStdout(`Added message: ${id}\n`);
            }
            compilationResults[id] = messageObject;
        },
        equal: (id, messageObject, oldMessageObject) => {
            compilationResults[id] = Object.assign({}, messageObject, {translatedMessage: oldMessageObject.translatedMessage});
        },
        changed: (id, messageObject, oldMessageObject) => {
            if (options.verbose) {
                writeStdout(`Changed message: ${id}\n\tNew message: ${messageObject.defaultMessage}\n\tOld message: ${oldMessageObject.defaultMessage}\n`);
            }
            compilationResults[id] = messageObject;
        },
        removed: (id, messageObject) => {
            if (options.verbose) {
                writeStdout(`Removed message: ${id}\n`);
            }
        },
    });
    const changed = compareLangFile(extractedMessages, currentMessages, callbacks);
    if (!changed && options.verbose) {
        await writeStdout(`No changes detected.\n`);
    }
    const languageFile = getLangFile(outputFolder, language);
    return await saveLanguageFile(compilationResults, languageFile);
};

export default extractLangFile;