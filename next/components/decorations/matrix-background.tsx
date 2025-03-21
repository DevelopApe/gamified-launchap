'use client'

import React, { useEffect, useRef } from 'react'

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const matrix = "if(coffee){code()}else{sleep()}コーヒーがなければコードは書けない☕💻while(alive){eat();sleep();code();repeat()"+
                       "}生きてる限りコードを書き続けるπ≠3.14try{life()}catch(err){useStackOverflow()}エラーは友達デバッグは冒険function programmer()"+
                       "{return 'caffeine++';}プログラマー=カフェイン中毒者if(brain!=empty){keepCoding()}else{drinkCoffee()}мозг пуст?Выпей кофе!for"+
                       "(i=1;i<=infinity;i++){learnNewTech()}学び続ける=プログラマーの宿命doWhile(bugs){fix();test();pray();}버그를고치다버그를만들다"+
                       "무한루프if(problem){useStackOverflow()}else{drinkBeer()}問題解決の方程式switch(mood){case'happy':code();break;case'sad':"+
                       "codeMore();}コードは癒しtry{life.compile()}catch(error){life.debug()}人生はデバッグの連続だαβγδεζηθικλμνξοπρστυφχψω✧₊⁎❝᷀ົཽ≀ˍ̮ ≀"+
                       "╰॰︶ ᠂ ⠕⠗ ⠝⠕⠞ ⠞⠕ ⠃⠑∀x∈ℝ: ∃y≤x: y∈ℚ ❤️💙💚 ☀️☔️☁️ ☮️☯️☸️ ⚛️🕉️✡️ ☢️☣️🆘 ⏳⌛️🎲¿Ты ума съешь французских このは"+
                       "気分 бульонов? 新しくて面白いですEלמה זה לאיפה שם บ้านฉันอยู่ばかり見てるの Бъди сигурен Ξέρειςif(tired&&!sleepy){drinkCoffee("+
                       ");}☕️💻😴 #JavaScriptLifewhile(!succeed){try();}💪😅 NeverGiveUp.jsgit commit -m 'Fix bugs' && git push && 🙏 #DevOps"+
                       "Lyfefunction eatSleepCode(){repeat();}🍔💤💻🔁 #ProgrammerRoutinetry{code()}catch(bugs){fixBugs()}finally"+
                       "{drinkCoffee()}☕️🐛🔧if(code.works){dontTouchIt();}🙈🙉🙊 #IfItAintBrokeDontFixIt";

    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0F0'
      ctx.font = '15px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    function animate() {
      drawMatrix()
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drops.length = Math.floor(canvas.width / 20)
      for (let i = 0; i < drops.length; i++) {
        if (drops[i] === undefined) {
          drops[i] = 1
        }
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] w-full h-full" />
}