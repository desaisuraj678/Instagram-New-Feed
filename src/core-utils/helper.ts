export function getRandomInt(max:number) {
    if(isNumber(max)){
        return Math.floor(Math.random() * max);
    }
    throw new Error("Please provide a valid number");
}

export function getUniqueId() {
    return Math.floor(Math.random() * 100000);
}

export function isNumber(value : any){
    return typeof(value) === 'number' && !Number.isNaN(value)
}

