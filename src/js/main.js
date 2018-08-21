let timer = 0;
const menuVelocity = 20;
let blinkTimer = 0;
let blinkVelocity = 30;

const handleInput = (context) => {
    
    timer--;
    if (context.keys.down.isDown && timer<=0) {
        context.selectedButton = (context.selectedButton+1) % context._buttons.length;
        timer=menuVelocity;
    } else if (context.keys.up.isDown && timer<=0) {
        context.selectedButton = (context.selectedButton-1) % context._buttons.length;
        timer=menuVelocity;
        //failsafe for negative numbers
        if(context.selectedButton < 0){
            context.selectedButton = context._buttons.length-1;
        }
    }
    else if (context.keys.fire.isDown) {
        context.cb(context.config.buttons[context.selectedButton]);
    }  
    else {
        //timer--;
        //console.log('keypressisstoped')
    }
 };

export default class GameMenu {
    constructor(config, cb) {
        this.config = config;
        this.cb = cb;
        this.selectedButton = 0;
    }
    preload() {
        if(typeof this.config.background === 'string'){
            this.game.load.image('bg', this.config.background);
        }
        if(typeof this.config.logo === 'string'){
            this.game.load.image('logo', this.config.logo);
        }

    }
    init() {
        this.game.renderer.renderSession.roundPixels = true;
        this.keys = this.game.input.keyboard.addKeys({
            down: Phaser.KeyCode.DOWN,
            up: Phaser.KeyCode.UP,
            fire: Phaser.KeyCode.CONTROL
        });
    }
    create() {
        this.game.stage.backgroundColor = '#000033';
        if(typeof this.config.background === 'string'){
            let bg = this.game.add.image(0, 0, 'bg');
            bg.height = this.game.height;
            bg.width = this.game.width;
        }
        if(typeof this.config.logo === 'string'){
            let logo = this.game.add.image(this.game.world.centerX, this.game.world.centerY -300, 'logo');
            logo.anchor.set(0.5);
        }

        let style = { font: "32px KenVector Future", fill: "#ffffff", align: "center" };
        let offSet = 0;

        this._buttons = this.config.buttons.map((button)=>{
            let out = this.game.add.text(this.game.world.centerX, this.game.world.centerY + offSet, button.text, style);
            out.anchor.set(0.5);
            out.stroke = '#26D8D7';
            out.strokeThickness = 6;
            offSet = offSet + 70;
            return out
        });

    }
    update () {
        handleInput(this);
        blinkTimer++
        if(blinkTimer >= blinkVelocity){
            this._buttons[this.selectedButton].visible = !this._buttons[this.selectedButton].visible;
            blinkTimer = 0;
        }
        this._buttons.forEach((button, index)=>{
            if(index !== this.selectedButton){
                button.visible = true;
            }
        });
    }
}
