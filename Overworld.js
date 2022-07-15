class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map;  
  }
  init() {
   this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
   this.directionInput = new DirectionInput();
   this.directionInput.init();
   this.directionInput.direction;
   this.startGameLoop();

  }
 
  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
      //Draw upper layer
      this.map.drawLowerImage(this.ctx);

      //Draw game objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction
        })
        object.sprite.draw(this.ctx);
      })

      //Draw lower layer
      this.map.drawUpperImage(this.ctx);
      requestAnimationFrame(() => {
        step();
      })
    }
    step();
  }

}