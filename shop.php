<?php 
/**
 * This is a Dux pagecontroller.
 *
 */
// Include the essential config-file which also creates the $dux variable with its defaults.
include(__DIR__.'/config.php'); 

// Do it and store it all in variables in the Dux container.
$dux['title'] = "Shop";
 
$dux['main'] = <<<EOD
<div id="output">
</div>
<div id="shop">
<table>
	<tr>
    	<th>Image</th>
        <th>Description</th>
	</tr>
    <tr>
    	<th class="image"><img src="img/jvc.jpg"></th>
        <th class="description"><h3>JVC HAFX1X Xtreme Xplosives</h3><p>In-ear canal headphones that reproduce powerful and dynamic deep bass sound. The new three-model Xtreme Xplosives, or XX, series combines aggressive new design with JVC’s traditional high-quality build and style to meet the needs of today’s music enthusiasts in comfort, sound and price.</p></th>
        <th class="number"><input type="number" name="number" value="1"></th>
        <th class="price">24.99</th>
        <th class="button"><button>Add</button></th>
	</tr>
    <tr>
    	<th class="image"><img src="img/sony.jpg"></th>
        <th class="description"><h3>Sony MDRZX100B Fashionable Headphones</h3><p>You're always out and about and your music goes with you. But just because you're outside, does than mean you have to put up with inferior sound quality? No way. These high quality overhead phones are made for clearer tones, deeper bass and better noise isolation with a choice of 30mm or 50mm drivers. Impressive sound wherever life takes you.</p></th>
        <th class="number"><input type="number" name="number" value="1"></th>
        <th class="price">19.99</th>
        <th class="button"><button>Add</button></th>
	</tr>
	<tr>
    	<th class="image"><img src="img/akg.jpg"></th>
        <th class="description"><h3>AKG K451 High-Performance</h3><p>Quality. Portability. Style. Those are the qualities that the AKG K451 foldable mini-headset is all about. The K451 connects to any MP3 player and can also be used to make hands-free calls. This update of the 2009 Red Dot Design Award winner is a must for anyone who is both in the know and on the go.</p></th>
        <th class="number"><input type="number" name="number" value="1"></th>
        <th class="price">48.00</th>
        <th class="button"><button>Add</button></th>
	</tr>    
</table>
</div>
EOD;
 
$dux['script'] = array('js/shop.js');
$dux['stylesheets'][] = "css/shop.css";
 
 
// Finally, leave it all to the rendering phase of Dux.
include(DUX_THEME_PATH);