const sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(400, 400);
        frameRate(30);

        const hopperHappyImg = loadImage("./HopperHappy.png");
        const hopperJumpingImg = loadImage("./HopperJumping.png");
        const grassBlockImg = loadImage("./GrassBlock.png");

        const Beaver = function (x, y) {
            this.x = x;
            this.y = y;
            this.img = hopperHappyImg;
            this.sticks = 0;
        };

        Beaver.prototype.draw = function () {
            this.y = constrain(this.y, 0, height - 50);
            image(this.img, this.x, this.y, 40, 40);
        };

        Beaver.prototype.hop = function () {
            this.img = hopperJumpingImg
            this.y -= 5;
        };

        Beaver.prototype.fall = function () {
            this.img = hopperHappyImg;
            this.y += 5;
        };

        const beaver = new Beaver(10, 300);

        const sceneX = 0;
        
        // moving
        // snake like fashion, wrap around
        const grassXs = [];
        for (let i = 0; i < 25; i++) {
            grassXs.push(i * 20);
        }

        draw = function () {
            // static
            background(227, 254, 255);
            fill(130, 79, 43);
            rect(0, height * 0.90, width, height * 0.10);

            // draw the blocks
            for (var i = 0; i < grassXs.length; i++) {
                image(grassBlockImg, grassXs[i], height * 0.85, 20, 20);
                // subtract one, so that they appear to move to left (hopper appears to move to right)
                grassXs[i] -= 1;
                // Now move the blocks over once they wrap around
                if (grassXs[i] <= -20) {
                    grassXs[i] = width;
                }
            }
            
            if (keyPressed && keyCode === 32) {
                beaver.hop();
            } else {
                beaver.fall();
            }
            beaver.draw();
        };
    }
};

// Get the canvas that Processing-js will use
const canvas = document.getElementById("mycanvas");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
const processingInstance = new Processing(canvas, sketchProc);