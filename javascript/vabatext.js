/*fetch("./data/user.json")
        .then((res) => {
        return res.json();
    })
    .then((data) => console.log(data));*/

function createChat(){
  const fakeChatDtVt = {key: "dt%40gmail.com_vt%40gmail.com", message: "Vihaan Tiwan on 1/14/2024, 9:16:38 PM\nHi\nDeepam Tiwan on 1/14/2024, 9:16:43 PM\nHow are you?"};
  const fakeChatPaVt = {key: "pa%40gmail.com_vt%40gmail.com", message: "Vihaan Tiwan on 1/14/2024, 9:16:38 PM\nHi\nPriyanka Agrawal on 1/14/2024, 9:16:43 PM\nHow are you?"};
  const fakeChatDaaduVt = {key: "pt%40gmail.com_vt%40gmail.com", message: "Daadu Tiwan on 1/14/2024, 9:16:38 PM\nHi\nVihaan Tiwan on 1/14/2024, 9:16:43 PM\nHow are you?"};
  const fakeChatDaadiVt = {key:"jt%40gmail.com_vt%40gmail.com", message: "Vihaan Tiwan on 1/14/2024, 9:16:38 PM\nHi\nDaadi Tiwan on 1/14/2024, 9:16:43 PM\nHow are you?"};
  const fakeChatTanulVt = {key: "tk%40gmail.com_vt%40gmail.com", message: "Tanul Khatri on 1/14/2024, 9:16:38 PM\nHi\nVihaan Tiwan on 1/14/2024, 9:16:43 PM\nHow are you?"};

  chat = [fakeChatDtVt, fakeChatPaVt, fakeChatDaadiVt, fakeChatDaaduVt, fakeChatTanulVt];
  return chat;
}

function createFakeUsers(){
  const deepam = {first_name: "Deepam", last_name: "Tiwan", screen_name: "CoolDudePa", email: "dt@gmail.com", password: "VaBa1234" };
  const vihaan = {first_name: "Vihaan", last_name: "Tiwan", screen_name: "CoolKid", email: "vt@gmail.com", password: "VaBa1234" };
  const priyanka = {first_name: "Priyanka", last_name: "Agrawal", screen_name: "CoolMom", email: "pa@gmail.com", password: "VaBa1234" };
  const daadu = {first_name: "Daadu", last_name: "Tiwan", screen_name: "CoolDaadu", email: "pt@gmail.com", password: "VaBa1234" };
  const daadi = {first_name: "Daadi", last_name: "Tiwan", screen_name: "CoolDaadi", email: "jt@gmail.com", password: "VaBa1234" };
  const tanul = {first_name: "Tanul", last_name: "Khatri", screen_name: "CoolBhai", email: "tk@gmail.com", password: "VaBa1234" };
  users= [deepam, vihaan, priyanka, daadu, daadi, tanul];
  return users;
}

function setupChat(){
  var users = createFakeUsers();
  var selectFriends = document.getElementById("friends");
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  let i=0;
  while(i < users.length){
    if(currentUser.email == users[i].email){
      i++;
      continue;
    }
    var option = document.createElement("option");
    option.text = users[i].first_name + ' ' + users[i].last_name;
    option.value = users[i].email;
    selectFriends.add(option);
    i++;
  }
}

function sendChat(){
  if(document.getElementById("friends").value == null || document.getElementById("friends").value == "ChooseOne"){
    alert("Please choose a friend to send a message to!");
    return false;
  }
  var message = document.getElementById("message");
  var chatarea = document.getElementById("chatfield");
  var chat = chatarea.value;
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  chat = chat + "\n" +currentUser.first_name+ " " + currentUser.last_name + " on " + new Date().toLocaleString() + "\n";
  chat = chat + message.value;
  chatarea.value = chat;
  message.value = null;
}

function onLogin(){
  var users = createFakeUsers();
  var username = document.getElementById('username');
  var password = document.getElementById('password');
  let i=0;
  while(i < users.length){
    //alert(i + ' has username '+users[i].email+' and password ' + users[i].password);
    if (users[i].email == username.value & users[i].password == password.value){
      alert("Login was successful!");
      sessionStorage.setItem("currentUser", JSON.stringify(users[i]) );
      window.location.href = 'vabatext.html';
      return true
    }
    i++;
  }
  alert("Login was unsuccessful. Please try again!")
}

function onChangeFriend(){
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  let friendEmail = document.getElementById("friends").value;
  let cuemail = currentUser.email;
  let key = "";
  if (cuemail.localeCompare(friendEmail) <0) {
    key = encodeURIComponent(cuemail) + "_" + encodeURIComponent(friendEmail);
  } else {
    key = encodeURIComponent(friendEmail) + "_" + encodeURIComponent(cuemail);
  }
  var chats = createChat();
  let i = 0;
  while (i<chats.length){
    let message = chats[i];
    if (message.key == key){
      var chatarea = document.getElementById("chatfield");
      chatarea.value = message.message;
      break;
    }
    i++;
  }
}
