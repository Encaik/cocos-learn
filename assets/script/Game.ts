import { _decorator, Component, find, instantiate, Prefab, view } from 'cc';
import eventTarget from './utils/eventTarget';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
  @property(Prefab)
  public slime: Prefab = null;

  private readonly rect = view.getVisibleSize();
  private time = 0;
  private isStart = false;
  private slimes = null;
  private player = null;

  gameProperty = {
    maxMasterCount: 50,
    masterGenerateSpace: 300,
    masterGenerateDistance: 30
  };

  onLoad (): void {
    this.isStart = true;
    this.time = new Date().getTime();
    this.slimes = find('Canvas/slimes');
    this.player = find('Canvas/player');
    eventTarget.on('over', () => {
      this.isStart = false;
      this.slimes.children.forEach(node => node.destroy());
    }, this);
  }

  start (): void {
    eventTarget.emit('start');
  }

  generateSlime (): void {
    const node = instantiate(this.slime);
    node.parent = this.slimes;
    const x = (Math.random() - 0.5) * this.rect.width;
    const y = (Math.random() - 0.5) * this.rect.height;
    const distance = this.player.position.clone().subtract(node.position.clone()).length();
    if (distance < this.gameProperty.masterGenerateDistance) {
      node.destroy();
      this.generateSlime();
    } else {
      node.setPosition(x, y);
    }
  }

  update (deltaTime: number): void {
    const curTime = new Date().getTime();
    if (this.isStart &&
      curTime - this.time > this.gameProperty.masterGenerateSpace &&
      this.slimes.children.length < this.gameProperty.maxMasterCount
    ) {
      this.generateSlime();
      this.time = curTime;
    }
  }
}
