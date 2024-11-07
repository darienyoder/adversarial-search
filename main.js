var canvas, ctx;
var board = new Board();

function main()
{
    canvas = document.getElementById("board-canvas");
    ctx = canvas.getContext("2d");

    setInterval(drawBoard, 10);
}

function drawBoard()
{
    canvas.setAttribute('width', canvas.offsetWidth);
	canvas.setAttribute('height', canvas.offsetHeight);
    let tileSize = canvas.width / 8

    for (var x = 0; x < 8; x++)
    for (var y = 0; y < 8; y++)
    {
        ctx.fillStyle = (x + y) % 2 == 0 ? "red" : "black";
        if (getMouseTile().x == x && getMouseTile().y == y)
            ctx.fillStyle = "yellow";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

        if (board.getTile(x, y) != EMPTY)
        {
            if (board.getTile(x, y) == TEAM_1)
                ctx.fillStyle = "blue";
            else
                ctx.fillStyle = "green";

            ctx.beginPath();
            ctx.arc((x + 0.5) * tileSize, (y + 0.5) * tileSize, tileSize * 0.4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

function getMouseTile()
{
    return {
        x: Math.floor((mousePosition.x - canvas.offsetLeft) / canvas.width * 8.0),
        y: Math.floor((mousePosition.y - canvas.offsetTop) / canvas.height * 8.0),
    };
}

window.addEventListener('mousemove', event => {
    mousePosition = {
        x: event.clientX,
        y: event.clientY,
    };
})

window.addEventListener('mousedown', event => {
    if (!isGrabbing && board.inBounds(getMouseTile().x, getMouseTile().y) && board.getTile(getMouseTile().x, getMouseTile().y) != EMPTY)
    {
        isGrabbing = true;
        tileGrabbing = {x: getMouseTile().x, y: getMouseTile().y};
    }
})

window.addEventListener('mouseup', event => {
    if (isGrabbing)
    {
        isGrabbing = false;
        if (board.inBounds(getMouseTile().x, getMouseTile().y))
        {
            board.movePiece(tileGrabbing.x, tileGrabbing.y, getMouseTile().x, getMouseTile().y);
        }
    }
})
