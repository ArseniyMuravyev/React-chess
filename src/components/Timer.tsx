import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors'
import { Player } from '../models/Player'

interface TimerProps {
	currentPlayer: Player | null
	restart: () => void
}

const Timer: React.FC<TimerProps> = ({ currentPlayer, restart }) => {
	const [blackTime, setBlackTime] = useState(300)
	const [whiteTime, setWhiteTime] = useState(300)
	const timer = useRef<null | ReturnType<typeof setInterval>>(null)

	useEffect(() => {
		startTimer()
	}, [currentPlayer])

	const startTimer = () => {
		if (timer.current) {
			clearInterval(timer.current)
		}
		const callback =
			currentPlayer?.color === Colors.WHITE
				? decrementWhiteTimer
				: decrementBlackTimer
		timer.current = setInterval(callback, 1000)
	}

	const decrementBlackTimer = () => {
		setBlackTime(prev => prev - 1)
	}

	const decrementWhiteTimer = () => {
		setWhiteTime(prev => prev - 1)
	}

	const handleRestart = () => {
		setBlackTime(300)
		setWhiteTime(300)
		restart()
	}

	return (
		<div className='timer'>
			<div>
				<button onClick={handleRestart} className='button'>Restart Game</button>
			</div>
			<div className="timer-text">
			<h2>Черные - {blackTime}</h2>
			<h2>Белые - {whiteTime}</h2>
			</div>
		</div>
	)
}

export default Timer
