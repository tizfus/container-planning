(function(global) {
    'use strict';

    function ProductPlacement(x, y, z, length, width, height) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.length = length;
        this.width = width;
        this.height = height;
    }

    function Layer(index, placements) {
        this.index = index;
        this.placements = placements || [];
    }

    function pack(container, products) {
        const layers = [];
        let overfilled = false;

        const items = [];
        products.forEach(function(product) {
            for (let i = 0; i < product.quantity; i++) {
                items.push({
                    length: product.length,
                    width: product.width,
                    height: product.height
                });
            }
        });

        items.sort(function(a, b) {
            return b.height - a.height;
        });

        let layerIndex = 0;
        let currentLayer = new Layer(layerIndex, []);
        let currentZ = 0;
        let layerHeight = 0;
        let freeRects = [{
            x: 0,
            y: 0,
            w: container.length,
            h: container.width
        }];

        function fitsInContainer(item) {
            return (item.length <= container.length && item.width <= container.width) ||
                (item.width <= container.length && item.length <= container.width);
        }

        function splitFreeRect(rect, l, w) {
            const rightW = rect.w - l;
            if (rightW > 0) {
                freeRects.push({ x: rect.x + l, y: rect.y, w: rightW, h: rect.h });
            }
            const belowH = rect.h - w;
            if (belowH > 0) {
                freeRects.push({ x: rect.x, y: rect.y + w, w: rect.w, h: belowH });
            }
        }

        function tryPlace(item) {
            const orientations = [
                { length: item.length, width: item.width },
                { length: item.width, width: item.length }
            ];

            for (let o = 0; o < orientations.length; o++) {
                const l = orientations[o].length;
                const w = orientations[o].width;

                if (l > container.length || w > container.width) {
                    continue;
                }

                for (let i = 0; i < freeRects.length; i++) {
                    const rect = freeRects[i];
                    if (l <= rect.w && w <= rect.h) {
                        currentLayer.placements.push(new ProductPlacement(
                            rect.x,
                            rect.y,
                            currentZ,
                            l,
                            w,
                            item.height
                        ));
                        freeRects.splice(i, 1);
                        splitFreeRect(rect, l, w);
                        layerHeight = Math.max(layerHeight, item.height);
                        return true;
                    }
                }
            }

            return false;
        }

        items.forEach(function(item) {
            if (!fitsInContainer(item)) {
                overfilled = true;
                return;
            }

            if (currentZ + item.height > container.height) {
                overfilled = true;
                return;
            }

            if (!tryPlace(item)) {
                if (currentLayer.placements.length > 0) {
                    layers.push(currentLayer);
                }

                currentZ += layerHeight;
                if (currentZ + item.height > container.height) {
                    overfilled = true;
                    return;
                }

                layerIndex++;
                currentLayer = new Layer(layerIndex, []);
                layerHeight = 0;
                freeRects = [{
                    x: 0,
                    y: 0,
                    w: container.length,
                    h: container.width
                }];

                if (!tryPlace(item)) {
                    overfilled = true;
                    return;
                }
            }
        });

        if (currentLayer.placements.length > 0) {
            layers.push(currentLayer);
        }

        Container.layers = layers;
        Container.isOverfilled = overfilled;
    }

    const Container = {
        pack: pack
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Container;
    } else {
        global.Container = Container;
    }
})(typeof window !== 'undefined' ? window : globalThis);
