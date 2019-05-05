/// <reference path="knockout-3.4.2.js" />

/************************初始化背景界面******************************/

/************************viewModel******************************/
//定义一个小盒子的属性
function BoxViewModel(hIndex, vIndex) {
    var self = this;
    self.Marked = ko.observable(false);//初始标记为false
    self.HIndex = hIndex;//列坐标
    self.VIndex = vIndex;//行坐标	
    self.Color = ko.observable(false);
}

function BoxRowViewModel(vIndex, size) {
    var self = this;
    self.Size = size;//列长度
    self.VIndex = vIndex;//行索引
    self.Boxes = ko.observableArray([]);//每个盒子的数组

    //给一行添入一个一个的div
    for (var h = 0; h < size; h++) {
        self.Boxes.push(new BoxViewModel(h, vIndex));
    }

    //行的标记用来判断行是否可以消除
    self.Marked = ko.computed(function () {
        var marked = true;
        //判断该行的每个小盒子是否被标记，没有被标记返回false
        for (var index = 0; index < self.Size; index++) {
            if (!self.Boxes()[index].Marked()) {
                marked = false;
                break;
            }
        }
        return marked;
    });
}

//组合块
function BlocksShapeViewModel(randomNum, x, y) {
    var self = this;
    self.X = x;
    self.Y = y;
    self.RandomNum = randomNum;
    self.BlocksArr = ko.observableArray([]);//数组

    switch (self.RandomNum) {
        case 0://z x,y
            var n = 0;
            self.BlocksArr.splice(n, 1, [self.X, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y - 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y + 1]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y]);
            //self.BlocksArr.push([self.X, self.Y], [self.X, self.Y - 1], [self.X + 1, self.Y], [self.X + 1, self.Y + 1], [self.X, self.Y]); 
            break;
        case 1://反z x+1,y
            var n = 0;
            self.BlocksArr.splice(n, 1, [self.X + 1, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y + 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y - 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y]);
            //self.BlocksArr.push([self.X + 1, self.Y], [self.X, self.Y], [self.X, self.Y + 1], [self.X + 1, self.Y - 1], [self.X + 1, self.Y]); 
            break;
        case 2://田 x+1,y
            var n = 0;
            self.BlocksArr.splice(n, 1, [self.X + 1, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y + 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y + 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y]);
            //self.BlocksArr.push([self.X + 1, self.Y], [self.X, self.Y], [self.X, self.Y + 1], [self.X + 1, self.Y + 1], [self.X + 1, self.Y]);
            break;
        case 3://L x,y
            var n = 0;
            self.BlocksArr.splice(n, 1, [self.X, self.Y + 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y - 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y + 1]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y]);
            //self.BlocksArr.push([self.X, self.Y + 1], [self.X + 1, self.Y - 1], [self.X + 1, self.Y], [self.X + 1, self.Y + 1], [self.X, self.Y]); 
            break;
        case 4://J x,y
            var n = 0;
            self.BlocksArr.splice(n, 1, [self.X, self.Y - 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y - 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y + 1]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y]);
            //self.BlocksArr.push([self.X, self.Y - 1], [self.X + 1, self.Y - 1], [self.X + 1, self.Y], [self.X + 1, self.Y + 1], [self.X, self.Y]);
            break;
        case 5://一 x,y
            var n = 0;
            self.BlocksArr.splice(n, 1, [self.X, self.Y - 1]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y + 1]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y + 2]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y]);
            //self.BlocksArr.push([self.X, self.Y - 1], [self.X, self.Y], [self.X, self.Y + 1], [self.X, self.Y + 2], [self.X, self.Y]);
            break;
        case 6://土减一 x+1,y
            var n = 0;
            self.BlocksArr.splice(n, 1, [self.X + 1, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X, self.Y]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y - 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y + 1]);
            self.BlocksArr.splice(++n, 1, [self.X + 1, self.Y]);
            //self.BlocksArr.push([self.X + 1, self.Y], [self.X, self.Y], [self.X + 1, self.Y - 1], [self.X + 1, self.Y + 1], [self.X + 1, self.Y]); 
            break;
        default: break;
    }

}

function ViewModel() {
    var self = this;
    self.BoxRows = ko.observableArray([]);//行数组
    self.HBoxCount = 10;//列
    self.VBoxCount = 20;//行
    self.x = ko.observable(0);//起始的行坐标
    self.y = ko.observable(4);//起始的列坐标
    self.blocksShape = ko.observableArray([]);//形状数组
    self.score = ko.observable(0);//消除行
    //self.blocksShape = ko.observable([]);
    self.randomNum = ko.observable(0);//随机数字
    self.canDrop = ko.observable(true);
    self.totalScore = ko.observable(0);//分数
    //给每行加入行的数组
    for (var h = 0; h < self.VBoxCount; h++) {
        self.BoxRows.push(new BoxRowViewModel(h, self.HBoxCount));
    }


    self.doAction = ko.observable(true);
    self.BlockDrop = function () {
        self.blocksDrop();
        if (self.canDrop() == false) {
            self.totalScore(self.totalScore()+1);
            //清除行
            var cleanArray = new Array();
            for (var i = self.VBoxCount - 1; i >= 0; i--) {
                if (self.BoxRows()[i].Marked() == true) {
                    cleanArray.push(i);                          
                }
            }
            
            function changeColorTrue() { 
                for (var i = 0; i < cleanArray.length; i++) {
                    for (var j = 0; j < self.HBoxCount; j++) {
                        self.BoxRows()[cleanArray[i]].Boxes()[j].Color(true);
                    }
                }
                if (cleanArray.length > 0) {
                    setTimeout(changeColorFalse, 200);
                }
                else {
                    setTimeout(changeColorFalse, 0);
                }
            }
            function changeColorFalse() {
                for (var i = 0; i < cleanArray.length; i++) {
                    for (var j = 0; j < self.HBoxCount; j++) {
                        self.BoxRows()[cleanArray[i]].Boxes()[j].Color(false);
                    }
                }
                if (cleanArray.length > 0) {
                    setTimeout(ColorChageAfter, 100);
                }
                else { setTimeout(ColorChageAfter, 0); }
            }
            /*销行*/
            function ColorChageAfter() {
                var deletOne = 0;
                for (var n = 0; n < cleanArray.length; n++) {
                    for (var k2 = cleanArray[n]; k2 > 0; k2--) {
                        for (var k1 = 0; k1 < self.HBoxCount; k1++) {
                            self.BoxRows()[k2].Boxes()[k1].Marked(self.BoxRows()[k2 - 1].Boxes()[k1].Marked());
                        }
                    }
                    deletOne++;
                    for (var y = deletOne; y < cleanArray.length; y++) {
                        cleanArray[y] = cleanArray[y] + 1;
                    }
                    self.score(self.score() + 1);
                    self.totalScore(self.totalScore() + 10);
                    /**/
                }

                //创建随机组合块
                self.randomNum = self.nextRandomNum();//Math.floor(Math.random() * 7);//生成0-6的随机数字
                self.blocksShape = new BlocksShapeViewModel(self.randomNum, self.x(), self.y());

                var stopDrop = false;
                for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                    var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                    var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                    if (self.BoxRows()[x].Boxes()[y].Marked()) {
                        stopDrop = true;
                        break;
                    }
                }
                if (stopDrop == false) {
                    for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                        var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                        var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                        self.BoxRows()[x].Boxes()[y].Marked(true);
                    }
                    self.nextRandomNum(Math.floor(Math.random() * 7));
                    var nn = self.nextRandomNum();
                    var count = 0;
                    var tempArr = new BlocksShapeViewModel(self.nextRandomNum(), self.x(), self.y());
                    for (var i = 0; i < tempArr.BlocksArr().length - 1; i++) {
                        self.smallArr.splice(count, 2, [tempArr.BlocksArr()[i][0], tempArr.BlocksArr()[i][1] - 3]);
                        count++;
                    }
                    for (var i = 0; i < self.row; i++) {
                        for (var j = 0; j < self.column; j++) {
                            self.smallBoxRows()[i].Boxes()[j].Marked(false);
                        }
                    }
                    for (var i = 0; i < self.smallArr().length; i++) {
                        var x = self.smallArr()[i][0];
                        var y = self.smallArr()[i][1];
                        self.smallBoxRows()[x].Boxes()[y].Marked(true);
                    }
                } else {
                    self.stopGame();
                    var i = 19;
                    function animation() {
                        if (i >= -1) {
                            if (i >= 0) {
                                for (var j = 0; j < self.HBoxCount; j++) {
                                    self.BoxRows()[i].Boxes()[j].Color(true);
                                }     
                            }
                            i--;
                            setTimeout(animation, 100);
                            
                        }
                        if (i == -2) {
                            
                            self.startGame();
                        }
                    }
                    animation();
                    
                }
            }
            
            changeColorTrue();
            

        }
    };
    self.beforeStart = ko.observable(true);
    self.dropFlag = ko.observable(true);
    self.speed = ko.observable(1);
    function action() {
        if (self.dropFlag()) {
            if (self.doAction()) {
                setTimeout(action, 500 - (self.speed() - 1) * 100);
                self.doAction(false);
            }
            else if (!self.doAction()) {
                self.BlockDrop();
                setTimeout(action, 500 - (self.speed() - 1) * 100);
            }
        }
    }
    self.startGame = function () {
        self.stopGame();
        self.doAction(true);
        self.totalScore(0);
        //初始化每个标记为false
        for (var i = 0; i < self.VBoxCount; i++) {
            for (var j = 0; j < self.HBoxCount; j++) {
                self.BoxRows()[i].Boxes()[j].Marked(false);
            }
        }
        self.blocksShape = [];
        self.dropCount(0);
        self.stopGameFlag(true);
        self.score(0);
        self.beforeStart = ko.observable(true);
        //self.speed(1);
        for (var i = 0; i < self.row; i++) {
            for (var j = 0; j < self.column; j++) {
                self.smallBoxRows()[i].Boxes()[j].Marked(false);
            }
        }
        self.smallArr([]);

        for (var i = 0; i < self.VBoxCount; i++) {
            for (var j = 0; j < self.HBoxCount; j++) {
                self.BoxRows()[i].Boxes()[j].Color(false);
            }
        }
    };
    self.dropCount = ko.observable(0);
    self.nextRandomNum = ko.observable(-1);
    self.smallArr = ko.observableArray([]);//
    self.drop = function () {
        self.beforeStart(false);
        self.dropCount(self.dropCount() + 1);
        if (self.dropCount() == 1) {
            if (self.stopGameFlag() == true) {
                if (self.nextRandomNum() != -1) {
                    self.randomNum = self.nextRandomNum();
                } else {
                    //创建随机组合块
                    self.randomNum = Math.floor(Math.random() * 7);//生成0-6的随机数字
                }
                self.blocksShape = new BlocksShapeViewModel(self.randomNum, self.x(), self.y());

                var stopDrop = false;
                for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                    var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                    var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                    //alert()
                    if (self.BoxRows()[x].Boxes()[y].Marked()) {
                        stopDrop = true;
                        break;
                    }
                }
                if (stopDrop == false) {
                    for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                        var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                        var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                        self.BoxRows()[x].Boxes()[y].Marked(true);
                    }

                    self.nextRandomNum(Math.floor(Math.random() * 7));
                    var nn = self.nextRandomNum();
                    var count = 0;
                    var tempArr = new BlocksShapeViewModel(self.nextRandomNum(), self.x(), self.y());
                    for (var i = 0; i < tempArr.BlocksArr().length - 1; i++) {
                        self.smallArr.splice(count, 2, [tempArr.BlocksArr()[i][0], tempArr.BlocksArr()[i][1] - 3]);
                        count++;
                    }
                    for (var i = 0; i < self.row; i++) {
                        for (var j = 0; j < self.column; j++) {
                            self.smallBoxRows()[i].Boxes()[j].Marked(false);
                        }
                    }
                    for (var i = 0; i < self.smallArr().length; i++) {
                        var x = self.smallArr()[i][0];
                        var y = self.smallArr()[i][1];
                        self.smallBoxRows()[x].Boxes()[y].Marked(true);
                    }
                } else {
                    self.stopGame();
                    self.startGame();
                }
            }
            self.dropFlag(true);
            action();

        }
    };
    self.blocksRotate = function () {
        if (!self.beforeStart()) {
            var canRotate = true;
            var afterX = 0, afterY = 0;
            for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                self.BoxRows()[x].Boxes()[y].Marked(false);
            }
            for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                var rotateX = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                var rotateY = self.blocksShape.BlocksArr()[i][1];//拿到列坐标

                var centerX = self.blocksShape.BlocksArr()[self.blocksShape.BlocksArr().length - 1][0];//拿到行坐标
                var centerY = self.blocksShape.BlocksArr()[self.blocksShape.BlocksArr().length - 1][1];//拿到列坐标

                afterX = rotateY - centerY + centerX;
                afterY = centerX + centerY - rotateX;

                if ((afterX < 0 || afterX > self.VBoxCount - 1) || (afterY < 0 || afterY > self.HBoxCount - 1)) {
                    canRotate = false;
                    break;
                }
                else {
                    if (self.BoxRows()[afterX].Boxes()[afterY].Marked()) {
                        canRotate = false;
                        break;
                    }
                }
                afterX = 0;
                afterY = 0;
            }
            if (canRotate) {
                for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                    var rotateX = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                    var rotateY = self.blocksShape.BlocksArr()[i][1];//拿到列坐标

                    var centerX = self.blocksShape.BlocksArr()[self.blocksShape.BlocksArr().length - 1][0];//拿到行坐标
                    var centerY = self.blocksShape.BlocksArr()[self.blocksShape.BlocksArr().length - 1][1];//拿到列坐标

                    //self.BoxRows()[x].Boxes()[y].Marked(false);
                    afterX = rotateY - centerY + centerX;
                    afterY = centerX + centerY - rotateX;

                    self.blocksShape.BlocksArr()[i].splice(0, 2, afterX, afterY);
                    afterX = 0;
                    afterY = 0;
                }
                for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                    var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                    var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                    self.BoxRows()[x].Boxes()[y].Marked(true);
                    //alert("x:" + x + "y:" + y);
                }
            }
            else {
                for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                    var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                    var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                    self.BoxRows()[x].Boxes()[y].Marked(true);
                }
            }
        }
    };
    self.blocksMoveLeft = function () {
        if (self.beforeStart()) {
            if (self.speed() > 1) {
                self.speed(self.speed() - 1);
            }
        }
        else {
            var canMoveLeft = true;
            var x = 0;
            var y = 0;
            var leftArr = new Array();
            var count = 0;

            leftArr[count] = [self.blocksShape.BlocksArr()[0][0], self.blocksShape.BlocksArr()[0][1]];
            count++;
            var canAdd = true;
            for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                x = self.blocksShape.BlocksArr()[i][0];
                y = self.blocksShape.BlocksArr()[i][1];
                canAdd = true;
                for (var j = 0; j < count; j++) {
                    if (x == leftArr[j][0]) {
                        if (y < leftArr[j][1]) {
                            leftArr[j].splice(1, 1, y);
                        }
                        canAdd = false;
                    }
                }
                if (canAdd) {
                    leftArr[count] = [x, y];
                    count++;
                }
            }
            //不能左移
            for (var i = 0; i < leftArr.length; i++) {
                if (leftArr[i][1] <= 0) {
                    canMoveLeft = false;
                    break;
                }
                else {
                    if (self.BoxRows()[leftArr[i][0]].Boxes()[leftArr[i][1] - 1].Marked()) {
                        canMoveLeft = false;
                        break;
                    }
                }
            }
            if (canMoveLeft) {
                for (var i = 0; i < self.blocksShape.BlocksArr().length ; i++) {
                    x = self.blocksShape.BlocksArr()[i][0];
                    y = self.blocksShape.BlocksArr()[i][1];
                    self.BoxRows()[x].Boxes()[y].Marked(false);
                    y = y - 1;
                    self.blocksShape.BlocksArr()[i].splice(0, 2, x, y);
                }
                for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                    var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                    var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                    self.BoxRows()[x].Boxes()[y].Marked(true);
                }
            }
        }
    };
    self.blocksDrop = function () {
        if (!self.beforeStart()) {
            self.canDrop(true);
            var x = 0;
            var y = 0;
            var bottomArr = new Array();
            var count = 0;

            bottomArr[count] = [self.blocksShape.BlocksArr()[0][0], self.blocksShape.BlocksArr()[0][1]];
            count++;
            var canAdd = true;
            for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                x = self.blocksShape.BlocksArr()[i][0];
                y = self.blocksShape.BlocksArr()[i][1];
                canAdd = true;
                for (var j = 0; j < count; j++) {
                    if (y == bottomArr[j][1]) {
                        if (x > bottomArr[j][0]) {
                            bottomArr[j].splice(0, 1, x);
                        }
                        canAdd = false;
                    }
                }
                if (canAdd == true) {
                    bottomArr[count] = [x, y];
                    count++;
                }
            }

            //不能下落
            for (var i = 0; i < bottomArr.length; i++) {
                if (bottomArr[i][0] >= self.VBoxCount - 1) {
                    self.canDrop(false);
                    break;
                }
                else {
                    if (self.BoxRows()[bottomArr[i][0] + 1].Boxes()[bottomArr[i][1]].Marked()) {
                        self.canDrop(false);
                        break;
                    }
                }
            }
            if (self.canDrop()) {
                for (var i = 0; i < self.blocksShape.BlocksArr().length ; i++) {
                    x = self.blocksShape.BlocksArr()[i][0];
                    y = self.blocksShape.BlocksArr()[i][1];
                    self.BoxRows()[x].Boxes()[y].Marked(false);
                    x = x + 1;
                    self.blocksShape.BlocksArr()[i].splice(0, 2, x, y);
                }
                for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                    var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                    var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                    self.BoxRows()[x].Boxes()[y].Marked(true);
                }
            }
        }
    };
    self.blocksMoveRight = function () {
        if (self.beforeStart()) {
            if (self.speed() < 5) {
                self.speed(self.speed() + 1);
            }
        } else {
            var canMoveRight = true;
            var x = 0;
            var y = 0;
            var rightArr = new Array();
            var count = 0;

            rightArr[count] = [self.blocksShape.BlocksArr()[0][0], self.blocksShape.BlocksArr()[0][1]];
            count++;
            var canAdd = true;
            for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                x = self.blocksShape.BlocksArr()[i][0];
                y = self.blocksShape.BlocksArr()[i][1];
                canAdd = true;
                for (var j = 0; j < count; j++) {
                    if (x == rightArr[j][0]) {
                        if (y > rightArr[j][1]) {
                            rightArr[j].splice(1, 1, y);
                        }
                        canAdd = false;
                    }
                }
                if (canAdd) {
                    rightArr[count] = [x, y];
                    count++;
                }
            }
            //不能右移
            for (var i = 0; i < rightArr.length; i++) {
                if (rightArr[i][1] >= 19) {
                    canMoveRight = false;
                    break;
                }
                else {
                    if (self.BoxRows()[rightArr[i][0]].Boxes()[rightArr[i][1] + 1].Marked() == true) {
                        canMoveRight = false;
                        break;
                    }
                }
            }
            if (canMoveRight) {
                for (var i = 0; i < self.blocksShape.BlocksArr().length ; i++) {
                    x = self.blocksShape.BlocksArr()[i][0];
                    y = self.blocksShape.BlocksArr()[i][1];
                    self.BoxRows()[x].Boxes()[y].Marked(false);
                    y = y + 1;
                    self.blocksShape.BlocksArr()[i].splice(0, 2, x, y);
                }
                for (var i = 0; i < self.blocksShape.BlocksArr().length - 1; i++) {
                    var x = self.blocksShape.BlocksArr()[i][0];//拿到行坐标
                    var y = self.blocksShape.BlocksArr()[i][1];//拿到列坐标
                    self.BoxRows()[x].Boxes()[y].Marked(true);
                }
            }
        }
    };
    self.stopGameFlag = ko.observable(true);
    self.stopGame = function () {
        self.dropFlag(false);
        self.dropCount(0);
        self.stopGameFlag(false);
        self.beforeStart(true);
    };

    //键盘监听
    function keyUp(e) {
        var currKey = 0, e = e || event;
        currKey = e.keyCode || e.which || e.charCode;
        var keyName = String.fromCharCode(currKey);
        switch (currKey) {
            case 38: self.blocksRotate(); break;
            case 80: self.stopGame(); break;
            case 82: self.startGame(); break;
            case 32: self.drop(); break;
        }
    }
    document.onkeyup = keyUp;

    function keyDown(e) {
        var currKey = 0, e = e || event;
        currKey = e.keyCode || e.which || e.charCode;
        var keyName = String.fromCharCode(currKey);
        switch (currKey) {
            case 37: self.blocksMoveLeft(); break;
            case 39: self.blocksMoveRight(); break;
            case 40: self.blocksDrop(); break;
        }
    }
    document.onkeydown = keyDown;
    //
    self.row = 4;//小图形行
    self.column = 4;//小图形列
    self.smallBoxRows = ko.observableArray([]);

    //给每行加入行的数组
    for (var h = 0; h < self.row; h++) {
        self.smallBoxRows.push(new BoxRowViewModel(h, self.column));
    }

    /*获得当前时间*/

    self.date = ko.observable(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
    function getTime() {
        self.date(new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
        setTimeout(getTime, 1000);
    }
    getTime();
};

ko.applyBindings(new ViewModel());