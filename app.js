window.onload = ()=> {
    let xPlayerId = document.getElementById('playerX').classList.add('bg-warning')
    score()
}

let click = 1, x = 'fa-times', o = 'fa-circle', winner;

let winX = previousData().x, winO = previousData().o, droBoth = previousData().d;

let ids = [['cell-1-i',
    'cell-2-i',
    'cell-3-i'],
    ['cell-4-i',
        'cell-5-i',
        'cell-6-i'],
    ['cell-7-i',
        'cell-8-i',
        'cell-9-i'],
    ['cell-1-i',
        'cell-4-i',
        'cell-7-i'],
    ['cell-2-i',
        'cell-5-i',
        'cell-8-i'],
    ['cell-3-i',
        'cell-6-i',
        'cell-9-i'],
    ['cell-1-i',
        'cell-5-i',
        'cell-9-i'],
    ['cell-3-i',
        'cell-5-i',
        'cell-7-i']];


function previousData() {
    let xWin,
    oWin,
    drow;
    xWin = localStorage.getItem('x')
    oWin = localStorage.getItem('o'),
    dro = localStorage.getItem('d')
    if (xWin == null || oWin == null || dro == null) {
        xWin = 0
        oWin = 0
        dro = 0
        dataSave(xWin, oWin, dro)
    }
    return {
        x: xWin,
        o: oWin,
        d: dro
    }
}

function clickIt(id) {
    let cell = document.getElementById(id)
    cell.removeAttribute('onclick')
    let icon = document.getElementById(`${id}-i`)

    if (chanceNow() == 'x') {
        icon.classList.add('fa', 'fa-times')
    } else {
        icon.classList.add('far', 'fa-circle')
    }
    check()
}

function chanceNow () {
    if (!gameOver()) {
        chanceNext(click)
    }
    if (click%2 == 1) {

        click++;
        return 'x'
    } else {

        click++;
        return 'o'
    }
}

function chanceNext(now) {
    now++
    let xPlayerId = document.getElementById('playerX').classList
    let oPlayerId = document.getElementById('playerO').classList

    if (now%2 == 1) {
        xPlayerId.add('bg-warning')
        oPlayerId.remove('bg-warning')
    } else {
        oPlayerId.add('bg-warning')
        xPlayerId.remove('bg-warning')
    }
}

function check() {
    for (var i = 0; i < ids.length; i++) {
        let l,
        m,
        n;
        l = document.getElementById(ids[i][0]).classList[1]
        m = document.getElementById(ids[i][1]).classList[1]
        n = document.getElementById(ids[i][2]).classList[1]


        let cellId1,
        cellId2,
        cellId3
        cellId1 = document.getElementById(`${String(`${ids[i][0]}`).split('-i')[0]}`)
        cellId2 = document.getElementById(`${String(`${ids[i][1]}`).split('-i')[0]}`)
        cellId3 = document.getElementById(`${String(`${ids[i][2]}`).split('-i')[0]}`)

        if ((l == x && m == x && n == x) || (l == o && m == o && n == o)) {
            cellId1.classList.add('bg-primary', 'text-white')
            cellId2.classList.add('bg-primary', 'text-white')
            cellId3.classList.add('bg-primary', 'text-white')
            if (l == x && m == x && n == x) {
                gameResult('x')
                stop()
                break;
            } else {
                gameResult('o')
                stop()
                break;
            }
        }
    }
    if (gameOver()) {
        gameResult('no')
        stop()
    }
}

function gameOver() {
    try {
        let allIcon = []
        for (let i = 1; i < 10; i++) {
            let cellI = document.getElementById(`cell-${i}-i`).classList[1];
            if (cellI) {
                allIcon.push(cellI)
            }
        }

        if (allIcon.length == 9) {
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e);
    }
}

function stop() {
    let cells = document.querySelectorAll('td')
    cells.forEach(cell=> {
        cell.removeAttribute('onclick');
    });

}

function gameResult(player) {
    let xPlayerId = document.getElementById('playerX').classList
    let oPlayerId = document.getElementById('playerO').classList
    xPlayerId.remove('bg-warning')
    oPlayerId.remove('bg-warning')

    if (player == 'x' || player == 'o') {
        if (!winner) {
            winner = `${player}`
            alert(`Player is - ${player}`);
        }
        if (player == 'x') {
            winX++
            xPlayerId.add('bg-success', 'text-white')
            score()
        } else if (player == 'o') {
            winO++
            oPlayerId.add('bg-success', 'text-white')
            score()
        }
    } else {
        if (!winner) {
            winner = `drow`
            droBoth++
            alert(`Match Drow `)
            score()
        }
    }
}

function score() {
    document.getElementById('xWin').innerHTML = winX
    document.getElementById('oWin').innerHTML = winO
    document.querySelectorAll('#drow').forEach(tag=> {
        tag.innerHTML = droBoth
    })
    dataSave(winX, winO, droBoth)
}

function dataSave(x, o, d) {
    localStorage.setItem("x", x)
    localStorage.setItem("o", o)
    localStorage.setItem("d", d)
    return true
}

function reload() {
    location.reload();
}

function resetData() {
    localStorage.clear()
    reload()
}




window.addEventListener('keydown', (e)=> {
    let game = document.getElementById('game')
    let key = e.key
    alert(key)
    if (key == "1") {
        game.rows[0].cells[0].click()
    } else if (key == "2") {
        game.rows[0].cells[1].click()
    } else if (key == "3") {
        game.rows[0].cells[2].click()
    } else if (key == "4") {
        game.rows[1].cells[0].click()
    } else if (key == "5") {
        game.rows[1].cells[1].click()
    } else if (key == "6") {
        game.rows[1].cells[2].click()
    } else if (key == "7") {
        game.rows[2].cells[0].click()
    } else if (key == "8") {
        game.rows[2].cells[1].click()
    } else if (key == "9") {
        game.rows[2].cells[2].click()
    }

})