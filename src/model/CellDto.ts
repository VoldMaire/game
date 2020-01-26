import { Element } from './Element'
import { Owner } from './Owner'

export class CellDto {
    cellId: number;
    element: Element;
    owner: Owner;
}