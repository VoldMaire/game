import { GraphicConf } from "../conf/GraphicConf"
import { IButtonEventContainer } from "../ui/IButtonEventContainer";
import { IElementContainer } from "./IElementContainer";
import { Rectangle, Sprite } from "pixi.js";

export class CellContainer implements IButtonEventContainer, IElementContainer {

    private spriteBackground: PIXI.Sprite;
    private spriteElement: PIXI.Sprite;
    private spriteOwner: PIXI.Sprite;
    private spriteActiveOverlay: PIXI.Sprite;
    private spriteContainer: PIXI.Container;

    public constructor(width: number, height: number, x: number, y: number) {
        this.spriteContainer = new PIXI.Container();
        this.spriteBackground = new PIXI.Sprite(PIXI.Loader.shared.resources[GraphicConf.cellBackground].texture);
        this.spriteContainer.addChild(this.spriteBackground);
        this.spriteOwner = new PIXI.Sprite(PIXI.Loader.shared.resources[GraphicConf.friendlyBackground].texture);
        this.spriteOwner.visible = false;
        this.spriteContainer.addChild(this.spriteOwner);
        this.spriteElement = new PIXI.Sprite();
        this.spriteElement.visible = false;    
        this.spriteContainer.addChild(this.spriteElement); 
        this.spriteActiveOverlay = new PIXI.Sprite(PIXI.Loader.shared.resources[GraphicConf.cellOverOverlay].texture);
        this.spriteActiveOverlay.visible = false;
        this.spriteContainer.addChild(this.spriteActiveOverlay);
        this.spriteContainer.position.set(x, y);
    }

    public getSpriteContainer(): PIXI.Container {
        return this.spriteContainer;
    }

    public pointerOverApply() {
        this.spriteActiveOverlay.visible = true;
    }

    public pointerOutApply() {
        this.spriteActiveOverlay.visible = false;
    }

    public pointerDownApply() {
        this.spriteActiveOverlay.texture = PIXI.Loader.shared.resources[GraphicConf.cellDownOverlay].texture;
    }

    public pointerUpApply() {
        this.spriteActiveOverlay.texture = PIXI.Loader.shared.resources[GraphicConf.cellOverOverlay].texture;
    }

    public pointerUpOutsideApply() {
        this.spriteActiveOverlay.texture = PIXI.Loader.shared.resources[GraphicConf.cellOverOverlay].texture;
        this.spriteActiveOverlay.visible = false;
    }

    public setOwner(friendly: boolean) {
        if(friendly) {
            this.spriteOwner.texture = PIXI.Loader.shared.resources[GraphicConf.friendlyBackground].texture;
        } else {
            this.spriteOwner.texture = PIXI.Loader.shared.resources[GraphicConf.enemyBackground].texture;
        }
    }

    public setEmpty() {
        this.spriteElement.visible = false;
    }
    
    public setAir() {
        this.spriteElement.texture = PIXI.Loader.shared.resources[GraphicConf.airElement].texture;
        this.spriteElement.visible = true;
    }

    public setFire() {
        this.spriteElement.texture = PIXI.Loader.shared.resources[GraphicConf.fireElement].texture;
        this.spriteElement.visible = true;
    }

    public setEarth() {
        this.spriteElement.texture = PIXI.Loader.shared.resources[GraphicConf.fireElement].texture;
        this.spriteElement.visible = true;
    }

    public setWater() {
        this.spriteElement.texture = PIXI.Loader.shared.resources[GraphicConf.waterElement].texture;
        this.spriteElement.visible = true;
    }
}