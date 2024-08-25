# Copy All Tabs

A Visual Studio Code extension that copies the content of all open tabs to the clipboard, making it easier to provide context to Large Language Models (LLMs) or other text-based tools.

## Features

- Copy all open tabs in Visual Studio Code with a single command.
- Preserve the file structure and order of the tabs when copying.
- Include relative filenames along with the content of each file.

## Installation

Download/use the latest `copy-all-tabs-<version>.vsix` file, or build it yourself locally.

1. Open Visual Studio Code.
2. Right click on the `***.vsix` file and select "Install Extension VSIX".
3. Once installed, you can find the extension in the Extensions view under the "Installed" tab.

## Usage

1. Open the tabs you want to copy in Visual Studio Code.
2. Press `Ctrl+Shift+P` to open the command palette.
3. Type "Copy All Tabs" and select the command from the list.
4. A notification will appear confirming that the tabs have been copied to the clipboard.
5. Paste the copied content into your LLM chat or desired destination.

## Development

If you want to modify or contribute to this extension, follow these steps:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Make your changes in the `src/extension.ts` file.
4. Run `npm run compile` to compile the TypeScript code.
5. Run `vsce package` to create a `.vsix` file.
6. To test the extension, right-click the generated `.vsix` file and select "Install Extension VSIX" in Visual Studio Code.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions, suggestions, or issues, please open an issue on the [GitHub repository](https://github.com/0xfloyd/copy-all-tabs/issues).
