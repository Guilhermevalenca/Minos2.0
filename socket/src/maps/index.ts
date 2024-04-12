import map1 from './map1';


function current_map(level: number): (number | undefined)[][] | undefined {
    if(level === 1) {
        return map1;
    }
}

export {
    current_map
}