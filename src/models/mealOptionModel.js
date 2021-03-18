function isNullOrEmpty(val){
    return val == undefined || val == null || val == "";
}

export class MealOptionModel {

    constructor({name, description, category, calories=0, isLocked=false, thumbnailURL=""}){
        if(isNullOrEmpty(name)){
            throw "Name is required"
        }
        this.id = "";
        this.name = name; 
        this.description = description;
        this.category = category;
        this.calories = calories;
        this.isLocked= isLocked ;
        this.thumbnailURL = thumbnailURL;
        this.dateCreated = new Date().toString();
        this.lastModifiedCreated = new Date().toString();
    }

    isNullOrEmpty(val){
        return val == undefined || val == null || val == "";
    }

    loadJson({jsonData}){
        this.id = jsonData?.id ?? this.id;
        this.name = jsonData?.name ?? this.name;
        this.category = jsonData?.category ?? this.category;
        this.calories = jsonData?.calories ?? this.calories;
        this.isLocked = jsonData?.isLocked ?? this.isLocked;
        this.thumbnailURL = jsonData?.thumbnailURL ?? this.thumbnailURL;
        this.dateCreated = jsonData?.dateCreated ?? this.dateCreated;
        return  this;
    }
}
