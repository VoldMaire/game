import * as PIXI from 'pixi.js';
import { ISubscriber } from './ISubscriber';

export class Button {
    textureMain: PIXI.Texture;
    texturePointerDown: PIXI.Texture;
    texturePointerOn: PIXI.Texture;
    sprite: PIXI.Sprite;

    isActive: boolean;
    isDown: boolean;
    isOver: boolean;

    downSubscribers: Array<ISubscriber>;
    upSubscribers: Array<ISubscriber>;
    overSubscribers: Array<ISubscriber>;
    outSubscribers: Array<ISubscriber>;

    constructor(mainTexture: string, pointerDownTexture: string);

    constructor(mainTexture: string, pointerDownTexture: string, pointerOnTexture?: string) {
        this.textureMain = PIXI.Loader.shared.resources[mainTexture].texture;
        this.texturePointerDown = PIXI.Loader.shared.resources[pointerDownTexture].texture;
        this.texturePointerOn = PIXI.Loader.shared.resources[pointerOnTexture].texture || this.textureMain;
        this.sprite = new PIXI.Sprite(this.textureMain);
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;

        this.sprite
            .on("pointerdown", this.onDown)
            .on('pointerup', this.onUp)
            .on('pointerover', this.onOver)
            .on('pointerout', this.onOut);
    }

    public subscribeDown(subscriber: ISubscriber) {
        this.downSubscribers.push(subscriber);
    }

    public subscribeUp(subscriber: ISubscriber) {
        this.upSubscribers.push(subscriber);
    }

    public subscribeOver(subscriber: ISubscriber) {
        this.overSubscribers.push(subscriber);
    }

    private onDown() {
        this.isDown = true;
        this.sprite.texture = this.texturePointerDown;

        this.downSubscribers.forEach(s=>s.notify(this));
    }

    private onUp() {
        this.isDown = false;
        this.sprite.texture = this.textureMain;

        this.upSubscribers.forEach(s=>s.notify(this));
    }

    private onOver() {
        this.isOver = true;
        if(this.isDown) {
            return;
        }
        this.sprite.texture = this.texturePointerOn;

        this.overSubscribers.forEach(s=>s.notify(this));
    }

    private onOut() {
        this.isOver = true;
        if(this.isDown) {
            return;
        }
        this.sprite.texture = this.texturePointerOn;

        this.outSubscribers.forEach(s=>s.notify(this));
    }
}