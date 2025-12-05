import { z } from 'zod'

export const answerValueSchema = z.enum(['A', 'B', 'C', 'D', 'E', 'F'])

export const answerOptionSchema = z.object({
  value: answerValueSchema,
  text: z.string().min(1, 'Answer text is required'),
  isCorrectAnswer: z.boolean()
})

export const questionSchema = z.object({
  id: z.string().min(1, 'Question ID is required'),
  questionText: z.string().min(1, 'Question text is required'),
  isMultiSelect: z.boolean(),
  domain: z.string().min(1, 'Domain is required'),
  service: z.string().min(1, 'Service is required'),
  weightedDifficultyFactor: z.number().min(0).max(10, 'Weighted difficulty must be between 0 and 10'),
  topic: z.string().optional(),
  options: z
    .array(answerOptionSchema)
    .min(2, 'Each question must have at least 2 options')
    .max(6, 'Each question can have at most 6 options')
    .refine(
      (options) => options.filter((opt) => opt.isCorrectAnswer).length >= 1,
      'Each question must have at least one correct answer'
    ),
  explanation: z.string().min(1, 'Explanation is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard'])
})

export const practiceExamSchema = z.object({
  id: z.string().min(1, 'Exam ID is required'),
  certificationId: z.string().min(1, 'Certification ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  questions: z
    .array(questionSchema)
    .min(1, 'Exam must have at least one question')
    .max(100, 'Exam cannot have more than 100 questions'),
  passingScore: z
    .number()
    .min(0, 'Passing score must be at least 0')
    .max(100, 'Passing score cannot exceed 100'),
  timeLimit: z
    .number()
    .positive('Time limit must be positive')
    .int('Time limit must be an integer'),
  createdAt: z.string().datetime('Invalid date format'),
  updatedAt: z.string().datetime('Invalid date format')
})

export type AnswerValueSchema = z.infer<typeof answerValueSchema>
export type AnswerOptionSchema = z.infer<typeof answerOptionSchema>
export type QuestionSchema = z.infer<typeof questionSchema>
export type PracticeExamSchema = z.infer<typeof practiceExamSchema>
