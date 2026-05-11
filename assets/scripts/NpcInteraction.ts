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
interface DialogueData {
  name: string;
  text: string[];
}

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

  private dialogueData: DialogueData = {
    name: "Flowey",
    text: ["Chara Is You?", "It's me, Your Best Friend", "ASRIAL DREEMERR"],
  };
  private currentLine: number = 0;
  private isTalking: boolean = false;

  onKeyDown(event: EventKeyboard) {
    console.log("Pressed", event.keyCode);
    //互動鍵
    if (event.keyCode === KeyCode.KEY_Z) {
      if (!this.isTalking) {
        let dist = Vec3.distance(this.node.position, this.player.position);
        if (dist < this.interactDistance) {
          this.startDialogue();
        }
      } else {
        this.nextSubLine();
      }
    }
  }

  startDialogue() {
    this.isTalking = true;
    this.currentLine = 0;
    this.dialogueBox.active = true;
    this.updateUI();
  }

  nextSubLine() {
    this.currentLine++;
    if (this.currentLine < this.dialogueData.text.length) {
      this.updateUI();
    } else {
      this.isTalking = false;
      this.dialogueBox.active = false;
    }
  }

  updateUI() {
    const name = this.dialogueData.name;
    const content = this.dialogueData.text[this.currentLine];
    this.contentLabel.string = `${name}: ${content}`;
  }
}
