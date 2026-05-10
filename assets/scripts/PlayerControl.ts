import {
  _decorator,
  Component,
  EventKeyboard,
  input,
  Input,
  KeyCode,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerControl")
export class PlayerControl extends Component {
  @property //這行稱為裝飾器，是為了可以直接在cocos介面修改speed
  public speed: number = 300; //移動速度

  private moveDir: Vec3 = new Vec3(0, 0, 0); //紀錄移動方向

  start() {
    //監聽按下發生的事件
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    //監聽放開發生的事件
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onKeyDown(event: EventKeyboard) {
    //按下按鍵改變方向
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
        this.moveDir.y = 1;
        break;
      case KeyCode.ARROW_DOWN:
        this.moveDir.y = -1;
        break;
      case KeyCode.ARROW_RIGHT:
        this.moveDir.x = 1;
        break;
      case KeyCode.ARROW_LEFT:
        this.moveDir.x = -1;
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    //放開按鍵把方向值歸零，避免一直行動
    switch (event.keyCode) {
      case KeyCode.ARROW_UP:
        if (this.moveDir.y > 0) this.moveDir.y = 0;
        break;
      case KeyCode.ARROW_DOWN:
        if (this.moveDir.y < 0) this.moveDir.y = 0;
        break;
      case KeyCode.ARROW_RIGHT:
        if (this.moveDir.x > 0) this.moveDir.x = 0;
        break;
      case KeyCode.ARROW_LEFT:
        if (this.moveDir.x < 0) this.moveDir.x = 0;
        break;
    }
  }

  update(dt: number) {
    //每秒跑60次，計算新位置
    //新位置 = 目前位置 + 方向 * 速度 * 時間間隔(dt)
    //時間間隔是為了讓快電腦和慢電腦跑起來的速度一致，約兩偵
    let pos = this.node.position;
    let newX = pos.x + this.moveDir.x * this.speed * dt;
    let newY = pos.y + this.moveDir.y * this.speed * dt;
    this.node.setPosition(newX, newY, 0);
  }
}
