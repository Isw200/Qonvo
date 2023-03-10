<link rel='stylesheet' type='text/css' media='screen' href='styles/login.css'>
<link rel='stylesheet' type='text/css' media='screen' href='styles/footer.css'>
<?php
include("dbconnection.php");
include("header.html");
include("footer.html");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if username and password are correct
    $username = $_POST['username'];
    $password = $_POST['pass1'];
    
    // Query the database
    $sql = "SELECT * FROM qonvo WHERE username = '$username' AND pass1 = '$password'";
    $result = $conn->query($sql);

    // Check if login is successful
    if ($result->num_rows > 0) {
        session_start();
        $_SESSION['name'] = $username;
        header("Location: detail.php");
        exit();
    } else {
        echo '<script>alert("Your password or user name is invalid!")</script>';
    }
}

// Close the connection
$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
</head>
<body>
    <h1 class=head>Login!<h1>
    <p id=new>Not registered yet?</p>
    <img class = 'loginimg' src=images/Qonvo-logo.png>
    <p class='welcome'> Welcome Back</p>
    <form method="POST">
        <label class='name' >User name</label>
        <input type=text id='username' name='username' placeholder='Please enter valid username' required><br>
        <label class='password' >Password</label>
        <input type='password' id='pass1' name='pass1' placeholder='Enter valid Password' required>><br>
        <button class='register' onclick=window.location.href='signup.php'>Create account</button> 
        <button class='but' type='submit'>sign in</button>
    </form>
</body>
</html>