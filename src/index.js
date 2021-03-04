import marked from 'marked';

let fileHandle;
let directoryHandle;
let writableFileHandle;
let file;

const openedFilename = $('#opened-filename');
const editorContainer = $('#editor-container');
const editor = $('#textarea-editor');
const preview = $('#preview-container');
const btnSave = $('#btn-save');
const btnOpen = $('#btn-open');

editor.height(editorContainer.height() + 20);

preview.html(marked(editor.val()));

function updatePreview() {
    preview.html(marked(editor.val()));
}

editor.on('keydown', updatePreview);

editor.bind('paste', updatePreview);

btnOpen.on('click', async () => {
    [fileHandle] = await window.showOpenFilePicker();
    writableFileHandle = await fileHandle.createWritable();
    file = await fileHandle.getFile();
    
    const text = await file.text();
    editor.val(text);
    
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
    
    alert('saved on disk');
});