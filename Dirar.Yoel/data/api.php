<?php

function makeConn() {
   include_once "auth.php";
   try {
      $conn = new PDO(...Auth());
      $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      return $conn;
   } catch(PDOException $e) {
      die('{"error":"'.$e->getMessage().'"}');
   }
}


// $r = PDO result
function fetchAll($r) {
   $a = [];
   while($row = $r->fetch(\PDO::FETCH_OBJ)) $a[] = $row;
   return $a;
}




/*
$c = connection
$ps = prepared statement
$p = parameters
*/
function makeQuery($c,$ps,$p,$makeResults=true) {
   try {
      if(count($p)) {
         $stmt = $c->prepare($ps);
         $stmt->execute($p);
      } else {
         $stmt = $c->query($ps);
      }

      $r = $makeResults ? fetchAll($stmt) : [];

      return [
         // "statement"=>$ps,
         // "params"=>$p,
         "result"=>$r
      ];
   } catch(PDOException $e) {
      return ["error"=>"Query Failed: ".$e->getMessage()];
   }
}




function makeStatement($data) {
   $c = makeConn();
   $t = $data -> type;
   $p = $data -> params;

   switch($t) {
      case "users_all":
         return makeQuery($c, "SELECT * FROM `track_users`", $p);
      case "animals_all":
         return makeQuery($c, "SELECT * FROM `track_animals`", $p);
       case "locations_all":
         return makeQuery($c, "SELECT * FROM `track_locations`", $p);

      case "user_by_id":
         return makeQuery($c, "SELECT `id`, `email`, `name`,`img`,`username` FROM `track_users`WHERE `id` = ?", $p);
      case "animal_by_id":
         return makeQuery($c, "SELECT * FROM `track_animals`WHERE `id` = ?", $p);
      case "location_by_id":
         return makeQuery($c, "SELECT * FROM `track_locations`WHERE `id` = ?", $p);


         case "animals_by_user_id":
         return makeQuery($c, "SELECT * FROM `track_animals`WHERE `user_id` = ?", $p);
        case "locations_by_animal_id":
         return makeQuery($c, "SELECT * FROM `track_locations`WHERE `animal_id` = ?", $p);
      
    
     
      case "recent_animal_locations":
         return makeQuery($c,"SELECT *
            FROM `track_animals` a
            JOIN (
               SELECT lg.*
               FROM `track_locations` lg
               WHERE lg.id = (
                  SELECT lt.id
                  FROM `track_locations` lt
                  WHERE lt.animal_id = lg.animal_id
                  ORDER BY lt.date_create DESC
                  LIMIT 1
               )
            ) l
            ON a.id = l.animal_id
            WHERE a.user_id = ?
            ORDER BY l.animal_id, l.date_create DESC
         ", $p);


       case "check_signin":
         return makeQuery($c, "SELECT id from `track_users` WHERE `username` = ? AND `password` = md5(?)", $p);

      default:
         return ["error"=>"No Matched Type"];
   }
}


/*
"SELECT * FROM track_users",
"SELECT * FROM track_users WHERE id = ?",
"SELECT * FROM track_animals WHERE user_id = ?",
*/



$data = json_decode(file_get_contents("php://input"));

echo json_encode(
   makeStatement($data),
   JSON_NUMERIC_CHECK
);