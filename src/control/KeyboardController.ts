class Key  {
    value: string;
    isDown: boolean;
    isUp: boolean;
    press: () => void;
    release: () => void;
    downHandler: (event:any) => void;
    upHandler: (event:any) => void;
    unsubscribe: () => void;
}

export class KeyboardController {
    left: Key;
    right: Key;
    down: Key;
    up: Key;

    constructor() {
        this.left = this.createKey("ArrowLeft");
        this.right = this.createKey("ArrowRight");
        this.up = this.createKey("ArrowUp");
        this.down = this.createKey("ArrowDown");
    }

    private createKey(value: string) {
        let key = new Key();
        key.value = value;
        key.isDown = false;
        key.isUp = true;
        
        key.downHandler = event => {
          if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
          }
        };
      
        key.upHandler = event => {
          if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
          }
        };
      
        const downListener = key.downHandler.bind(key);
        const upListener = key.upHandler.bind(key);
        
        window.addEventListener(
          "keydown", downListener, false
        );
        window.addEventListener(
          "keyup", upListener, false
        );
        
        key.unsubscribe = () => {
          window.removeEventListener("keydown", downListener);
          window.removeEventListener("keyup", upListener);
        };
        
        return key;
      }

}