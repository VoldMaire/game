import { Button } from '../ui/Button';

export class PlayMapController {
    public static instance: PlayMapController;

    cells: Record<number, Button>;
    activeCell: Button;

    private constructor() { }

    public static getInstance(): PlayMapController {
        if (!PlayMapController.instance) {
            PlayMapController.instance = new PlayMapController();
        }

        return PlayMapController.instance;
    }
}