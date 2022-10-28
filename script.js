var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 200;
canvas.height = 200;
var stepMove = 10;
var config = {
    moveBall: 0,
    showDebug: false,
};
var b = null;
var gravity = 0.2;
var friction = 0.80;

function init() {
    b = new box({x: canvas.width / 2, y: canvas.width / 2});
}

init();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    b.update();
    ctx.fillStyle = "#fff";
    ctx.fillRect(b.x, b.y, 6, 6);
    ctx.fillStyle = "orange";
    if (config.showDebug == true) {
        var str1 = "x:" + b.y;
        ctx.fillText(str1, canvas.width / 2 - 50, 30);
        var str1 = "y:" + b.x;
        ctx.fillText(str1, canvas.width / 2 - 50, 50);
        var str1 = "dx:" + b.dx;
        ctx.fillText(str1, canvas.width / 2 - 50, 70);
        var str1 = "dy:" + b.dy;
        ctx.fillText(str1, canvas.width / 2 - 50, 90);
        var str1 = "isJump:" + b.isJump;
        ctx.fillText(str1, canvas.width / 2 - 50, 110);
    }
}

function box(options) {
    this.x = options.x || 1;
    this.y = options.y || 1;
    this.dx = options.dx || 0;
    this.dy = options.dy || 0;
    this.radius = options.radius || 6;
    this.isJump = options.isJump || false;

    this.update = function () {
        if (this.isJump === false) {
            if (this.y + this.radius + this.dy < 0 || this.y + this.radius + this.dy > canvas.height) {
                this.dy = -this.dy * friction;
                this.dx = this.dx * friction;
                this.isJump = false;
            } else {
                this.dy = this.dy + gravity;
            }

            if (this.x + this.radius + this.dx > canvas.width || this.x + this.radius + this.dx < 0) {
                this.dx = -this.dx * friction;
                this.dy = this.dy * friction;
            } else {

            }
            this.x += this.dx;
            this.y += this.dy;
        }
    };
    this.jump = function () {
        if (b.dx < 0) {
            b.dx = -2
        } else {
            b.dx = 2
        }
        b.dy = -2;
        b.isJump = false;

    };
    this.moveLeft = function () {

        b.dx += -1
        b.isJump = false;
    };
    this.moveRight = function () {

        b.dx += 1


        b.isJump = false;

    };
    this.moveTop = function () {
        this.dy -= 2;
    };
    this.moveBottom = function () {
        this.dy += 2;
    };
}

function loop() {
    draw();
    requestAnimationFrame(loop);
}

loop();
$(document).on("keydown", (e) => {
    if (32 == e.which) {
        b.jump();
    }
    if (38 == e.which) {
        b.moveTop();
    }
    if (40 == e.which) {
        b.moveBottom();
    }
    if (37 == e.which) {
        b.moveLeft();
    }
    if (39 == e.which) {
        b.moveRight();
    }
    if (27 == e.which) {
        init();
    }
    console.log(e.which);
});


