import * as ex from 'excalibur';
import { Ground } from './ground';
import { Pipe } from './pipe';
import { Config } from './config';
import { Resources } from './resources';
import { Level } from './level';

export class Bird extends ex.Actor {
    playing = false; 
    jumping = false;
    startSprite!: ex.Sprite;
    upAnimation!: ex.Animation;
    downAnimation!: ex.Animation;
    constructor() {
        super({
            pos: Config.BirdStartPos,
            // width: 16,
            // height: 16,
            color: ex.Color.Yellow
        });
    }

    
    override onInitialize(): void {
        const spriteSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.BirdImage,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 32,
                spriteHeight: 32,
            }
        });

        this.startSprite = spriteSheet.getSprite(1,0);
        this.upAnimation = ex.Animation.fromSpriteSheet(spriteSheet, [2, 1, 0], 150, ex.AnimationStrategy.Freeze);
        this.upAnimation = ex.Animation.fromSpriteSheet(spriteSheet, [1, 1, 2], 150, ex.AnimationStrategy.Freeze);

        this.graphics.add('down', this.downAnimation);
        this.graphics.add('up', this.upAnimation);
        this.graphics.add('start', this.startSprite);

        this.graphics.use('start');

        this.on('exitviewport', () => {
            this.level.triggerGameOver();
        });
    }


    private isInputActive(engine: ex.Engine){
        return (engine.input.keyboard.isHeld(ex.Keys.Space) || 
        engine.input.pointers.isDown(0))
    }

    override onPostUpdate(engine: ex.Engine): void {
        if (!this.jumping && this.isInputActive(engine)){
            this.vel.y += -800;
            this.jumping = true
        }
        if (!this.isInputActive(engine)) {
            this.jumping = false;
        }
        this.vel.y = ex.clamp(this.vel.y, -500, 500);

        this.rotation = ex.vec(200, this.vel.y).toAngle();
    }

    override onCollisionStart(_self: ex.Collider, other: ex.Collider,): void {
        if (other.owner instanceof Ground ||
            other.owner instanceof Pipe
        ) {
            this.stop();
        }
    }

    stop() {
        this.vel = ex.vec(0,0);
        this.acc = ex.vec(0,0)
    }
}
