const W = window.screen.width;
const H = window.screen.height;
var l = 0
if((W-30)/4>(H-30)/8){
	l = (H-30)/8-20
}else{
	l = (W-30)/4-20
}
const r = l / 2

var state = 0

var me = true

window.onload = () => {
	const canvas = document.getElementById("can")
	ctx = canvas.getContext('2d')

	const canvasW = window.screen.width;
	const canvasH = window.screen.height;
	canvas.width = canvasW;
	canvas.height = canvasH;

	let chess = [[1,1,1,1,1,1,0,0],[1,1,1,1,1,1,0,0],[1,1,1,1,1,1,0,0],[1,1,1,1,1,1,0,0]]

	addAll(chess)
	
	canvas.onclick = function (e){
		let x = e.offsetX-15;
		let y = e.offsetY-15;
		let i = Math.floor(x / ((W-30)/4))
		let j = Math.floor(y / ((H-30)/8))

		if (state==0) {
			var gunNum=0
			try{
				for (let x = 0; x < chess.length; x++) {
					for (let y = 0; y < chess[x].length; y++) {
						if (chess[x][y] == -1) {
							gunNum+=1
						}
					}
				}
				if (gunNum==3) {
					state=1
				}else{
					if (chess[i][j]==0) {
						chess[i][j]=-1
						addGun(i,j)
					}
				}
			}catch(e){
				console.log("请点击棋盘内")
			}
			
			
		}

		if (state==1) {
			if (me) {
				me = !me
			}else{
				me = !me
			}
			console.log(me)
		}
	}
	
}

function addAll(chess){
	
	ctx.clearRect(0,0,W,H)

	logo(W,H)
	.then(()=>{
		chessBoard(W,H)
		.then(()=>{
			for (let i = 0; i < chess.length; i++) {
				for (let j = 0; j < chess[i].length; j++) {
					if (chess[i][j]==1) {
						addChess(i,j)
					}

					if (chess[i][j]==-1) {
						addGun(i,j)
					}
				}
			}
		})
	})

	
}

function logo(W,H){
	return new Promise((resolve,reject)=>{
		const logo = new Image();
		logo.src = 'images/logo.png'
		logo.onload = () => {
			ctx.drawImage(logo,82,220,250,250)
			resolve() 
		}
		
	})
}

function chessBoard(W,H){
	return new Promise((resolve,reject)=>{
		for (var i = 0; i < 5; i++) {
			ctx.moveTo(15+((W-30)/4*i),15);
			ctx.lineTo(15+((W-30)/4*i),H-15);
			ctx.strokeStyle = '#888'
			ctx.stroke()
		}
		for (var i = 0; i < 9; i++) {
			ctx.moveTo(15,15+((H-30)/8*i));
			ctx.lineTo(W-15,15+((H-30)/8*i));
			ctx.strokeStyle = '#888'
			ctx.stroke()
		}
		resolve()
	})
}

function addChess(i,j) {
	ctx.beginPath();
	ctx.arc(15+((W-30)/4*i)+(W-30)/8 , 15+((H-30)/8*j)+(H-30)/16 , r , 0 , 2 * Math.PI,true);
	ctx.closePath();
	let grd = ctx.createRadialGradient(((W-30)/4*i)+(W-30)/8+5 , 15+((H-30)/8*j)+(H-30)/16+5, r-5,((W-30)/4*i)+(W-30)/8+5 , 15+((H-30)/8*j)+(H-30)/16+5, 0 )
	grd.addColorStop(0 , "#0A0A0A")
	grd.addColorStop(1 , "#626766")
	ctx.fillStyle = grd;
	ctx.fill()
}

function addGun(i,j){
	const gun = new Image();
	gun.src = 'images/gun.png'
	gun.onload = () => {
		ctx.drawImage(gun,15+((W-30)/4*i)+10,15+((H-30)/8*j)+10,l,l)
	}
}