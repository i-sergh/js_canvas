const canvas = document.getElementById('cnv');
const ctx = canvas.getContext('2d');
const buttons = document.getElementsByClassName('controls');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = Math.random() * 360;

const particlesArray = [];
const dots = [];
const mouse = {
    x: undefined,
    y: undefined,
}

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.hue = hue;
        this.dhue = Math.random()*4-2;
        //this.x = Math.random() * canvas.width;
        //this.y = Math.random() * canvas.height;
        this.size = Math.random() * 20 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;

    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2 ) this.size -= 0.1;
        this.hue = this.hue + this.dhue;
    }
    draw(){
        ctx.fillStyle = 'hsl('+ this.hue +',100%,70%)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
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
    
    for (i = 0; i < Math.random() * 2 + 2; i++)
        particlesArray .push(new Particle());
    //dots.push([mouse.x,mouse.y]); 
    //if (dots.length > 40){
    //    const firstElement  = dots.shift();
        //removeCircle(firstElement[0], firstElement[1]) 
    //}
    //drawCircle('green');
})
 
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y ;
    for (i = 0; i < Math.random() * 100; i++){
        let particle = new Particle();
        particle.speedX = particle.speedX * 5;
        particle.speedY = particle.speedY * 5;
        particlesArray .push(particle);
    }
    //drawCircle('tomato');
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

//function init(){
//    for (let i = 0; i < 100; i++){
//        particlesArray.push(new Particle() );
//    }

//}
//init()
//console.log(particlesArray)

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100){
                
                ctx.beginPath();
                ctx.strokeStyle = 'hsl(' + particlesArray[i].hue + ',100%, 80%)';
                ctx.lineWidth = particlesArray[i].size/100;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke()
                ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawCircle('red');
    //ctx.fillStyle ='rgba(0,0,0,0.1)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
    hue ++;
}

animate()