var mago;
var magoimg;
var pulando;
var solo;
var soloimg;
var wand1;
var wandimg;
var fogo;
var fireimg;
var fireGroup; //grupo
var robot;
var robotimg;
var robotGroup; //grupo
var robotM = []; //matriz
var robotHp1 = 4, robotHp2 = 4, robotHp3 = 4, robotHp4 = 4;
var defesaimg;
var potencializadorimg;
var velocidadeimg;
var invulnerabilidadeimg;
var defesa;
var invulnerabilidade;
var velocidade;
var potencializador;
var fogos = [];

var eliminou1 = false, eliminou2 = false, eliminou3 = false, eliminou4 = false;

var robot1, robot2, robot3, robot4;
var permissao = true;

function preload()
{
magoimg = loadImage("Sprites/Mago.png");
pulando = loadImage ("Sprites/pulando.png");
soloimg = loadImage("Sprites/Solo.png");
wandimg = loadImage ("Sprites/wand1.png");
fireimg = loadImage ("Sprites/fire.gif")
robotimg = loadAnimation ("Sprites/robot1.png", "Sprites/robot2.png", "Sprites/robot3.png", "Sprites/robot4.png", "Sprites/robot5.png", "Sprites/robot6.png", "Sprites/robot7.png")
velocidadeimg = loadImage ("Sprites/velocidade.png");
invulnerabilidadeimg = loadImage ("Sprites/invulnerabilidade.png");
potencializadorimg = loadImage ("Sprites/potencializador.png");
defesaimg = loadImage ("Sprites/defesa.png");
}

function setup() {
	//criando tela
	createCanvas(1200, 700);
	//criando sprites
	mago = createSprite(40, 550);
	mago.addImage("mago", magoimg);
  mago.addImage("pulando", pulando);
	mago.scale = 0.4;

	solo = createSprite(600, 650);
	solo.addImage(soloimg);
	solo.scale = 5;

  wand1 = createSprite(mago.x, mago.y-150);
  wand1.addImage("wand1", wandimg);
  wand1.scale = 0.06;

  //criando grupo
  fireGroup = new Group();

  //sprites da onda
  wave();
}


function draw() {
  background("gray");

  //colisão do mago com o solo
  mago.collide(solo);

  //movimentação do mago
  if (keyDown("w") && mago.y == 483.6){
    mago.velocityY = -10;
    mago.changeImage("pulando");
  }
  else{
    setTimeout(()=> {
      mago.changeImage("mago");
    }, 200);
  }

  if (keyDown("d")){
    mago.x += 15;
  }

  if (keyDown("a")){
	  mago.x -= 15;
  }

  //console.log(mago.y);
  mago.velocityY += 2;

//ataque do mago
  if (keyDown("SPACE")){
    shooting();
  }

  //movimentação da varinha
  wand1.x = mago.x-20;
  wand1.y = mago.y-30;

  wand1.rotation = mouseX/6-90;
  //console.log("mouse", mouseX);
  //console.log("mouse wand", wand1.rotation);

  console.log("HP" + robotHp1);

  //movimentação dos robos
  for(i=0; i<4; i++){
    robotM[i].x = mago.x - 100*i;
    robotM[i].velocityY = 0.5;
  }

  //colisão dos robos
  if(fireGroup.collide(robotM[0])){
    robotHp1 -= 1;
    fireGroup.destroyEach();
  }

  if(fireGroup.collide(robotM[1])){
    robotHp2 -= 1;
    fireGroup.destroyEach();
  }

  if(fireGroup.collide(robotM[2])){
    robotHp3 -= 1;
    fireGroup.destroyEach();
  }

  if(fireGroup.collide(robotM[3])){
    robotHp4 -= 1;
    fireGroup.destroyEach();
  }

  //destruição dos robos
  if(robotHp1 == 0){
  robotM[0].destroy();
  eliminou1 = true;
  console.log("e1: "+eliminou1);
  robotHp1 = 4;
  }

  if(robotHp2 == 0){
    robotM[1].destroy();
    eliminou2 = true;
    console.log("e2: "+eliminou2);
    robotHp2 = 4;
  }

  if(robotHp3 == 0){
    robotM[2].destroy();
    eliminou3 = true;
    console.log("e3: "+eliminou3);
    robotHp3 = 4;
  }

  if(robotHp4 == 0){
    robotM[3].destroy();
    eliminou4 = true;
    console.log("e4: "+eliminou4);
    robotHp4 = 4;
  }

  //chamada do cart
  if(eliminou1 && eliminou2 && eliminou3 && eliminou4){
     cards();
  }

  drawSprites();
 
}

function shooting(){ 
fogo = createSprite(wand1.x, wand1.y-55);
fogo.addImage("fire", fireimg);
fogo.setSpeedAndDirection(10, mouseX/6+180);
console.log("fogoX", fogo.x);
console.log("fogoY", fogo.y);
fogo.lifeTime = 50;
fireGroup.add(fogo);
}
function wave(){
 
  for(var i = 0; i<4; i++){
      robot = createSprite (250*i, 100);
      robot.addAnimation ("robô", robotimg);
      robot.scale = 0.07;
      robotM.push(robot);
    }
  }

  function wave2(){
 
  for(var i = 0; i<10; i++){
      robot = createSprite (250*i-2, 100);
      robot.addAnimation ("robô", robotimg);
      robot.scale = 0.07;
      robotM.push(robot);
    }
  }

function cards(){
  console.log("chamou cards");
  defesa = createImg("Sprites/defesa.png");
  defesa.position(350, 50);
  defesa.size(500, 500);
  defesa.mouseClicked(fcDefesa);

  eliminou1 = false;
  eliminou2 = false;
  eliminou3 = false;
  eliminou4 = false;

}

function fcDefesa(){
  console.log("clicou");
  defesa.hide();
  wave2();
}

