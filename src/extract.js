import {sync as globSync} from 'fast-glob';
import extractMessages from "./extract/extractMessages";
import addOriginalMessage from "./extract/addOriginalMessage";
import extractLangFile from "./extract/extractLangFile";
import {writeStdout} from '@formatjs/cli-lib/src/console_utils';

export async function extract(filePatterns, outputFolder, options) {
    const files = globSync(filePatterns, {
        ignore: options.ignore,
    });

    const extractedMessages = addOriginalMessage(await extractMessages(files, options));
    const languages = options.languages ?? ['en'];

    for (const language of languages) {
        await writeStdout(`Processing language: ${language}\n`);
        await extractLangFile(extractedMessages, outputFolder, language, options);
        await writeStdout(`Language processing finished.\n`);
    }
}