// src/extension.ts
import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  const copyCommand = vscode.commands.registerCommand('copy-all-tabs.copyAllTabs', async () => {
    try {
      const docs = collectDocumentsFromOpenTabs()
      if (docs.length === 0) {
        return vscode.window.showInformationMessage('No open tabs found.')
      }

      const chunks = docs.map((doc) => {
        const rel = vscode.workspace.asRelativePath(doc.uri)
        return `\n${rel}\n${doc.getText()}`
      })

      await vscode.env.clipboard.writeText(chunks.join('\n').trim())
      vscode.window.showInformationMessage(`Copied ${docs.length} tab${docs.length > 1 ? 's' : ''} to clipboard.`)
    } catch (err: unknown) {
      console.error(err)
      vscode.window.showErrorMessage(`Failed to copy tabs: ${(err as Error).message}`)
    }
  })

  context.subscriptions.push(copyCommand)
}

/**
 * Returns TextDocuments that correspond **only** to tabs currently shown in
 * the focused window’s tab bar (no hidden previews, no closed docs, no other
 * VS Code windows).
 */
function collectDocumentsFromOpenTabs(): vscode.TextDocument[] {
  const results: vscode.TextDocument[] = []
  const seen = new Set<string>()

  for (const group of vscode.window.tabGroups.all) {
    for (const tab of group.tabs) {
      // Tab must be text (skip images, binaries, terminals, notebooks, etc.)
      if (tab.input instanceof vscode.TabInputText) {
        const uri = tab.input.uri
        if (!seen.has(uri.toString())) {
          const doc = vscode.workspace.textDocuments.find((d) => d.uri.toString() === uri.toString())
          if (doc) {
            results.push(doc)
            seen.add(uri.toString())
          }
        }
      } else if (tab.input instanceof vscode.TabInputTextDiff) {
        // Diff tabs hold two URIs (modified & original)
        for (const uri of [tab.input.modified, tab.input.original]) {
          if (!seen.has(uri.toString())) {
            const doc = vscode.workspace.textDocuments.find((d) => d.uri.toString() === uri.toString())
            if (doc) {
              results.push(doc)
              seen.add(uri.toString())
            }
          }
        }
      }
    }
  }
  return results
}

export function deactivate() {}
