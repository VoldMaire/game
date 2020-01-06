import { Button } from '../ui/Button';
import { ButtonFabric } from '../utils/ButtonFabric';

export class PlayMapController {
    public static instance: PlayMapController;
    private cells: Array<Button>;
    private activeCell: Button;
    private readonly WIDTH = 91;

    private constructor() { }

    public static getInstance(): PlayMapController {
        if (!PlayMapController.instance) {
            PlayMapController.instance = new PlayMapController();
        }

        return PlayMapController.instance;
    }

    public getCells(rows: number, columns: number): Array<Button> {
        if (!this.cells) {
            this.cells = [];
            for(var i = 0; i < rows; i++) {
                for(var j = 0; j < columns; j++){
                    let btn = ButtonFabric.createStandardButton();
                    btn.setLocation(i*this.WIDTH, j*this.WIDTH);
                    this.cells.push(btn);
                }
            }
        }
        return this.cells;
    }
}