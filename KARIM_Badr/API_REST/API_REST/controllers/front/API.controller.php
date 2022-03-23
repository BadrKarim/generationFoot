<?php

require_once "./models/front/API.manager.php";
require_once "./models/model.php";

class APIController {

    private $apiManager;
 
    public function __construct(){
        $this -> apiManager = new APIManager();
    }
  
    public function getDBInfosEntreprise(){
        $infosClub = $this -> apiManager -> getDBInfosEntreprise();
        Model::sendJSON($infosClub);
    }
    public function getDBInitReservation(){
        $initReservation = $this -> apiManager -> getDBInitReservation();
        Model::sendJSON($initReservation);
    }

    public function getDBCentes(){
        $centres = $this -> apiManager -> getDBCentes();
        Model::sendJSON($centres);
    }
    public function getDBTypesTerrains(){
        $typesTerrains = $this -> apiManager -> getDBTypesTerrains();
        Model::sendJSON($typesTerrains);
    }
    public function rechercheStadesPourReservation($centreId, $jour, $heure, $duree, $typeTerrainId){        
        $stadesDispos = $this -> apiManager -> rechercheStadesPourReservation($centreId, $jour, $heure, $duree, $typeTerrainId);
        Model::sendJSON($stadesDispos);
    }

    public function getDBStadeByID($idStade){
        $idStade = $this -> apiManager -> getDBStadeByID($idStade);
        echo "données JSON que je veux transmettre de l'animal" .$idStade. "demandees";
    }

    public function getEmplacements(){
        $emplacements = $this -> apiManager -> getDBEmplacements();
        Model::sendJSON($emplacements);
    }

    public function getUser(){
        $user = $this -> apiManager -> getDBUser();
        Model::sendJSON($user);
    }

    public function getReservation(){
        $reservation = $this -> apiManager -> getDBReservation();
        Model::sendJSON($reservation);
    }

    public function getDBLogin($email, $password){
        $user = $this -> apiManager -> getDBLogin($email, $password);
        Model::sendJSON($user);
    }

    public function DBSubscribe($userName, $email, $password){ 
        $user = $this -> apiManager -> DBSubscribe($userName, $email, $password);
        Model::sendJSON($user);
    }

    public function DBReserverStade($stadeId, $jour, $heure, $duree, $email){ 
        $reservation = $this -> apiManager -> DBReserverStade($stadeId, $jour, $heure, $duree, $email);
        Model::sendJSON($reservation);
    }
}

?>