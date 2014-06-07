<?php

include(__DIR__.'/config.php');
$db = new CDatabase($dux['database']);
 
// Get incoming
$name = isset($_POST['name']) ? $_POST['name'] : null;
$score = isset($_POST['score']) ? $_POST['score'] : null;
$lastscore = null;
$lastid = null;

// Insert new score
if(isset($name) && isset($score)){
$sql = "INSERT INTO js_game (playername, score) VALUES (?, ?)";
$params = array($name, $score);
$db->ExecuteQuery($sql, $params);

// get last inserted
$sql = "SELECT score, id FROM js_game ORDER BY id DESC LIMIT 1;";
$res = $db->ExecuteSelectQueryAndFetchAll($sql);
$lastscore = $res[0]->score;
$lastid = $res[0]->id;
}

// get current toplist
$sql = "SELECT playername, score FROM js_game ORDER BY score DESC LIMIT 5;";
$res = $db->ExecuteSelectQueryAndFetchAll($sql);

$toplist = "<table>";
$rank = 1;
foreach($res AS $key => $val) {
	$toplist .= "<tr><td>{$rank}</td><td>{$val->playername}</td><td>{$val->score}</td></tr>";
	$rank ++;
}
if(isset($lastscore) && isset($lastid)){
$sql = "SELECT Count(*) as position From js_game where score > {$lastscore}  ORDER BY score DESC;";
$yourrank = $db->ExecuteSelectQueryAndFetchAll($sql);
$yourrank = $yourrank[0]->position;

if($yourrank > 5){
$sql = "SELECT * From js_game where id = {$lastid}";
$res = $db->ExecuteSelectQueryAndFetchAll($sql);		
$res = $res[0];
	
$toplist .= "<tr><td>{$yourrank}</td><td>{$res->playername}</td><td>{$res->score}</td></tr>";
}
}
$toplist .= "</table>";
 
 
// Deliver the response, as a JSON object containing the name of the user.
header('Content-type: application/json');
echo json_encode(array('toplist'=>$toplist));