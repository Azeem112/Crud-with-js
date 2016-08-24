<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.

Sql Query 

CREATE TABLE `user1`.`Users` ( `index` INT(100) NOT NULL AUTO_INCREMENT ,
`first-name` TEXT NOT NULL , `last-name` TEXT NOT NULL ,
`email` VARCHAR(35) NOT NULL , `web` VARCHAR(50) NOT NULL ,
`gender` TEXT NOT NULL , PRIMARY KEY (`index`)) ENGINE = InnoDB;
-->

<html>
    <head>
        <meta charset="UTF-8">
        
        <title>Snow Love</title>

	<link rel="shortcut icon" type="image/png" href="img/favicon.png"/>
	<link rel="stylesheet" type="text/css" href="css/js-site.css">
        
    </head>
    
    <body class="background">
        <?php
           class Connection{
               
               private $Host;
               private $User;
               private $Password;
               private $Database;
               protected $Connection;
               
               function __construct(){
                   
               }
 
               function __construct1($Password, $Database) {
                   $this->Host = 'localhost';
                   $this->User = 'root';
                   $this->Password = $Password;
                   $this->Database = $Database;
               }

               
               function getConnection() {
                   if($this->Connection == TRUE){
                        return TRUE;
                   }
               }
               
               function getHost() {
                   return $this->Host;
               }

               function getUser() {
                   return $this->User;
               }

               function getPassword() {
                   return $this->Password;
               }

               function getDatabase() {
                   return $this->Database;
               }

               function setHost($Host) {
                   $this->Host = $Host;
               }

               function setUser($User) {
                   $this->User = $User;
               }

               function setPassword($Password) {
                   $this->Password = $Password;
               }

               function setDatabase($Database) {
                   $this->Database = $Database;
               }

               function connect($host, $user, $password, $database){
                   if(mysqli_connect($host, $user, $password, $database)){
                       $this->Connection=mysqli_connect($host, $user, $password, $database);
                       return TRUE;
                   }else{
                       return FALSE;
                   }
               }
           }///////////////////////////
           
           class Query extends Connection{
               private $Query;
               protected $result;
                       
               function __construct(){
                   parent::__construct();
               }
               
               function __construct1($Password, $Database, $Query) {
                   parent::__construct($Password, $Database);
                   $this->Query = $Query;
               }
               
               function getQuery() {
                   return $this->Query;
               }

               function setQuery($Query) {
                   $this->Query = $Query;
               }
               
               function Add(){
                   if( mysqli_query($this->Connection ,$this->Query) === TRUE ){
                       $this->result= mysqli_query($this->Connection ,$this->Query);
                       echo '<h1>Data Inserted Successfully</h1>';
                   }else{
                       echo 'Error: Cant Execute query';
                       exit();
                   }
               }
               
               function customQuery($Query){
                   if( mysqli_query($this->Connection, $Query) === TRUE ){
                       $this->result = mysqli_query($this->Connection, $Query);
                       return $this->result;
                   }else{
                       echo 'Error: Cant Execute query';
                       exit();
                   }
               }
            }///////////////////////////
            
            class Display {
                public $Query;
                private $data;
                
                function __construct() {
                    $this->Query = new Query();
                }
                
                function showAll(){
                    
                    $Query="select * from users";
                    $this->data = $this->Query->customQuery($Query);
 
                    while ( $resultset = mysqli_fetch_array($this->data)) {
                        
                        echo 'Index no:   '.$resultset[0]."<br/>";
                        echo 'First-name:   '.$resultset[1]."<br/>";
                        echo 'Last-name:   '.$resultset[2]."<br/>";
                        echo 'Email:   '.$resultset[3]."<br/>";
                        echo 'Web:   '.$resultset[4]."<br/>";
                        echo 'Geder:   '.$resultset[5]."<br/>";
                        
                        echo "<br/>";
                        echo "<br/>";
                        echo "<br/>";
                    }
                }
                
                function Update(){
                    
                    $Query=" ";
                    $this->data = $this->Query->customQuery($Query);
                }
                
                function btn(){
                    $btn="<button >Add</button>";
                }

            }
            
            $firstName = $lastName = $email = $web = $gender = '';
            
            $firstName=($_POST["fName"]);
            $lastName=($_POST["lName"]);
            $$email=($_POST["email"]);
            $web=($_POST["url"]);
            $gender=($_POST["gender"]);
            
//           echo $gender;
            
            $database='user1';
            
            $Query="INSERT INTO `Users`(`first-name`, `last-name`, `email`, `web`, `gender`) VALUES ('$firstName','$lastName','$$email','$web','$gender')";
                    
            $display = new Display();
            
            if($display->Query->connect('localhost', 'root', '', $database)){
                
                 $display->Query->setQuery($Query);
                 
//               echo $display->Query->getQuery();
//               echo $display->Query->getConnection();
                 
                 
                 $display->Query->Add();
                 $display->showAll();
                 
            }  else {
                echo 'Error While Connecting with database';
            }
        ?>
        <a href="UserForm.html" id="controlbtn">Add Data</a>
    </body>
</html>
