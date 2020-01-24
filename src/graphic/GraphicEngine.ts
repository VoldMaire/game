import * as PIXI from 'pixi.js';
import { PlayMapController } from '../objects/PlayMapController';
import { GraphicConf } from '../conf/GraphicConf';
import { ButtonCell } from '../objects/ButtonCell';

export class GraphicEngine {
    static app = new PIXI.Application({ width: 1024,
        height: 768,
        antialias: true,
        transparent: false,
        resolution: 1});

    public run() {
        console.log("run....");
        document.body.appendChild(GraphicEngine.app.view);
        PIXI.Loader.shared.add(GraphicConf.cellBackground);
        PIXI.Loader.shared.add(GraphicConf.fireElement);
        PIXI.Loader.shared.add(GraphicConf.waterElement);
        PIXI.Loader.shared.add(GraphicConf.airElement);
        PIXI.Loader.shared.add(GraphicConf.earthElement);
        PIXI.Loader.shared.add(GraphicConf.cellOverOverlay);
        PIXI.Loader.shared.add(GraphicConf.friendlyBackground);
        PIXI.Loader.shared.add(GraphicConf.enemyBackground);
        // PIXI.Loader.shared.add("images/res_90x90/cat.png");
        // PIXI.Loader.shared.add("images/res_90x90/idle.png");
        // PIXI.Loader.shared.add("images/res_90x90/over.png");
        // PIXI.Loader.shared.add("images/res_90x90/click.png");
        PIXI.Loader.shared.load(this.setup);
    } 

    setup(): void {
        GraphicEngine.initPlayDesk();
    }
    
    static initPlayDesk(): void {
        var cells:Array<ButtonCell> = PlayMapController.getInstance().getCells(8, 6);
        cells.forEach(element => {
            GraphicEngine.app.stage.addChild(element.getContainer());            
        });
    }
}