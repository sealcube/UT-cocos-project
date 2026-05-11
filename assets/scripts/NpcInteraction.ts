import {
  _decorator,
  Component,
  Node,
  input,
  Input,
  EventKeyboard,
  KeyCode,
  Vec3,
  Label,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("NpcInteraction")
export class NpcInteraction extends Component {
  @property(Node)
  public player: Node = null!; //在Npc的NpcInteraction中拖入主角

  @property(Node)
  public dialogueBox: Node = null!; //在Npc的NpcInteraction中拖入對話框

  @property(Label)
  public contentLabel: Label = null!; //在Npc的NpcInteraction中拖入對話

  @property
  public interactDistance: number = 100; //互動距離

  start() {
    console.log("NPC Footprint Has Been Launched");
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event: EventKeyboard) {
    console.log("Pressed", event.keyCode);
    //互動鍵
    if (event.keyCode === KeyCode.KEY_Z) {
      this.checkDistance();
    }
  }
  checkDistance() {
    //計算主角與NPC的距離
    let dist = Vec3.distance(this.node.position, this.player.position);

    console.log("The Distance is", dist);

    if (dist < this.interactDistance) {
      console.log("Touch Completely");
      this.showDialogue("The talking flower");
    } else {
      console.log("No Touched");
    }
  }
  showDialogue(text: string) {
    this.dialogueBox.active = true; //顯示對話框
    this.contentLabel.string = text;
  }
}
