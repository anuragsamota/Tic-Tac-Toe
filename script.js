const blocks = document.querySelectorAll(".game-box")
const reset_btn = document.getElementById("reset-button")
const player_status = document.getElementById("player-status")
const game_status = document.getElementById("game-status")

const win_cases = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]

let occupied_moves = []
let player1_moves = []
let player2_moves = []
let move_counter = 0
let current_player = "Player 1"
let match_staus = "Match On Going"


document.onclick = e=>{
    if(match_staus === "Match On Going"){
        for(i=0;i<blocks.length;i++){
            if(e.target.id === blocks[i].id){
                game(e.target)
                break
            }
        }
    }
}

function game(element){
    let valid_move = true

    for(i=0;i<occupied_moves.length;i++){
        if(element.id == occupied_moves[i]){
            valid_move = false
            break
        }
    }
    if(valid_move){
        if(current_player === "Player 1"){
            element.innerHTML = "O"
            player1_moves.push(parseInt(element.id))
            current_player = "Player 2"
        }
        else{
            element.innerHTML = "X"
            player2_moves.push(parseInt(element.id,10))
            current_player = "Player 1"
        }
        player_status.innerHTML = current_player + " Move"

        move_counter++
        if(move_counter>=9){
            player_status.innerHTML = "Moves Completed"

        }
        occupied_moves.push(parseInt(element.id))
        winCheck()
    }
    else{
        //code for invalid move
        alert("invalid move")
    }
}


function winCheck(){
    player1_moves.sort(function(a,b){return a-b})
    player2_moves.sort(function(a,b){return a-b})

    for(i = 0; i < 8; i++){
        let player1_correct = 0
        let player2_correct = 0
        for(j=0;j<3;j++){
            //player 1
            for(k=0;k<player1_moves.length;k++){
                if(player1_moves[k]==win_cases[i][j]){
                    player1_correct++
                }
            }
            //player 2
            for(k=0;k<player2_moves.length;k++){
                if(player2_moves[k]==win_cases[i][j]){
                    player2_correct++
                }
            }
        }
        //checking
        if(player1_correct>=3){
            match_staus = "Player 1 Wins"
            if(move_counter<9){
                player_status.innerHTML = "Game Over"
            }
        }
        if(player2_correct>=3){
            match_staus = "Player 2 Wins"
            if(move_counter<9){
                player_status.innerHTML = "Game Over"
            }
        }
    }
    //for draw
    if(move_counter>=9){
        if(match_staus == "Match On Going"){
            match_staus = "Match Draw"
        }
    }
    game_status.innerHTML = match_staus
}

reset_btn.onclick = function(){
    location.reload()
}
