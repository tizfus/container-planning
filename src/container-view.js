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
        let cursorX = 0;
        let cursorY = 0;
        let rowHeight = 0;

        items.forEach(function(item) {
            if (item.length > container.length || item.width > container.width) {
                overfilled = true;
                return;
            }

            if (currentZ + item.height > container.height) {
                overfilled = true;
                return;
            }

            if (cursorX + item.length > container.length) {
                cursorX = 0;
                cursorY += rowHeight;
                rowHeight = 0;
            }

            if (cursorY + item.width > container.width) {
                layers.push(currentLayer);
                layerIndex++;
                currentLayer = new Layer(layerIndex, []);
                currentZ += layerHeight;
                layerHeight = 0;
                cursorX = 0;
                cursorY = 0;
                rowHeight = 0;

                if (currentZ + item.height > container.height) {
                    overfilled = true;
                    return;
                }
            }

            currentLayer.placements.push(new ProductPlacement(
                cursorX,
                cursorY,
                currentZ,
                item.length,
                item.width,
                item.height
            ));

            cursorX += item.length;
            rowHeight = Math.max(rowHeight, item.width);
            layerHeight = Math.max(layerHeight, item.height);
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
