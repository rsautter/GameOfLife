let pauseB;
let zeroB;
let mat = randomMat(64,64);
let border = 60;
let pause = false;



function zeros(n,m){
  return Array(n).fill().map(()=>Array(m).fill(0));
}
function ones(n,m){
  return Array(n).fill().map(()=>Array(m).fill(1));
}
function randomMat(n,m){
  let output = Array(n).fill().map(()=>Array(m).fill(0));
  for(let i=0;i<n;i++)
    for(let j=0;j<m;j++)
      output[i][j] = (Math.random()>0.5);
  return output;
}

function drawMat(m){
  let w = m.length;
  let h = m[0].length;
  for(let i=0;i<w;i++){
    for(let j=0;j<h;j++){
      if(m[i][j]>0){
        fill([57, 255, 20]);
        circle(i*(width-border)/w+border/2, j*(height-border)/h+border/2, (width-border)/w);
      }
    }
  }
}

function setup() {
  frameRate(5);
  let canvas = createCanvas(700, 700);

  // start/pause button
  pauseB = createButton("Play/Pause");
  pauseB.style('font-size', '20px');
  pauseB.style('color', '#ffffff');
  pauseB.style('background-color', '#000000');
  pauseB.mousePressed(pauseCallback);
  
  //clean button
  zeroB = createButton("Extinction");
  zeroB.style('font-size', '20px');
  zeroB.style('color', '#ffffff');
  zeroB.style('background-color', '#000000');
  zeroB.mousePressed(extictionCallback);
  
  canvas.mousePressed(canvasClick);
}
function canvasClick(){
  if(pause){
    let w = mat.length;
    let h = mat[0].length;
    let i = w*(mouseX-border/2) /(width-border);
    let j = h*(mouseY-border/2)/(height-border);
    i = Math.floor(i);
    j = Math.floor(j);
    i = (i+w)%w;
    j = (j+h)%h;
    if(mat[i][j]>0) 
      mat[i][j] = 0;
    else
      mat[i][j] = 1;
  }
}

function pauseCallback(){
  pause = !pause;
}
function extictionCallback(){
  mat = zeros(mat.length,mat[0].length);
}

function updateState(){
  let future = zeros(mat.length,mat[0].length);
  let w = mat.length;
  let h = mat[0].length;
  
  for(let i=0;i<w;i++){
    for(let j=0;j<h;j++){
      let nn =  0;

      for(let k=-1;k<2;k++)
        for(let l=-1;l<2;l++){
          if(k==0 && l==0)
            continue;
          nn += mat[(i+k+w)%w][(j+l+h)%h];
        }
      
      future[i][j] = mat[i][j];
      //alive
      if(mat[i][j] == 1){
        if(nn<2)
          future[i][j] = 0;
        if(nn>3)
          future[i][j] = 0;
      }
      //dead
      else{
        if(nn==3)
          future[i][j] = 1;
      }
      
    }
  }
  mat = future;
}

function draw() {
  if(!pause)
    updateState();
  clear();
  background(0);
  drawMat(mat);
}
