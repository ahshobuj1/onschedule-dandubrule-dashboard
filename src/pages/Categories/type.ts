import type {IAssessmentQuestion} from '../Questions/type';

export interface IAssessmentCategory {
  id: string;
  categoryId: string;
  title: string;
  order: number;
  assessmentId: string;
  questions: IAssessmentQuestion[];
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}
