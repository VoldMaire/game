import * as PIXI from 'pixi.js';
import { ISubscriber } from './subscriber/ISubscriber';
import { CellContainer } from './CellContainer';
import { Element } from '../model/Element';
import { CellDto } from '../model/CellDto';

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

        var container = this.container.getSpriteContainer();
        container.interactive = true;
        container
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

    public setCellDto(cellDto: CellDto): void {
        this.setElement(cellDto.element);
        this.container.setOwner(cellDto.owner);
    }

    private setElement(element: Element) {
        switch(element) {
            case Element.EMPTY: this.container.setEmpty();
            return;
            case Element.AIR: this.container.setAir();
            return;
            case Element.FIRE: this.container.setFire();
            return;
            case Element.EARTH: this.container.setEarth();
            return;
            case Element.WATER: this.container.setWater();
            return;
            default: throw new Error('Server error. Element ' + element + ' doesn\'t exist');
        }
    }

    public getContainer(): PIXI.Container {
        return this.container.getSpriteContainer();
    }

    public setActive(isActive: boolean) {
        this.container.setActive(isActive);
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