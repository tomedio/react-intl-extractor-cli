import loudRejection from 'loud-rejection';
import {program} from 'commander';
import {version} from '../package.json';
import {extract} from "./extract";

async function main(argv) {
    loudRejection();

    program
        .version(version, '-v, --version')
        .usage('<command> [flags]');

    program
        .command('help', {isDefault: true})
        .description('Show this help message.')
        .action(() => program.help());

    program
        .command('extract <inputFile> <outputFolder>')
        .description(
            "Extract messages from the application and save them for all specified languages"
        )
        .option(
            '--languages <codes>',
            `Languages to compile, separated by comma "," sign`,
            (val) => val?.split(',')
        )
        .option(
            '--id-interpolation-pattern <pattern>',
            `If certain message descriptors don't have id, this \`pattern\` will be used to automatically
generate IDs for them. Default to \`[sha512:contenthash:base64:6]\` where \`contenthash\` is the hash of
\`defaultMessage\` and \`description\`.
See https://github.com/webpack/loader-utils#interpolatename for sample patterns`,
            '[sha512:contenthash:base64:6]'
        )
        .option(
            '--extract-source-location',
            `Whether the metadata about the location of the message in the source file should be 
extracted. If \`true\`, then \`file\`, \`start\`, and \`end\` fields will exist for each 
extracted message descriptors.`,
            false
        )
        .option(
            '--additional-component-names <comma-separated-names>',
            `Additional component names to extract messages from, e.g: \`'FormattedFooBarMessage'\`. 
**NOTE**: By default we check for the fact that \`FormattedMessage\` 
is imported from \`moduleSourceName\` to make sure variable alias 
works. This option does not do that so it's less safe.`,
            (val) => val.split(',')
        )
        .option(
            '--additional-function-names <comma-separated-names>',
            `Additional function names to extract messages from, e.g: \`'$t'\`.`,
            (val) => val.split(',')
        )
        .option(
            '--ignore <files...>',
            'List of glob paths to **not** extract translations from.'
        )
        .option(
            '--throws',
            'Whether to throw an exception when we fail to process any file in the batch.'
        )
        .option(
            '--pragma <pragma>',
            `parse specific additional custom pragma. This allows you to tag certain file with metadata such as \`project\`. For example with this file:
      \`\`\`
      // @intl-meta project:my-custom-project
      import {FormattedMessage} from 'react-intl';
      <FormattedMessage defaultMessage="foo" id="bar" />;
      \`\`\`
      and with option \`{pragma: "intl-meta"}\`, we'll parse out \`// @intl-meta project:my-custom-project\` into \`{project: 'my-custom-project'}\` in the result file.`
        )
        .option(
            '--preserve-whitespace',
            'Whether to preserve whitespace and newlines.'
        )
        .option(
            '--flatten',
            `Whether to hoist selectors & flatten sentences as much as possible. E.g:
"I have {count, plural, one{a dog} other{many dogs}}"
becomes "{count, plural, one{I have a dog} other{I have many dogs}}".
The goal is to provide as many full sentences as possible since fragmented
sentences are not translator-friendly.`
        )
        .option(
            '--verbose',
            'Whether to display more details or not.',
            false
        )
        .action(async (filePatterns, outputFolder, options) => {
            await extract(filePatterns, outputFolder, options);
            process.exit(0);
        });

    program.parse(argv);
}

export default main;