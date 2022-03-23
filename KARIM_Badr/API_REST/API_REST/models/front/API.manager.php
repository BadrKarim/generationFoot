<?php

require_once "./models/model.php";

class APIManager extends Model{

    public function getDBInfosEntreprise(){

        $req = "SELECT * FROM entreprise";
        $statment =$this -> getBdd() -> prepare($req);
        $statment -> execute();
        $infosEntreprise = $statment -> fetchAll(PDO::FETCH_ASSOC);
        $statment -> closeCursor();
        return $infosEntreprise;

    }

    public function getDBInitReservation(){        
        $centres = $this -> getDBCentes();
        $typesTerrains = $this -> getDBTypesTerrains();

    $centresArray = array($centres);
    $typesTerrainsArry = array($typesTerrains);

    $arr = array('listeDesCentres' => $centres, 'typesTerrains' => $typesTerrains);
    

        //return json_encode(array($centresArray,$typesTerrainsArry));
        return json_encode($arr);
    }

    public function getDBCentes(){

        $req = "SELECT * FROM centres where actif = 1";
        $statment =$this -> getBdd() -> prepare($req);        
        $statment -> execute();
        $centres = $statment -> fetchAll(PDO::FETCH_ASSOC);
        $statment -> closeCursor();
        return $centres;
    }

    public function getDBTypesTerrains(){

        $req = "SELECT * FROM type_terrain";
        $statment =$this -> getBdd() -> prepare($req);        
        $statment -> execute();
        $typesTerrains = $statment -> fetchAll(PDO::FETCH_ASSOC);
        $statment -> closeCursor();
        return $typesTerrains;
    }


    public function rechercheStadesPourReservation($centreId, $jour, $heure, $duree, $typeTerrainId){
        
        //$dateReservation = $creneau->format('Y-m-d');
        //$timeReservation = $creneau->format('H:i:s');
        //echo ($dateReservation);
        //echo ($timeReservation);
        $date_reservation = $jour . " " . $heure;
    
        $req = "select 
                s.id AS 'stadeId',
                s.libelle AS 'nom',    
                tp.libelle AS 'type',
                e.libelle AS 'emplacement',
                e.typeEmplacement AS 'typeEmplacement',
                c.nom AS 'centre',
                s.avecCamera AS 'avecCamera',
                (s.tarif * (:duree / 60)) AS 'tarif'
                
            from  stade s
            JOIN emplacements e ON e.id = s.id_emplacement
            JOIN type_terrain tp ON tp.id = s.id_type_terrain
            JOIN centres c ON c.id = e.id_ctr
            LEFT JOIN reservation r ON r.id_stade = s.id AND STR_TO_DATE(:dateReservation, '%d/%m/%Y %H:%i') >= r.actif_du 
            AND STR_TO_DATE(:dateReservation, '%d/%m/%Y %H:%i') < r.actif_au
            
            WHERE c.id = :idcentre        
            AND 
                (
                    :idTypeTerrain = 0
                    OR   
                    tp.id = :idTypeTerrain
                )
            AND r.id IS NULL
            ORDER BY s.id";
        $statment =$this -> getBdd() -> prepare($req);  
        $statment -> bindValue(":idcentre", $centreId, PDO::PARAM_INT); 
        $statment -> bindValue(":idTypeTerrain", $typeTerrainId, PDO::PARAM_INT);  
        $statment -> bindValue(":dateReservation", $date_reservation, PDO::PARAM_STR);   
        $statment -> bindValue(":duree", $duree, PDO::PARAM_INT);      
        $statment -> execute();
        $stades = $statment -> fetchAll(PDO::FETCH_ASSOC);
        $statment -> closeCursor();
        return $stades;
    }

   

    public function getDBStadeByID($idStade){

        $req = "SELECT * FROM stade WHERE id = :idStade";
        $statment =$this -> getBdd() -> prepare($req);
        $statment -> bindValue(":idStade", $idStade, PDO::PARAM_INT);
        $statment -> execute();
        $stade = $statment -> fetchAll(PDO::FETCH_ASSOC);
        $statment -> closeCursor();
        return $stade;
    }

    public function getDBEmplacements(){

        $req = "SELECT * FROM emplacements";
        $statment =$this -> getBdd() -> prepare($req);
        $statment -> execute();
        $emplacements = $statment -> fetchAll(PDO::FETCH_ASSOC);
        $statment -> closeCursor();
        return $emplacements;

    }

    public function getDBUser(){

        $req = "SELECT * FROM infos_club";
        $statment =$this -> getBdd() -> prepare($req);
        $statment -> execute();
        $user = $statment -> fetchAll(PDO::FETCH_ASSOC);
        $statment -> closeCursor();
        return $user;

    }

    public function getDBReservation(){

        $req = "SELECT * FROM infos_club";
        $statment =$this -> getBdd() -> prepare($req);
        $statment -> execute();
        $reservation = $statment -> fetchAll(PDO::FETCH_ASSOC);
        $statment -> closeCursor();
        return $reservation;

    }

    public function getDBLogin($email, $password){ 
        try{       
            
        $req = "SELECT username, email FROM user WHERE email = :email AND password = :password AND actif = 1";
        $statment =$this -> getBdd() -> prepare($req);
        $statment -> bindValue(":email", $email, PDO::PARAM_STR);
        $statment -> bindValue(":password", hash('sha256', $password), PDO::PARAM_STR);
        $statment -> execute();
        //$mainCount = $statment -> rowCount();
        $userData = $statment->fetch(PDO::FETCH_OBJ);
        $statment -> closeCursor();
                
        if($userData){              
            return json_encode(['isOk' => true, 'userData' => $userData]);        
            
         } else {                          
            return json_encode(['isOk' => false, 'message' => "votre email ou mot de passe est incorrect"]); 
         }
        }catch(PDOException $e) {
            throw new Exception($e->getMessage());
            }
        
    }

    public function DBSubscribe($userName, $email, $password){ 
        try{       
                        
            $userData = $this -> DBgetUserByEmail($email);
        if($userData)
        {            
            return json_encode(['isOk' => false, 'message' => "Email déjà utilisé."]); 
        }else
        {            
            $req2 = "INSERT INTO user (email, password, username, actif) VALUES (:email, :password, :userName, 1)";
            $statment =$this -> getBdd() -> prepare($req2);
            $statment -> bindValue(":email", $email, PDO::PARAM_STR);
            $statment -> bindValue(":password", hash('sha256', $password), PDO::PARAM_STR);
            $statment -> bindValue(":userName", $userName, PDO::PARAM_STR);
            $statment -> execute();                                    
            $userData = $statment->fetch(PDO::FETCH_OBJ);
            $statment -> closeCursor();

            $userData = $this -> DBgetUserByEmail($email);
            if($userData){              
                return json_encode(['isOk' => true, 'userData' => $userData]);        
                
             } else {                          
                return json_encode(['isOk' => false, 'message' => "votre email ou mot de passe est incorrect"]); 
             }
        }
        
        }
        catch(PDOException $e) {            
            throw new Exception($e->getMessage());
            }
        
    }


    public function DBReserverStade($stadeId, $jour, $heure, $duree, $email){ 
        try
        {
            $date_reservation = $jour . " " . $heure;

        $req = "
            SET @userId = (SELECT id FROM user WHERE email = :email and actif = 1);
            SET @montant = (SELECT tarif FROM stade WHERE id = :stadeId);            
            SET @actif_du = STR_TO_DATE(:dateReservation, '%d/%m/%Y %H:%i');
            SET @actif_au =  date_add(@actif_du, INTERVAL :duree MINUTE);
            INSERT INTO reservation (id_stade, id_user, actif_du, actif_au, montant)
            value(:stadeId, @userId, @actif_du, @actif_au, (@montant * (:duree / 60))); 

            
            ";
        $statment = $this -> getBdd() -> prepare($req);  
        $statment -> bindValue(":stadeId", $stadeId, PDO::PARAM_INT);          
        $statment -> bindValue(":dateReservation", $date_reservation, PDO::PARAM_STR);   
        $statment -> bindValue(":duree", $duree, PDO::PARAM_INT);      
        $statment -> bindValue(":email", $email, PDO::PARAM_STR); 
        $statment -> execute();        
        $result = $statment -> fetch(PDO::FETCH_OBJ);              
        $statment -> closeCursor();




        $stmt = $this -> getBdd()->query("SELECT LAST_INSERT_ID()");
        $lastId = $stmt->fetchColumn();
        $req = " SELECT 
                r.id,                  
                DATE_FORMAT(r.actif_du, '%d/%m/%Y à %H:%i') AS 'reservationDu', 
                DATE_FORMAT(r.actif_au, '%d/%m/%Y à %H:%i') AS 'reservationAu', 
                r.montant AS 'montantReservation', 
                s.libelle AS 'stade',
                e.libelle  AS 'emplacement', 
                c.nom   AS 'centre', 
                c.adresse AS 'adresse', 
                c.ville AS 'ville', 
                c.code_postale AS 'cp'
            FROM reservation r
            JOIN stade s ON s.id = r.id_stade 
            JOIN emplacements e ON e.id = s.id_emplacement
            JOIN centres c ON c.id = e.id_ctr
        WHERE r.id = :idReservation";
        $statment = $this -> getBdd() -> prepare($req);  
        $statment -> bindValue(":idReservation", $lastId, PDO::PARAM_INT);                  
        $statment -> execute();
        $result = $statment -> fetch(PDO::FETCH_OBJ);              
        $statment -> closeCursor();

                 
        if($result){              
            return json_encode(['isOk' => true,'message' => "votre réservation a bien été enregistrée. Vous recevez un email de confirmation dans votre adresse email " . $email, 'reservationData' => $result]);        
            
         } else {                          
            return json_encode(['isOk' => false, 'message' => "erreur de confirmation de votre réservation..."]); 
         }
                    
                                   
            
         
        }catch(PDOException $e) {        
                           
            throw new Exception($e->getMessage());
            }
    }


    private function DBgetUserByEmail($email){ 
        $req1 = "SELECT username, email FROM user WHERE email = :email";
        $statment =$this -> getBdd() -> prepare($req1);
        $statment -> bindValue(":email", $email, PDO::PARAM_STR);        
        $statment -> execute();
        $userData = $statment->fetch(PDO::FETCH_OBJ);     
        $statment -> closeCursor();

        return $userData;
    }
}

