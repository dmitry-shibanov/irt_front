import ICommonElements from "./ICommonElement";
import IFactors from "./IFactors";
import ISubjects from "./ISubjects";

interface IProfessionTable extends ICommonElements {
    subjects: Array<ISubjects>
    factors: Array<IFactors>
}

export default IProfessionTable;