import { Button } from '../ui/Button';
import { ButtonCell } from './ButtonCell'
import { ButtonFabric } from '../utils/ButtonFabric';
import { Message } from '../model/Message'

export class PlayMapController {
    public static instance: PlayMapController;
    private cells: Array<ButtonCell>;
    private activeCell: Button;
    private readonly WIDTH = 91;

    private constructor() { }

    public static getInstance(): PlayMapController {
        if (!PlayMapController.instance) {
            PlayMapController.instance = new PlayMapController();
        }

        return PlayMapController.instance;
    }

    public getCells(rows: number, columns: number): Array<ButtonCell> {
        if (!this.cells) {
            this.cells = [];
            for(var i = 0; i < rows; i++) {
                for(var j = 0; j < columns; j++){
                    let btn = new ButtonCell(this.WIDTH, this.WIDTH, i*this.WIDTH, j*this.WIDTH);//ButtonFabric.createStandardButton();
                    this.cells.push(btn);
                }
            }
        }
        return this.cells;
    }

    public applyMessage(message: Message): void {
        for(var i = 0; i < this.cells.length; i++) {
            this.cells[i].setElement(message.cells[i].element);
        }
    }
}