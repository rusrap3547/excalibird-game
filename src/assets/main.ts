import * as ex from 'excalibur';

import { Bird } from './bird';
import { Ground } from './ground';
import { Pipe } from './pipe';
import { Level } from './level';
import { initMuteButton } from './ui';


const positionUI = (game: ex.Engine) => {
  const ui = document.getElementsByClassName("ui")[0] as HTMLElement;
  if (ui) {
    const topLeft = game.screen.screenToPageCoordinates(ex.vec(10, 500 - 40));
    ui.style.visibility = 'visible';
    ui.style.left = topLeft.x + 'px';
    ui.style.top = topLeft.y + 'px';
  }
}

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

