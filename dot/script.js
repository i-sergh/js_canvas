// https://ru.stackoverflow.com/questions/457233/%D0%9E%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B0%D1%82-%D0%BC%D1%8B%D1%88%D0%B8-%D0%B2-canvas


const canvas = document.getElementById('cnv');
const ctx = canvas.getContext('2d');


canvas.width = 500;//window.innerWidth ;
canvas.height = 500;//window.innerHeight ;
const dotsArray = [];

const mouse = {
    x: undefined,
    y: undefined,
}


class Dot{
    constructor(){
        
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 10;
        this.idx = null;
        this.color = 'rgba('+Math.random()*255 + ',' + Math.random()*255+','+ Math.random()*255+','+ Math.random()+')';

        this.targetX = this.x;
        this.targetY = this.y;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();  
    }
    update(){
        if (this.targetX > this.x) this.moveRight();
        if (this.targetX < this.x) this.moveLeft();
        if (this.targetY < this.y) this.moveUp();
        if (this.targetY > this.y) this.moveDown();

        //if (Math.abs(this.x - this.targetX < 20)) this.targetX = this.x;
        //if (Math.abs(this.y - this.targetY < 20)) this.targetY = this.y;

        if (this.size > 1 ) 
        {
            this.size -= 0.1;
        }
        else{
            this.recolor();
        }
        
    }
    moveRight(){
        this.x += 5;
    }

    moveLeft(){
        this.x -= 5;
    }

    moveUp(){
        this.y -= 5;
    }

    moveDown(){
        this.y += 5;
    }

    recolor(){
        this.size = Math.random() * 40 + 10;
        this.color = 'rgba('+Math.random()*255 + ',' + Math.random()*255+','+ Math.random()*255+','+ Math.random()+')';
    }

    setTarget(x, y){
        this.targetX = x;
        this.targetY = y;
    }
}

function delElemrnt(idx){
    dotsArray[idx] = null;    
}

function handleParticles(){
    for (let i = 0; i < dotsArray.length; i++){
        dotsArray[i].update();
        dotsArray[i].draw();
    }
};

canvas.addEventListener('mousemove', function (e) { 
    var x = e.pageX - e.target.offsetLeft,
        y = e.pageY - e.target.offsetTop; 
    //ctx.clearRect(0,0,100,100);
    //ctx.beginPath();
    //ctx.arc(x,y,5,0,Math.PI*2,true);
    //ctx.stroke();
    for (let i = 0; i < dotsArray.length; i++){
        dotsArray[i].setTarget(x, y)
    }
});
canvas.addEventListener('click', function(event){
        
        let particle = new Dot();
        particle.idx = dotsArray.length;
        particle.x = event.x;
        particle.y = event.y-300;
        dotsArray.push(particle);

        for (let i = 0; i < dotsArray.length; i++){
            dotsArray[i].setTarget(event.x, event.y-300)
        }
    });

/*    
window.addEventListener('resize', function(){
    canvas.width = 500;//window.innerWidth;
    canvas.height = 500;//window.innerHeight;

});
*/

window.addEventListener('keydown', function(event){
    //console.log(event.isComposing);
    //console.log(event.key);
    
    //console.log('ArrowUp');
    if (event.key == 'ArrowUp'){
        for (let i = 0; i < dotsArray.length; i++){
            dotsArray[i].moveUp();
        }
    }
    else if  (event.key == 'ArrowDown'){
        for (let i = 0; i < dotsArray.length; i++){
            dotsArray[i].moveDown();
        }
    }
    else if  (event.key == 'ArrowLeft'){
        for (let i = 0; i < dotsArray.length; i++){
            dotsArray[i].moveLeft();
        }
    }
    else if  (event.key == 'ArrowRight'){
        for (let i = 0; i < dotsArray.length; i++){
            dotsArray[i].moveRight();
        }
    }
});


function animate(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
    
}
//console.log(window.getComputedStyle(canvas))
animate()