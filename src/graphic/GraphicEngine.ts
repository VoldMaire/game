import * as PIXI from 'pixi.js';
import { VelocitySprite } from './VelocitySprite';
import { Rocket } from '../objects/Rocket'
import { KeyboardController } from '../control/KeyboardController';
import { Button } from '../ui/Button';
import { ISubscriber } from '../ui/ISubscriber';

export class GraphicEngine {
    static app = new PIXI.Application({ width: 1024,
        height: 768,
        antialias: true,
        transparent: false,
        resolution: 1});

    public run() {
        console.log("run....");
        document.body.appendChild(GraphicEngine.app.view);
        PIXI.Loader.shared.add("images/cat.png");
        PIXI.Loader.shared.add("images/idle.png");
        PIXI.Loader.shared.add("images/over.png");
        PIXI.Loader.shared.add("images/click.png");
        PIXI.Loader.shared.load(this.setup);
    } 

    setup():void {
        // let rocketController = new KeyboardController();
        // let rocket = new Rocket();
        // rocket.appendController(rocketController);
        // GraphicEngine.app.stage.addChild(rocket.sprite);
        // GraphicEngine.app.ticker.add(() => rocket.sprite.move());
        let button = new Button("images/idle.png", "images/click.png", "images/over.png");
        GraphicEngine.app.stage.addChild(button.sprite);
    }

}