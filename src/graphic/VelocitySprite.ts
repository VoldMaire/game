import * as PIXI from 'pixi.js';

export class VelocitySprite extends PIXI.Sprite{
    vx: number;
    vy: number;
    vz: number;

    constructor(texture?: PIXI.Texture);
    constructor(texture?: PIXI.Texture, vx?: number, vy?: number);
    constructor(texture?: PIXI.Texture, vx?: number, vy?: number, vz?: number) {
        super(texture);
        this.vx = vx || 0;
        this.vy = vy || 0;
        this.vz = vz || 0;
    }

    public move():void {
        this.x += this.vx;
        this.y += this.vy;
    }
}