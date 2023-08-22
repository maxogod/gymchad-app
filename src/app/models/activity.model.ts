import Exercise from "./exercise.model";

export default interface Activity {
    id: string;
    name: string;
    banner: string;
    exercises: Exercise[];
}
