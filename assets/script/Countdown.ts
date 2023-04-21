import { _decorator, Color, Component, Label, tween, v3 } from 'cc';
import eventTarget from './utils/eventTarget';
const { ccclass } = _decorator;

@ccclass('Countdown')
export class Countdown extends Component {
  private duration: number = 20;

  start (): void {

  }

  protected onLoad (): void {
    eventTarget.on('start', () => {
      this.node.getComponent(Label).string = this.duration.toString();
    }, this);
  }

  update (deltaTime: number): void {
    this.duration -= deltaTime;
    if (this.duration <= 0) {
      eventTarget.emit('over');
      return;
    }
    const label = this.node.getComponent(Label);
    if (label.string !== Math.floor(this.duration).toString()) {
      label.string = Math.floor(this.duration).toString();
      if (this.duration <= 10 && this.duration > 5) {
        label.color = new Color(255, 255, 0);
        tween(this.node)
          .to(0.2, { scale: v3(1.2, 1.2, 1) })
          .to(0.2, { scale: v3(1, 1, 1) })
          .start();
      } else if (this.duration <= 5 && this.duration > 0) {
        label.color = new Color(255, 0, 0);
        tween(this.node)
          .to(0.2, { scale: v3(1.5, 1.5, 1) })
          .to(0.2, { scale: v3(1, 1, 1) })
          .start();
      }
    }
  }
}
