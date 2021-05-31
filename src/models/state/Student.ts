import IFactors from './IFactors';
import ISubjects from './ISubjects';

interface IStudent {
  id: string;
  firstName: string;
  lastName: string;
  course: string;
  group: string;
  subjects: Array<{ id: ISubjects; mark: string }>;
  factors: Array<{ id: IFactors; result: string }>;
}

export default IStudent;
