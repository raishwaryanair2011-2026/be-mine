const data = [
  { text: "Will you be my Valentine, {name}? 💘", img: "us1.jpeg" },
  { text: "{name}, are you sure? 🥺", img:"us2jpg" },
  { text: "Like… REALLY sure, {name}? 💞", img: "us3.jpeg" },
  { text: "Can I make you smile every day, {name}? 😊", img: "us4.jpg"},
  { text: "So… will you be mine forever, {name}? 💍", img: "us5.jpeg" }
];

/* =========================
   Typing Text (FIXED)
   ========================= */
function TypingText({ text }) {
  const [charIndex, setCharIndex] = React.useState(0);

  React.useEffect(() => {
    setCharIndex(0);
    const interval = setInterval(() => {
      setCharIndex((i) => {
        if (i >= text.length) {
          clearInterval(interval);
          return i;
        }
        return i + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return <h1>{text.slice(0, charIndex)}</h1>;
}

/* =========================
   Floating Hearts
   ========================= */
function FloatingHearts() {
  React.useEffect(() => {
    const lowPower = window.innerWidth < 600;
    const hearts = ["❤️", "💖", "💕", "💘"];

    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = lowPower ? "16px" : "24px";
      heart.style.animationDuration = lowPower ? "4s" : "3s";

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, lowPower ? 900 : 400);   // 👈 slower on phones

    return () => clearInterval(interval);
  }, []);

  return null;
}


/* =========================
   Confetti (Final Screen)
   ========================= */
function Confetti() {
  React.useEffect(() => {
    const items = ["🎉", "✨", "💖", "💘"];

    const interval = setInterval(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.innerText = items[Math.floor(Math.random() * items.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.fontSize = 16 + Math.random() * 20 + "px";
      confetti.style.animationDuration = 2 + Math.random() * 2 + "s";

      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }, window.innerWidth < 600 ? 350 : 150);


    return () => clearInterval(interval);
  }, []);

  return null;
}

/* =========================
   Main App
   ========================= */
function App() {
const [name, setName] = React.useState(
  localStorage.getItem("valentineName") || ""
);
const [started, setStarted] = React.useState(
  !!localStorage.getItem("valentineName")
);
  const [index, setIndex] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const handleYes = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    } else {
      setDone(true);
    }
  };

  const moveNo = (e) => {
    e.target.style.position = "absolute";
    e.target.style.left = Math.random() * 80 + "vw";
    e.target.style.top = Math.random() * 80 + "vh";
  };

  /* Name screen */
  if (!started) {
    return (
      <div className="container">
        <h1>Hey you 💖</h1>
        <p>What's your name?</p>
        <input
          className="name-input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
        setName(e.target.value);
        localStorage.setItem("valentineName", e.target.value);
}}
        />
        <br />
        <button
          className="yes"
          disabled={!name}
          onClick={() => setStarted(true)}
        >
          Start 💕
        </button>
      </div>
    );
  }

  const currentText = data[index].text.replace("{name}", name);

  return (
    <div className="container">
      <FloatingHearts />

      {!done ? (
        <>
          <div className="typing-container">
            <TypingText text={currentText} />
          </div>

          <div className="image-wrapper">
            <img
              src={data[index].img}
              className="photo"
              key={data[index].img}
            />
          </div>

          <div className="buttons">
            <button className="yes" onClick={handleYes}>
              YES 😍
            </button>
            <button className="no" onMouseEnter={moveNo}>
              NO 😒
            </button>
          </div>

          <p className="progress">
            Question {index + 1} of {data.length}
          </p>
        </>
      ) : (
        <div className="final">
          <Confetti />
          <h1>YAYYYY 💖</h1>
          <h2>{name}, you just made me the happiest 😍</h2>
          <p>Forever starts now 💍</p>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
