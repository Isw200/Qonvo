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
echo  $username =" <input type=text id=username name=username placeholder='Please enter valid username' required>";
echo " <br>";
echo "<label class=password >Password</label>";
echo $pass1=  " <input type=password id=pass1 name=pass1 placeholder='Enter valid Password' required>";
echo " <br>";
echo "<button class=but type=submit>sign in</button>";
echo "<button class=register onclick=window.location.href='signup.php'>Create account</button> ";
echo "</form>";
include("footer.html");

// $sql = "SELECT * FROM qonvo WHERE username = '$username' AND pass1 = '$pass1'";
// $exeSQL = mysqli_query($conn, $SQL) or die(mysqli_error($conn));

// if ("SELECT * FROM qonvo WHERE username != '$username' AND pass1 = '$pass1'"){
//     echo 'login failed';
// }
?> 