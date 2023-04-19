import { _decorator, Component, input, Input, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

interface Bullet {
  node: Node
  angle?: number
}

@ccclass('Gun')
export class Gun extends Component {
  @property(SpriteFrame)
  public bulletImg: SpriteFrame = null;

  @property(Node)
  public player: Node = null;

  private readonly bulletList: Bullet[] = [];
  private angle: number = 0;

  start (): void {
  }

  onLoad (): void {
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
  }

  onDestroy (): void {
    input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
  }

  onMouseDown (): void {
    const bullet: Node = new Node();
    const sprite: Sprite = bullet.addComponent(Sprite);
    sprite.spriteFrame = this.bulletImg;
    bullet.parent = this.player.parent;
    bullet.setPosition(
      this.player.position.x + this.node.position.x,
      this.player.position.y + this.node.position.y
    );
    bullet.angle = this.angle - 90;
    this.bulletList.push({
      node: bullet,
      angle: this.angle
    });
  }

  update (deltaTime: number): void {
    this.angle = (this.angle + deltaTime * 50) % 360;
    const arc = this.angle / 180 * Math.PI;
    const x = 50 * Math.cos(arc);
    const y = 50 * Math.sin(arc);
    this.node.setPosition(x, y);
    this.node.angle = this.angle + 180;
    this.bulletList.forEach(bullet => {
      const bulletArc = bullet.angle / 180 * Math.PI;
      const bulletX = 50 * Math.cos(bulletArc);
      const bulletY = 50 * Math.sin(bulletArc);
      bullet.node.setPosition(
        bullet.node.position.x + bulletX,
        bullet.node.position.y + bulletY
      );
    });
  }
}
