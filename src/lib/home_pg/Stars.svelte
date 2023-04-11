<!-- <script>
// @ts-nocheck

	import { browser } from '$app/environment';
	import { error } from '@sveltejs/kit';
  import { onDestroy } from 'svelte';
    

    export const ssr = false

    let particle = {}

    onDestroy(() => { 
      if(browser)
        window.removeEventListener('resize',particle.render)
    })

    class Particles{

constructor(){
        this.colors = [
    '255, 255, 255',
    ];
    //particle radius min/max
    this.minRadius = 0; 
    this.maxRadius = 1.5;
    //particle opacity min/max
    this.minOpacity = 0;
    this.maxOpacity = 1;
    //particle speed min/max
    this.minSpeed = .005;
    this.maxSpeed = .1;
    //frames per second 
    this.fps = 60;
    //number of particles
    this.numParticles = 500;
    //required canvas letiables
    this.canvas = document.getElementById('canvas-starry');

    if(!this.canvas){
        
    }
    this.ctx = this.canvas.getContext('2d');
}

init = () => {
    this.ctx.webkitImageSmoonormalgEnabled = false;
    this.ctx.mozImageSmoonormalgEnabled = false;
    this.ctx.imageSmoonormalgEnabled = false;

    console.count()
this.render();
this.createCircle();
}

/**
* generates random number between min and max values
* @param  {number} min value
* @param  {number} max malue
* @return {number} random number between min and max
* @method _rand
*/
_rand = (min, max) => {
return Math.random() * (max - min) + min;
}

/**
* Sets canvas size and updates values on resize
* @method render
*/
render = () => { 
console.count()

let self = this
    
 



self.wWidth = 4000
self.wHeight = 4000


 window.addEventListener('resize', this.render)
}

/**
* Randomly creates particle attributes
* @method createCircle
*/
createCircle = () => {
let particle = [];

for (let i = 0; i < this.numParticles; i++) {
  let self = this, color = self.colors[~~(self._rand(0, self.colors.length))];
  
  particle[i] = {
    radius    : self._rand(self.minRadius, self.maxRadius),
    xPos      : self._rand(0, this.wWidth),
    yPos      : self._rand(0, this.wHeight/this.numParticles * i),
    xVelocity : self._rand(self.minSpeed, self.maxSpeed),
    yVelocity : self._rand(self.minSpeed, self.maxSpeed),
    color     : 'rgba(' + color + ',' + self._rand(self.minOpacity, self.maxOpacity) + ')'
  }
  
  //once values are determined, draw particle on canvas
  self.draw(particle, i);
}
//...and once drawn, animate the particle
this.animate(particle);
}

/**
* Draws particles on canvas
* @param  {array} Particle array from createCircle method
* @param  {number} i value from createCircle method
* @method draw
*/
draw = (particle, i) => {
let self = this,
    ctx = self.ctx;

this.ctx.fillStyle = particle[i].color;

this.ctx.beginPath();
this.ctx.arc(particle[i].xPos, particle[i].yPos, particle[i].radius, 0, 2 * Math.PI, false);
this.ctx.fill();
}

/**
* Animates particles 
* @param  {array} particle value from createCircle & draw methods
* @method animate
*/
animate = (particle) => {
let self = this, ctx = self.ctx;

setInterval(function(){
  //clears canvas
  self.clearCanvas();
  //then redraws particles in new positions based on velocity
  for (let i = 0; i < self.numParticles; i++) {
    particle[i].xPos += particle[i].xVelocity;
    particle[i].yPos -= particle[i].yVelocity;
   
    //if particle goes off screen call reset method to place it offscreen to the left/bottom
    if (particle[i].xPos > this.wWidth + particle[i].radius || particle[i].yPos > this.wHeight + particle[i].radius) {
      self.resetParticle(particle, i);
    } else {
      self.draw(particle, i);
    }
  }  
}, 1000/self.fps); 
}

/**
* Resets position of particle when it goes off screen
* @param  {array} particle value from createCircle & draw methods
* @param  {number} i value from createCircle method
* @method resetParticle
*/
resetParticle = (particle, i) => {
let self = this;

let random = self._rand(0, 1);

if (random > .5) { 
  // 50% chance particle comes from left side of window...
  particle[i].xPos = -particle[i].radius;
  particle[i].yPos = self._rand(0, this.wWidth);
} else {
  //... or bottom of window
  particle[i].xPos = self._rand(0, this.wWidth);
  particle[i].yPos = this.wHeight + particle[i].radius;   
}
//redraw particle with new values
self.draw(particle, i);
}

/**
* Clears canvas between animation frames
* @method clearCanvas
*/
clearCanvas = () => {
this.ctx.clearRect(0, 0, 10000, 10000);
}




// go go go!

}






        /**
 * Generates random particles using canvas
 * 
 * @class Particles
 * @constructor
 */
 




   
        
    

</script>
<div class=" h-screen w-screen overflow-hidden">
    <canvas id="canvas-starry" class="canvasstar"  width="4000" height="4000" on:load={new Particles().init()}></canvas>
</div>



<style>
    .canvasstar {

    image-rendering: -webkit-optimize-contrast;

}
</style> -->