'use client'

import { QuizSet, supabase } from '@/types/types'
import { useEffect, useState } from 'react'

export default function Home() {
  const [quizSet, setQuizSet] = useState<QuizSet[]>([])

  const [isLoadingGame, setIsLoadingGame] = useState(false)

  useEffect(() => {
    const getQuizSets = async () => {
      const { data, error } = await supabase
        .from('quiz_sets')
        .select(`*, questions(*, choices(*))`)
      if (error) {
        alert('Failed to fetch quiz sets')
        return
      }
      setQuizSet(data)
    }
    getQuizSets()
  }, [])

  const startGame = async (quizSetId: string) => {
    let userId: string | null = null

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession()

    if (sessionData.session) {
      userId = sessionData.session?.user.id ?? null
    } else {
      const { data, error } = await supabase.auth.signInAnonymously()
      if (error) console.error(error)
      userId = data?.user?.id ?? null
    }

    setIsLoadingGame(true)

    const { data, error } = await supabase
      .from('games')
      .insert({
        quiz_set_id: quizSetId,
      })
      .select()
      .single()
    setIsLoadingGame(false)
    if (error) {
      alert('Failed to starta spelet')
      return
    }

    const gameId = data.id
    window.open(`/host/game/${gameId}`, '_blank', 'noopener,noreferrer')
  }

  const removeGame = async (quizSetId: string) => {


    try {
      // Fetch question IDs related to the quiz set
      const { data: questionIds, error: fetchQuestionsError } = await supabase
        .from('questions')
        .select('id')
        .eq('quiz_set_id', quizSetId)
  
      console.log('Fetched question IDs:', questionIds, fetchQuestionsError)
      if (fetchQuestionsError) {
        console.error('Failed to fetch questions:', fetchQuestionsError)
        alert('Failed to fetch questions')
        return
      }
  
      // Delete related choices
      const { data: choicesData, error: choicesError } = await supabase
        .from('choices')
        .delete()
        .in('question_id', questionIds?.map(q => q.id) || [])
  
      console.log('Choices deletion result:', choicesData, choicesError)
      if (choicesError) {
        console.error('Failed to remove choices:', choicesError)
        alert('Failed to remove choices')
        return
      }
  
      // Delete related questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .delete()
        .eq('quiz_set_id', quizSetId)
  
      console.log('Questions deletion result:', questionsData, questionsError)
      if (questionsError) {
        console.error('Failed to remove questions:', questionsError)
        alert('Failed to remove questions')
        return
      }
  
      // Delete the quiz set
      const { data: quizSetData, error: quizSetError } = await supabase
        .from('quiz_sets')
        .delete()
        .eq('id', quizSetId)
  
      console.log('Quiz set deletion result:', quizSetData, quizSetError)
      if (quizSetError) {
        console.error('Failed to remove the quiz set:', quizSetError)
        alert('Failed to remove the quiz set')
        return
      }
  
      // Update the state to remove the deleted quiz set
      setQuizSet((prevQuizSets) => prevQuizSets.filter(qs => qs.id !== quizSetId))
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred')
    }
  }

  return (
    <>
      {quizSet.map((quizSet) => (
        <div
          key={quizSet.id}
          className="flex justify-start shadow my-4 mx-2 rounded"
        >
          <img className="h-28" src="/default.png" alt="default quiz image" />
          <div className="p-2 flex flex-col justify-between items-stretch flex-grow">
            <h2 className="font-bold">{quizSet.name}</h2>
            <div className="flex justify-between items-end">
              <div>{quizSet.questions.length} questions</div>
              <div>
                <button
                  className="bg-green-500 text-white py-1 px-4 rounded"
                  onClick={() => startGame(quizSet.id)}
                >
                  Starta Quiz
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded"
                  onClick={() => removeGame(quizSet.id)}
                >
                  Ta bort Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
