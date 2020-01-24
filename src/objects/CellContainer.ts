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
    private sprites: Array<PIXI.Sprite>;

    public constructor(width: number, height: number, x: number, y: number) {
        this.sprites = [];
        this.spriteContainer = new PIXI.Container();
        this.spriteBackground = new PIXI.Sprite(PIXI.Loader.shared.resources[GraphicConf.cellBackground].texture);
        this.spriteContainer.addChild(this.spriteBackground);
        this.sprites.push(this.spriteBackground);
        this.spriteOwner = new PIXI.Sprite(PIXI.Loader.shared.resources[GraphicConf.friendlyBackground].texture);
        this.spriteOwner.visible = false;
        this.spriteContainer.addChild(this.spriteOwner);
        this.sprites.push(this.spriteOwner);
        this.spriteElement = new PIXI.Sprite();
        this.spriteElement.visible = false;    
        this.sprites.push(this.spriteElement);
        this.spriteContainer.addChild(this.spriteElement); 
        this.spriteActiveOverlay = new PIXI.Sprite(PIXI.Loader.shared.resources[GraphicConf.cellOverOverlay].texture);
        this.spriteActiveOverlay.visible = false;
        this.spriteContainer.addChild(this.spriteActiveOverlay);
        this.spriteContainer.hitArea = new Rectangle(width, height, x, y);
        this.sprites.forEach(element => this.setPosition(element, x, y));
    }

    private setPosition(sprite: PIXI.Sprite, x: number, y: number) {
        sprite.x = x;
        sprite.y = y;
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
    }

    public setFire() {
        this.spriteElement.texture = PIXI.Loader.shared.resources[GraphicConf.fireElement].texture;
    }

    public setEarth() {
        this.spriteElement.texture = PIXI.Loader.shared.resources[GraphicConf.fireElement].texture;
    }

    public setWater() {
        this.spriteElement.texture = PIXI.Loader.shared.resources[GraphicConf.waterElement].texture;
    }
}