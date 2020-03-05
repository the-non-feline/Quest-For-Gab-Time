import { makeFunctions } from './AuxFunctions.js';
import { healthCrate } from '/src/classes/healthCrate.js';
import { bookEnemy } from '/src/classes/bookEntity.js';

export class Scene1 extends Phaser.Scene {
    
    
    
    
    constructor ()
    {
        super('Scene1');
    }
    

     preload ()
{
    this.load.image('tiles', 'assets/TileSheets/grass_tiles.png');
    this.load.image('concrete', 'assets/TileSheets/concrete_tiles.png');
    this.load.image('doors', 'assets/TileSheets/doors.png');
    this.load.image('spike', 'assets/TileSheets/Spikes.png');
    this.load.tilemapCSV('map', 'assets/MapCSVs/level1layer2.csv');
    this.load.tilemapCSV('layer1', 'assets/MapCSVs/level1layer1.csv');
    this.load.tilemapCSV('layer15', 'assets/MapCSVs/level1layer15.csv');
    this.load.tilemapCSV('doorCSV', 'assets/MapCSVs/Level1Doors.csv');
    this.load.tilemapCSV('spikeCSV', 'assets/MapCSVs/spike.csv');
    this.load.spritesheet('player', 'assets/Entities/player.png', { frameWidth: 32, frameHeight: 32 });
    
    this.load.image('healthCrate', '/assets/Images/HealthCrateV1.png');
    this.load.spritesheet('book', '/assets/Entities/FlyingBook.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('fireBall', '/assets/Entities/FireBall.png',{ frameWidth: 32, frameHeight: 32 });
}

init (data)
    {
     
        'use strict';

        this.PASSING_OBJ = data;
    }

 create ()
{
    this.startScene2 = function (player, star)
    {
        this.scene.start('Scene1', this.PASSING_OBJ)
    } 
    
    var layer1map;
    var layer15map;
    var map;
    var doorsLayerMap;
    var spikeLayerMap
    this.Keystrokes = [];
    this.fireballEnabled = true
    
    layer1map = this.make.tilemap({ key: 'layer1', tileWidth: 32, tileHeight: 32 });  //dark grass
    var tileset1 = layer1map.addTilesetImage('tiles');
    var layer1 = layer1map.createStaticLayer(0, tileset1, 0, 0);
    //layer1map.setCollisionBetween(5, 6);
    
    layer15map = this.make.tilemap({ key: 'layer15', tileWidth: 32, tileHeight: 32 });  //concrete
    var tileset15 = layer15map.addTilesetImage('concrete');
    var layer15 = layer15map.createStaticLayer(0, tileset15, 0, 0);
    //layer1map.setCollisionBetween(5, 6);

    map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });   //grass
    var tileset = map.addTilesetImage('tiles');
    this.layer = map.createStaticLayer(0, tileset, 0, 0);
    map.setCollisionBetween(70, 70);
    map.setCollisionBetween(-1, -1);
    
    doorsLayerMap = this.make.tilemap({ key: 'doorCSV', tileWidth: 32, tileHeight: 32 });  //doors
    var doorMap = doorsLayerMap.addTilesetImage('doors');
    var doorLayer = doorsLayerMap.createStaticLayer(0, doorMap, 0, 0);
    doorsLayerMap.setCollisionBetween(7, 10);
    
    spikeLayerMap = this.make.tilemap({ key: 'spikeCSV', tileWidth: 32, tileHeight: 32 });  //doors
    var spikeMap = spikeLayerMap.addTilesetImage('spike');
    var spikeLayer = spikeLayerMap.createStaticLayer(0, spikeMap, 0, 0);
    spikeLayerMap.setCollisionBetween(7, 10);
    

    this.player = this.physics.add.sprite(495, 92, 'player', 1);
    this.player.setDepth(1);
    
    this.player.anims.play('down', true);
    this.player.anims.stop();
    
    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.player, doorLayer, this.startScene2, null, this);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);


    this.cursors = this.input.keyboard.createCursorKeys();    
    makeFunctions(this);
    
    this.entities = [];
    
    this.entities.push(new healthCrate(this,400,400));
    this.entities.push(new bookEnemy(this,800,400,2));  //Pass in this object, x and y
    this.entities.push(new bookEnemy(this,800,500,2));
    this.entities.push(new bookEnemy(this,800,600,2));
    this.entities.push(new bookEnemy(this,800,700,2));
    this.entities.push(new bookEnemy(this,800,800,2));
    this.entities.push(new bookEnemy(this,800,900,2));
    this.entities.push(new bookEnemy(this,800,1000,2));
    this.entities.push(new bookEnemy(this,800,1100,2));
    this.entities.push(new bookEnemy(this,800,1200,2));
    this.entities.push(new bookEnemy(this,800,1300,2));
    
    console.log(this.PASSING_OBJ);
    
    
}

 update ()  {
     this.running();
     this.otherChecks();
}
    
    
}