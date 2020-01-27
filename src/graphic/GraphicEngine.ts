import * as PIXI from 'pixi.js';
import { PlayMapController } from '../objects/PlayMapController';
import { ButtonCell } from '../objects/ButtonCell';
import { Message } from '../model/Message';
import { CellDto } from '../model/CellDto';
import { Element } from '../model/Element';
import { Owner } from '../model/Owner';

export class GraphicEngine {
    static app = new PIXI.Application({ width: 1024,
        height: 768,
        antialias: true,
        transparent: false,
        resolution: 1});

    public run() {
        console.log("run....");
        document.body.appendChild(GraphicEngine.app.view);
        PIXI.Loader.shared.add("/images/res_90x90/cellmap.json")
        PIXI.Loader.shared.load(this.setup);
    } 

    setup(): void {
        GraphicEngine.initPlayDesk();
    }
    
    //TODO remove after message system finish
    static getTestMessage(): Message {
        var message: Message = new Message();
        message.cells = [];
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 6; j++) {
                var cellDto: CellDto = new CellDto();
                cellDto.cellId = i * 10 + j;
                cellDto.element = j < 2 || j > 3
                    ? i % 2 == 0 ? Element.EARTH : Element.AIR
                    : Element.EMPTY;
                cellDto.owner = j < 2 ? Owner.ENEMY 
                              : j > 3 ? Owner.FRIEND
                                      : Owner.NONE; 
                message.cells.push(cellDto);
            }
        }
        return message;
    }

    static initPlayDesk(): void {
        var cells:Array<ButtonCell> = PlayMapController.getInstance().getCells(8, 6);
        cells.forEach(element => {
            GraphicEngine.app.stage.addChild(element.getContainer());            
        });
        PlayMapController.getInstance().applyMessage(GraphicEngine.getTestMessage());
    }
}