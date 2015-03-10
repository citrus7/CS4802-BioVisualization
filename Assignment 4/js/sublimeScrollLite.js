// Generated by LiveScript 1.3.1
/* Copyright 2013-present Arnar Yngvason
 * Licensed under MIT License */
(function(){
  var SublimeScrollLite;
  SublimeScrollLite = (function(){
    SublimeScrollLite.displayName = 'SublimeScrollLite';
    var prototype = SublimeScrollLite.prototype, constructor = SublimeScrollLite;
    prototype.el = {
      wrapper: null,
      scrollPane: null,
      scrollBar: null,
      overlay: null
    };
    prototype.dragActive = false;
    prototype.scaleFactor = null;
    prototype.wrapperHeight = null;
    prototype.viewportHeight = null;
    prototype.settings = null;
    prototype.update = function(options){
      this.settings = $.extend(this.settings, options);
      return this;
    };
    prototype._setting_getter = function(key){
      return function(){
        if (typeof this.settings[key] === "function") {
          return this.settings[key].call(this);
        } else {
          return this.settings[key];
        }
      };
    };
    function SublimeScrollLite($el, options){
      var capFirst, setting, ref$, _v;
      this.onDrag = bind$(this, 'onDrag', prototype);
      this.onDragEnd = bind$(this, 'onDragEnd', prototype);
      this.onScroll = bind$(this, 'onScroll', prototype);
      this.onResize = bind$(this, 'onResize', prototype);
      this.onMousedown = bind$(this, 'onMousedown', prototype);
      this.$el = $el;
      this.settings = {
        top: 0,
        bottom: 0,
        fixedElements: '',
        removeElements: '',
        scrollWidth: 100,
        scrollHeight: function(){
          return this.getContentHeight() - this.getTop() - this.getBottom();
        },
        contentWidth: function(){
          return this.$el.innerWidth();
        },
        contentHeight: function(){
          return this.$el[0].scrollHeight;
        },
        minWidth: null,
        render: true,
        include: []
      };
      capFirst = function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
      for (setting in ref$ = this.settings) {
        _v = ref$[setting];
        this['get' + capFirst(setting)] = this._setting_getter(setting);
      }
      this.update(options);
      $el.bind('scroll.sublimeScroll', this.onScroll);
      if (this.getRender()) {
        this.render();
      }
      this.el.overlay.on('mousedown.sublimeScroll', this.onMousedown);
      return this;
    }
    prototype.onMousedown = function(event){
      event.preventDefault();
      this.el.overlay.css({
        width: '100%'
      });
      this.el.contentWrapper.addClass('sublime-scroll-dragging');
      this.el.overlay.on('mousemove.sublimeScroll', this.onDrag);
      $(window).one('mouseup.sublimeScroll', this.onDragEnd);
      return this.onDrag(event);
    };
    prototype.render = function(){
      this.el.contentWrapper = $('<div>', {
        'class': "sublime-scroll-wrapper"
      });
      this.el.contentWrapper = this.$el.wrap(this.el.contentWrapper).parent();
      this.el.wrapper = $('<div>', {
        'class': "sublime-scroll"
      }).css({
        width: this.getScrollWidth(),
        height: this.getScrollHeight(),
        top: this.getTop()
      }).appendTo(this.el.contentWrapper);
      this.el.scrollPane = $('<div>', {
        'class': 'sublime-scroll-pane'
      }).appendTo(this.el.wrapper);
      this.el.scrollPane.html(this.$el.html());
      this.el.scrollBar = $('<div>', {
        'class': 'sublime-scroll-bar'
      }).appendTo(this.el.scrollPane);
      this.el.scrollPane.find(this.getFixedElements()).remove().addClass('sublime-scroll-fixed-element').appendTo(this.el.scrollBar);
      this.el.scrollPane.find(this.getRemoveElements()).remove();
      this.el.overlay = $('<div>', {
        'class': 'sublime-scroll-overlay'
      }).css({
        top: this.getTop(),
        width: this.getScrollWidth(),
        height: this.$el.height()
      }).appendTo(this.el.wrapper);
      this.onResize();
      return this;
    };
    prototype.onResize = function(event){
      var contentWidth, contentHeight;
      contentWidth = this.getContentWidth();
      contentHeight = this.getContentHeight();
      if (this.getMinWidth() && this.$el.width() < this.getMinWidth()) {
        this.el.wrapper.hide();
      } else {
        this.el.wrapper.show();
      }
      this.scaleFactor = this.getScrollWidth() / contentWidth;
      this.contentWidth_scaled = contentWidth * this.scaleFactor;
      this.contentHeight_scaled = contentHeight * this.scaleFactor;
      this.el.scrollPane.css({
        width: contentWidth,
        height: contentHeight,
        transform: 'scale(' + this.scaleFactor + ')',
        marginLeft: -(contentWidth / 2 - this.contentWidth_scaled / 2),
        marginTop: -(contentHeight / 2 - this.contentHeight_scaled / 2)
      });
      this.wrapperHeight = this.getScrollHeight();
      this.el.wrapper.css({
        height: this.wrapperHeight
      });
      this.viewportHeight = this.$el.innerHeight();
      this.viewportHeight_scaled = this.viewportHeight * this.scaleFactor;
      this.el.scrollBar.css({
        height: this.viewportHeight
      });
      this.$el.scroll();
      return this;
    };
    prototype.onScroll = function(event){
      var y, ch, max_margin, factor, viewportFactor, margin;
      if (!this.dragActive) {
        this.el.scrollBar.css({
          transform: 'translateY(' + this.$el.scrollTop() + 'px)'
        });
      }
      if (this.contentHeight_scaled > this.wrapperHeight) {
        y = this.el.scrollBar.position().top * this.scaleFactor;
        ch = this.contentHeight_scaled - this.viewportHeight_scaled;
        max_margin = ch - this.wrapperHeight;
        factor = y / ch;
        viewportFactor = this.viewportHeight_scaled / ch;
        margin = -(factor * max_margin + viewportFactor * y);
      } else {
        margin = 0;
      }
      this.el.scrollPane.css({
        transform: 'translateY(' + margin + 'px) scale(' + this.scaleFactor + ')'
      });
      return this;
    };
    prototype.onDragEnd = function(event){
      event.preventDefault();
      this.el.overlay.css({
        width: this.getScrollWidth()
      });
      this.el.contentWrapper.removeClass('sublime-scroll-dragging');
      this.el.overlay.off('mousemove.sublimeScroll', this.onDrag);
      this.dragActive = false;
      return this;
    };
    prototype.onDrag = function(event){
      var offsetY, _scaleFactor, y, max_pos;
      this.dragActive = true;
      if (!(event.target === this.el.overlay[0])) {
        return false;
      }
      offsetY = event.offsetY || event.originalEvent.layerY;
      if (this.contentHeight_scaled > this.wrapperHeight) {
        _scaleFactor = this.wrapperHeight / this.getContentHeight();
      } else {
        _scaleFactor = this.scaleFactor;
      }
      y = offsetY / _scaleFactor - this.viewportHeight / 2;
      max_pos = this.getContentHeight() - this.viewportHeight;
      if (y < 0) {
        y = 0;
      }
      if (y > max_pos) {
        y = max_pos;
      }
      this.el.scrollBar.css({
        transform: 'translateY(' + y + 'px)'
      });
      this.$el.scrollTop(y);
      return this;
    };
    prototype.destroy = function(){
      this.$el.off('resize.sublimeScroll', this.onResize).off('scroll.sublimeScroll', this.onScroll);
      return this;
    };
    return SublimeScrollLite;
  }());
  $.fn.sublimeScroll = function(options){
    var objects;
    objects = [];
    this.each(function(){
      return objects.push(new SublimeScrollLite($(this), options));
    });
    return objects;
  };
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);
