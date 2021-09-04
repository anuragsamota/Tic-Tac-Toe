const blocks = document.querySelectorAll(".game-box")
const reset_btn = document.getElementById("reset-button")
const player_status = document.getElementById("player-status")
const game_status = document.getElementById("game-status")

let occupied_moves = []
let player1_moves = []
let player2_moves = []
let player1_moves_str = ""
let player2_moves_str = ""
let move_counter = 0
let current_player = "Player 1"
let match_staus = "On Going"
let player1_win = false
let player2_win = false
const win_conditions = ["159","123","456","789","357","147","258","369"]


window.onclick = e=>{
    if(match_staus === "On Going"){
        for(i=0;i<blocks.length;i++){
            if(e.target.id === blocks[i].id){
                game(e.target)
            }
        }
    }
}

function game(element){
    let valid_move = true

    for(i=0;i<occupied_moves.length;i++){
        if(element.id === occupied_moves[i]){
            valid_move = false
        }
    }
    if(valid_move){
        if(current_player === "Player 1"){
            element.innerHTML = "O"
            player1_moves.push(parseInt(element.id,10))
            current_player = "Player 2"
        }
        else{
            element.innerHTML = "X"
            current_player = "Player 1"
            player2_moves.push(parseInt(element.id,10))
        }
        player_status.innerHTML = current_player + " Move"
        player1_moves_str += player1_moves[move_counter]
        player2_moves_str += player2_moves[move_counter]
        move_counter++
        if(move_counter>=9){
            player_status.innerHTML = "Moves Completed"
            
        }
    }
    else{
        //code for invalid move
        alert("invalid move")
    }
    occupied_moves.push(element.id)
    winCheck()
    drawCheck()
}
function winCheck(){
    //sorting player 1 and 2 array
    player1_moves.sort(function(a,b){return a-b})
    player2_moves.sort(function(a,b){return a-b})
    //player 1
    for(i=0;i<win_conditions.length;i++){
        if(player1_moves_str == win_conditions[i]){
            console.log("func 1 called")
            player1_win = true
        }
    }
    //player 2
    for(i=0;i<win_conditions.length;i++){
        if(player2_moves_str == win_conditions[i]){
            console.log("func 2 called")
            player2_win = true
        }
    }
    if(player1_win){
        match_staus = "Player 1 Wins"
    }
    if(player2_win){
        match_staus = "Player 2 Wins"
    }
    game_status.innerHTML = match_staus
}

reset_btn.onclick = function(){
    location.reload()
}
function drawCheck(){
    if(move_counter>=9){
        if(!(player1_win||player2_win)){
            match_staus = "Draw"
        }
    }
    game_status.innerHTML = match_staus
}

//problem is with players_moves_str
