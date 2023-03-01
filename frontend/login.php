<link rel='stylesheet' type='text/css' media='screen' href='styles/login.css'>
<link rel='stylesheet' type='text/css' media='screen' href='styles/footer.css'>
<?php
include("dbconnection.php");
echo "<title>" . 'Log In' . "</title>";
include("header.html");
echo "<h1 class=head>Log in!<h1>";
echo " <p id=new>Not registered yet?</p>";
echo "<img class = loginimg src=images/Qonvo-logo.png>";
echo "<form action=login.php method=post>";
echo " <p class=welcome> Welcome Back</p>";
echo "<label class=name >User name</label>";
echo $username = " <input type=text id=username name=username placeholder='Please enter valid username' required>";
echo " <br>";
echo "<label class=password >Password</label>";
echo $pass1 = " <input type=password id=pass1 name=pass1 placeholder='Enter valid Password' required>";
echo " <br>";
echo "<button class=but type=submit>sign in</button>";
echo "<button class=register onclick=window.location.href='signup.php'>Create account</button> ";
echo "</form>";
include("footer.html");

// $username = stripcslashes($username);
// $password = stripcslashes($password);
// $username = mysqli_real_escape_string($con, $username);
// $password = mysqli_real_escape_string($con, $password);

// $sql = "select username, pass1 from users ";
// $exeSQL = mysqli_query($conn, $SQL) or die(mysqli_error($conn));
// $arrayp = mysqli_fetch_array($exeSQL);
// $count = mysqli_num_rows($exeSQL);
// if ($arrayp['username' == $username]) {
//     echo "<h1><center> Login successful </center></h1>";
// } else {
//     echo "<h1> Login failed. Invalid username or password.</h1>";
// }
session_start();
   
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 
      
      $myusername = mysqli_real_escape_string($conn,$_POST['username']);
      $mypassword = mysqli_real_escape_string($conn,$_POST['pass1']); 
      
      $sql = "SELECT username FROM user WHERE username = '$myusername' and passcode = '$mypassword'";
      $result = mysqli_query($conn,$sql);
      $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
      $active = $row['active'];
      
      $count = mysqli_num_rows($result);
      
      // If result matched $myusername and $mypassword, table row must be 1 row
		
      if($count == 1) {
        'session_register'("myusername");
         $_SESSION['login_user'] = $myusername;
         
         header("location: welcome.php");
      }else {
         $error = "Your Login Name or Password is invalid";
      }
   }
?>