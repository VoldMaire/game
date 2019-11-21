import { Button } from "./Button";

export interface ISubscriber {
    notify(button: Button);
}