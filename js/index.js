$(document).ready(function(){
	drawersCreated = [];
	$('#createDrawer').submit(function(e){
		e.preventDefault();
		var form = this;
		var $inputs = $('#createDrawer :input');
		var values = {};
		var nameTaken = false;
    	$inputs.each(function() {
       		values[this.name] = $(this).val();
    	});

    	for (var i=0; i < drawersCreated.length; i++){
    		if(values.Drawername === drawersCreated[i]){
    			nameTaken = true;
    		}
    	}

    	var content = $('#createDrawer textarea').val();

    	var side = $('#createDrawer #side').val();
    	console.log('side:' + side);

    	var tab = $('#createDrawer #tab-image').val();
    	console.log(tab)

    	if(!nameTaken){
			$('#newDrawerContent').append('<div class="'+ values.Drawername + ' theme_1"><a href="#" class=' + tab +'></a><div><p>' + content + '</p></div></div>');

			$('.' + values.Drawername).drawer({
				top:values.top,
				position:side,
				drawerHeight:values.height,
				drawerWidth:values.width
			});

			drawersCreated.push(values.Drawername)
			form.reset();
		}else{alert("Drawer Name Taken")}

		
		
	});
});