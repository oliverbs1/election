 $(function () {
     $('#candidat').click(function () {
         $.get('/api/candidat', function (data) {

             for (var i = 0; i < data.length; i++) {
                 var _li = '<li>' + data[i].id + ' - ' + data[i].firstname + ' ' + data[i].lastname + ' - ' + data[i].partie + '</li>';
                 $('#candidatlist').append(_li);
             }
         })
     });

     $('#resultat').click(function () {
         $.get('/api/vote', function (data) {

             for (var i = 0; i < data.length; i++) {
                 var _li = '<li>' + data[i].vote + '</li>';
                 $('#result').append(_li);
             }
         })
     });


     $('#votantcreate').submit(function (e) {
         e.preventDefault();

         var _firstname = $('#firstname').val(),
             _lastname = $('#lastname').val(),
             _age = $('#age').val();

         $.post('api/votant', {
             firstname: _firstname,
             lastname: _lastname,
             age: _age
         }).done(function (data) {
             alert("data loaded: " + data);
         });
     });

     $('#vote1').submit(function (e) {
         e.preventDefault();

         var _lastname = $('#lastname1').val(),
             _vote = $('#vote').val();

         $.post('api/vote', {
             lastname: _lastname,
             vote: _vote
         }).done(function (data) {
             alert("Merci d'avoir voté");
         });
     });




     $("#votant").click(function () {
         $("#votantcreate").fadeIn("slow");
     });

     $("#pass").click(function () {
         $("#votantcreate").fadeOut("fast");
     });

     $("#pass").click(function () {
         $("#vot").fadeIn("slow");
     });

     $("#vot").click(function () {
         $("#vote1").fadeIn("slow");
     });

     $("#vv").click(function () {
         $("#vote1").fadeOut("slow");
     });


 })