export interface IButtonEventContainer {
    getSpriteContainer(): PIXI.Container;
    pointerOverApply(): void;
    pointerOutApply(): void;
    pointerDownApply(): void;
    pointerUpApply(): void;
    pointerUpOutsideApply(): void;
}