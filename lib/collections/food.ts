export interface IFoodItem {
    name: string,
    location: string,
    expiration: Date,
    servings: number,
    image?: URL
}

export class Food {
    public static find():Array<IFoodItem> {
        return [{
            name: "Chicken",
            location: "Freezer",
            expiration: new Date(2016, 11, 23),
            servings: 2
        },
        {
            name: "Corn",
            location: "Freezer",
            expiration: new Date(2016, 11, 23),
            servings: 2
        }];
    }
}