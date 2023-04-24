import { _decorator, Component, Animation, Input, input, type EventKeyboard, Vec3, view, Collider2D, Contact2DType, type IPhysics2DContact, PhysicsSystem2D, find, ProgressBar, director, Prefab, instantiate, Label } from 'cc';
import eventTarget from './utils/eventTarget';
const { ccclass, property } = _decorator;

@ccclass('player')
export class Player extends Component {
  private isLeft: boolean = false;
  private isRight: boolean = false;
  private isUp: boolean = false;
  private isDown: boolean = false;
  private speed: number = 0;
  private readonly rect = view.getVisibleSize();
  private animation = null;
  private level: number = 0;

  @property(Prefab)
  public gun: Prefab = null;

  onLoad (): void {
    eventTarget.on('start', () => {
      Array.from({ length: 2 }).forEach((_, idx) => {
        const node = instantiate(this.gun);
        node.parent = this.node;
        if (idx === 0)node.setPosition(-40, 0);
        if (idx === 1)node.setPosition(40, 0);
      });
    }, this);
    eventTarget.on('over', () => {
      director.loadScene('over');
    }, this);
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    PhysicsSystem2D.instance.enable = true;
    // 注册单个碰撞体的回调函数
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    this.animation = this.getComponent(Animation);
  }

  start (): void {

  }

  onDestroy (): void {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onKeyDown (event: EventKeyboard): void {
    const walkState = this.animation.getState('player_walk');
    if (walkState.isMotionless) this.animation.play('player_walk');
    switch (event.keyCode) {
      case 87:
        this.isUp = true;
        break;
      case 65:
        this.isLeft = true;
        break;
      case 83:
        this.isDown = true;
        break;
      case 68:
        this.isRight = true;
        break;
    }
  }

  onKeyUp (event: EventKeyboard): void {
    switch (event.keyCode) {
      case 87:
        this.isUp = false;
        break;
      case 65:
        this.isLeft = false;
        break;
      case 83:
        this.isDown = false;
        break;
      case 68:
        this.isRight = false;
        break;
    }
    const walkState = this.animation.getState('player_walk');
    if (!this.isUp &&
      !this.isLeft &&
      !this.isDown &&
      !this.isRight && walkState.isPlaying
    ) this.animation.stop('player_walk');
  }

  onBeginContact (self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null): void {
    if (other.node.name === 'slime') {
      const health = find('Canvas/ui/health').getComponent(ProgressBar);
      health.progress -= 0.1;
      if (health.progress <= 0) {
        eventTarget.emit('over');
      }
    } else if (other.node.name === 'drop') {
      const experienceBar = find('Canvas/ui/experience').getComponent(ProgressBar);
      experienceBar.progress += 0.1;
      if (experienceBar.progress >= 1) {
        this.level++;
        const label = find('Canvas/ui/experience/Label').getComponent(Label);
        label.string = `Lv.${this.level}`;
        experienceBar.progress = 0;
      }
      other.node.destroy();
    }
  }

  update (deltaTime: number): void {
    if (this.speed < 5) this.speed += deltaTime * 10;
    const direction = new Vec3(
      (this.isLeft ? -1 : 0) + (this.isRight ? 1 : 0),
      (this.isUp ? 1 : 0) + (this.isDown ? -1 : 0)
    ).normalize();
    const oldPos = this.node.position.clone();
    const newPos = oldPos.add(
      direction.multiply(
        new Vec3(this.speed, this.speed)
      )
    );
    if (Math.abs(newPos.x) > this.rect.width / 2 - 20) {
      newPos.x = this.node.position.x;
    };
    if (Math.abs(newPos.y) > this.rect.height / 2 - 20) {
      newPos.y = this.node.position.y;
    };
    this.node.setPosition(newPos);
  }
}
