class Project{
    constructor(title, color){
        this._title = title;
        this._color = color;
        this._id = crypto.randomUUID();
    }

    get title(){
        return this._title;
    }
    
    set title(value){
        this._title = value;
    }

    get color(){
        return this._color;
    }

    set color(value){
        this._color = value;
    }

    get id(){
        return this._id;
    }
}

export default Project;