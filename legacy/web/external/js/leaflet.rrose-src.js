/*
  Copyright (c) 2012 Eric S. Theise

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
  documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
  persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
  Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

L.Rrose = L.Popup.extend({

  _initLayout:function () {
    var prefix = 'leaflet-rrose',
      container = this._container = L.DomUtil.create('div', prefix + ' ' + this.options.className + ' leaflet-zoom-animated'),
      closeButton, wrapper;

    this.options.prefix     = prefix;
    this.options.container  = container;
    this.options.wrapper    = wrapper;

    this.updateDirection();
    this._redrawDirection();
  },

  updateDirection:function() {
    // Set the pixel distances from the map edges at which popups are too close and need to be re-oriented.
    var x_bound = 80, y_bound = 270;

    // Determine the alternate direction to pop up; north mimics Leaflet's default behavior, so we initialize to that.
    this.options.position = 'n';
    // Then see if the point is too far north...
    var y_diff = y_bound - this._map.latLngToContainerPoint(this._latlng).y;
    if (y_diff > 0) {
      this.options.position = 's'
    }
    // or too far east...
    var x_diff = this._map.latLngToContainerPoint(this._latlng).x - (this._map.getSize().x - x_bound);
    if (x_diff > 0) {
      this.options.position += 'w'
    } else {
      // or too far west.
      x_diff = x_bound - this._map.latLngToContainerPoint(this._latlng).x;
      if (x_diff > 0) {
        this.options.position += 'e'
      }
    }
  },

  _redrawDirection:function() {
    // Create the necessary DOM elements in the correct order. Pure 'n' and 's' conditions need only one class for styling, others need two.
    if (/s/.test(this.options.position)) {
      if (this.options.position === 's') {
        this._tipContainer = L.DomUtil.create('div', this.options.prefix + '-tip-container', this.options.container);
        this.options.wrapper = this._wrapper = L.DomUtil.create('div', this.options.prefix + '-content-wrapper', this.options.container);
      }
      else {
        this._tipContainer = L.DomUtil.create('div', this.options.prefix + '-tip-container' + ' ' + this.options.prefix + '-tip-container-' + this.options.position, this.options.container);
        this.options.wrapper = this._wrapper = L.DomUtil.create('div', this.options.prefix + '-content-wrapper' + ' ' + this.options.prefix + '-content-wrapper-' + this.options.position, this.options.container);
      }
      this._tip = L.DomUtil.create('div', this.options.prefix + '-tip' + ' ' + this.options.prefix + '-tip-' + this.options.position, this._tipContainer);
      L.DomEvent.disableClickPropagation(this.options.wrapper);
      this._contentNode = L.DomUtil.create('div', this.options.prefix + '-content', this.options.wrapper);
      L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);
    }
    else {
      if (this.options.position === 'n') {
        this.options.wrapper = this._wrapper = L.DomUtil.create('div', this.options.prefix + '-content-wrapper', this.options.container);
        this._tipContainer = L.DomUtil.create('div', this.options.prefix + '-tip-container', this.options.container);
      }
      else {
        this.options.wrapper = this._wrapper = L.DomUtil.create('div', this.options.prefix + '-content-wrapper' + ' ' + this.options.prefix + '-content-wrapper-' + this.options.position, this.options.container);
        this._tipContainer = L.DomUtil.create('div', this.options.prefix + '-tip-container' + ' ' + this.options.prefix + '-tip-container-' + this.options.position, this.options.container);
      }
      L.DomEvent.disableClickPropagation(this.options.wrapper);
      this._contentNode = L.DomUtil.create('div', this.options.prefix + '-content', this.options.wrapper);
      L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);
      this._tip = L.DomUtil.create('div', this.options.prefix + '-tip' + ' ' + this.options.prefix + '-tip-' + this.options.position, this._tipContainer);
    }
  },

  _updatePosition:function () {
    if(this.options.previousPosition == null || this.options.position != this.options.previousPosition) {
      L.DomUtil.removeClass(this._tip, this.options.prefix + '-tip-' + this.options.previousPosition);
      L.DomUtil.addClass(this._tip, this.options.prefix + '-tip-' + this.options.position);

      L.DomUtil.removeClass(this._wrapper, this.options.prefix  + '-content-wrapper-' + this.options.previousPosition);
      L.DomUtil.addClass(this._wrapper, this.options.prefix  + '-content-wrapper-' + this.options.position);

      L.DomUtil.removeClass(this._tipContainer, this.options.prefix  + '-tip-container-' + this.options.previousPosition);
      L.DomUtil.addClass(this._tipContainer, this.options.prefix  + '-tip-container-' + this.options.position);

      // Swap DOM elements to keep correct order
      if (/n/.test(this.options.previousPosition) && /s/.test(this.options.position)) {
        this._wrapper.parentNode.insertBefore(this._tipContainer, this._wrapper);
      }
      else if (/s/.test(this.options.previousPosition) && /n/.test(this.options.position)) {
        this._tipContainer.parentNode.insertBefore(this._wrapper, this._tipContainer);
      }

      var pos = this._map.latLngToLayerPoint(this._latlng),
          is3d = L.Browser.any3d,
          offset = this.options.offset;


      if (is3d) {
        L.DomUtil.setPosition(this._container, pos);
      }

      if (/s/.test(this.options.position)) {
        this._containerBottom = -this._container.offsetHeight + (offset.y / 8) - (is3d ? 0 : pos.y);
      } else {
        this._containerBottom = -offset.y - (is3d ? 0 : pos.y);
      }

      if (/e/.test(this.options.position)) {
        this._containerLeft = offset.x + (is3d ? 0 : pos.x);
      }
      else if (/w/.test(this.options.position)) {
        this._containerLeft = -Math.round(this._containerWidth) + offset.x + (is3d ? 0 : pos.x);
      }
      else {
        this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (is3d ? 0 : pos.x);
      }

      this._container.style.bottom = this._containerBottom + 'px';
      this._container.style.left = this._containerLeft + 'px';

      this.options.previousPosition = this.options.position;
    }
  }

});
