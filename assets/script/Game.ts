import { _decorator, Component, instantiate, Prefab, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  @property(Prefab)
  public slime: Prefab = null;

  private readonly rect = view.getVisibleSize();
  private time = 0;

  start (): void {

  }

  onLoad (): void {
    this.time = new Date().getTime();
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
    if (curTime - this.time > 1000 && this.node.children.length < 11) {
      this.generateSlime();
      this.time = curTime;
    }
  }
}
