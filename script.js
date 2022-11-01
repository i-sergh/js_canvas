const canvas = document.getElementById('cnv');
const ctx = canvas.getContext('2d');
const buttons = document.getElementsByClassName('controls');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const dots = [];
const mouse = {
    x: undefined,
    y: undefined,
}

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;

    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        ctx.fillStyle = 'tomato';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 11, 0, Math.PI * 2);
        ctx.fill();  
    }
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y ;
    
    dots.push([mouse.x,mouse.y]); 
    if (dots.length > 40){
        const firstElement  = dots.shift();
        removeCircle(firstElement[0], firstElement[1]) 
    }
    drawCircle('green');
})
 
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y ;
    drawCircle('tomato');
});
/*
function removeCircle(x, y){
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.fill();
}
*/
/*
function drawCircle(color){
    ctx.fillStyle = color;
    //ctx.strokeStyle = 'yellow';
    //ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
    ctx.fill();
    //ctx.stroke();
}
*/
function animate(){
    
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawCircle('red');
    requestAnimationFrame(animate);
}

animate()