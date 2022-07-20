class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map;
  }
  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.directionInput.direction;
    this.startGameLoop();

    this.map.startCutscene([
      { who: "hero", type: "walk", direction: "down" },
      { who: "hero", type: "walk", direction: "down" },
      { who: "npcA", type: "walk", direction: "up" },
      { who: "npcA", type: "walk", direction: "left" },
      { who: "hero", type: "stand", direction: "right", time: 200 },
      { type: "textMessage", text: "Why hello there"},
    ]);

  }

  startGameLoop() {
    const step = () => {
      //clear off the canvas
      console.log(this.map.isCutscenePlaying);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //est camera person
      const cameraPerson = this.map.gameObjects.hero;

      //Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      //Draw upper layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw game objects
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

      //Draw lower layer
      this.map.drawUpperImage(this.ctx, cameraPerson);
      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }
}
