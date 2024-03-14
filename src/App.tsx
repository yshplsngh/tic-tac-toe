import './app.css'
import React from "react";

function App() {
    const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
        console.log(e.target.value)
    }
    return (
        <section className={'parent'}>
            <div id={'board'} className={'board'}>
                {Array(9).fill(null).map((_, i) => {
                    return <div key={i + 1} id={`${i + 1}`} className={'cell'} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClick(e)}>
                        {i+1}
                    </div>
                })}
            </div>
        </section>
    )
}

export default App
