var election2017 = {};

election2017.dom = {}

election2017.dom.index = (function(){
    $.get('/api/electors', function(response){
      for (var i=0; i<response.data.length; i++) {
        var e = response.data[i];
        $('#vote-form select[name=electors]').append('<option value="'+e.id+'">'+e.lastname.toUpperCase()+' '+e.firstname.ucfirst()+'</option>');
      }
    });
    $.get('/api/candidates', function(response){
      for (var i=0; i<response.data.length; i++) {
        var e = response.data[i];
        $('#vote-form select[name=candidates]').append('<option value="'+e.id+'">'+e.lastname.toUpperCase()+' '+e.firstname.ucfirst()+'</option>');
      }
    });
    $('#vote-form button').click(function(){
      // check if user select values
      var data = $('#vote-form').serializeArray();
      if(data[0].value === "Electors" || data[1].value === "Candidates") return;
      $.post('/api/votes', $('#vote-form').serialize()).done(function(r){
        alert("Your vote has been greatly send");
      })
      // send the request
    });
})();

election2017.dom.signup = (function(){
  $('#signup-form button').click(function(){
    var data = $('#signup-form').serializeArray();
    for (var i = 0; i < data.length; i++) {
      if(data[i].value.length==0) return;
    }
    $.post('/api/electors', $('#signup-form').serialize()).done(function(r){
      window.location.replace(window.location.origin+'/');
    });
  });
})();
