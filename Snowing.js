/**
 * LBS Snowing
 * Date: 2014-12-24
 * ================================================
 * opts.parent 雪花插入到哪里 (默认文档中的body)
 * opts.rate 生成雪花的频率 (默认10) 从1开始的整数 
 			值越小雪花越多 相应的也会卡
 * opts.name 雪花的类名 (默认'snow' 设置一些基本样式)
 * ================================================
 **/
;(function(exports) {
	'use strict';

	function snow(opts) {
		opts = opts || {};
		this.parent = opts.parent;
		this.speedY = opts.speedY || 5;
		this.speedX = opts.speedX || 0;
		this.name = opts.name || 'snow';
		this.html = opts.html || '\u2744';
		this.size = opts.size || '12';
		// this.color = opts.color || '#fff';
		this.x = opts.x;
		this.y = opts.y;
		this.opacity = opts.opacity || 50;
		this.div = null;
		this.move = function() {
			this.div.style.top = this.div.offsetTop + this.speedY + 'px';
			this.div.style.left = this.div.offsetLeft + this.speedX + 'px';
		};
		this.init = function() {
			this.div = document.createElement('div');
			this.div.style.fontSize = this.size + 'px';
			// this.div.style.color = this.color;
			this.div.innerHTML = this.html;
			this.div.className = this.name;
			this.div.style.left = this.x + 'px';
			this.div.style.top = this.y + 'px';
			this.div.style.opacity = this.opacity / 100;
			this.div.style.filter = 'alpha(opacity=' + this.opacity + ')';
			this.parent.appendChild(this.div);
		};
		this.init();
	}
	exports.Snowing = function(opts) {
		opts = opts || {};
		this.parent = opts.parent || document.getElementsByTagName('body')[0];
		this.rate = opts.rate || 10;
		this.name = opts.name || 'snow';
		this.count = 0;
		this.snows = [];
		this.timer = null;
		this.init();
	};
	Snowing.prototype = {
		init: function() {
			this.css();
			this.start();
		},
		create: function() {
			return new snow({
				parent: this.parent,
				name: this.name,
				speedY: this.random(3, 10),
				speedX: this.random(-3, 3),
				size: this.random(20, 60),
				opacity: this.random(30, 90),
				x: this.random(0, this.width - 60),
				y: -60
			});
		},
		createSnow: function() {
			if (this.count % this.rate === 0) {
				this.snows.push(this.create());
			}
		},
		moveSnow: function() {
			if (this.snows.length < 1) return;
			for (var i = 0, len = this.snows.length; i < len; i++) {
				this.snows[i].move();
				if (this.snows[i].div.offsetTop > this.height || this.snows[i].div.offsetLeft < -60 || this.snows[i].div.offsetLeft > this.width + 60) {
					this.parent.removeChild(this.snows[i].div);
					this.snows.splice(i, 1);
					len--;
				}
			}
		},
		start: function() {
			var _this = this;
			!function start() {
				_this.count++;
				_this.createSnow();
				_this.moveSnow();
				_this.timer = setTimeout(start, 17);
			}();
		},
		css: function() {
			var d = document,
				doc = d.documentElement,
				body = d.body;
			this.width = doc.clientWidth || body.clientWidth;
			this.height = doc.clientHeight || body.clientHeight;
			if (d.compatMode != "CSS1Compat") {
				this.width = body.clientWidth;
				this.height = body.clientHeight;
			}
		},
		random: function(min, max) {
			return (Math.random() * (max - min + 1) + min) >> 0;
		}
	};
}(window));