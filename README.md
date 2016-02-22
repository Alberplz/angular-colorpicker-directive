# angular-colorpicker-directive
AnguarJS colorpicker directive with no dependencies required.

# Demo page
http://alberplz.github.io/angular-colorpicker-directive/index.html

# Installation
bower install angular-colorpicker-directive

# Usage
* Include color-picker.min.js and color-picker.min.css:
```html
<script src="js/color-picker.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/color-picker.min.css" />
```
* Add module:
```javascript
angular.module('app', ['colorpicker']);
```
* In your view:
```html
<input color-picker color-picker-model="var"/>
```

#Options
Default option is the first item.
```html
<input color-picker 
       color-picker-model="var"
       color-picker-show-value="true, false"
       color-picker-position = "right, left, top, bottom"
       color-picker-fixed-position = "false, true"
  />
```

#Extra content
If you want to change precaculated images for color picker sliders you can find a few directives in "slider-creator" folder.

* For example this code will generate a saturation and value slider:
```html
<div saturation
     saturation-width="230" 
     saturation-height="130">
     <canvas></canvas><br>
     <textarea></textarea>
</div>
```
A bug in Firefox 44.0.2 for Linux shows url base64 images with small vertical lines.

* Demo:
http://alberplz.github.io/angular-colorpicker-directive/slider-creator/slider-images.html

