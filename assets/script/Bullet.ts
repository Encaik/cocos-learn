import { _decorator, Component, toRadian, view } from 'cc';
import eventTarget from './utils/eventTarget';
const { ccclass } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
  private readonly rect = view.getVisibleSize();

  start (): void {
    eventTarget.on('over', () => {
      this.node.destroy();
    }, this);
  }

  update (deltaTime: number): void {
    const pos = this.node.getWorldPosition();
    if (Math.abs(pos.x) > this.rect.width || Math.abs(pos.y) > this.rect.height) {
      this.node.destroy();
      return;
    }
    const arc = toRadian(this.node.angle + 90);
    const x = 50 * Math.cos(arc);
    const y = 50 * Math.sin(arc);
    this.node.setPosition(
      this.node.position.x + x,
      this.node.position.y + y
    );
  }
}
