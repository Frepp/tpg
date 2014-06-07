<?php
/**
 * Config-file for Dux. Change settings here to affect installation.
 *
 */
 
/**
 * Set the error reporting.
 *
 */
error_reporting(-1);              // Report all type of errors
ini_set('display_errors', 1);     // Display all errors 
ini_set('output_buffering', 0);   // Do not buffer outputs, write directly
 
 
/**
 * Define Dux paths.
 *
 */
define('DUX_INSTALL_PATH', __DIR__ . '/..');
define('DUX_THEME_PATH', DUX_INSTALL_PATH . '/theme/render.php');
 
 
/**
 * Include bootstrapping functions.
 *
 */
include(DUX_INSTALL_PATH . '/src/bootstrap.php');
 
 
/**
 * Start the session.
 *
 */
session_name(preg_replace('/[:\.\/-_]/', '', __DIR__));
session_start();
 
 
/**
 * Create the Dux variable.
 *
 */
$dux = array();
 
 
/**
 * Site wide settings.
 *
 */
$dux['lang']         = 'eng';
$dux['title_append'] = ' | The Plane Game';

$dux['header'] = <<<EOD
<img src='img/logo.png' alt='Javascript logo'/>
EOD;

$dux['footer'] = <<<EOD
<footer><span class='sitefooter'>Copyright (c) 2014 Fredrik Peterson (fpeterson94@gmail.com)</span></footer>
EOD;

/**
* Navigation bar
*
*/


//$speedy['navbar'] = null; // To skip the navbar 
$dux['navbar'] = array( 
        'class' => 'navbar', 
        'items' => array( 
                'home'         	=> array('text'=>'Start',         'url'=>'index.php',		'title' => 'The game'),
				'about'         	=> array('text'=>'About',     'url'=>'about.php',		'title' => 'About'),
                
        ), 
        'callback' => function($url) { 
            if(basename($_SERVER['SCRIPT_FILENAME']) == $url) { 
                return true; 
            } 
        } 
);


/**
 * Theme related settings.
 *
 */
$dux['stylesheets'] = array('css/style.css');
$dux['favicon']    = 'img/favicon.ico';

/**
 * Set constants for img and gallery
 *
 */
define('IMG_PATH', __DIR__ . '/img/');

/**
 * Settings for the database.
 *
 */
$dux['database']['dsn']            = ''; //Database source
$dux['database']['username']       = ''; //Database username
$dux['database']['password']       = ''; //Database password
$dux['database']['driver_options'] = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'");
