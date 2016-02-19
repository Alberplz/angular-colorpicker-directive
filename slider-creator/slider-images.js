/*
 * Precalculated images for Color Picker
 * 
 * Alberto Pujante
 * 
 * @licence: http://opensource.org/licenses/MIT
 */
colorPickerControlsApp = angular.module('colorPickerControlsApp', [])
        .factory('ColorHelper', function () {
            return{
                hslToRgb: function (h, s, l) {
                    var r, g, b;

                    if (s === 0) {
                        r = g = b = l;
                    } else {
                        function hue2rgb(p, q, t) {
                            if (t < 0)
                                t += 1;
                            if (t > 1)
                                t -= 1;
                            if (t < 1 / 6)
                                return p + (q - p) * 6 * t;
                            if (t < 1 / 2)
                                return q;
                            if (t < 2 / 3)
                                return p + (q - p) * (2 / 3 - t) * 6;
                            return p;
                        }

                        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        var p = 2 * l - q;
                        r = hue2rgb(p, q, h + 1 / 3);
                        g = hue2rgb(p, q, h);
                        b = hue2rgb(p, q, h - 1 / 3);
                    }

                    return {r: r, g: g, b: b};
                },
                setPixel: function (imageData, x, y, r, g, b, a) {
                    var index = (x + y * imageData.width) * 4;
                    imageData.data[index + 0] = r;
                    imageData.data[index + 1] = g;
                    imageData.data[index + 2] = b;
                    imageData.data[index + 3] = a;
                }
            };
        });

/*
 Hue color [c1, c2, c3] is mixed with a precalculated image [g,g,g,alfa]:
[g*alfa + c1*(1-alfa), g*alfa + c2*(1-alfa), g*alfa + c3*(1-alfa)]

knowing that value=Cmax and saturation=(Cmax-Cmin)/Cmin, color component range is [0,1]
and hue color always have a component with the values 1 and 0, we get:
value = g*alfa+1-alfa and saturation=(1-alfa)/(g*alfa+1-alfa)

Then we find the values for alfa and grey level of the foreground image:
alfa=1-saturation*value, g=(value-1+alfa)/alfa
 */
colorPickerControlsApp.directive('saturation', ['$document', '$window', 'ColorHelper', function ($document, $window, ColorHelper) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attr) {
                var width = attr.saturationWidth, height = attr.saturationHeight, rgb;
                var canvas = element[0].getElementsByTagName('canvas')[0];
                canvas.height = height;
                canvas.width = width;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                var alpha, v, s, g;
                for (var x = 0; x < width; x++) {
                    for (var y = 0; y < height; y++) {
                        v = 1 - y / height;
                        s = x / width;
                        alpha = 1 - s * v;
                        g = (v - 1 + alpha) / alpha;
                        ColorHelper.setPixel(imageData, x, y, Math.round(g * 255), Math.round(g * 255), Math.round(g * 255), Math.round(alpha * 255));
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                element[0].getElementsByTagName('textarea')[0].value=canvas.toDataURL('image/png');
                //console.log(canvas.toDataURL('image/png'));
            }};
    }]);

colorPickerControlsApp.directive('alpha', ['$document', '$window', 'ColorHelper', function ($document, $window, ColorHelper) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attr) {
                var width = attr.alphaWidth, height = attr.alphaHeight;
                var squareWidth = attr.alphaSquareWidth;
                var canvas = element[0].getElementsByTagName('canvas')[0];
                canvas.height = height;
                canvas.width = width;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                var alpha;
                for (var x = 0; x < width; x++) {
                    for (var y = 0; y < height; y++) {
                        alpha = 1 - x / width;
                        if (parseInt(x / squareWidth) % 2 === parseInt(y / squareWidth) % 2) {
                            ColorHelper.setPixel(imageData, x, y, 204, 204, 204, Math.round(alpha * 255));
                        } else {
                            ColorHelper.setPixel(imageData, x, y, 255, 255, 255, Math.round(alpha * 255));
                        }
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                element[0].getElementsByTagName('textarea')[0].value=canvas.toDataURL('image/png');
                //console.log(canvas.toDataURL('image/png'));
            }};
    }]);

colorPickerControlsApp.directive('color', ['$document', '$window', 'ColorHelper', function ($document, $window, ColorHelper) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attr) {
                var width = attr.colorWidth, height = attr.colorHeight;
                var squareWidth = attr.colorSquareWidth;
                var canvas = element[0].getElementsByTagName('canvas')[0];
                canvas.height = height;
                canvas.width = width;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                var alpha;
                for (var x = 0; x < width; x++) {
                    for (var y = 0; y < height; y++) {
                        alpha = 1 - x / width;
                        if (parseInt(x / squareWidth) % 2 === parseInt(y / squareWidth) % 2) {
                            ColorHelper.setPixel(imageData, x, y, 204, 204, 204, 255);
                        } else {
                            ColorHelper.setPixel(imageData, x, y, 255, 255, 255, 255);
                        }
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                element[0].getElementsByTagName('textarea')[0].value=canvas.toDataURL('image/png');
                //console.log(canvas.toDataURL('image/png'));
            }};
    }]);

colorPickerControlsApp.directive('hue', ['$document', '$window', 'ColorHelper', function ($document, $window, ColorHelper) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attr) {
                var width = attr.hueWidth, height = attr.hueHeight;
                var rgb;
                var canvas = element[0].getElementsByTagName('canvas')[0];                
                canvas.height = height;
                canvas.width = width;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                for (var x = 0; x < width; x++) {
                    for (var y = 0; y < height; y++) {
                        rgb = ColorHelper.hslToRgb(x / width, 1, 0.5);
                        ColorHelper.setPixel(imageData, x, y, Math.round(rgb.r * 255), Math.round(rgb.g * 255), Math.round(rgb.b * 255), 255);
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                element[0].getElementsByTagName('textarea')[0].value=canvas.toDataURL('image/png');
                //console.log(canvas.toDataURL('image/png'));
            }};
    }]);