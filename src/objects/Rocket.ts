import { VelocitySprite } from '../graphic/VelocitySprite';
import { KeyboardController } from '../control/KeyboardController';

export class Rocket {
    sprite: VelocitySprite;
    
    constructor() {
        this.sprite = new VelocitySprite(PIXI.loader.resources["images/cat.png"].texture);
        this.sprite.vx = 0;
        this.sprite.vy = 0;
        this.sprite.scale.set(0.5, 0.5);
    }

    public appendController(keyboardController: KeyboardController){
        keyboardController.left.press = () => {
            this.sprite.vx = -5;
            this.sprite.vy = 0;
        };
          
        keyboardController.left.release = () => {
            if (!keyboardController.right.isDown && this.sprite.vy === 0) {
              this.sprite.vx = 0;
            }
        };
          
        keyboardController.up.press = () => {
            this.sprite.vy = -5;
            this.sprite.vx = 0;
        };

        keyboardController.up.release = () => {
            if (!keyboardController.down.isDown && this.sprite.vx === 0) {
              this.sprite.vy = 0;      
            }
        };
          
        keyboardController.right.press = () => {
            this.sprite.vx = 5;
            this.sprite.vy = 0;
        };
          
        keyboardController.right.release = () => {
            if (!keyboardController.left.isDown && this.sprite.vy === 0) {
              this.sprite.vx = 0;
            }
        };
          
        keyboardController.down.press = () => {
            this.sprite.vy = 5;
            this.sprite.vx = 0;
        };
          
        keyboardController.down.release = () => {
            if (!keyboardController.up.isDown && this.sprite.vx === 0) {
              this.sprite.vy = 0;
            } 
        }
    }

    public setVx(vx:number):void{
        this.sprite.vx = vx;
    }

    public getVx():number {
        return this.sprite.vx;
    }
    
    public setVy(vy:number):void{
        this.sprite.vy = vy;
    }

    public getVy():number {
        return this.sprite.vy;
    }

}