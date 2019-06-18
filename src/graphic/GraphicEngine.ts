import * as PIXI from 'pixi.js';
import { VelocitySprite } from './VelocitySprite';

export class GraphicEngine {
    static app = new PIXI.Application({ width: 1024,
        height: 768,
        antialias: true,
        transparent: false,
        resolution: 1});

    public run() {
        console.log("run....");
        document.body.appendChild(GraphicEngine.app.view);
        PIXI.loader.add("images/cat.png");
        PIXI.loader.load(this.setup);
    } 

    setup():void {
        let rocketSprite = new VelocitySprite(PIXI.loader.resources["images/cat.png"].texture);
        
        rocketSprite.vx = 1;
        rocketSprite.vy = 0;
        rocketSprite.scale.set(0.5,0.5);
        GraphicEngine.app.stage.addChild(rocketSprite);
        GraphicEngine.app.ticker.add(() => rocketSprite.move());
    }

}