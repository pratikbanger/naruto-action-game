const bgMusic = new Audio('bgMusic.mp3');
const jumpSFX = new Audio('jumpSFX.mp3');
const dieSFX = new Audio('dieSFX.mp3');
const gameOverSFX = new Audio('gameOverSFX.mp3');

cross = true;

document.onkeydown = function (e) {

    rightRunning = document.querySelector('.narutoStanding');
    leftRunning = document.querySelector('.leftRunning');

    if (e.keyCode == 38) {

        // Adding animation
        rightRunning.classList.add('narutoAnimation');
        leftRunning.classList.add('narutoAnimation');
        jumpSFX.play();

        setTimeout(() => {
            rightRunning.classList.remove('narutoAnimation');
            leftRunning.classList.remove('narutoAnimation');
        }, 550)
    }
    if (e.keyCode == 39) {

        rightRunning.classList.remove('d-none')
        leftRunning.classList.add('d-none')

        narutoX = parseInt(window.getComputedStyle(rightRunning, null).getPropertyValue('left'));
        rightRunning.style.left = (narutoX + 100) + "px";
        leftRunning.style.left = (narutoX + 100) + "px";
        
    }
    if (e.keyCode == 37) {
        
        leftRunning.classList.remove('d-none');
        rightRunning.classList.add('d-none');
        
        narutoX = parseInt(window.getComputedStyle(leftRunning, null).getPropertyValue('left'));
        rightRunning.style.left = (narutoX - 100) + "px";
        leftRunning.style.left = (narutoX - 100) + "px";
    }
}

setInterval(() => {
    rightRunning = document.querySelector('.narutoStanding');
    gameOver = document.querySelector('.gameOver');
    villain = document.querySelector('.villaingObstacle');

    narutoX = parseInt(window.getComputedStyle(rightRunning, null).getPropertyValue('left'));
    narutoY = parseInt(window.getComputedStyle(rightRunning, null).getPropertyValue('top'));

    villainX = parseInt(window.getComputedStyle(villain, null).getPropertyValue('left'));
    villainY = parseInt(window.getComputedStyle(villain, null).getPropertyValue('top'));

    offsetX = Math.abs(narutoX - villainX);
    offsetY = Math.abs(narutoY - villainY);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.style.visibility = 'visible';
        villain.classList.remove('villainAnimation');
        bgMusic.pause();
        setTimeout(() => {
            dieSFX.play();
        }, 10);
        setTimeout(() => {
            gameOverSFX.play();
            bgMusic.pause();
        }, 500);
    }
    else if (offsetX < 145 && cross) {
        cross = false;

        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            animationDuration = parseFloat(window.getComputedStyle(villain, null).getPropertyValue('animation-duration'));
            newDuration = animationDuration - 0.1;
            villain.style.animationDuration = newDuration + 's';
        }, 500);
    }

}, 10);

// Logic to play background music
let playMusic = document.getElementsByClassName('fa-solid');
Array.from(playMusic).forEach(element => {
    element.addEventListener('click', () => {
        if (element.classList.contains("fa-volume-xmark")) {
            bgMusic.play();
            element.classList.remove("fa-volume-xmark");
            element.classList.add("fa-volume-high");
        }
        else {
            bgMusic.pause();
            element.classList.add("fa-volume-xmark");
            element.classList.remove("fa-volume-high");
        }
    });
});