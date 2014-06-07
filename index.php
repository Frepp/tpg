<?php 
/**
 * This is a Dux pagecontroller.
 *
 */
// Include the essential config-file which also creates the $dux variable with its defaults.
include(__DIR__.'/config.php'); 
 
 
// Do it and store it all in variables in the Dux container.
$dux['title'] = "The Plane Game";
 
$dux['main'] = <<<EOD
<div id='canvas'>
<canvas id='canvas1' width='900' height='500'>
  Your browser does not support the element HTML5 Canvas.
</canvas>
</div>
<div id='submitscore'>
</div>
<div id='toplist'>
</div>
<div id='instructions'>
<h2>Instructions</h2>
<p>Try to avoid crashing as long as possible. Watch out for the hot air balloons and dont hit the ground. Pick up fuel cans to avoid running out of fuel.</p> 
<h3>Controls:</h3>
<ul>
<li>Space: Throttle (move up)</li>
<li>Left Arrow key: Move left</li>
<li>Right Arrow key: Move right</li>
</ul>
</div>
</div>

EOD;
 
$dux['script'] = array('js/game.js', 'js/frepp.js');
$dux['stylesheets'][] = "css/game.css";
 
 
// Finally, leave it all to the rendering phase of Dux.
include(DUX_THEME_PATH);