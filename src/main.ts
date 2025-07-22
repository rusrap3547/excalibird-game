import * as ex from 'excalibur';

import { Bird } from './assets/bird';
import { Ground } from './assets/ground';
import { Pipe } from './assets/pipe';
import { Level } from './assets/level';

const game = new ex.Engine({
    width: 400,
    height: 500,
    backgroundColor: ex.Color.fromHex("#54c0ca"),
    pixelArt: true,
    pixelRatio: 2,
    displayMode: ex.DisplayMode.FitScreen,
    scenes: { Level: Level }
});

const bird = new Bird();
game.add(bird);

const ground = new Ground(ex.vec(0, game.screen.drawHeight - 64));
game.add(ground);

const topPipe = new Pipe(ex.vec(game.screen.drawWidth, 150), 'top');
game.add(topPipe);

const bottomPipe = new Pipe(ex.vec(game.screen.drawWidth, 300), 'bottom');
game.add(bottomPipe)

game.start().then(() => {
    game.goToScene('Level');
});

