<?php 
/**
 * This is a Dux pagecontroller.
 *
 */
// Include the essential config-file which also creates the $dux variable with its defaults.
include(__DIR__.'/config.php'); 
 
 
// Do it and store it all in variables in the Dux container.
$dux['title'] = "About";
 
$dux['main'] = <<<EOD
<h1>Om The Plane Game</h1>

<h2>Allmänt</h2>

<p>The Plane Game (TPG) har byggt som en del av kursen javascript vid Blekinge Teknsika Högskola. TPG använder sig av det nytillkomna HTML5 elementet Canvas, som på ett enkelt sätt kan beskrivas som en rityta. Man kan sedan "rita" på denna yta genom att använda javascript. Spelet är ett enkelt spel var syfte är att visa upp denna nya teknik och eventuellt även skänka lite underhållning till användaren.</p>

<h2>Installation och källkod</h2>

<p>TPG finns upplagt som ett proejkt på Github där även instruktioner för installationsförfarandet finns. Är du intresserad av att se källkoden kan du spana in projektet på github eller kika direkt <a href='source.php?path=projekt/'>här</a>.</p>
<ul>
<li><a href='https://github.com/Frepp/tpg'>Github</a></li>
<li><a href='source.php?path=projekt/'>Källkod</a></li>
</ul>
<p>TPG är på denna webbplats inbakat i ett ramverk kallat Dux, detta är dock inget krav och för den något mer kunniga användaren är det inga problem att frilägga dem för spelet relevanta delarna.

<h2>Konkurrenter</h2>

<p>Att spela spel i weebläsaren är ett tidsfördriv som i rask takt håller på att försvinna. Detta tidsfördriv flyttar alltmer in i våra mobiler som har fördelen att alltid vara tillgängliga när en kort stund av uttråknad infinner sig. Det är också på denna plattform som jag finner mina främsta konkurrenter. Ett spel som för inte alltför lång tid sedan tog världen med storm är det supersvåra spelet Flappy Bird. Ett spel som var så beroendeframkallande att dess utvecklare valde att ta bort från de stora appbutikerna. Mobiler med spelet installerat har sedan sålts på sajter så som Blocket och ebay för flerdubbelt nypris. En fördel som webbaserade spel har gentemot appar är att de (förhoppningsvis) kan spelas på samtliga plattformar. I takt med att stödet för HTML5 blir allt större och mobilernas uppkoppling och prestanda blir bättre blir och möjligheterna för avancerade webbaplikationer större. Ett poblem med detta spel är att det inte går att spela på enheter med pekskärmar, då ett tangentbord måste användas. En lösning på detta skulle kunna vara att lägga in knappar som det går att trycka på eller på annat sätt byta ut kontrollerna till mer pekvänliga alternativ.</p>   
 


EOD;
 

 
 
// Finally, leave it all to the rendering phase of Dux.
include(DUX_THEME_PATH);