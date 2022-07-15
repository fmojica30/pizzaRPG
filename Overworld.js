class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map;  
  }
  init() {
   this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
   this.startGameLoop();

  }
 
  startGameLoop() {
    const step = () => {
      console.log("Stepping");

      this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
      //Draw upper layer
      this.map.drawLowerImage(this.ctx);

      //Draw game objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({

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