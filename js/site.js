var Site = {
	
	start: function(){
		
		if ($('photos')) Site.parsePhotos();
		
        var footerMorph= new Fx.Morph('footer', {wait:false, duration: 'long', transition: Fx.Transitions.Sine.easeOut});
 
		$('footer').addEvent('mouseenter', function(e){
			new Event(e).stop();
			 
			footerMorph.start('.shown_footer');
		});

		$('footer').addEvent('mouseleave', function(e){
			new Event(e).stop();

			footerMorph.start('.hidden_footer');

		});
	},
	
	parsePhotos: function(){
		var photos = $$('#photos .photo');
		var fx = new Fx.Elements(photos, {wait: false, duration: 200, transition: Fx.Transitions.quadOut});
		photos.each(function(photo, i){
			photo.addEvent('mouseenter', function(e){
				var obj = {};
				obj[i] = {
					'width': [photo.getStyle('width').toInt(), 422]
				};
				photos.each(function(other, j){
					if (other != photo){
						var w = other.getStyle('width').toInt();
						if (w != 50) obj[j] = {'width': [w, 50]};
					}
				});
				fx.start(obj);
			});
		});
		
		$('photos').addEvent('mouseleave', function(e){
			var obj = {};
			photos.each(function(other, j){
				obj[j] = {'width': [other.getStyle('width').toInt(), 140]};
			});
			fx.start(obj);
		});
	}
	
};
 
window.addEvent('load', Site.start);
