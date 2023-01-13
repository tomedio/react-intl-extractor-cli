import { readJSON } from 'fs-extra';
import path from 'path';
import { existsSync } from 'fs';

const getLangFile = (outputFolder, language) =>
  path.join(outputFolder, `${language}.json`);

const readLangFile = async (outputFolder, language) => {
  const languageFile = getLangFile(outputFolder, language);

  if (existsSync(languageFile)) {
    return await readJSON(languageFile);
  }
  return {};
};

export { getLangFile, readLangFile };
export default readLangFile;
