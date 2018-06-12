var canvas = document.getElementById("myCanvas");
window.addEventListener("keydown", keyboardEvent, false);
window.addEventListener("keyup", keyboardUpEvent, false);
canvas.addEventListener("dblclick", onDoubleClick, false);
canvas.addEventListener('click', onClick, false);
window.addEventListener('click', contextmenu, false);
canvas.addEventListener('contextmenu', myFunction, false);
document.addEventListener('paste', pasteListener, false);
document.addEventListener('cut', cutListener, false);
var ctx = canvas.getContext("2d");

var textToPrint = "abcdefghwx yz_123456 uyiouyiuy"
    + "abcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuyabcdefghwx yz_123456 uyiouyiuy";
ctx.font = '16px Consolas';
ctx.textBaseline = 'middle';

/*Text*/
var textStartIndex = 0, textEndIndex = 0;

/*Cursor*/
var cursorPosition = 0;


const textOffset = 15, charOffset = 1;

const offsetX = 1, offsetY = 1;
const width = canvas.width, height = canvas.height, lineWidth = 2;
const canvasWidth = canvas.width, canvasHeight = canvas.height;
const messageHeight = parseInt(ctx.font);

var cursorDisplayed = true;
var cursorInterval;

var isShiftPressed = false;


ctx.lineWidth = lineWidth;

printText();
startCursor();

ctx.moveTo(0, textOffset);
ctx.lineTo(200, textOffset);

function startCursor() {
    cursorInterval = setInterval(displayCursor, 500);
}

function printText() {

    let start = performance.now();

    var numberOfItems = getVisibleTextRange(textToPrint);
    textEndIndex = numberOfItems + textStartIndex;
    for (var i = 0; i < numberOfItems; i++) {
        var charToPrint = textToPrint.charAt(textStartIndex + i);
        let text = textToPrint.substr(textStartIndex, i);
        var textWidth = ctx.measureText(text).width;
        var charWidth = ctx.measureText(charToPrint).width;
        if ((textStartIndex + i) % 2 !== 0) {
            printRotated(charToPrint, charWidth, textWidth, i + 1);
        } else {
            printChar(charToPrint, charWidth, textWidth, i + 1);
        }
    }

    console.log("Performance: [" + (performance.now() - start) + "] ms");
}

function measure(text) {
    return ctx.measureText(text).width;
}

//TODO: performance improvement point
function getVisibleTextRange(text) {
    let p = performance.now();
    for (var i = 1; i < text.length; i++) {
        let text2 = text.substr(textStartIndex, i);
        let textWidth = measure(text2) + text2.length * charOffset;
        if (textWidth > width) {
            console.log("Performance -> getVisibleTextRange: [" + (performance.now() - p ) + "] ms");
            return i - 1;
        }
    }
    console.log("Performance -> getVisibleTextRange: [" + (performance.now() - p ) + "] ms");
    return text.length;
}

function getVisibleTextRangeRev() {
    for (var i = textEndIndex; i > 0; i--) {
        let text2 = textToPrint.substring(i, textEndIndex);
        let textWidth = measure(text2) + text2.length * charOffset;
        if (textWidth > width) {
            return i;
        }
    }
    return textToPrint.length;
}


function displayCursor() {
    if (cursorDisplayed) {
        ctx.strokeStyle = '#000000';
    } else {
        ctx.strokeStyle = '#ffffff';
    }
    cursorDisplayed = !cursorDisplayed;
    printCursor();
    ctx.stroke();
}

function printCursor() {
    ctx.beginPath();
    let text = textToPrint.substring(textStartIndex, cursorPosition);
    let x = Math.ceil(measure(text) + text.length * charOffset);
    ctx.moveTo(x, Math.ceil(textOffset + messageHeight / 2));
    ctx.lineTo(x, Math.ceil(textOffset - messageHeight / 2));
    ctx.closePath();
}

//https://www.w3schools.com/tags/canvas_textbaseline.asp
//https://www.w3schools.com/tags/canvas_scale.asp
//https://www.w3.org/TR/2dcontext/#dom-context-2d-textbaseline
function printRotated(letter, charWidth, textWidth, numberOfLetters) {
    ctx.save();
    ctx.translate(textWidth + numberOfLetters * charOffset,
        textOffset + 3);
    ctx.scale(1, -1);
    ctx.fillText(letter, 0, 0);
    ctx.restore();
}

function printChar(letter, charWidth, textWidth, numberOfLetters) {
    ctx.fillText(letter, textWidth + numberOfLetters * charOffset, textOffset);
}

const skipArray = [17/*ctrl*/, 38/*up arrow*/, 40/*down arrow*/, 9/*tab*/, 18/*alt*/, 19/*pause/break*/, 20/*caps lock*/, 27/*escape*/, 33/*page up*/, 34/*page down*/,
    35/*end*/, 36/*home*/, 45/*insert*/, 91/*left window key*/, 92/*right window key*/, 93/*select key*/, 112/*f1*/,
    113/*f2*/, 114/*f3*/, 115/*f4*/, 116/*f5*/, 117/*f6*/, 118/*f7*/, 119/*f8*/, 120/*f9*/, 121/*f10*/, 122/*f11*/, 123/*f12*/, 144/*num lock*/, 145/*scroll lock*/];

function keyboardUpEvent(e) {
    var code = e.keyCode;
    if (code)
        switch (code) {
            case 16://shift
                isShiftPressed = false;
                break;
        }
}

function keyboardEvent(e) {
    var code = e.keyCode;
    if (code)
        switch (code) {
            case 16:
                isShiftPressed = true;
                break;
            case 37://left
                clearInterval(cursorInterval);
                this.munisCursor();
                minusTextStartIndex();
                moveTextCaret();
                repaint();
                break;
            case 39://right
                clearInterval(cursorInterval);
                this.plusCursor();
                plusTextStartIndex();
                moveTextCaret();
                repaint();
                break;
            case 46://delete
                clearInterval(cursorInterval);
                textToPrint = textToPrint.substr(0, cursorPosition) +
                    textToPrint.substr(cursorPosition + 1, textToPrint.length);
                repaint();
                break;
            case 8://backspace
                clearInterval(cursorInterval);
                textToPrint = textToPrint.substr(0, cursorPosition - 1) +
                    textToPrint.substr(cursorPosition, textToPrint.length);
                this.munisCursor();
                repaint();
                break;
            default:
                if (!skipArray.find(e => {
                        return e === code
                    })) {
                    clearInterval(cursorInterval);
                    textToPrint = textToPrint.substr(0, cursorPosition) + e.key +
                        textToPrint.substr(cursorPosition, textToPrint.length);
                    this.plusCursor();
                    plusTextStartIndex();
                    moveTextCaret();
                    repaint();
                }
                break;
        }

}

function munisCursor() {
    cursorPosition = Math.max(0, --cursorPosition);
    shiftOperate();
}

function plusCursor() {
    cursorPosition = Math.min(++cursorPosition, textToPrint.length);
    shiftOperate();
}

function shiftOperate() {
    if (isShiftPressed) {
        if (selectionStartIndex == selectionEndIndex) {
            selectionStartIndex = cursorPosition;
        } else {
            selectionEndIndex = cursorPosition;
        }
    }
}

function plusTextStartIndex() {
    if (textStartIndex > 0 && textEndIndex < textToPrint.length) {
        ++textStartIndex;
    }
}

function minusTextStartIndex() {
    if (textStartIndex > 0 && cursorPosition === 0) {
        --textStartIndex;
    }
}

function moveTextCaret() {
    if (cursorPosition > textEndIndex) {
        ++textStartIndex;
    } else if (cursorPosition < textStartIndex) {
        --textStartIndex;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}

function onClick(e) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }

    var clientX = e.clientX;
    clearInterval(cursorInterval);
    cursorPosition = getClickPosition(clientX) + textStartIndex;
    repaintAll();
}

function repaintAll() {
    resetSelection();
    repaint();
}

function repaint() {
    clearCanvas();
    displayCursor();
    startCursor();
    printText();
    printSelection();
}

function getClickPosition(clientX) {
    var resultPosition = 0;
    for (var i = 0; i < textEndIndex - textStartIndex; i++) {
        let measure2 = measure(textToPrint.substr(textStartIndex, i)) + i * charOffset,
            resultPosition2 = clientX - measure2;
        if (resultPosition2 <= 0) {
            break;
        }
        resultPosition = i;
    }
    return resultPosition;
}

function onDoubleClick(e) {
    initSelectionByDoubleClick(getClickPosition(e.clientX));
    moveTextToEndSelection();
    clearCanvas();
    displayCursor();
    startCursor();
    printText();
    printSelection();
}

/**----------------------------Selection-----------------------------------**/

/*Selection*/
var selectionStartIndex = 0, selectionEndIndex = 0;
var selectedCharsNumber = 0;

function resetSelection() {
    selectionEndIndex = 0;
    selectionStartIndex = 0;
    selectedCharsNumber = 0;
}

function initSelectionByDoubleClick(position) {
    selectionEndIndex = textToPrint.indexOf(' ', position);
    selectionEndIndex = selectionEndIndex == -1 ? textToPrint.length : Math.min(selectionEndIndex + 1, textToPrint.length);
    cursorPosition = selectionEndIndex;
    selectionStartIndex = findStartIndexForSelection(position);
    textToPrint.charAt(selectionStartIndex) === ' ' ? ++selectionStartIndex : selectionStartIndex;
}

function moveTextToEndSelection() {
    if (cursorPosition > textEndIndex) {
        textEndIndex = cursorPosition;
        textStartIndex = getVisibleTextRangeRev();
    }
}


function findStartIndexForSelection(position) {
    for (var i = position; i > 0; i--) {
        if (textToPrint.charAt(i) === ' ') {
            return i;
        }
    }
    return 0;
}

function printSelection() {
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'blue';
    fillRect();
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 1.0;
}

function fillRect() {
    let deltaX = Math.max(selectionStartIndex - textStartIndex, 0);
    let x = measure(textToPrint.substring(0, deltaX)) + deltaX * charOffset + offsetX;
    let width = measure(textToPrint.substring(selectionStartIndex - textStartIndex, selectionEndIndex - textStartIndex)) - offsetX + (selectionEndIndex - textStartIndex - 1) * charOffset;
    let height = canvasHeight - 2 * offsetY;
    return ctx.fillRect(x,
        offsetY,
        width,
        height);
}

function isNotSelected() {
    return selectionStartIndex == selectionEndIndex;
}

/*------------------------------------Menu-section----------------------------------------------*/
function myFunction(e) {
    initMenuItems();
    document.getElementById("myDropdown").classList.toggle("show");
    e.preventDefault();
    e.stopPropagation();
}

function isClipboardText() {
    // alert(window.clipboardData.getData('Text'));
}

function initMenuItems() {
    let cutElement = document.getElementsByName("cut")[0];
    let copyElement = document.getElementsByName("copy")[0];
    if (isNotSelected()) {
        cutElement.classList.add("disabled");
        copyElement.classList.add("disabled");
    } else {
        cutElement.classList.remove("disabled");
        copyElement.classList.remove("disabled");
    }

    if (isClipboardText()) {

    }
}

// Close the dropdown if the user clicks outside of it
function contextmenu(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
    event.preventDefault();
}

/*-----------------------------------------Clipboard-actions--------------------------------------------------------------------*/

function execClipboardCommand(command) {
    var dummy = document.createElement("input");
    dummy.setAttribute("hidden", true);
    document.body.appendChild(dummy);
    dummy.setAttribute('value', getSelectedText());
    dummy.select();
    document.execCommand(command);
    document.body.removeChild(dummy);
    return true;

}

function copyClicked() {
    execClipboardCommand("copy");
}

function pasteClicked() {
    var evt = new Event("HTMLEvent");
    evt.initEvent('paste', false, true);
    canvas.dispatchEvent(evt);
}

function pasteListener(event) {
    let clipboardData = event.clipboardData;
    if (clipboardData) {
        alert(clipboardData.getData('Text'));
    }
}


function cutListener(e) {
    debugger;
}

function selectAllClicked() {
    selectionStartIndex = 0;
    selectionEndIndex = textToPrint.length;
    cursorPosition = textToPrint.length;
    moveTextToEndSelection();
    clearCanvas();
    displayCursor();
    startCursor();
    printText();
    printSelection();
}

function cutClicked() {
    execClipboardCommand("cut");
    textToPrint = textToPrint.substring(0, selectionStartIndex) + textToPrint.substring(selectionEndIndex, textToPrint.length);
    cursorPosition = selectionStartIndex;
    repaintAll();
}

function getSelectedText() {
    return textToPrint.substring(selectionStartIndex, selectionEndIndex);
}