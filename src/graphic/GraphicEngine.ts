import * as PIXI from 'pixi.js';
import { VelocitySprite } from './VelocitySprite';
import { Rocket } from '../objects/Rocket'
import { KeyboardController } from '../control/KeyboardController';

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
        let rocketController = new KeyboardController();
        let rocket = new Rocket();
        rocket.appendController(rocketController);
        GraphicEngine.app.stage.addChild(rocket.sprite);
        GraphicEngine.app.ticker.add(() => rocket.sprite.move());
    }

}