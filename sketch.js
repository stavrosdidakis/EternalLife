/*
References:
1 - https://p5js.org/examples/math-noise-wave.html
     - What the wave like line you see is inpired from
2 - The Color change was inspired from an in class
    example when we were learning Perlin noise and how
    to use the map function as well. I unfortunalty
    cannot find the specific example, I do apologize.
*/


/*
NOTE
This is a little off of what I intended to create originally
but I honostly like this more. I still have the flower concept in
mind however its more fluid now and I focused more on how to make it
interactive. With the Final I hope to create more interactivity. In
this I called it the flower of life because as I was playing with it
myself, when draging the mouse diagonally back and forth it created

 feedback:
 - make the controls all based around the mouse pad for consistency
 -make the rotate angle controlable by the user
 -possible have buttons to control different color values and other values that i have made easy to change.
 -possibly can utilize data or sound to control the positions rather than the mousefff

interaction ideas:
-- control 1: move your mouse around!
-- control 2: press mouse pad to change from solid to fade.

*/

let peddle = [];
let peddleCount = 6;//changes the number of peddles--6 and 12 are my fav
let flowerBud;
let frequency = 20;
let fBColor;


function setup() {


  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < peddleCount; i++){
    peddle.push(new peddleMovement());
  } // this here is what makes it possible to make mulitple peddles

  flowerBud = new fB(width/2, height/2);


}

function draw() {
  if (mouseIsPressed == true) {
    background(0,10);
  }


  for (let i = 0; i < peddleCount; i++){
    peddle[i].update(i);
  }

  flowerBud.display();


}

function peddleMovement(){ //this is were the 1st reference was used for inspo
  this.size = 20;
  this.yoff = 0;
  this.rotate = 0;

  this.update = function(k) {  // this makes a function inside a function
  this.rotate += 0.015; // speed of rotation
   let xoff = 0;
   let yoff = this.yoff;

   ///color -- code inspo from in class lesson
  let freqR = frameCount * 0.02;
  let freqG = frameCount * 0.04;
  let freqB = frameCount * 0.08;
  let colNoiseR = map(noise(freqR), 0, 1, 0,255);
  let colNoiseG = map(noise(freqG), 0, 1, 0, 255);
  let colNoiseB = map(noise(freqB), 0, 1, 0, 255);
    ///

    push();
    translate(width/2,height/2);
    rotate(this.rotate+k);
    strokeWeight(2);
    stroke(255);
    fill(colNoiseR,colNoiseG,colNoiseB);
    beginShape();
    for (let x = 0; x < height/2; x+= this.size){ //change the height/# for differnt sizes of the line. The hight the number the smaller the line gets.
      let y = map(noise(xoff,yoff),0,1,-this.size*8,this.size*8);
      vertex(mouseX+ x - 300,mouseY+ y - 300); //the -300 helps so the mouse starts in the middle -- makes it easier for the user to mess around with design

    //different Ideas for peddle design
      //bezierVertex(x+this.size+10,-y,x+this.size,150,x+this.size+190,y+200); //more peddle-like

      // vertex(20,y);
      // vertex(x,20);
    //
      xoff += 0.09; // controls size of waves
  }
    this.yoff += 0.01; // controls the speed at which the wave will move
    endShape();
    pop();

  }
}


class fB {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = random(100,150);
    this.tone = 100 + random(1,155);
  }
  display() {
    fill(255,this.tone,102,10);
    noStroke();
    ellipse(this.x, this.y, this.dia, this.dia);
  }
}
