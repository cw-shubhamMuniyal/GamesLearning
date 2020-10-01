let rows=7;
let cols=6;
let w;
let dw=80, mousePosition;
let players=['B', 'R'];
let currentPlayer=0;
let win=4;

let board=[
    ['', '', '', '', '', ''], 
    ['', '', '', '', '', ''],  
    ['', '', '', '', '', ''], 
    ['', '', '', '', '', ''], 
    ['', '', '', '', '', ''],  
    ['', '', '', '', '', ''], 
    ['', '', '', '', '', '']
];

function setup() {
    createCanvas(700,700);
    w=width/7;
    frameRate(4);
}

function mousePressed(){
    let mousePlaced=mousePosition;
    console.log(mousePlaced);
    if(board[mousePlaced][0] ==''){
        board[mousePlaced][0]=players[currentPlayer];

        let i=0;
        while(true){
            if(board[mousePlaced][i+1] != ''){
                checkWinner((i), mousePlaced);
                console.log("jhgh"+(i)+"JKJ"+mousePlaced);
                break;
            }
            else{
                board[mousePlaced][i+1]=board[mousePlaced][i];
                board[mousePlaced][i]='';
            }
            i++;
        }
        
        currentPlayer=(currentPlayer+1)%2;

    }
   
    
}

function checkWinner(i,j){
    let piece=board[j][i], count=0;

    // for horizontal
    let l=i;
    let m=j+1;
    while(m<7 && piece == board[m][i] && count<3){
        count++;
        m++;
    }
    m=j-1;
    while(m>=0 && piece == board[m][i] && count<3){
        count++;
        m--;
    }
    if(count==3){
        win=currentPlayer;
        return;
    }

    // for vertical
    count=0;
    l=i+1;
    m=j;
    
    while(l>=0 && piece == board[j][l] && count<3){
        count++;
        l++;
    }
    if(count==3){
        win=currentPlayer;
        return;
    }

    // Diagonal
    // l=i;
    // m=j+1;
    // while(m<7 && piece == board[m][i] && count<3){
    //     count++;
    //     m++;
    // }
    // m=j-1;
    // while(m>=0 && piece == board[m][i] && count<3){
    //     count++;
    //     m--;
    // }
    // if(count==3){
    //     win=currentPlayer;
    //     return;
    // }

}

function draw() {
    background("yellow");
    fill(255);
    stroke(0);
    rect(-1,-1, width+2,w);
    mousePosition=floor(mouseX/w);

    for(let i=0;i<rows;i++){
        for(let j=cols-1;j>=0;j--){
            if(board[i][j] == 'B'){
                fill(0,0,255);
                
            }
            else if(board[i][j] == 'R'){
                fill(255,0,0);
            }
            else{
                fill(255,255,255);
            }
            ellipse(i*w+w/2 , (j+1)*w+w/2, dw);
            
        }
    }

    for(let x=w;x<width;x=x+w){
        line(x, w, x, height);
    }
    if(currentPlayer == 0){
        fill(0,0,255);
    }
    else{
        fill(255,0,0);
    }
    ellipse((mousePosition*w)+w/2, w/2, dw);

    if(win !=4){
        fill(255);
        rect(-1,-1, width+2,w);
        textAlign(CENTER, CENTER);
        textSize(64);
        if(win==0){
            console.log("winner is"+players[0]);
            fill(0,0,255);
            text("winner is ."+players[0], width/2, w/2);
        }
        else if(win==1){
            fill(255,0,0);
            console.log("winner is"+players[1]);
            text("winner is ."+players[1], width/2, w/2);
        }
        else if(win == 2){
            console.log("tie");
            text("It is a tie.", width/2, w/2);
        }
        noLoop();
    }
    
}


