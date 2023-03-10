<meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='styles/main.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='styles/header.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='styles/room.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='styles/userpage.css'>
<?php
include("header.html");
include("dbconnection.php");
include("footer.html");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else{
    session_start();
$name = $_SESSION['name'];
echo"<header id='nav'>
<div class='nav--list'>
    <button id='members__button'>
         <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'>
            <path d='M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z' fill='#ede0e0'>
                <path d='M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z' />
        </svg>
    </button>
    <a href='lobby.html'>
        <h3 id='logo'>
            <img src='images/Qonvo-logo.png' alt='Site Logo'>
            <span>Qonvo</span>
        </h3>
    </a>
</div>
<div id='navigation'>
    <ul>
        <div>
            <li><a href='room.html'>Join meeting</a></li>
            
            <li><a href='login.php'>Sheduel meeting</a></li>
        </div>
        <div>
            <li><a href='login.php'>Log out</a></li>
        </div>
    </ul>
</div>
</header>";
echo "
<div class='coverphoto'>
<img src='images/stream-thumbnail.png' alt='cover photo'>
<button class='cover' onclick='window.location.href='lobby.html''>Upload cover</button> 
</div>";
echo "
<div class='bigprofile'>
<img src='images/3.PNG' alt='profile photo'>";
echo $name;
$SQL = "SELECT username, fname, lname,email,pass1,id FROM qonvo WHERE username = '$name'";
$exeSQL=mysqli_query($conn, $SQL) or die (mysqli_error($conn));
while ($arrayp=mysqli_fetch_array($exeSQL))
{
   $name1=$arrayp['fname'];
   $name2=$arrayp['lname'];
   $passs=$arrayp['pass1'];
   $mail=$arrayp['email'];
   $idd=$arrayp['id'];
}
echo"
<label class='name' >".$name1." ".$name2."</label>
<a class='change' >Change</a>
<a class='delete' >Delete</a>
</div>
    <label class='meetingidlble'  for=''>Your own room id</label>.<label class='meetingid'  for=''>".$idd."</label>
    <label class='emaillble'  for=''>Email</label>.<label class='email'  for=''>".$mail."</label>
    <label class='timezonelble'  for=''>timezone</label>.<label class='timezone'  for=''>xxxxxxxx</label>
    <label class='passwordlble'  for=''>password</label>.<label class='password'  for=''>".$passs."</label>
    <label class='languagelble'  for=''>language</label>.<label class='language'  for=''>xxxxxxxx</label>
 ";
session_destroy();
}

?>
