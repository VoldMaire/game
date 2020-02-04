import { ISubscriber } from "./ISubscriber";
import { ButtonCell } from "../ButtonCell";
import { PlayMapController } from "../PlayMapController";

export class DownSubscriber implements ISubscriber {
    public constructor(){}
    public notify(button: ButtonCell): void {
        PlayMapController.getInstance().setActiveButton(button);
    }
}