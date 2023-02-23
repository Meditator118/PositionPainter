export class Point{
    x:number
    y:number
    index:number
    cvsCtx:CanvasRenderingContext2D
    path:Path2D
    tag:number
    theta:number
    constructor(x:number,y:number,index:number
        ,cvsCtx:CanvasRenderingContext2D,tag:number,theta:number){
        this.x=x
        this.y=y
        this.tag=tag
        this.index=index
        this.cvsCtx=cvsCtx
        this.theta=theta
        this.path = new Path2D();
        
    }
   
    draw(){
       if(this.tag){
        this.cvsCtx.beginPath();
        // this.cvsCtx.fillStyle = 'blue';
        // this.cvsCtx.fillRect(this.x-5, this.y-5, 10, 10);
        this.cvsCtx.fillStyle = 'blue';
        this.path.arc(this.x, this.y, 8, 0, 2*Math.PI, false);
        this.cvsCtx.fill(this.path)
        this.cvsCtx.closePath();
       }else{
        this.cvsCtx.save()
            let img=new Image()
          img.src='../../public/icon/dis.svg'
          img.onload=()=>{
            this.path.arc(this.x, this.y,8, 0, 2*Math.PI, false);
            this.cvsCtx.fill(this.path)
            this.cvsCtx.translate(this.x, this.y)
            this.cvsCtx.rotate(((this.theta-45)/180)*Math.PI)
            this.cvsCtx.drawImage(img, -15, -15,30, 30);
            this.cvsCtx.restore()

        }

       }
    }

}