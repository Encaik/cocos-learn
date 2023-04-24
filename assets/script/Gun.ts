import { _decorator, Component, instantiate, type Node, Prefab, find, Vec3, tween } from 'cc';
import eventTarget from './utils/eventTarget';
const { ccclass, property } = _decorator;

@ccclass('Gun')
export class Gun extends Component {
  @property(Prefab)
  public bullet: Prefab = null;

  private player: Node = null;
  private interval = null;

  gameProperty = {
    fireSpace: 200
  };

  start (): void {
    this.player = find('Canvas/player');
    eventTarget.on('over', () => {
      this.node.destroy();
    }, this);
  }

  onLoad (): void {
    this.interval = setInterval(() => {
      const slimeNodes = find('Canvas/slimes').children;
      let closestSlimeNode = null;
      let closestDistance = 1000;
      const gunPos = this.player.position.clone().add(this.node.position.clone());
      for (const slimeNode of slimeNodes) {
        const distance = Vec3.distance(gunPos, slimeNode.position.clone());
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSlimeNode = slimeNode;
        }
      }

      if (closestSlimeNode) {
        const direction = closestSlimeNode.position.clone().subtract(gunPos).normalize();
        tween(this.node)
          .to(0.3, { angle: Math.atan2(direction.y, direction.x) * 180 / Math.PI })
          .start();
        this.onFire();
      }
    }, this.gameProperty.fireSpace);
  }

  onDestroy (): void {
    clearInterval(this.interval);
  }

  onFire (): void {
    const bullet = instantiate(this.bullet);
    bullet.parent = this.player.parent;
    bullet.setPosition(
      this.player.position.x + this.node.position.x,
      this.player.position.y + this.node.position.y
    );
    bullet.angle = this.node.angle;
  }

  update (deltaTime: number): void {

  }
}
