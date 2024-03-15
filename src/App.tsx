import './App.css'
import {useState} from "react"
import x from './assets/x.png'
import o from './assets/o.png'

function App() {
    const winCases: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    const [block, setBlock] = useState(Array(9).fill(null))
    const winArray = Array.from({length: 8}, () => Array(3).fill(""));
    const [whoWin, setWhoWin] = useState('')
    const [winState, setWinState] = useState(winArray)

    const gameState = ["X", "O"]
    const [status, setStatus] = useState(gameState[0])

    const xImage = <img src={x} alt="X"/>
    const oImage = <img src={o} alt="O"/>

    const handleClick = (i: number) => {
        // console.log(status)
        const array = [...block]
        if (array[i] === null) {
            if (status === gameState[0]) {
                array[i] = xImage
                setBlock(array)
                setStatus(gameState[1])
            } else {
                array[i] = oImage
                setBlock(array)
                setStatus(gameState[0])
            }
            for (let p = 0; p < 8; p++) {
                for (let q = 0; q < 3; q++) {
                    if (winCases[p][q] === i + 1) {
                        const win = [...winState]
                        if (status === gameState[0]) {
                            win[p][q] = gameState[0]
                        } else if (status === gameState[1]) {
                            win[p][q] = gameState[1]
                        }
                        setWinState(win)
                    }
                }
            }
            const newWin = [...winState]
            for (let val = 0; val < 8; val++) {
                if (newWin[val].every((ele) => ele === gameState[0])) {
                    console.log('X win')
                    setWhoWin('X')
                } else if (newWin[val].every((ele) => ele === gameState[1])) {
                    console.log('O win')
                    setWhoWin('O')
                }
            }
        } else {
            console.log('element already exist')
        }


        // console.log(status)
    }

    const handleReset = () => {
        setWhoWin('')
        setWinState(winArray)
        setStatus(gameState[0])
        setBlock(Array(9).fill(null))
    }
    const cells = []
    for (let i = 0; i < 9; i++) {
        cells.push(
            <div key={i} className={'cell'} onClick={() => handleClick(i)}>
                {block[i]}
            </div>
        )
    }

    const matchDraw = block.every(Boolean) && !whoWin.length
    const setClick = whoWin || matchDraw ? 'notAllowPointer fadeBack' : 'allowPointer'

    return (
        <section className={'parent relative bg-[#0f172a]'}>
            {whoWin || matchDraw ? '' : (
                <div className={'w-44 h-14 flex justify-center items-center rounded-2xl border-2 border-[#14bdac]'}>
                    <div className={'flex justify-center items-center'}>
                        <span className={'flex text-2xl m-2 text-[#14bdac]'}>{status}</span>
                        <p className={'text-amber-50'}>chance</p>
                    </div>
                </div>
            )}
            <div id={'board'} className={`board ${setClick} mt-10 rounded-3xl`}>
                {cells}
            </div>
            {(matchDraw || whoWin) &&
                <div className={'absolute bg-[#0f172a] w-60 h-32 rounded-xl flex flex-col justify-center items-center'}>
                    {matchDraw && <h1 className={'text-red-600 text-xl'}>Match Draw</h1>}
                    {whoWin && <h1 className={'text-md flex text-green-600'}><p className={'mr-1'}>{whoWin}</p> has won the match</h1>}
                    <button className={' p-2 text-amber-50 border-2 border-[#14bdac] rounded-lg mt-3'}
                            onClick={handleReset}>
                        Play again
                    </button>
                </div>}
        </section>
    )
}

export default App
