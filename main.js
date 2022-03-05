winning_array = 
[
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

const gameBoard = document.querySelector(".gameboard");
const result = document.querySelector(".result");
const player = document.querySelector(".player");
const AI = document.querySelector(".ai");
const page = document.querySelector('.frontpage');

player.addEventListener('click', main);
AI.addEventListener('click', future);
function future()
{
    const futuremessage = document.querySelector('.future');
    futuremessage.textContent = "Coming Soon!"

}

X_turn = true;
X_class = 'X';
circle_class = 'O';
const blocks = document.querySelectorAll(".block");

function game()
{
    blocks.forEach(block => {
        block.addEventListener('click', display, {once:true})
    })
}

function display(block)
{
    block = block.target;
    if(X_turn)
        {
            block.textContent = X_class;
            block.classList.add(X_class);
            end_game(X_class);
            X_turn = false;
        }
    else
        {
            block.textContent = circle_class;
            block.classList.add(circle_class);
            end_game(circle_class);
            X_turn = true;
        }
}

function end_game(Class)
{
    if (check_win(Class))
        {
            result.textContent = `${Class} is Winner`;
            avoidClickOnResult('none');
            
            
        }
    else
    {
        isDraw();
    }
}

function isDraw()
{
    if([...blocks].every(cell => {
        return (cell.classList.contains(X_class) || cell.classList.contains(circle_class))
    }))
    {
        result.textContent = `Its a Draw`;
        avoidClickOnResult('none');
    }
}

const check_win = turn =>
{
    return winning_array.some(combination =>{
        return combination.every(index => {
            return blocks[index-1].classList.contains(turn);
        })
    })
}

function avoidClickOnResult(action)
{
    blocks.forEach(block => {
        block.style.pointerEvents = action;
    })
}

function clear_board()
{
    blocks.forEach(block => {
        block.textContent = "";
        if(block.classList.contains(X_class))
        {
            block.classList.remove(X_class);
        }
        if(block.classList.contains(circle_class))
        {
            block.classList.remove(circle_class);
        }

    })
    result.textContent = `Let's Play!!`;
    X_turn = true;
    avoidClickOnResult('auto');
    game();
}

function rematch()
{
    const restart = document.querySelector(".rematch");
    restart.addEventListener('click', clear_board);
}

function menu()
{
    const restart = document.querySelector(".menu");
    restart.addEventListener('click', ()=>{
        location.reload();
    })
}

function main()
{
    page.classList.add('hide');
    game();
    rematch();
    menu();
}