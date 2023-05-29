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

  const [renderedEmojis, setRenderedEmojis] = useState<string[]>([]);

  useEffect(() => {
    const delay = 300; // Ajuste o valor do atraso conforme necessário

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
  }, [dayLunch]);

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

  let coeficienteAngular = Math.random() * 2 - 1
  let coeficienteLinear = Math.random() * 2 - 1

  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    spanRef.current?.animate({
      transform: [
        `translate(${coeficienteAngular * 100}px, ${coeficienteLinear * 100}px) scale(0.5)`,
        `translate(${coeficienteAngular * 200}px, ${coeficienteLinear * 200}px) scale(1.5)`,
        `translate(${coeficienteAngular * 300}px, ${coeficienteLinear * 300}px) scale(2.5)`,
        `translate(${coeficienteAngular * 400}px, ${coeficienteLinear * 400}px) scale(3.5)`,
        `translate(${coeficienteAngular * 500}px, ${coeficienteLinear * 500}px) scale(4.5)`,
      ],
      opacity: [0, 1],
    }, {
      duration: 2000,
      easing: 'ease-in-out',
      fill: 'forwards',
    })

  }, [coeficienteAngular, coeficienteLinear])

  return (
    <span ref={spanRef} className={`translate-x-1/2 translate-y-1/2 z-20 text-sm opacity-0 transition-all absolute animate-fade-in ${className}`}>{emoji}</span>
  )
}
