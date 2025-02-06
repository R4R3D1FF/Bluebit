function LogOut(){
    console.log("LOGGIGN");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    fetch("http://127.0.0.1:8000/logout/");
    window.location.reload();
}

export default LogOut;