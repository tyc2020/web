//自调用小蛇
(function(){
    var elements=[];
    function Snake(width,height,direction){
        this.width=width||20;
        this.height=height||20;

        this.direction=direction|| "right";
        this.body=[
            {x:3,y:2,color:"red"},
            {x:2,y:2,color:"orange"},
            {x:1,y:2,color:"orange"},
        ];
    }
    Snake.prototype.init=function(map){

        remover();

        for(var i=0;i<this.body.length;i++){
            var obj=this.body[i];
            var div=document.createElement("div");
            map.appendChild(div);
            div.style.position="absolute";
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";   
            div.style.left=obj.x*this.width+"px";
            div.style.top=obj.y*this.height+"px";
            div.style.backgroundColor=obj.color;

            elements.push(div);
        }
    }

    Snake.prototype.move=function(food,map){
        var i=this.body.length-1;
        for(;i>0;i--){
            this.body[i].x=this.body[i-1].x
            this.body[i].y=this.body[i-1].y
        }
        switch(this.direction){
            case "right":this.body[0].x+=1;break;
            case "left":this.body[0].x-=1;break;
            case "top":this.body[0].y-=1;break;
            case "bottom":this.body[0].y+=1;break;
        }
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;

        //判断吃食物
        if(headX==food.x&&headY==food.y){
            var last=this.body[this.body.length-1]
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            })
            food.init(map);
        }
    }

    function remover(){
        var i=elements.length-1;
        for(;i>=0;i--){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }

    }
    window.Snake=Snake;
}());
//自调用函数--游戏对象
(function(){
    var that=null;
    //游戏的构造函数
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this;

    }
    //蛇初始化方法
    Game.prototype.init=function(){
        this.food.init(this.map);
        this.snake.init(this.map);
         

        // setInterval(function(){
        //     that.snake.move(that.food,that.map);
        //     that.snake.init(that.map); 
        // },150);
        
        this.runSnake(this.food,this.map)
        this.bindKey()
    };

    //原型方法--小蛇自动移动
    Game.prototype.runSnake=function(food,map){
        var timeId=setInterval(function(){
            this.snake.move(food,map)
            this.snake.init(map)
            //横纵坐标的最大值
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offsetHeight/this.snake.height;
            //蛇头坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            //判断撞墙
            if(headX<0||headX>=maxX){
                clearInterval(timeId);
                alert("Game over!")
            }
            if(headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("Game over!")
            }

        }.bind(that),150)
    } 

    //原型方法--按键控制蛇
    Game.prototype.bindKey=function(){
        document.addEventListener("keydown",function(e){
            switch(e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false)

    }


    window.Game=Game;

}
());



