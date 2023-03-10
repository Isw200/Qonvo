<link rel='stylesheet' type='text/css' media='screen' href='styles/signup.css'>
<link rel='stylesheet' type='text/css' media='screen' href='styles/footer.css'>
<link rel='stylesheet' type='text/css' media='screen' href='styles/header.css'>
<?php
echo "<title>Sign up</title>";
include("header.html");
include("dbconnection.php");
include("footer.html");
 
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get form data
    $username = $_POST['username'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $pass1 = $_POST['pass1'];

    // Insert data into database
    
    $sql = "SELECT * FROM qonvo WHERE username = '$username'";
    $result = $conn->query($sql);
     if ($result->num_rows > 0) {
        echo '<script>alert("This user name already used please try differnt user name")</script>';
    }else{
        $sql = "INSERT INTO qonvo (username, fname, lname, email, pass1) VALUES ('$username', '$fname', '$lname', '$email', '$pass1')";
        if ($conn->query($sql) === TRUE) {
            echo '<script>alert("Data succefuly inserted")</script>';
        }else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}
    // Close connection
    $conn->close();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
</head>
<body>
    <h1 class=head>Welcome to Qonvo!<h1>
    <p id=new>Already have an account</p>
    <img class = 'signupimg' src=images/Qonvo-logo.png>
    <p class=welcome> Register your account</p>
    <form method="POST">
        <label class=username >User name</label>
        <input type=text id=username name=username placeholder=Create a user name (only letters and numbers) Required><br>
        <label class=fname >First name</label>
        <input type=text id=fname name=fname placeholder=Enter your First Name Required><br>
        <label class=lname >Last name</label>
        <input type=text id=lname name=lname placeholder=Enter your Last name Required>
        <label class=email >Email</label>
        <input type=email id=email name=email placeholder=Enter your valid Email Required><br>
        <label class=pass1  >Password</label>
        <input type=password id=pass1 name=pass1 placeholder=Enter a password Required><br>
        <button class=register onclick=window.location.href='login.php'>Sign in</button> 
        <button class=but type=submit>sign up</button>
    </form>
</body>
</html>