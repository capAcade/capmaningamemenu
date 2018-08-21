import GameMenu from '../src/js/main';

window.onload = function () {
    let game = new Phaser.Game(1280, 1024, Phaser.AUTO, 'game');
    let gameMenu = new GameMenu(
        {
            title: 'capman Crashing bugs',
            background: 'assets/img/test/Intro_Screen_background.png',
            logo: 'assets/img/test/CapmanLogo1.svg',
            buttons: [
                {
                    id: 'onePlayer',
                    text: '- start one player -'
                },
                {
                    id: 'twoPlayers',
                    text: '- start two player -'
                },
                {
                    id: 'highScores',
                    text: '- High scores -'
                }
            ]
        },
        (button) =>{
            console.log(button);
            game.state.start('play', true, false, {level: 0}); 
        }
    );
    game.state.add('gameMenu', gameMenu)
    game.state.start('gameMenu', true, false, {level: 0});
};