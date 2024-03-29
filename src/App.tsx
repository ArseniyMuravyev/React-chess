import { useEffect, useState } from 'react'
import BoardComponent from './components/BoardComponent'
import LostFigures from './components/LostFigures'
import Timer from './components/Timer'
import { Board } from './models/Board'
import { Colors } from './models/Colors'
import { Player } from './models/Player'

function App() {
	const [board, setBoard] = useState(new Board())
	const [whitePlayer] = useState(new Player(Colors.WHITE))
	const [blackPlayer] = useState(new Player(Colors.BLACK))
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

	useEffect(() => {
		restart()
		setCurrentPlayer(whitePlayer)
	}, [])

	const restart = () => {
		const newBoard = new Board()
		newBoard.initCells()
		newBoard.addFigures()
		setBoard(newBoard)
	}

	const swapPlayer = () => {
		setCurrentPlayer(
			currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
		)
	}

	return (
		<div className='app'>
			<div className='main'>
				<BoardComponent
					board={board}
					setBoard={setBoard}
					currentPlayer={currentPlayer}
					swapPlayer={swapPlayer}
				/>
				<Timer restart={restart} currentPlayer={currentPlayer} />
			</div>
			<div>
				<LostFigures title='Черные фигуры' figures={board.lostBlackFigures} />
				<LostFigures title='Белые фигуры' figures={board.lostWhiteFigures} />
			</div>
		</div>
	)
}

export default App
