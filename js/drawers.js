//Utility
if( typeof Object.create !== 'function'){
	Object.create = function(obj){
		function F() {}
		F.prototype = obj;
		return new F();
	};
}

(function($,window,document,undefined){
	var Drawers = {
		init:function( options, elem){
			var self = this;

			self.elem = elem;
			self.$elem = $(elem);

			self.options = $.extend({}, $.fn.drawer.options, options);

			return self;
		},

		collapse:function(self){
			$(self.elem).children('a').on('click',function(e){
				e.preventDefault();
				var drawerPosition = $(self.elem).children('a').css(self.options.position);
				$(self.elem).children('div').animate({width:'toggle'});
				//Close
				if(drawerPosition === self.options.drawerWidth + 'px'){
				
					self.hideDrawerContent(self)
					if(self.options.position === 'left'){
						self.$elem.children('a').animate({'left':0});
					}else{
						self.$elem.children('a').animate({'right':0});
					}
				}else{//Open
					if(self.options.position === 'left'){
						self.$elem.children('div').css('z-index',9999 - self.options.top);//open drawer displays on top
						self.$elem.children('a').animate({'left':self.options.drawerWidth + 'px'}, function(){
						self.showDrawerContent(self);
						});
					}else{
						self.$elem.children('div').css('z-index',9999 - self.options.top);
						self.$elem.children('a').animate({'right':self.options.drawerWidth + 'px'},function(){
						self.showDrawerContent(self);	
						});
					}					
				}
			});
		},

		hideDrawerContent:function(self){
			self.$elem.children('div').children().hide();
		},

		showDrawerContent:function(self){
			self.$elem.children('div').children().fadeIn(200);
		},

		styleDrawer:function(elem){
			$(elem).children('a').css('position','absolute');
			$(elem).children('a').css(this.options.position, this.options.drawerWidth + 'px');
			$(elem).children('a').css('top',this.options.top + 'px');
			$(elem).children('a').css('float',this.options.position);

			$(elem).children('div').css('position','absolute');
			$(elem).children('div').css(this.options.position,'0px');
			$(elem).children('div').css('width',this.options.drawerWidth + 'px');
			$(elem).children('div').css('top',this.options.top + 'px');
			$(elem).children('div').css('height',this.options.drawerHeight + 'px');
			$(elem).children('div').css('overflow','auto');
		},

		styleDrawerTopBottom:function(elem){
			$(elem).children('a').css('position','absolute');
			$(elem).children('a').css('left', '100px');
			$(elem).children('a').css('top','100px');
			//$(elem).children('a').css('float',this.options.position);

			// $(elem).children('div').css('position','absolute');
			// $(elem).children('div').css(this.options.position,'0px');
			// $(elem).children('div').css('width',this.options.drawerWidth + 'px');
			// $(elem).children('div').css('top',this.options.top + 'px');
			// $(elem).children('div').css('height',this.options.drawerHeight + 'px');
			// $(elem).children('div').css('overflow','auto');
		},

		stickyPosition:function(self){
			var elementPosTop = self.$elem.position().top;
        	$(window).scroll(function(){
            	self.$elem.children('div').css({ "position":"fixed", "top":self.options.top + 'px'});
            	self.$elem.children('a').css({ "position":"fixed", "top":self.options.top + 'px'});
            	//$('#slide-content-side-tab').css({ "position":"fixed", "top":"100px" });
            });
		},

		triggerCollapseOnLoad:function(self){
			self.$elem.children('a').trigger('click');
		}
	};


	$.fn.drawer = function(options) {
		return this.each(function(){
			var drawer = Object.create(Drawers);
			var self = drawer.init(options, this);
			
			drawer.collapse(self);

			drawer.styleDrawer(this);

			if(self.options.sticky === 'true'){
				drawer.stickyPosition(self);
			}


			drawer.triggerCollapseOnLoad(self);
			console.log(drawer);
		});
	};

	$.fn.drawer.options = {
		top: '200',
		drawerWidth: '200',
		drawerHeight: '',
		position:'right',
		sticky:'true'
	};
})(jQuery,window,document);