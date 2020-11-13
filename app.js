const canvas = document.getElementById("jsCanvas");
// context : 요소 안의 픽셀에 접근 할 수 있는 방법
// canvas에 width와 height를 줘야 한다
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// 그릴 선의 색상
ctx.strokeStyle = INITIAL_COLOR;
// 선의 너비
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting(event)
{
    painting = false;
}

function startPainting()
{
    painting = true;
}

function onMouseMove(event)
{
    // screenOffset과 clientOffset은 다르다.
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting)
    {
        // 경로 생성
        ctx.beginPath();
        // 선 시작 좌표
        ctx.moveTo(x, y)
    }
    else
    {
        // 선 끝 좌표
        ctx.lineTo(x, y);
        // 선 그리기
        ctx.stroke()
    }
}

function handleColorClick(event)
{
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event)
{
    const size = event.target.value
    ctx.lineWidth = size;
}

function handleModeClick(evnet)
{
    if (filling)
    {
        filling = false;
        mode.innerText = "fill";
    }
    else
    {
        filling = true;
        mode.innerText = "paint";
    }
}

function handleCanvasClick(event)
{
    if (filling)
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM(evnet)
{
    evnet.preventDefault();
}

function handleSaveClick(event)
{
    // 기본값이 png이다. image/jpeg 등으로 바꿀 수 있다.
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "BKW_PaintJS[EXPORT]";
    // link를 href에 image를 넣고 download로 이름을 정해주어야 한다.
    link.click();
}

if (canvas)
{
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range)
{
    range.addEventListener("input", handleRangeChange);
}

if (mode)
{
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn)
    saveBtn.addEventListener("click", handleSaveClick);