function isNullOrEmpty(val){
    return val == undefined || val == null || val == "";
}

export class MealOptionModel {

    constructor({name, category, description="", calories=0, isLocked=false, thumbnailURL=""}){
        if(isNullOrEmpty(name)){
            throw "Name is required"
        }

        if(isNullOrEmpty(category)){
            throw "Category is required"
        }

        this.id = "";
        this.name = name; 
        this.description = description;
        this.category = category;
        this.calories = calories;
        this.isLocked= isLocked ;
        this.thumbnailURL = thumbnailURL;
        this.dateCreated = new Date();
        this.lastModified = new Date();
    }

    get dateCreatfed(){
        return new Date();
    }

    isNullOrEmpty(val){
        return val == undefined || val == null || val == "";
    }

    toJson(){
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            category: this.category,
            calories: this.calories,
            isLocked: this.isLocked,
            thumbnailURL: this.thumbnailURL,
            dateCreated: this.dateCreated.toISOString(),
            lastModified: this.lastModified.toISOString()
        }
    }

    loadDate(dateStr){
        if(dateStr){
            return new Date(dateStr);
        }
        return undefined;
    }

    loadJson({jsonData}){
        this.id = jsonData?.id ?? this.id;
        this.name = jsonData?.name ?? this.name;
        this.category = jsonData?.category ?? this.category;
        this.calories = jsonData?.calories ?? this.calories;
        this.isLocked = jsonData?.isLocked ?? this.isLocked;
        this.thumbnailURL = jsonData?.thumbnailURL ?? this.thumbnailURL;
        this.dateCreated = loadDate(jsonData?.dateCreated) ?? this.dateCreated;
        this.lastModified = loadDate(jsonData?.lastModified) ?? this.lastModified;
        return  this;
    }
}
