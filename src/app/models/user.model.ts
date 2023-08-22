import Activity from "./activity.model";

export default interface User {
    name: string;
    email: string;
    picture: string;
    activities: Activity[];
}
