import { _decorator, Component, instantiate, type Node, Prefab, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Gun')
export class Gun extends Component {
  @property(Prefab)
  public bullet: Prefab = null;

  private angle: number = 0;
  private player: Node = null;

  start (): void {
    this.player = find('Canvas/default_bg/player');
  }

  onLoad (): void {
    setInterval(() => {
      this.onFire();
    }, 300);
  }

  onFire (): void {
    const bullet = instantiate(this.bullet);
    bullet.parent = this.player.parent;
    bullet.setPosition(
      this.player.position.x + this.node.position.x,
      this.player.position.y + this.node.position.y
    );
    bullet.angle = this.angle - 90;
  }

  update (deltaTime: number): void {
    this.angle = (this.angle + deltaTime * 50) % 360;
    const arc = this.angle / 180 * Math.PI;
    const x = 50 * Math.cos(arc);
    const y = 50 * Math.sin(arc);
    this.node.setPosition(x, y);
    this.node.angle = this.angle + 180;
  }
}
