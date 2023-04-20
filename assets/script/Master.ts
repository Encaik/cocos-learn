import { _decorator, Collider2D, Component, Contact2DType, type IPhysics2DContact, PhysicsSystem2D, Sprite, SpriteFrame, find, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Master')
export class Master extends Component {
  @property(SpriteFrame)
    slimeImg: SpriteFrame = null;

  private player = null;
  private isSlime = false;

  start (): void {
    this.player = find('Canvas/default_bg/player');
    const sprite = this.node.getComponents(Sprite)[0];
    setTimeout(() => {
      sprite.spriteFrame = this.slimeImg;
      this.isSlime = true;
      PhysicsSystem2D.instance.enable = true;
      // 注册单个碰撞体的回调函数
      const collider = this.getComponent(Collider2D);
      if (collider) {
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      }
    }, 1000);
  }

  onload (): void {

  }

  onBeginContact (self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null): void {
    setTimeout(() => {
      self.node.destroy();
      other.node.destroy();
    });
  }

  update (deltaTime: number): void {
    if (this.isSlime) {
      const curPos = this.node.position;
      const playerPos = this.player.position.clone();
      const direction = playerPos.subtract(curPos).normalize();
      this.node.setPosition(
        curPos.add(
          direction.multiply(
            new Vec3(1, 1)
          )
        )
      );
    }
  }
}