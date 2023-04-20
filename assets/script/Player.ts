import { _decorator, Component, Input, input, type EventKeyboard, Vec3, view } from 'cc';
const { ccclass } = _decorator;

@ccclass('player')
export class Player extends Component {
  private isLeft: boolean = false;
  private isRight: boolean = false;
  private isUp: boolean = false;
  private isDown: boolean = false;
  private speed: number = 0;
  private readonly rect = view.getVisibleSize();

  start (): void {

  }

  onLoad (): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onDestroy (): void {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onKeyDown (event: EventKeyboard): void {
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
