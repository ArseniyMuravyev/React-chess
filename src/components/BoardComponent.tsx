import React, { useEffect, useState } from 'react'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Player } from '../models/Player'
import CellComponent from './CellComponent'

interface BoardProps {
	board: Board
	setBoard: (board: Board) => void
	currentPlayer: Player | null
	swapPlayer: () => void
}

const BoardComponent: React.FC<BoardProps> = ({
	board,
	setBoard,
	currentPlayer,
	swapPlayer
}) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

	const click = (cell: Cell) => {
		if (
			selectedCell &&
			selectedCell !== cell &&
			selectedCell.figure?.canMove(cell)
		) {
			selectedCell.moveFigure(cell)
			swapPlayer()
			setSelectedCell(null)
		} else {
			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell)
			}
		}
	}

	useEffect(() => {
		highlightCells()
	}, [selectedCell])

	const highlightCells = () => {
		board.highlightCells(selectedCell)
		updateBoard()
	}

	const updateBoard = () => {
		const newBoard = board.getCopyBoard()
		setBoard(newBoard)
	}

	return (
		<div>
			<h2 className='heading'>
				Сейчас ходят {currentPlayer?.color === 'white' ? 'белые' : 'черные'}
			</h2>
			<div className='board'>
				{board.cells.map((row, index) => (
					<React.Fragment key={index}>
						{row.map(cell => (
							<CellComponent
								click={click}
								cell={cell}
								key={cell.id}
								selected={
									cell.x === selectedCell?.x && cell.y === selectedCell?.y
								}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

export default BoardComponent
