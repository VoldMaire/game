import * as PIXI from 'pixi.js';
import { VelocitySprite } from './VelocitySprite';
import { Rocket } from '../objects/Rocket'
import { KeyboardController } from '../control/KeyboardController';
import { Button } from '../ui/Button';
import { PlayMapController } from '../objects/PlayMapController';
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
        PIXI.Loader.shared.add("images/res_90x90/cat.png");
        PIXI.Loader.shared.add("images/res_90x90/idle.png");
        PIXI.Loader.shared.add("images/res_90x90/over.png");
        PIXI.Loader.shared.add("images/res_90x90/click.png");
        PIXI.Loader.shared.load(this.setup);
    } 

    setup(): void {
        GraphicEngine.initPlayDesk();
    }
    
    static initPlayDesk(): void {
        var cells:Array<Button> = PlayMapController.getInstance().getCells(8, 6);
        cells.forEach(element => {
            GraphicEngine.app.stage.addChild(element.sprite);            
        });
    }
}