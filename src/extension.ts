import * as vscode from 'vscode';

function _centerOnCursor() {
	let editor = vscode.window.activeTextEditor;
	if (editor) {
		let range = editor.visibleRanges[0];
		if (range) {
			let currentPosition = editor.selection.active;
			let middle = Math.floor(((range.end.line - range.start.line) / 2) + range.start.line);
			let delta = middle - currentPosition.line;
			if (delta > 0) {
				vscode.commands.executeCommand("editorScroll", { to: "up", by: "line", value: Math.abs(delta) });
			}
			else {
				vscode.commands.executeCommand("editorScroll", { to: "down", by: "line", value: Math.abs(delta) });
			}
		}
	}
}

function _deleteBetweenPerentheses() {
	vscode.commands.executeCommand("editor.action.selectToBracket").then(() => {
		let editor = vscode.window.activeTextEditor;
		if (editor) {
			if (!editor.selection.isEmpty) {
				vscode.commands.executeCommand("deleteLeft");
			}
		}
	});
}

function _indentBlock() {
	let editor = vscode.window.activeTextEditor;
	if (editor) {
		let position = editor.selection.active;
		vscode.commands.executeCommand("editor.action.selectToBracket").then(() => {
			vscode.commands.executeCommand("editor.action.indentLines").then(() => {
				let newPosition = new vscode.Position(position.line, position.character + 4);
				let newSelection = new vscode.Selection(newPosition, newPosition);
				if (editor) {
					editor.selection = newSelection;
				}
			});
		});
	}
}

function _outdentBlock() {
	let editor = vscode.window.activeTextEditor;
	if (editor) {
		let position = editor.selection.active;
		vscode.commands.executeCommand("editor.action.selectToBracket").then(() => {
			vscode.commands.executeCommand("editor.action.outdentLines").then(() => {
				let newPosition = new vscode.Position(position.line, (position.character > 3) ? position.character - 4 : 0);
				let newSelection = new vscode.Selection(newPosition, newPosition);
				if (editor) {
					editor.selection = newSelection;
				}
			});
		});
	}
}

export function activate(context: vscode.ExtensionContext) {
	let goToTop = vscode.commands.registerCommand('customcommands.goToTop', () => {
		vscode.commands.executeCommand("cursorMove", { to: "viewPortTop" });
	});

	let selectToTop = vscode.commands.registerCommand('customcommands.selectToTop', () => {
		vscode.commands.executeCommand("cursorMove", { to: "viewPortTop", select: true });
	});

	let goToBottom = vscode.commands.registerCommand('customcommands.goToBottom', () => {
		vscode.commands.executeCommand("cursorMove", { to: "viewPortBottom" });
	});

	let selectToBottom = vscode.commands.registerCommand('customcommands.selectToBottom', () => {
		vscode.commands.executeCommand("cursorMove", { to: "viewPortBottom", select: true });
	});

	let goToMiddle = vscode.commands.registerCommand('customcommands.goToMiddle', () => {
		vscode.commands.executeCommand("cursorMove", { to: "viewPortCenter" });
	});

	let selectToMiddle = vscode.commands.registerCommand('customcommands.selectToMiddle', () => {
		vscode.commands.executeCommand("cursorMove", { to: "viewPortCenter", select: true });
	});

	let goToPrevBlankLine = vscode.commands.registerCommand('customcommands.goToPrevBlankLine', () => {
		vscode.commands.executeCommand("cursorMove", { to: "prevBlankLine" });
	});

	let selectToPrevBlankLine = vscode.commands.registerCommand('customcommands.selectToPrevBlankLine', () => {
		vscode.commands.executeCommand("cursorMove", { to: "prevBlankLine", select: true });
	});

	let goToNextBlankLine = vscode.commands.registerCommand('customcommands.goToNextBlankLine', () => {
		vscode.commands.executeCommand("cursorMove", { to: "nextBlankLine" });
	});

	let selectToNextBlankLine = vscode.commands.registerCommand('customcommands.selectToNextBlankLine', () => {
		vscode.commands.executeCommand("cursorMove", { to: "nextBlankLine", select: true });
	});

	let centerOnCursor = vscode.commands.registerCommand('customcommands.centerOnCursor', () => {
		_centerOnCursor();
	});

	let deleteBetweenParentheses = vscode.commands.registerCommand('customcommands.deleteBetweenParentheses', () => {
		_deleteBetweenPerentheses();
	});

	let indentBlock = vscode.commands.registerCommand('customcommands.indentBlock', () => {
		_indentBlock();
	});

	let outdentBlock = vscode.commands.registerCommand('customcommands.outdentBlock', () => {
		_outdentBlock();
	});

	context.subscriptions.push(goToTop);
	context.subscriptions.push(selectToTop);
	context.subscriptions.push(goToBottom);
	context.subscriptions.push(selectToBottom);
	context.subscriptions.push(goToMiddle);
	context.subscriptions.push(selectToMiddle);
	context.subscriptions.push(goToPrevBlankLine);
	context.subscriptions.push(selectToPrevBlankLine);
	context.subscriptions.push(goToNextBlankLine);
	context.subscriptions.push(selectToNextBlankLine);
	context.subscriptions.push(centerOnCursor);
	context.subscriptions.push(deleteBetweenParentheses);
	context.subscriptions.push(indentBlock);
	context.subscriptions.push(outdentBlock);
}

export function deactivate() { }
