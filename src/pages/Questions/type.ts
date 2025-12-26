export interface IAssessmentQuestion {
  id: string;
  questionId: number;
  question: string;
  order: number;
  isDocument: boolean;
  isInputField: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
