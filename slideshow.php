<?php 
/**
 * This is a Dux pagecontroller.
 *
 */
// Include the essential config-file which also creates the $dux variable with its defaults.
include(__DIR__.'/config.php'); 
 
 
// Do it and store it all in variables in the Dux container.
$dux['title'] = "Slideshow Plugin";
 
$dux['main'] = <<<EOD

<canvas id='canvas1' width='900' height='500'>
  Your browser does not support the element HTML5 Canvas.
</canvas>

EOD;
 
$dux['script'] = array('js/game.js');
$dux['stylesheets'][] = "css/game.css";
 
 
// Finally, leave it all to the rendering phase of Dux.
include(DUX_THEME_PATH);