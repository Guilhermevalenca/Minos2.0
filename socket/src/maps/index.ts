import map1 from './map1';
import map2 from './map2';
import map3 from './map3';

function current_map(level: number): (number | undefined)[][] | undefined {
    if(level === 1) {
        return map1;
    } else if (level === 2) {
        return map2;
    } else if (level === 3) {
        return map3;
    }
}

export {
    current_map
}