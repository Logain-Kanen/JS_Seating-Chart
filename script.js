let seats = [
    ['Empty','Empty','Empty','Empty'],
    ['Empty','Empty','Empty','Empty'],
    ['Empty','Empty','Empty','Empty'],
    ['Empty','Empty','Empty','Empty']
];
let message = document.getElementById('message');
let html = '';
let display = document.getElementById('grid');
let modeText = document.getElementById('modeText');
let mode = 'assign';
onload = displayTable();
onload = assignMode();

//Display table
function displayTable(){
    html+=`<table>`
    for(i=0;i<seats.length;i++){
            html+=`<tr>`
            for(j=0;j<seats.length;j++){
                html+=`<td id='cell-${i}-${j}' onclick='getCell(${i},${j})'>${seats[i][j]}</td>`
            }
            html+=`</tr>`
        }
    html+=`</table>`
    display.innerHTML = html
    html=''
    setStats()
}

//gets the cell coordinates as variables
function getCell(row,col){
    cell = document.getElementById(`cell-${row}-${col}`)
    console.log(row,col)
    input = document.getElementById('studentName')
    if(mode == 'assign'){
        if (input.value===''){
            message.innerHTML = "Type a name first."
        }
        else if (cell.innerHTML!=='Empty'){
            message.innerHTML = "Seat already taken"
        }
        else{
            seats[row][col] = input.value
            message.innerHTML = `${input.value} assigned to row ${row}, column ${col}`
            input.value = ``
        }
    }
    else if(mode =='remove'){
        if (cell.innerHTML==='Empty'){
            message.innerHTML = `Seat is already empty`
        }
        else{
            message.innerHTML = `Removed ${cell.innerHTML} from row ${row}, column ${col}`
            seats[row][col] = 'Empty';
        }
    }
    displayTable()
}
function resetChart(){
    for(i=0;i<seats.length;i++){
        for(j=0;j<seats.length;j++){
            seats[i][j] = 'Empty'
        }
    }
    message.innerHTML = `Seating chart reset`
    displayTable();
}

function setStats(){
    let countEmpty = 0;
    let countFull = 0;
    for(i=0;i<seats.length;i++){
        for(j=0;j<seats.length;j++){
            if (seats[i][j]==='Empty'){
                countEmpty++
            }
            else{
                countFull++
            }
        }
    }
    document.getElementById('stats').innerHTML = `Assigned seats: filled ${countFull} / total 16`
}

function assignMode(){
    //change mode text
    modeText.innerHTML = `Mode: Assign (click empty seat)`;
    mode = 'assign'
}
function removeMode(){
    modeText.innerHTML = `Mode: Remove (click filled seat)`
    mode = 'remove'
}