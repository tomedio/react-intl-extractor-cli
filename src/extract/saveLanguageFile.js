import { outputFile } from 'fs-extra';
import stringify from 'json-stable-stringify';

const saveLanguageFile = async (messages, languageFile) => {
  const fileContent = `${stringify(messages, {
    space: 2,
  })}\n`;
  return await outputFile(languageFile, fileContent);
};

export default saveLanguageFile;
