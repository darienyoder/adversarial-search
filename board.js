const EMPTY = -1;
const TEAM_1 = 0;
const TEAM_2 = 1;

// Tracks information about the board and pieces
class Board {
    constructor()
    {
        this.tile = [];
        for (var x = 0; x < 8; x++)
        {
            this.tile.push([]);
            for (var y = 0; y < 8; y++)
            {
                this.tile[x].push(EMPTY);
                if ((y < 3 || y > 4) && (x + y) % 2 == 0)
                    this.tile[x][y] = (y < 3) ? TEAM_1 : TEAM_2;
            }
        }
        console.log(this.tile);
    }

    inBounds(x, y)
    {
        return x >= 0 && y >= 0 && x < 8 && y < 8;
    }

    getTile(x, y)
    {
        return this.tile[x][y];
    }

    setTile(x, y, value)
    {
        this.tile[x][y] = value;
    }

    movePiece(x1, y1, x2, y2)
    {
        this.tile[x2][y2] = this.tile[x1][y1];
        this.tile[x1][y1] = EMPTY;
    }
}
