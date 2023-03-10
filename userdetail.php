
<!DOCTYPE html>
<html>
<head>
    <title>User page</title>
    <link rel=stylesheet type=text/css href=userpage.css>
</head>
<body>
<div class='upline'>
<img src='images/3.PNG' alt='profile photo'>
<div class='upline'>
    <button class='register' onclick='window.location.href='lobby.html'>Join meeting</button> 
    <button class='shedmeeting' onclick='window.location.href='lobby.html''>create new meeting</button> 
    </div>
    <div class='coverphoto'>
    <img src='images/stream-thumbnail.png' alt='cover photo'>
    <button class='cover' onclick='window.location.href='lobby.html'>Upload cover</button> 
    </div>
    <div class='bigprofile'>
    <img src='images/3.PNG' alt='profile photo'>
    <label class='name'  >".$arrayp['username']."</label>
    <a class='change' href='index.html'>Change</a>
    <a class='delete' href='index.html'>Delete</a>
    </div>
    <label class='meetingidlble'  >Your own room id</label>
    <label class='emaillble'  >Email</label>
    <label class='timezonelble' >Time Zone</label>
    <label class='passwordlble' >Password</label>
    <label class='languagelble'  >Language</label>
    <button class='logout' onclick='window.location.href='signin.html'>Log out</button> ";
</body>
</html>