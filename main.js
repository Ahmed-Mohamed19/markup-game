document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("What is your name?");
    if(yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    };
    document.querySelector(".control-buttons").remove();
    document.getElementById('intro').play();
    gameOn();
}

let duration = 1000;

let blocksContainer = document.querySelector(".memory-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function() {
        flipBlock(block);
    })
});

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if(allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatching(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

function stopClicking() {
    blocksContainer.classList.add('no-clicking')
    setTimeout(() => {
    blocksContainer.classList.remove('no-clicking')
    }, duration)
}

function checkMatching(firstBlock, secondBlock) {
    let triesNumber = document.querySelector('.tries span');
    if(firstBlock.dataset.car == secondBlock.dataset.car) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        document.getElementById('success').play();
    } else {
        triesNumber.innerHTML = parseInt(triesNumber.innerHTML) + 1
        triesNumber.style.color = 'red';
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
        document.getElementById('fail').play();
    }
}

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0 ) {
        random = Math.floor(Math.random() * current);
        current--; 
        temp = array[current];
        array[current] = array[random]
        array[random] = temp;
    }
    return array
}

function gameOn() {
    var paused = false;
    let time = document.querySelector(".timer span");
    setInterval(() => {
            if(!paused){
                (time.innerHTML)--;
                if (time.innerHTML <= 5){
                time.style.color = 'red'
            }
            if (time.innerHTML == 0){
                paused = true;
                const finish = document.createElement('div');
                finish.className = "finish-buttons";
                const end = document.createElement('div');
                end.className = "end";
                end.innerText += "Game over!" ;
                const restart = document.createElement('div');
                restart.className = "restart";
                restart.innerText += "Restart" ;
                finish.appendChild(end);
                finish.appendChild(restart);
                document.body.append(finish);
                restart.addEventListener('click', function () {
                    time.innerHTML = 20;
                    paused = false;
                    let triesNumber = document.querySelector('.tries span');
                    triesNumber.innerHTML = 0;

                    time.style.color = 'rgb(58, 214, 58)';

                    let flippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
                    flippedBlocks.forEach(flippedBlock => {flippedBlock.classList.remove('is-flipped')})

                    let matchedBlocks = blocks.filter(matchedBlock => matchedBlock.classList.contains('has-match'));
                    matchedBlocks.forEach(matchedBlock => {matchedBlock.classList.remove('has-match')})

                    
                    let yourName = prompt("What is your name?");
                    if(yourName == null || yourName == "") {
                        document.querySelector(".name span").innerHTML = "unknown";
                    } else {
                        document.querySelector(".name span").innerHTML = yourName;
                    };
                    document.querySelector(".finish-buttons").remove();
                    
                    document.getElementById('intro').play();
                    startTimer();
                } );
            }
        }
        }, duration);
}


/*
1. let user decide about game duration ...
2. shuffle again after restart ...
3. save each user in local storage and reflect in UI as a leader board ...
4. choose the no. of blocks to be dynamically generated as a difficulty level ...
*/