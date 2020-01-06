import { Button } from "../ui/Button";

export class ButtonFabric {
    static createStandardButton() : Button {
        return new Button("images/res_90x90/idle.png", "images/res_90x90/click.png", "images/res_90x90/over.png");
    }
}