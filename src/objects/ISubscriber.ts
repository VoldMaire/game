import { ButtonCell } from "./ButtonCell";

export interface ISubscriber {
    notify(button: ButtonCell) : void;
}