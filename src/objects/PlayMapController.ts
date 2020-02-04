import { Button } from '../ui/Button';
import { ButtonCell } from './ButtonCell'
import { Message } from '../model/Message'
import { DownSubscriber } from './subscriber/DownSubscriber';

export class PlayMapController {
    public static instance: PlayMapController;
    private activeCell: ButtonCell;

    private cells: Array<ButtonCell>;
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
                    let btn = new ButtonCell(this.WIDTH, this.WIDTH, i*this.WIDTH, j*this.WIDTH);
                    let subscriber = new DownSubscriber();
                    btn.subscribeDown(subscriber);
                    this.cells.push(btn);
                }
            }
        }
        return this.cells;
    }

    public setActiveButton(button: ButtonCell) {
        if(this.activeCell) {
            this.activeCell.setActive(false);
        }
        button.setActive(true);
        this.activeCell = button;
    }

    public applyMessage(message: Message): void {
        for(var i = 0; i < this.cells.length; i++) {
            this.cells[i].setCellDto(message.cells[i]);
        }
    }
}