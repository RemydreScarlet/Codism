const vscode = require('vscode');

function activate(context) {
  console.log('RISC-V Terminal extension is now active!');

  const disposable = vscode.commands.registerCommand('wasm-risc-v.openTerminal', () => {
    const panel = vscode.window.createWebviewPanel(
      'risc-v-terminal',
      'RISC-V Terminal',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [context.extensionUri]
      }
    );

    const indexHtmlUri = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, 'index.html')
    );

    panel.webview.html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe src="${indexHtmlUri}" 
                sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"></iframe>
      </body>
      </html>
    `;
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

exports.activate = activate;
exports.deactivate = deactivate;
