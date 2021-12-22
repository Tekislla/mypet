(function($) {
  "use strict";

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 71)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  navbarCollapse();
  $(window).scroll(navbarCollapse);

  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery);


function savePet(){
  fetch('http://localhost:5000/mypet/pet/create-pet', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: document.getElementsByName("name")[0].value, type: document.getElementsByName("type")[0].value, race:document.getElementsByName("race")[0].value, city: document.getElementsByName("city")[0].value, state: document.getElementsByName("state")[0].value, contactEmail: document.getElementsByName("contactEmail")[0].value, age: document.getElementsByName("age")[0].value})
  } ).then(response => response.json()).then((petId) => {
      formData = new FormData(); 
      formData.append("file", fileupload.files[0]);
      response =  fetch('http://localhost:5000/mypet/pet/upload/' + petId, {
        method: "POST", 
        body: formData
      }); 

      (response.status == 200) 
        alert("Pet adicionado!");
  })
  setTimeout(function(){ window.location.href="index-logged.html" }, 1000);
}


function getPets(){
  personId = localStorage.getItem("id");
  fetch('http://localhost:5000/mypet/person/find-by-id/' + personId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then((user) =>{
      document.getElementById("loggedName").innerHTML = user["name"]
      localStorage.setItem("apto",user["canAdopt"])
    }
  )
  podeAdotar = localStorage.getItem("apto")

  fetch('http://localhost:5000/mypet/pet/find-all', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then((pets) =>{
    if(podeAdotar === "true"){
      for (i=0; i < pets.length; i++) {
        document.getElementById("petGrid").innerHTML += "<div class='col-md-6 col-lg-4 mb-5'><div class='portfolio-item mx-auto' data-toggle='modal' data-target='#portfolioModal"+pets[i]["id"]+"'><div class='portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100'><div class='portfolio-item-caption-content text-center text-white'><i class='fas fa-plus fa-3x'></i></div></div><img class='img-fluid' src='assets/img/defaultpetimg.jpg' alt='Log Cabin'/></div></div>";
        document.getElementById("petModals").innerHTML += "<div class='portfolio-modal modal fade' id='portfolioModal"+pets[i]["id"]+"' tabindex='-1' role='dialog' aria-labelledby='#portfolioModal"+pets[i]["id"]+"Label' aria-hidden='true'><div class='modal-dialog modal-xl' role='document'><div class='modal-content'><button class='close' type='button' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'><i class='fas fa-times'></i></span></button><div class='modal-body text-center'><div class='container'><div class='row justify-content-center'><div class='col-lg-8'><h2 class='portfolio-modal-title text-secondary mb-0'><span>"+pets[i]["name"]+"</span></h2><div class='divider-custom'><div class='divider-custom-line'></div><div class='divider-custom-icon'><i class='fas fa-paw'></i></div><div class='divider-custom-line'></div></div><img class='img-fluid rounded mb-5' src='data:image/png;base64,"+pets[i]["photo"]+"' alt=''/><p class='mb-2'><a style='font-weight: bold;'>Nome: </a> <span>"+pets[i]["name"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Tipo:</a> <span>"+pets[i]["type"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Raça: </a> <span>"+pets[i]["race"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Cidade: </a> <span>"+pets[i]["city"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Estado: </a> <span>"+pets[i]["state"]+"</p><p class='mb-5'><a style='font-weight: bold;'>Idade: </a> <span>"+pets[i]["age"]+" meses</p><button class='btn btn-primary' href='#' data-dismiss='modal' onclick='adoptPet("+pets[i]["id"]+")'><i class='fas fa-heart fa-fw'></i>Adotar</button></div></div></div></div></div></div></div>";
      }
    } else if (podeAdotar === "false"){
      for (i=0; i < pets.length; i++) {
        document.getElementById("petGrid").innerHTML += "<div class='col-md-6 col-lg-4 mb-5'><div class='portfolio-item mx-auto' data-toggle='modal' data-target='#portfolioModal"+pets[i]["id"]+"'><div class='portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100'><div class='portfolio-item-caption-content text-center text-white'><i class='fas fa-plus fa-3x'></i></div></div><img class='img-fluid' src='assets/img/defaultpetimg.jpg' alt='Log Cabin'/></div></div>";
        document.getElementById("petModals").innerHTML += "<div class='portfolio-modal modal fade' id='portfolioModal"+pets[i]["id"]+"' tabindex='-1' role='dialog' aria-labelledby='#portfolioModal"+pets[i]["id"]+"Label' aria-hidden='true'><div class='modal-dialog modal-xl' role='document'><div class='modal-content'><button class='close' type='button' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'><i class='fas fa-times'></i></span></button><div class='modal-body text-center'><div class='container'><div class='row justify-content-center'><div class='col-lg-8'><h2 class='portfolio-modal-title text-secondary mb-0'><span>"+pets[i]["name"]+"</span></h2><div class='divider-custom'><div class='divider-custom-line'></div><div class='divider-custom-icon'><i class='fas fa-paw'></i></div><div class='divider-custom-line'></div></div><img class='img-fluid rounded mb-5' src='data:image/png;base64,"+pets[i]["photo"]+"' alt=''/><p class='mb-2'><a style='font-weight: bold;'>Nome: </a> <span>"+pets[i]["name"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Tipo:</a> <span>"+pets[i]["type"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Raça: </a> <span>"+pets[i]["race"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Cidade: </a> <span>"+pets[i]["city"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Estado: </a> <span>"+pets[i]["state"]+"</p><p class='mb-5'><a style='font-weight: bold;'>Idade: </a> <span>"+pets[i]["age"]+" meses</p><button class='btn btn-primary' href='#' data-dismiss='modal' aria-label='Close'>Você não está apto para adotar</button></div></div></div></div></div></div></div>";
      }
    } else {
      for (i=0; i < pets.length; i++) {
        document.getElementById("petGrid").innerHTML += "<div class='col-md-6 col-lg-4 mb-5'><div class='portfolio-item mx-auto' data-toggle='modal' data-target='#portfolioModal"+pets[i]["id"]+"'><div class='portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100'><div class='portfolio-item-caption-content text-center text-white'><i class='fas fa-plus fa-3x'></i></div></div><img class='img-fluid' src='assets/img/defaultpetimg.jpg' alt='Log Cabin'/></div></div>";
        document.getElementById("petModals").innerHTML += "<div class='portfolio-modal modal fade' id='portfolioModal"+pets[i]["id"]+"' tabindex='-1' role='dialog' aria-labelledby='#portfolioModal"+pets[i]["id"]+"Label' aria-hidden='true'><div class='modal-dialog modal-xl' role='document'><div class='modal-content'><button class='close' type='button' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'><i class='fas fa-times'></i></span></button><div class='modal-body text-center'><div class='container'><div class='row justify-content-center'><div class='col-lg-8'><h2 class='portfolio-modal-title text-secondary mb-0'><span>"+pets[i]["name"]+"</span></h2><div class='divider-custom'><div class='divider-custom-line'></div><div class='divider-custom-icon'><i class='fas fa-paw'></i></div><div class='divider-custom-line'></div></div><img class='img-fluid rounded mb-5' src='data:image/png;base64,"+pets[i]["photo"]+"' alt=''/><p class='mb-2'><a style='font-weight: bold;'>Nome: </a> <span>"+pets[i]["name"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Tipo:</a> <span>"+pets[i]["type"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Raça: </a> <span>"+pets[i]["race"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Cidade: </a> <span>"+pets[i]["city"]+"</p><p class='mb-2'><a style='font-weight: bold;'>Estado: </a> <span>"+pets[i]["state"]+"</p><p class='mb-5'><a style='font-weight: bold;'>Idade: </a> <span>"+pets[i]["age"]+" meses</p><button class='btn btn-primary' onclick='redirectSignup()'>Cadastre-se para adotar</button></div></div></div></div></div></div></div>";
      }
    }
    }
  )
}


function savePerson(){
  localStorage.clear();
  fetch('http://localhost:5000/mypet/person/create-person', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: document.getElementsByName("name")[0].value, login: document.getElementsByName("login")[0].value, email:document.getElementsByName("email")[0].value, password: document.getElementsByName("password")[0].value})
  }).then(response => response.json()).then((personId) =>{
    localStorage.setItem("id", personId)
    localStorage.setItem("login", document.getElementsByName("login")[0].value)
  })
  setTimeout(function(){ window.location.href="scoreform.html" }, 1000)
}


function addScore(){
  personId = localStorage.getItem("id")
  fetch('http://localhost:5000/mypet/person/add-score/' + personId,  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({question1: document.getElementsByName("question1")[0].value, question2: document.getElementsByName("question2")[0].value, question3: document.getElementsByName("question3")[0].value, question4: document.getElementsByName("question4")[0].value, question5: document.getElementsByName("question5")[0].value})
  })
  setTimeout(function(){ window.location.href="index-logged.html" }, 1000);
}


function login(){
  localStorage.clear();
  let informedLogin = document.getElementsByName("login")[0].value;
  let informedPassword = document.getElementsByName("password")[0].value;

  fetch('http://localhost:5000/mypet/person/login/' + informedLogin + '/' + informedPassword, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then((loginResponse) =>{
    if (loginResponse == 0) {
      alert("Usuário não encontrado!")
    } else if (loginResponse == 400) {
      alert("Senha incorreta!")
    } else {
      localStorage.setItem("id",loginResponse)
      setTimeout(function(){ window.location.href="index-logged.html" }, 1000)
    }
    }
  )
}

function redirectSignup(){
  setTimeout(function(){ window.location.href="signup.html" }, 1000)
}


function logout(){
  localStorage.clear();
  setTimeout(function(){ window.location.href="index.html" }, 1000);
}

function adoptPet(adoptId){
  let adopterId = localStorage.getItem("id");
  fetch('http://localhost:5000/mypet/person/adopt-pet/' + adopterId + "/" + adoptId, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then((user) =>{
      
      
    }

  )
  alert("Email enviado para o responsável do pet!")
  setTimeout(function(){ window.location.href="index-logged.html" }, 1000)

}