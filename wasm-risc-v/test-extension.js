const vscode = require('vscode');

function activate(context) {
  console.log('Test extension activated!');
  
  const disposable = vscode.commands.registerCommand('test.hello', () => {
    vscode.window.showInformationMessage('Hello from RISC-V Terminal extension!');
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

exports.activate = activate;
exports.deactivate = deactivate;
