<?php

define("URL", str_replace("index.php","",(isset($_SERVER['HTTPS']) ? "https" : "http").
"://$_SERVER[HTTP_HOST]$_SERVER[PHP_SELF]"));

require_once "controllers/front/API.controller.php";

$apiController = new APIController();

try{
    if(empty($_GET['page'])){
        throw new Exception("la page demandée n'existe pas");
    } else {
        $url = explode("/", filter_var($_GET['page'], FILTER_SANITIZE_URL));
       if(empty($url[0]  || empty($url[1]))) throw new Exception("la page demandée n'existe pas");
       switch($url[0]){
           case "front" : 
            switch($url[1]){
                case "getDBInfosEntreprise" : $apiController -> getDBInfosEntreprise();
                break;
                case "getDBInitReservation" : $apiController -> getDBInitReservation();
                break;
                case "getDBCentes" : $apiController -> getDBCentes();
                break;
                case "getDBTypesTerrains" : $apiController -> getDBTypesTerrains();
                break;
                case "rechercheStadesPourReservation" : 
                    $centreId = $_REQUEST['centreId'] ;
                    $jour = $_REQUEST['jour'] ;
                    $heure = $_REQUEST['heure'] ;
                    $duree = $_REQUEST['duree'] ;
                    $typeTerrainId = $_REQUEST['typeTerrainId'] ;
                    
                    //$format = 'Y-m-d H:i:s';
                    //$creneau = DateTime::createFromFormat($format, $creneau);                    
                    $apiController -> rechercheStadesPourReservation($centreId, $jour, $heure, $duree, $typeTerrainId);
                    
                    
                    
                    break;
                case "stade" :
                    if(empty($url[2])) throw new Exception("l'identifiant du stade n'est pas correcte");
                    $apiController -> getDBStadeByID($url[2]);
                break;
                case "emplacements" : $apiController -> getEmplacements();
                break;
                case "user" : $apiController -> getUser();
                break;
                case "reservation" : $apiController -> getReservation();
                break;
                case "login" : 
                    if (isset($_REQUEST['email'], $_REQUEST['password'])){
                        $email = stripslashes($_REQUEST['email']) ;
                        $password = stripslashes($_REQUEST['password']) ;                                                            
                        $apiController -> getDBLogin($email, $password); 
                    }                                                           
                    break;
                    case "subscribe" :                        
                        if (isset($_REQUEST['email'], $_REQUEST['password'], $_REQUEST['username'])){                            
                            $email = stripslashes($_REQUEST['email']) ;
                            $password = stripslashes($_REQUEST['password']) ; 
                            $userName = stripslashes($_REQUEST['username']) ;   
                                                                                      
                            $apiController -> DBSubscribe($userName, $email, $password); 
                        }                                                           
                        break;

                        case "reserverStade" : 
                            if (isset($_REQUEST['stadeId'], $_REQUEST['jour'], $_REQUEST['heure'], $_REQUEST['duree'], $_REQUEST['email'])){
                            $stadeId = stripslashes($_REQUEST['stadeId']) ;
                            $jour = stripslashes($_REQUEST['jour'] );
                            $heure = stripslashes($_REQUEST['heure']) ;
                            $duree = stripslashes($_REQUEST['duree']) ; 
                            $email = stripslashes($_REQUEST['email']) ;                                                                                  
                            $apiController -> DBReserverStade($stadeId, $jour, $heure, $duree, $email);
                            }
                            
                            
                            
                            break;
                default : throw new Exception("la page n'existe pas");
            }
           break;
           case "back" : echo "page back end demandée pour le moment";
           break;
           default : throw new Exception("la page n'existe pas");
       }
    }
} catch (Exception $e){
    $msg = $e -> getMessage();
    echo $msg;
}

?>