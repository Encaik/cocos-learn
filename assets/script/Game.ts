import { _decorator, Component, instantiate, Prefab, view } from 'cc';
import eventTarget from './utils/eventTarget';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  @property(Prefab)
  public slime: Prefab = null;

  private readonly rect = view.getVisibleSize();
  private time = 0;
  private isStart = false;

  onLoad (): void {
    this.isStart = true;
    this.time = new Date().getTime();
    eventTarget.on('over', () => {
      this.isStart = false;
      this.node.children.forEach(node => node.destroy());
    }, this);
  }

  start (): void {
    eventTarget.emit('start');
  }

  generateSlime (): void {
    const node = instantiate(this.slime);
    node.parent = this.node;
    const x = (Math.random() - 0.5) * this.rect.width;
    const y = (Math.random() - 0.5) * this.rect.height;
    node.setPosition(x, y);
  }

  update (deltaTime: number): void {
    const curTime = new Date().getTime();
    if (this.isStart &&
      curTime - this.time > 300 &&
      this.node.children.filter(node => node.name === 'slime').length < 51
    ) {
      this.generateSlime();
      this.time = curTime;
    }
  }
}
