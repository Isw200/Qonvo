<link rel='stylesheet' type='text/css' media='screen' href='styles/signup.css'>
<link rel='stylesheet' type='text/css' media='screen' href='styles/footer.css'>
<link rel='stylesheet' type='text/css' media='screen' href='styles/header.css'>
<?php
include("dbconnection.php");
echo "<title>" . 'Sign Up' . "</title>";
include("header.html");
    echo "<h1 class=head>Welcome to Qonvo!<h1>";
    echo "<p id=new>Already have an account</p>";
    echo "<p class=welcome> Register your account</p>";
    echo "<img class = signupimg src=images/Qonvo-logo.png>";
    echo "<form action=connect.php method=post>";
    echo "<label class=username >User name</label>";
    echo "<input type=text id=username name=username placeholder='Create a user name (only letters and numbers)' Required>";
    echo " <br>";
    echo " <label class=fname >First name</label>";
    echo "<input type=text id=fname name=fname placeholder='Enter your First Name' Required>";
    echo " <br>";
    echo " <label class=lname >Last name</label>";
    echo " <input type=text id=lname name=lname placeholder='Enter your Last name' Required>";
    echo " <br>";
    echo " <label class=email >Email</label>";
    echo "  <input type=email id=email name=email placeholder='Enter your valid Email' Required>";
    echo " <br>";
    echo " <label class=pass1  >Password</label>";
    echo " <input type=password id=pass1 name=pass1 placeholder='Enter a password' Required>";
    echo " <br>";
    echo " <label class=pass2 >Confirm Password</label>";
    echo " <input type=password id=pass2 name=pass2 placeholder='Enter Confirm Password' Required>";
    echo " <br>";
    echo " <button class=but type=submit>Sign up</button>";
    echo " <button class=register onclick=window.location.href='login.php'>Log in</button> ";

    echo "</form>";
    include("footer.html");
?>