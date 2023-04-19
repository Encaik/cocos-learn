import { _decorator, Component, Input, input, type EventKeyboard } from 'cc';
const { ccclass } = _decorator;

@ccclass('player')
export class Player extends Component {
  private isLeft: boolean = false;
  private isRight: boolean = false;
  private isUp: boolean = false;
  private isDown: boolean = false;
  private speed: number = 0;

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
      case 83:
        this.isUp = true;
        break;
      case 65:
        this.isLeft = true;
        break;
      case 87:
        this.isDown = true;
        break;
      case 68:
        this.isRight = true;
        break;
    }
  }

  onKeyUp (event: EventKeyboard): void {
    switch (event.keyCode) {
      case 83:
        this.isUp = false;
        break;
      case 65:
        this.isLeft = false;
        break;
      case 87:
        this.isDown = false;
        break;
      case 68:
        this.isRight = false;
        break;
    }
  }

  update (deltaTime: number): void {
    let x = this.node.position.x;
    let y = this.node.position.y;
    if (this.speed < 5) this.speed += deltaTime * 10;
    if (this.isUp) {
      y -= this.speed;
    }
    if (this.isDown) {
      y += this.speed;
    }
    if (this.isLeft) {
      x -= this.speed;
    }
    if (this.isRight) {
      x += this.speed;
    }
    if (!this.isUp && !this.isDown && !this.isLeft && !this.isRight) this.speed = 0;
    this.node.setPosition(x, y);
  }
}
