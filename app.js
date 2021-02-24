import * as PIXI from 'pixi.js';
import fragment from './shader/fragment.glsl'

let img = require('./image/img-1.jpg');
let img2 = require('./image/img-5.jpg');
let img1 = require('./image/img-5.jpg');

let loader = PIXI.loader;
loader.add('img-1', img)
loader.add('img-2', img1)
loader.add('img-3', img2)

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
    autoResize: true
});

document.body.appendChild(app.view);


// load the texture we need
loader.load((loader, resources) => {
    
    // Creating new filter first parameter is for the vertex shader if wanted. We can just set this to null.
    let Filter = new PIXI.Filter(null, fragment);
 
    // This creates a texture from a 'bunny.png' image.
    const matrix = new PIXI.Sprite(resources.img1.texture);
 
    // Setup the position of the matrix
    matrix.x = app.renderer.width / 2;
    matrix.y = app.renderer.height / 2;
 
    // Rotate around the center
    matrix.anchor.x = 0.5;
    matrix.anchor.y = 0.5;
    
    
    matrix.filters = [Filter];
    // Add the matrix to the scene we are building.
    app.stage.addChild(matrix);
 
    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the matrix around a bit
        matrix.rotation += 0.01;
    });
});

// Different from WebGL and Three.js's uV pixi uses a vTextureCoord to render images to our shaders.