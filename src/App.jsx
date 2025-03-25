import { useEffect, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import styles from "./App.module.css";
import Tag from "./Tag";

function App() {
	const [time, setTime] = useState(15000);
	const [topics, setTopics] = useState([]); // List of topic names
	const [topicData, setTopicData] = useState({}); // Full JSON object
	const [currentTopic, setCurrentTopic] = useState("Education");
	const [question, setQuestion] = useState("");

	const prepare = () => setTime(15000);
	const speak = () => setTime(45000);

	const getTopics = async () => {
		try {
			const response = await fetch("/questions_part_1.json");
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);

			const data = await response.json();
			console.log("Fetched data:", data);

			setTopicData(data);
			const keys = Object.keys(data);
			setTopics(keys);

			if (keys.length > 0) {
				setCurrentTopic(keys[0]); // Set current topic to the first one
				setQuestion(data[keys[0]][0]); // Set the first question directly
			}
		} catch (error) {
			console.error("Failed to load JSON:", error);
		}
	};

	const getQuestion = (topic) => {
		console.log("Getting question for topic:", topic);
		const questions = topicData[topic];
		if (!questions || questions.length === 0) {
			console.log("No questions found for this topic.");
			setQuestion("No questions available.");
			return;
		}

		const randomIndex = Math.floor(Math.random() * questions.length);
		const selected = questions[randomIndex];
		setQuestion(selected);
	};

	const handleTopicChange = (topic) => {
		setCurrentTopic(topic);
		getQuestion(topic);
	};

	useEffect(() => {
		getTopics();
	}, []);

	return (
		<>
			<header>
				<p>TOEFL Speaking</p>
			</header>
			<main>
				<article className={styles.article}>
					<h2>Question 1 of 4</h2>
					<section className={styles.section}>
						{question && (
							<div style={{ marginTop: "2rem" }}>
								<p className={styles.question}>{question}</p>
							</div>
						)}
						<hr />
						<p className={styles.time_instructions}>
							Preparation Time: 15 seconds
						</p>
						<p className={styles.time_instructions}> Record Time: 45 seconds</p>
						<CountdownTimer time={time} />
					</section>
					<section className={styles.section}>
						<fieldset className={styles.switch_fieldset}>
							<div className={styles.switch_field}>
								<input
									type="radio"
									id="radio-one"
									name="switch-one"
									value="prepare"
									onChange={prepare}
									defaultChecked
								/>
								<label htmlFor="radio-one">prepare</label>
								<input
									type="radio"
									id="radio-two"
									name="switch-one"
									value="speak"
									onChange={speak}
								/>
								<label htmlFor="radio-two">speak</label>
							</div>
						</fieldset>
					</section>
					<div className={styles.tags_container}>
						{topics.map((topic) => (
							<Tag
								key={topic}
								tagName={topic}
								handleSetTag={handleTopicChange}
								selected={currentTopic === topic}
							/>
						))}
					</div>
				</article>
			</main>
		</>
	);
}

export default App;
