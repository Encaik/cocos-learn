import { _decorator, Button, Component, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {
  @property(Button)
    button: Button = null;

  start (): void {

  }

  protected onLoad (): void {
    this.button.node.on(Button.EventType.CLICK, this.onStartClick, this);
  }

  onStartClick (): void {
    director.loadScene('default');
  }

  update (deltaTime: number): void {

  }
}
