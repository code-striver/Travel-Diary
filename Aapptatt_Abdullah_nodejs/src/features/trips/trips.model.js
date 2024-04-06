
export default class TripModel{
    constructor(title, destinationArr, startDate,endDate, activitiesArr, userID){
        this.title = title;
        this.destinationArr = destinationArr
        this.startDate = startDate;
        this.endDate = endDate;
        this.activitiesArr = activitiesArr;
        this.userID = userID
    }
    static addTrip(title, destinationArr, startDate,endDate, activitiesArr, userID){
        const newTrip = new TripModel(title, destinationArr, startDate,endDate, activitiesArr, userID)
        return newTrip
    }

}