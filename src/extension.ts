import * as vscode from 'vscode'

function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage('extension activated')

  let disposable = vscode.commands.registerCommand('copy-all-tabs.copyAllTabs', async () => {
    try {
      const openDocuments = vscode.workspace.textDocuments

      if (openDocuments.length === 0) {
        vscode.window.showInformationMessage('No open documents found')
        return
      }

      let contentToCopy = ''

      for (const document of openDocuments) {
        const relativePath = vscode.workspace.asRelativePath(document.uri)
        const content = document.getText()
        contentToCopy += `\n${relativePath}\n${content}\n`
      }

      await vscode.env.clipboard.writeText(contentToCopy.trim())
      vscode.window.showInformationMessage('All open tabs have been copied to the clipboard.')
    } catch (error) {
      console.error('Error copying tabs:', error)
      vscode.window.showErrorMessage(`Failed to copy tabs: ${error instanceof Error ? error.message : String(error)}`)
    }
  })

  context.subscriptions.push(disposable)
}



function deactivate() {}

module.exports = {
  activate,
  deactivate
}
