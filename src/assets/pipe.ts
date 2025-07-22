import * as ex from 'excalibur';

export class Pipe extends ex.Actor {
    constructor(pos: ex.Vector, public type: 'top' | 'bottom') {
        super({
            pos,
            width: 32,
            height: 1000,
            anchor: type === 'bottom' ?
                ex.vec(0, 0) :
                ex.vec(0, 1),
            color: ex.Color.Green,
            vel: ex.vec(-200,0),
            z: -1
        })
        this.on('exitviewport', () => this.kill());
    }
}