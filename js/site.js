Fx.Morph = Fx.Styles.extend({
 
	start: function(className){
 
		var to = {};
 
		$each(document.styleSheets, function(style){
			var rules = style.rules || style.cssRules;
			$each(rules, function(rule){
				if (!rule.selectorText.test('\.' + className + '$')) return;
				Fx.CSS.Styles.each(function(style){
					if (!rule.style || !rule.style[style]) return;
					var ruleStyle = rule.style[style];
					to[style] = (style.test(/color/i) && ruleStyle.test(/^rgb/)) ? ruleStyle.rgbToHex() : ruleStyle;
				});
			});
		});
		return this.parent(to);
	}
 
});
 
Fx.CSS.Styles = ["backgroundColor", "backgroundPosition", "color", "width", "height", "left", "top", "bottom", "right", "fontSize", "letterSpacing", "lineHeight", "textIndent", "opacity"];
 
Fx.CSS.Styles.extend(Element.Styles.padding);
Fx.CSS.Styles.extend(Element.Styles.margin);
 
Element.Styles.border.each(function(border){
	['Width', 'Color'].each(function(property){
		Fx.CSS.Styles.push(border + property);
	});
});

var Site = {
	
	start: function(){
		
		if ($('photos')) Site.parsePhotos();
		
		var footerMorph = new Fx.Morph('footer', {wait: false});

		$('footer').addEvent('mouseenter', function(e){
			new Event(e).stop();
			 
			footerMorph.start('shown_footer');
		// alert('clicked!') 
		});

		$('footer').addEvent('mouseleave', function(e){
			new Event(e).stop();

			footerMorph.start('hidden_footer');

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