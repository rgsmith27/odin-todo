export default class project{
    constructor(title, color){
        this.title = title;
        this.color = color;
        this.id = crypto.randomUUID();
    }

    get title(){
        return this.title;
    }
    
    set title(value){
        return this.title;
    }

    get color(){
        return this.color;
    }

    set color(value){
        return this.value;
    }

    get id(){
        return this.id;
    }
}