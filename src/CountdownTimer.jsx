import React, { useState, useEffect, useRef } from "react";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import StopOutlinedIcon from "@mui/icons-material/StopOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";

import styles from "./CountdownTimer.module.css";

const CountdownTimer = ({ time }) => {
	const [currentTime, setCurrentTime] = useState(null);
	const [ticking, setTicking] = useState(false);
	const [startTimestamp, setStartTimestamp] = useState(null);

	const intervalRef = useRef(null);

	// Reset on time change
	useEffect(() => {
		setTicking(false);
		setCurrentTime(time);
		setStartTimestamp(null);
		clearTimers();
	}, [time]);

	useEffect(() => {
		if (!ticking || currentTime <= 0) return;

		setStartTimestamp(Date.now());

		intervalRef.current = setInterval(() => {
			setCurrentTime((prev) => {
				if (prev <= 100) {
					clearTimers();
					setTicking(false);
					return 0;
				}
				return prev - 100;
			});
		}, 100);

		return () => clearTimers();
	}, [ticking]);

	const clearTimers = () => {
		clearInterval(intervalRef.current);
	};

	// Progress bar: based on elapsed time from `startTimestamp`

	const percentage = currentTime >= 100 ? (currentTime / time) * 100 : 0;

	const formatTime = () => {
		const totalSeconds = Math.round(currentTime / 1000);
		const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
		const seconds = String(totalSeconds % 60).padStart(2, "0");
		return `${minutes}:${seconds}`;
	};

	const handleReset = () => {
		clearTimers();
		setTicking(false);
		setCurrentTime(time);
		setStartTimestamp(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.time_display}>
				{currentTime > 100 ? formatTime() : "time up"}
			</div>
			<div className={styles.timer_bar_container}>
				<div className={styles.timer_bar_outer}>
					<div
						className={styles.timer_bar}
						style={{ width: `${percentage}%` }}
					></div>
				</div>
			</div>

			<div className={styles.button_container}>
				<button
					className={`${styles.btn} ${ticking ? styles.stop : styles.start}`}
					onClick={() => setTicking((prev) => !prev)}
					disabled={currentTime === 0}
				>
					{ticking ? <StopOutlinedIcon /> : <PlayArrowOutlinedIcon />}
				</button>

				<button
					className={`${styles.btn} ${styles.reset}`}
					onClick={handleReset}
				>
					<RotateLeftOutlinedIcon />
				</button>
			</div>
		</div>
	);
};

export default CountdownTimer;
