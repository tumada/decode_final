/// <reference path="../../typings/jquery/jquery.d.ts" />

var socket = io.connect('http://tumadademo85.azurewebsites.net/');
socket.on('connect');

$('#mbox').change(function(){
	socket.emit('send chat', JSON.stringify({
		message: $('#mbox').val()	
	}));	
	$('#mbox').val('');
});

socket.on('recieve chat', function(data){
	var jData = JSON.parse(data);
	$('#chat').prepend(jData.message + '<br />');	
});

/// poll system


d3.selectAll('.vote').on('click', function(){
	socket.emit('send vote', JSON.stringify({
		id: d3.select(this).attr('id').toString()	
	}));
});

socket.on('recieve poll', function(data){
	var jData = JSON.parse(data);
	change(jData.options);
});

