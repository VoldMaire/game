import * as PIXI from 'pixi.js';
import { ISubscriber } from './ISubscriber';
import { GraphicConf } from '../conf/GraphicConf';
import { IButtonEventContainer } from '../ui/IButtonEventContainer';
import { CellContainer } from './CellContainer';

export class ButtonCell {
    private container: CellContainer;

    private isActive: boolean;
    private isDown: boolean;
    private isOver: boolean;

    private downSubscribers: Array<ISubscriber>;
    private upSubscribers: Array<ISubscriber>;
    private overSubscribers: Array<ISubscriber>;
    private outSubscribers: Array<ISubscriber>;

    constructor(width: number, height: number, x: number, y: number) {
        this.container = new CellContainer(width, height, x, y);
        this.container.getSpriteContainer()
            .on('pointerdown', () => this.onDown(this))
            .on('pointerup', () => this.onUp(this))
            .on('pointerover', () => this.onOver(this))
            .on('pointerout', () => this.onOut(this))
            .on('mouseupoutside', () => this.onUpOutside(this));

        this.downSubscribers = [];
        this.upSubscribers = [];
        this.overSubscribers = [];
        this.outSubscribers = [];
    }

    public getContainer(): PIXI.Container {
        return this.container.getSpriteContainer();
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

    private onDown(button: ButtonCell) {
        button.isDown = true;
        this.container.pointerDownApply();

        button.downSubscribers.forEach(s=>s.notify(button));
    }

    private onUp(button: ButtonCell) {
        button.isDown = false;
        this.container.pointerUpApply();

        button.upSubscribers.forEach(s=>s.notify(button));
    }

    private onUpOutside(button: ButtonCell) {
        button.isDown = false;
        this.container.pointerUpOutsideApply();
    }

    private onOver(button: ButtonCell) {
        button.isOver = true;
        if(button.isDown) {
            return;
        }
        this.container.pointerOverApply();

        button.overSubscribers.forEach(s=>s.notify(button));
    }

    private onOut(button: ButtonCell) {
        button.isOver = false;
        if(button.isDown) {
            return;
        }
        this.container.pointerOutApply();

        button.outSubscribers.forEach(s=>s.notify(button));
    }
}