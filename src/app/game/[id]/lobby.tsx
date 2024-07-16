import { Participant, supabase } from '@/types/types'
import { on } from 'events'
import { FormEvent, useEffect, useState } from 'react'

export default function Lobby({
  gameId,
  onRegisterCompleted,
}: {
  gameId: string
  onRegisterCompleted: (participant: Participant) => void
}) {
  const [participant, setParticipant] = useState<Participant | null>(null)

  useEffect(() => {
    const fetchParticipant = async () => {
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

      if (!userId) {
        return
      }

      const { data: participantData, error } = await supabase
        .from('participants')
        .select()
        .eq('game_id', gameId)
        .eq('user_id', userId)
        .maybeSingle()

      if (error) {
        return alert(error.message)
      }

      if (participantData) {
        setParticipant(participantData)
        onRegisterCompleted(participantData)
      }
    }

    fetchParticipant()
  }, [gameId, onRegisterCompleted])

  return (
    <div className="bg-green-500 flex justify-center items-center min-h-screen">
      <div className="bg-black p-12">
        {!participant && (
          <Register
            gameId={gameId}
            onRegisterCompleted={(participant) => {
              onRegisterCompleted(participant)
              setParticipant(participant)
            }}
          />
        )}

        {participant && (
          <div className="text-white max-w-md">
            <h1 className="text-xl pb-4">Välkommen {participant.nickname}！</h1>
            <p>
            Du har blivit registrerad och ditt smeknamn bör synas på administratörsgränssnittet. Vänligen luta dig tillbaka och vänta tills spelledaren startar spelet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function Register({
  onRegisterCompleted,
  gameId,
}: {
  onRegisterCompleted: (player: Participant) => void
  gameId: string
}) {
  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)

    if (!nickname) {
      return
    }
    const { data: participant, error } = await supabase
      .from('participants')
      .insert({ nickname, game_id: gameId })
      .select()
      .single()

    if (error) {
      setSending(false)

      return alert(error.message)
    }

    onRegisterCompleted(participant)
  }

  const [nickname, setNickname] = useState('')
  const [sending, setSending] = useState(false)

  return (
    <form onSubmit={(e) => onFormSubmit(e)}>
      <input
        className="p-2 w-full border border-black text-black"
        type="text"
        onChange={(val) => setNickname(val.currentTarget.value)}
        placeholder="Smeknamn"
        maxLength={20}
      />
      <button disabled={sending} className="w-full py-2 bg-green-500 mt-4">
        Gå med
      </button>
    </form>
  )
}
