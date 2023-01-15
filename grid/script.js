// https://ru.stackoverflow.com/questions/457233/%D0%9E%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BE%D1%80%D0%B4%D0%B8%D0%BD%D0%B0%D1%82-%D0%BC%D1%8B%D1%88%D0%B8-%D0%B2-canvas


const canvas = document.getElementById('cnv');
const ctx = canvas.getContext('2d');


canvas.width = 700;//window.innerWidth ;
canvas.height = 700;//window.innerHeight ;
const dotsArray = [];
const tilesArray = [];

const mouse = {
    x: undefined,
    y: undefined,
}

class Tile{
    constructor(x, y, width, height){
        this.x0 = x;
        this.y0 = y;

        this.width = width;
        this.height = height;

        this.color = 'rgba('+Math.random()*255 + ',' + Math.random()*255+','+ Math.random()*255+','+ Math.random()+')';
        
        this.x = x + width/2;
        this.y = y + height/2;
    }
    
    draw(){
        ctx.fillStyle = this.color;
        ctx.rect(this.x0, this.y0, this.width, this.height);
        ctx.fill();
    }

    recolor(){
        this.color = 'rgba('+Math.random()*255 + ',' + Math.random()*255+','+ Math.random()*255+','+ Math.random()+')';
    }
    
    update(){
        this.recolor();
        this.draw();
    }

    underMouse(x, y){
       
        
        
        if(x > this.x0 && x <this.width
            && y > this.y0 && y < this.height )
            {
                 console.log(this.x0,
                    this.y0,
                    this.width,
                    this.height,
                     x, y);
                     this.recolor(); 
                     this.draw();
                return true
            }
        else{
            return false
        }    
        
    }

};

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
        this.x += 10;
    }

    moveLeft(){
        this.x -= 10;
    }

    moveUp(){
        this.y -= 10;
    }

    moveDown(){
        this.y += 10;
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

function grid(){

    for (let i = 0; i <= canvas.width; i=i+28){
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#002f50';

        // vertical
        ctx.beginPath(); // Start a new path
        ctx.moveTo(i, 0); // Move the pen to (30, 50)
        ctx.lineTo(i, 700); // Draw a line to (150, 100)
        ctx.stroke();

        // horizontal
        ctx.beginPath(); // Start a new path
        ctx.moveTo(0, i); // Move the pen to (30, 50)
        ctx.lineTo(700, i); // Draw a line to (150, 100)
        ctx.stroke();
    };
    
}

function addTiles(){
    for (let i = 0; i <= 700; i=i+56){
        for (let j = 0; j <= 700; j=j+56){
            let tile1 = new Tile(i+1, j+1, 26, 26);
            tilesArray.push(tile1);
        }
    }
}


function handleParticles(){
    for (let i = 0; i < dotsArray.length; i++){
        dotsArray[i].update();
        dotsArray[i].draw();
    }
    for (let i = 0; i < tilesArray.length; i++){  
        tilesArray[i].update();
    }
};

canvas.addEventListener('mousemove', function (e) { 
    var x = e.pageX - e.target.offsetLeft,
        y = e.pageY - e.target.offsetTop; 
    
    for (let i = 0; i < dotsArray.length; i++){
        dotsArray[i].setTarget(x, y)
    }
    
    for (let i = 0; i < tilesArray.length; i++){
        //console.log(tilesArray[i].underMouse(x, y));
        if (tilesArray[i].underMouse(x, y))
            tilesArray[i].recolor();
    }
    
});
canvas.addEventListener('click', function(event){
        
        let particle = new Dot();
        particle.idx = dotsArray.length;
        particle.x = Math.random()*canvas.width;
        particle.y = Math.random()*canvas.height;
        dotsArray.push(particle);
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
    grid();
    handleParticles();
    
    requestAnimationFrame(animate);
    
}
addTiles();
animate()
