"use client";

import axios from 'axios'
import Image from 'next/image';
import uuid from 'react-uuid';
import { useEffect, useRef, useState } from 'react'
import { Noto_Color_Emoji } from 'next/font/google'

const emoji = Noto_Color_Emoji({ weight: '400', subsets: ['emoji'] })

export default function Home() {
  const [dayLunch, setDayLunch] = useState('')
  const days = ['segunda', 'terca', 'quarta', 'quinta', 'sexta']

  const emojis: any = {
    frango: ['🐔', '🐤'],
    galinha: ['🐔', '🐤'],
    lombo: ['🐷', '🐽', '🍖'],
    porco: ['🐷', '🐽'],
    bife: ['🐮'],
    'cozidão': ['🐮', '🍲', '🍖'],
    'salpicão': Math.random() * 10 > 0.5 ? ['🥗', '🥬', '🥕', '🥦', '🍗'] : ['🧂', '🍆'],
    feijoada: ['🫘', '🥓', '🐷'],
    batata: ['🥔'],
    // melon: ['🍈'],
    // watermelon: ['🍉'],
    // candy: ['🍬'],
    peixe: ['🐟', '🐠', '🎣'],
    arroz: ['🍚', '🥘'],
    xadrez: ['♟️'],
    // pasta: ['🍝'],
    // "sem almoço hoje": ['😢'],
  }

  const getLunch = async () => {
    if (new Date().getDay() === 0 || new Date().getDay() === 6) return setDayLunch("Sem almoço hoje 😢")

    try {
      const { data } = await axios.get<{
        segunda: string
        terca: string
        quarta: string
        quinta: string
        sexta: string
      } | any>("https://ru-lunch.onrender.com/dias_da_semana")

      setDayLunch(data[days[new Date().getDay() - 1]] ?? "Sem almoço hoje 😢")
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getLunch()
  }, [])

  const [renderedEmojis, setRenderedEmojis] = useState<any[]>([]);

  useEffect(() => {
    const delay = 500;

    const timer = setInterval(() => {
      const nextEmojiIndex = renderedEmojis.length;
      const allEmojis: any = []
      const emojiKeys = Object.keys(emojis).filter(emoji =>
        dayLunch.toLowerCase().includes(emoji)
      )

      emojiKeys.forEach(key => {
        allEmojis.push(...emojis[key])
      })

      if (nextEmojiIndex >= emojiKeys.length) {
        clearInterval(timer);
        return;
      }

      setRenderedEmojis(prevEmojis => [
        ...prevEmojis,
        allEmojis.map((e: string) => <Emojis className={emoji.className} key={uuid()} emoji={e} />)
      ]);
    }, delay);

    return () => clearInterval(timer);
  }, [dayLunch])

  return (
    <main className="flex min-h-screen relative max-h-screen max-w-[100vw] flex-col items-center justify-center p-8 bg-gray-950 overflow-hidden">
      <h1 className={`text-3xl font-bold text-gray-200 text-center ${dayLunch ? "mb-8" : "mb-40"}`}>Qual será o almoço do RU? 🍽️</h1>

      {new Date().getDay() !== 0 && new Date().getDay() !== 6 && (
        <>
          <Image src="/spotlight.png" alt="Spotlight" width={200} height={200} className='absolute animate-wiggle2 duration-500 -mt-20 -left-20 md:left-1/3 z-0' />

          <Image src="/spotlight.png" alt="Spotlight" width={200} height={200} className='absolute animate-wiggle duration-500 -mt-20 -right-20 md:right-1/3 z-0' />
        </>
      )}
      {dayLunch && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl mt-4 text-gray-400 mb-4 z-10">Hoje é dia de:</h2>
          <h3 className="text-2xl mt-4 text-gray-200 text-center z-10">
            {dayLunch}
          </h3>
          <div className='relative'>
            {renderedEmojis}
          </div>
        </div>
      )}
    </main>
  )
}

const Emojis = ({ emoji, className }: any) => {
  const [destroy, setDestroy] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  let coeficienteAngular = Math.random() * 2 - 1
  let coeficienteLinear = Math.random() * 2 - 1
  const width = window.innerWidth * 0.6
  const height = window.innerHeight * 0.9

  function calculateLinspace(size: number, numPoints = 5) {
    const stepSize = size / numPoints;
    const linspace = [];

    for (let i = 0; i <= size; i += stepSize) {
      linspace.push(i);
    }

    return linspace;
  }

  const linespaceW = calculateLinspace(width)
  const linespaceH = calculateLinspace(height)

  useEffect(() => {
    buttonRef.current?.animate({
      transform: [
        `translate(${coeficienteAngular * linespaceW[0]}px, ${coeficienteLinear * linespaceH[0]}px) scale(0.5)`,
        `translate(${coeficienteAngular * linespaceW[1]}px, ${coeficienteLinear * linespaceH[1]}px) scale(1.5)`,
        `translate(${coeficienteAngular * linespaceW[2]}px, ${coeficienteLinear * linespaceH[2]}px) scale(2.5)`,
        `translate(${coeficienteAngular * linespaceW[3]}px, ${coeficienteLinear * linespaceH[3]}px) scale(3.5)`,
        `translate(${coeficienteAngular * linespaceW[4]}px, ${coeficienteLinear * linespaceH[4]}px) scale(4.5)`,
      ],
      opacity: [0, 1],
    }, {
      duration: 2000,
      easing: 'ease-in-out',
      fill: 'forwards',
    })
  }, [])

  const animatePop = () => {
    // Disable onClick
    buttonRef.current?.setAttribute('onClick', '')
    buttonRef.current?.setAttribute('disabled', 'true')

    buttonRef.current?.animate({
      transform: [
        `translate(${coeficienteAngular * linespaceW[4]}px, ${coeficienteLinear * linespaceH[4]}px) scale(4)`,
        `translate(${coeficienteAngular * linespaceW[4]}px, ${coeficienteLinear * linespaceH[4]}px) scale(6.5)`,
        `translate(${coeficienteAngular * linespaceW[4]}px, ${coeficienteLinear * linespaceH[4]}px) scale(2.5)`,
        `translate(${coeficienteAngular * linespaceW[4]}px, ${coeficienteLinear * linespaceH[4]}px) scale(0)`,
      ],
      opacity: [1, 0],
      visibility: ['visible', 'hidden']
    }, {
      duration: 500,
      easing: 'ease-in-out',
      fill: 'forwards',
    })
  }

  const handleDestroy = () => {
    animatePop()
    setTimeout(() => {
      setDestroy(true)
    }, 520)
  }

  if (destroy) return null

  return (
    <button onClick={handleDestroy} ref={buttonRef} className={`select-none translate-x-1/2 translate-y-1/2 z-20 text-sm opacity-0 transition-all absolute ${className}`}>{emoji} </button>
  )
}
