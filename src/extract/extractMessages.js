import { extract } from '@formatjs/cli-lib';

export async function extractMessages(files, options) {
  return JSON.parse(
    await extract(files, {
      idInterpolationPattern:
        options.idInterpolationPattern || '[sha1:contenthash:base64:6]',
      extractSourceLocation: options.extractSourceLocation,
      removeDefaultMessage: false,
      additionalComponentNames: options.additionalComponentNames,
      additionalFunctionNames: options.additionalFunctionNames,
      throws: options.throws,
      pragma: options.pragma,
      format: options.format,
      readFromStdin: files.length === 0,
      preserveWhitespace: options.preserveWhitespace,
      flatten: options.flatten,
    }),
  );
}

export default extractMessages;
