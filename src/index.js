import marked from 'marked';
let fileHandle;
let directoryHandle;
let writableFileHandle;
let file;

const openedFilename = $('#opened-filename');
const editorContainer = $('#editor-container');
const editor = $('#textarea-editor');
const previewEl = $(preview);
const btnSave = $('#btn-save');
const btnOpen = $('#btn-open');

editor.height(editorContainer.height() + 20);

previewEl.html(marked(editor.text()));

function updatePreview() {
    previewEl.html(marked(editor.text()));
}

editor.on('keydown', updatePreview);

editor.bind('paste', updatePreview);

btnOpen.on('click', async () => {
    // Destructure the one-element array.
    [fileHandle] = await window.showOpenFilePicker();
    writableFileHandle = await fileHandle.createWritable();
    file = await fileHandle.getFile();
    
    const text = await file.text();
    editor.text(text);
    updatePreview();
    openedFilename.text(file.name);
    openedFilename.show();
    
    btnOpen.hide();
    btnSave.show();
});

btnSave.on('click', async () => {
    await writableFileHandle.write(editor.text());
    await writableFileHandle.close();
    btnSave.hide();
    btnOpen.show();
    openedFilename.hide();
});