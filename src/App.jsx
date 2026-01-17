import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { 
  Coins, Gamepad2, ShoppingBag, TrendingUp, Zap, X, 
  CheckCircle, Loader2, User, LogOut, Flame, RotateCw, Crown,
  Swords, Dices, Eye, Shield, Search, Menu, ArrowRight, Wallet, LogIn, Brain, Activity, Globe, Server, Users, ExternalLink
} from 'lucide-react';

// --- Types & Constants ---

const VIEW = {
  HOME: 'home',
  ARENA: 'arena',
  GAME_ACTIVE: 'game_active',
  BETTING: 'betting',
  MARKET: 'market',
  PROFILE: 'profile',
  TOPUP: 'topup'
};

const GAMES = [
  { id: 1, name: "Cosmic Dodger", type: "Arcade", cost: 10, image: "bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2072&auto=format&fit=crop')]", description: "Dodge falling meteors and collect energy orbs." },
  { id: 2, name: "Neon Snake", type: "Retro", cost: 5, image: "bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')]", description: "Classic Snake with a neon twist. Eat and grow." },
  { id: 3, name: "Block Buster", type: "Arcade", cost: 15, image: "bg-[url('https://images.unsplash.com/photo-1555864326-5cf22ef123cf?q=80&w=2070&auto=format&fit=crop')]", description: "Smash the firewall blocks to earn crypto." },
  { id: 4, name: "Tic-Tac-Toe", type: "Strategy", cost: 5, image: "bg-[url('https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=2070&auto=format&fit=crop')]", description: "Beat the AI to triple your entry fee." },
  { id: 5, name: "Cyber Racer", type: "Racing", cost: 20, image: "bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')]", description: "High speed lane racing. Avoid the red walls." },
  { id: 6, name: "Bit Miner", type: "Reflex", cost: 8, image: "bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')]", description: "Click the green nodes before they vanish." },
  { id: 7, name: "Crypto Flap", type: "Arcade", cost: 12, image: "bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')]", description: "Tap to fly. Avoid the security pipes." },
  { id: 8, name: "Hex Sweeper", type: "Strategy", cost: 5, image: "bg-[url('https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?q=80&w=2071&auto=format&fit=crop')]", description: "Find the safe nodes. Avoid the bugs." },
  { id: 9, name: "Void Runner", type: "Arcade", cost: 25, image: "bg-[url('https://images.unsplash.com/photo-1461395253856-b075ca5f0dc2?q=80&w=2070&auto=format&fit=crop')]", description: "Survive the void. Jump to survive." },
  { id: 10, name: "Neural Link", type: "Puzzle", cost: 15, image: "bg-[url('https://images.unsplash.com/photo-1558494949-ef2a27883bb4?q=80&w=2070&auto=format&fit=crop')]", description: "Connect the memory nodes to win big." }
];

const FREE_GAMES = [
  { id: 'f1', name: "Rialo-2048", dev: "Koushik Nir", link: "https://mishunir.github.io/Rialo-2048/", color: "from-blue-600 to-indigo-900" },
  { id: 'f2', name: "The Devil", dev: "Hasibul Hasan Mahi", link: "https://silver-gingersnap-2820f5.netlify.app/lvl1.html", color: "from-red-600 to-rose-900" },
  { id: 'f3', name: "Rialo Car Game", dev: "Nayem", link: "https://roaring-babka-e33b03.netlify.app/", color: "from-yellow-600 to-orange-900" },
  { id: 'f4', name: "Rialo Drop Game", dev: "Muhtasim Muiz", link: "https://muhtasimmuiz.github.io/Rialo-Game-/", color: "from-green-600 to-emerald-900" },
  { id: 'f5', name: "RELOX", dev: "Hasibul Hasan Mahi", link: "https://reloxrialo.netlify.app/", color: "from-purple-600 to-fuchsia-900" },
  { id: 'f6', name: "Rialo Catch Game", dev: "Anika Saima", link: "https://muhtasimmuiz.github.io/Rialo-Catch-Game/", color: "from-pink-600 to-rose-900" },
  { id: 'f7', name: "Whisper Tile", dev: "NR Raihan", link: "https://whisper-tiles-rialo.vercel.app/", color: "from-cyan-600 to-blue-900" },
];

const MARKETPLACE = [
  { id: 1, name: "Gold Skin", price: 500, type: "Skin", icon: "👑" },
  { id: 2, name: "Plasma Rifle", price: 1200, type: "Weapon", icon: "🔫" },
  { id: 3, name: "OG Badge", price: 5000, type: "Badge", icon: "🛡️" },
  { id: 4, name: "Cyber Visor", price: 300, type: "Accessory", icon: "👓" },
  { id: 5, name: "Neon Boots", price: 450, type: "Skin", icon: "👢" },
  { id: 6, name: "Base Pet", price: 2000, type: "Pet", icon: "🐶" },
  { id: 7, name: "Matrix Cape", price: 800, type: "Accessory", icon: "🧥" },
  { id: 8, name: "Void Sword", price: 3500, type: "Weapon", icon: "⚔️" },
];

const HALL_OF_FAME = [
  { rank: 1, user: "0x71...9A23", score: 9950, game: "Block Buster", reward: "500 CADE" },
  { rank: 2, user: "CryptoKing", score: 8420, game: "Cosmic Dodger", reward: "350 CADE" },
  { rank: 3, user: "Satoshi_V", score: 7800, game: "Neon Snake", reward: "200 CADE" },
  { rank: 4, user: "Base_God", score: 6500, game: "Block Buster", reward: "150 CADE" },
  { rank: 5, user: "Degenerate", score: 5000, game: "Tic-Tac-Toe", reward: "100 CADE" },
];

// --- Context & State ---

const GameContext = createContext(null);

const GameProvider = ({ children }) => {
  const [view, setView] = useState(VIEW.HOME);
  const [activeGameId, setActiveGameId] = useState(null);
  
  const [user, setUser] = useState({
    isConnected: false,
    address: null,
    ethBalance: 0,
    cadeBalance: 0,
    inventory: [],
    netWorth: 0,
    wins: 0,
    losses: 0,
    matchesPlayed: 0
  });

  const [notification, setNotification] = useState(null);
  const [logs, setLogs] = useState([
    { user: "User_884", action: "won", amount: "500 CADE" },
    { user: "0x71...23", action: "minted", amount: "1000 CADE" },
    { user: "Crypto_X", action: "bet", amount: "50 CADE" },
    { user: "Whale_01", action: "won", amount: "2500 CADE" },
    { user: "Pixel_Guy", action: "bought", amount: "Plasma Rifle" }
  ]);

  // Helpers
  const simulateTx = async (action, duration = 1000) => {
    setNotification({ msg: `${action}...`, type: 'process' });
    await new Promise(resolve => setTimeout(resolve, duration));
  };

  const connectWallet = async () => {
    await simulateTx("Initializing Handshake");
    setUser({
      ...user,
      isConnected: true,
      address: "0x71C...9A23",
      ethBalance: 2.5,
      cadeBalance: 200, 
      netWorth: 200
    });
    setNotification({ msg: "Link Established. +200 CADE", type: 'success' });
    addLog("0x71C...9A23", "connected", "");
  };

  const disconnectWallet = () => {
    setUser({
      isConnected: false,
      address: null,
      ethBalance: 0,
      cadeBalance: 0,
      inventory: [],
      netWorth: 0,
      wins: 0,
      losses: 0,
      matchesPlayed: 0
    });
    setNotification({ msg: "Wallet Disconnected", type: 'process' });
    setView(VIEW.HOME);
  };

  const swapEthForCade = async (amount) => {
    if (!user.isConnected) {
      setNotification({ msg: "Connect Wallet First", type: 'error' });
      return;
    }
    await simulateTx("Swapping ETH for CADE");
    setUser(prev => ({ 
      ...prev, 
      cadeBalance: prev.cadeBalance + amount, 
      netWorth: prev.netWorth + amount 
    }));
    setNotification({ msg: `Acquired ${amount} CADE`, type: 'success' });
    addLog(user.address.slice(0,8), "swapped", `${amount} CADE`);
  };

  const launchGame = async (gameId, cost) => {
    if (!user.isConnected) {
      setNotification({ msg: "Connect Wallet First", type: 'error' });
      return;
    }
    if (user.cadeBalance < cost && cost > 0) {
      setNotification({ msg: "Insufficient CADE Balance", type: 'error' });
      return;
    }

    if (cost > 0) {
      await simulateTx("Processing Entry Fee", 800);
      setUser(prev => ({ 
        ...prev, 
        cadeBalance: prev.cadeBalance - cost,
        netWorth: prev.netWorth - cost 
      }));
    }
    
    setActiveGameId(gameId);
    setView(VIEW.GAME_ACTIVE);
  };

  const recordGameResult = (score, reward) => {
    if (reward > 0) {
      setUser(prev => ({
        ...prev,
        cadeBalance: prev.cadeBalance + reward,
        netWorth: prev.netWorth + reward,
        matchesPlayed: prev.matchesPlayed + 1,
        wins: prev.wins + 1 
      }));
      setNotification({ msg: `Victory! Payout: ${reward} CADE`, type: 'success' });
      addLog(user.address.slice(0,8), "won", `${reward} CADE`);
    } else {
      setUser(prev => ({
        ...prev,
        matchesPlayed: prev.matchesPlayed + 1,
        losses: prev.losses + 1
      }));
      setNotification({ msg: `Session Ended. Score: ${score}`, type: 'process' });
    }
    setView(VIEW.ARENA);
    setActiveGameId(null);
  };

  const buyAsset = async (item) => {
    if (!user.isConnected || user.cadeBalance < item.price) {
      setNotification({ msg: "Error: Connect or Insufficient Funds", type: 'error' });
      return;
    }
    await simulateTx("Minting Digital Asset");
    setUser(prev => ({ 
      ...prev, 
      cadeBalance: prev.cadeBalance - item.price,
      inventory: [...prev.inventory, item],
    }));
    setNotification({ msg: `Acquired ${item.name}`, type: 'success' });
    addLog(user.address.slice(0,8), "bought", item.name);
  };

  const sellAsset = async (item) => {
    if (!user.isConnected) return;
    const sellPrice = Math.floor(item.price * 0.8);
    await simulateTx("Processing Sell Order");
    
    setUser(prev => ({
      ...prev,
      cadeBalance: prev.cadeBalance + sellPrice,
      inventory: prev.inventory.filter(i => i.name !== item.name)
    }));
    
    setNotification({ msg: `Sold ${item.name} for ${sellPrice} CADE`, type: 'success' });
    addLog(user.address.slice(0,8), "sold", item.name);
  };

  const processBet = async (amount, type, winChance = 0.5) => {
     if (!user.isConnected || user.cadeBalance < amount) {
      setNotification({ msg: "Transaction Failed", type: 'error' });
      return false;
    }

    await simulateTx("Locking Smart Contract", 1500);
    
    const won = Math.random() < winChance;
    
    if (won) {
      const profit = amount; 
      setUser(prev => ({
        ...prev,
        cadeBalance: prev.cadeBalance + profit,
        netWorth: prev.netWorth + profit,
        wins: prev.wins + 1,
        matchesPlayed: prev.matchesPlayed + 1
      }));
      setNotification({ msg: `WIN! +${profit * 2} CADE`, type: 'success' });
      addLog(user.address.slice(0,8), "won bet", `${profit} CADE`);
      return true;
    } else {
      setUser(prev => ({
        ...prev,
        cadeBalance: prev.cadeBalance - amount,
        netWorth: prev.netWorth - amount,
        losses: prev.losses + 1,
        matchesPlayed: prev.matchesPlayed + 1
      }));
      setNotification({ msg: "Loss. Liquidity Absorbed.", type: 'error' });
      addLog(user.address.slice(0,8), "lost bet", `${amount} CADE`);
      return false;
    }
  };

  const addLog = (user, action, amount) => setLogs(prev => [{user, action, amount}, ...prev].slice(0, 10));

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <GameContext.Provider value={{ 
      user, view, setView, connectWallet, disconnectWallet, swapEthForCade, 
      launchGame, recordGameResult, buyAsset, sellAsset, processBet,
      logs, notification, activeGameId 
    }}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => useContext(GameContext);

// --- Game Logic Components ---

const CosmicDodger = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let player = { x: canvas.width / 2, y: canvas.height - 50, width: 30, height: 30, speed: 5 };
    let obstacles = [];
    let coins = [];
    let frameCount = 0;
    let currentScore = 0;
    let gameActive = true;
    let keys = { ArrowLeft: false, ArrowRight: false };

    const handleKeyDown = (e) => keys[e.key] = true;
    const handleKeyUp = (e) => keys[e.key] = false;
    
    const handleTouchMove = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      player.x = touchX - player.width / 2;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    const gameLoop = () => {
      if (!gameActive) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      ctx.fillStyle = '#010101'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid effect
      ctx.strokeStyle = '#e8e3d5';
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      for(let i=0; i<canvas.width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); }
      for(let i=0; i<canvas.height; i+=40) { ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); }
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
      if (keys.ArrowRight && player.x < canvas.width - player.width) player.x += player.speed;

      ctx.fillStyle = '#a9ddd3';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#a9ddd3';
      ctx.fillRect(player.x, player.y, player.width, player.height);
      ctx.shadowBlur = 0;

      if (frameCount % 40 === 0) obstacles.push({ x: Math.random() * (canvas.width - 30), y: -30, width: 30, height: 30, speed: (3 + (currentScore/100)) });
      if (frameCount % 100 === 0) coins.push({ x: Math.random() * (canvas.width - 20), y: -20, radius: 10, speed: 4 });

      ctx.fillStyle = '#e8e3d5'; 
      obstacles.forEach((obs, index) => {
        obs.y += obs.speed;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        if (player.x < obs.x + obs.width && player.x + player.width > obs.x && player.y < obs.y + obs.height && player.y + player.height > obs.y) {
          gameActive = false;
          setGameState('gameover');
        }
        if (obs.y > canvas.height) obstacles.splice(index, 1);
      });

      ctx.fillStyle = '#a9ddd3';
      coins.forEach((coin, index) => {
        coin.y += coin.speed;
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
        ctx.fill();
        if (Math.hypot(player.x - coin.x + player.width/2, player.y - coin.y + player.height/2) < player.width/2 + coin.radius) {
            currentScore += 10;
            setScore(currentScore);
            coins.splice(index, 1);
        }
        if (coin.y > canvas.height) coins.splice(index, 1);
      });

      frameCount++;
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#010101] rounded border border-[#e8e3d5]/30">
      <canvas ref={canvasRef} className="w-full h-full touch-none" />
      <div className="absolute top-4 left-4 bg-[#010101]/80 px-4 py-2 border border-[#a9ddd3] z-10 text-[#a9ddd3] font-mono font-bold tracking-widest">SCORE: {score}</div>
      {gameState === 'gameover' && <GameOverScreen score={score} onClaim={() => recordGameResult(score, Math.floor(score/10))} />}
    </div>
  );
};

const SnakeGame = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState({ x: 0, y: 0 }); // Start static
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const GRID_SIZE = 20;
  
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKey = (e) => {
      if (!started) setStarted(true);
      if (e.key === 'ArrowUp' && dir.y === 0) setDir({ x: 0, y: -1 });
      if (e.key === 'ArrowDown' && dir.y === 0) setDir({ x: 0, y: 1 });
      if (e.key === 'ArrowLeft' && dir.x === 0) setDir({ x: -1, y: 0 });
      if (e.key === 'ArrowRight' && dir.x === 0) setDir({ x: 1, y: 0 });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dir, started]);

  const handleTouchStart = (e) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    if (!started) setStarted(true);
    const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    const dx = touchEnd.x - touchStart.current.x;
    const dy = touchEnd.y - touchStart.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 20) { 
            if (dx > 0 && dir.x === 0) setDir({ x: 1, y: 0 });
            else if (dx < 0 && dir.x === 0) setDir({ x: -1, y: 0 });
        }
    } else {
        if (Math.abs(dy) > 20) {
            if (dy > 0 && dir.y === 0) setDir({ x: 0, y: 1 });
            else if (dy < 0 && dir.y === 0) setDir({ x: 0, y: -1 });
        }
    }
  };

  useEffect(() => {
    if (gameOver || !started) return;
    const move = setInterval(() => {
      setSnake(prev => {
        const newHead = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (newHead.x < 0 || newHead.x >= 30 || newHead.y < 0 || newHead.y >= 20 || prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 50);
          setFood({ x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 20) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 100);
    return () => clearInterval(move);
  }, [dir, food, gameOver, started]);

  return (
    <div 
        className="relative w-full h-full bg-[#010101] rounded border border-[#e8e3d5]/30 flex items-center justify-center touch-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
    >
      {!started && !gameOver && (
        <div className="absolute z-10 text-[#a9ddd3] text-center animate-pulse font-mono tracking-widest">
          PRESS KEY OR SWIPE
        </div>
      )}
      <div className="relative bg-[#0a0a0a] border border-[#e8e3d5]/10" style={{ width: 30 * GRID_SIZE, height: 20 * GRID_SIZE }}>
        {snake.map((seg, i) => (
          <div key={i} className="absolute bg-[#e8e3d5]" style={{ left: seg.x * GRID_SIZE, top: seg.y * GRID_SIZE, width: GRID_SIZE - 2, height: GRID_SIZE - 2 }} />
        ))}
        <div className="absolute bg-[#a9ddd3] shadow-[0_0_10px_#a9ddd3]" style={{ left: food.x * GRID_SIZE, top: food.y * GRID_SIZE, width: GRID_SIZE, height: GRID_SIZE }} />
      </div>
      <div className="absolute top-4 left-4 text-[#a9ddd3] font-mono font-bold">SCORE: {score}</div>
      {gameOver && <GameOverScreen score={score} onClaim={() => recordGameResult(score, Math.floor(score/10))} />}
    </div>
  );
};

const BlockBuster = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Game State
    let ball = { x: canvas.width/2, y: canvas.height-30, dx: 4, dy: -4, radius: 8 };
    let paddle = { x: canvas.width/2 - 50, y: canvas.height-10, width: 100, height: 10 };
    let bricks = [];
    
    // Build Bricks
    for(let c=0; c<8; c++) {
      for(let r=0; r<5; r++) {
        bricks.push({ x: c*(canvas.width/8), y: r*20 + 40, w: (canvas.width/8)-4, h: 16, status: 1 });
      }
    }

    let rightPressed = false;
    let leftPressed = false;

    const keyDown = (e) => { if(e.key === "Right" || e.key === "ArrowRight") rightPressed = true; if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = true; };
    const keyUp = (e) => { if(e.key === "Right" || e.key === "ArrowRight") rightPressed = false; if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = false; };
    
    // Touch Logic
    const handleTouchMove = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      paddle.x = touchX - paddle.width / 2;
    };

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    const draw = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight; 
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#010101';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw Bricks
      bricks.forEach(b => {
        if(b.status === 1) {
          ctx.fillStyle = "#e8e3d5";
          ctx.fillRect(b.x, b.y, b.w, b.h);
        }
      });

      // Draw Paddle
      ctx.fillStyle = "#a9ddd3";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#a9ddd3";
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
      ctx.shadowBlur = 0;

      // Draw Ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();

      // Collision Logic
      if(ball.x + ball.dx > canvas.width-ball.radius || ball.x + ball.dx < ball.radius) ball.dx = -ball.dx;
      if(ball.y + ball.dy < ball.radius) ball.dy = -ball.dy;
      else if(ball.y + ball.dy > canvas.height-ball.radius) {
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) ball.dy = -ball.dy;
        else {
          setGameOver(true);
          return;
        }
      }

      // Brick Collision
      bricks.forEach(b => {
        if(b.status === 1) {
          if(ball.x > b.x && ball.x < b.x+b.w && ball.y > b.y && ball.y < b.y+b.h) {
            ball.dy = -ball.dy;
            b.status = 0;
            setScore(prev => prev + 20);
          }
        }
      });

      ball.x += ball.dx;
      ball.y += ball.dy;

      if(rightPressed && paddle.x < canvas.width-paddle.width) paddle.x += 7;
      if(leftPressed && paddle.x > 0) paddle.x -= 7;

      if (!gameOver) animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver]);

  return (
    <div className="relative w-full h-full bg-[#010101] rounded-3xl overflow-hidden border border-[#e8e3d5]/30">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-4 left-4 text-[#a9ddd3] font-mono font-bold text-xl">SCORE: {score}</div>
      {gameOver && <GameOverScreen score={score} onClaim={() => recordGameResult(score, Math.floor(score/5))} />}
    </div>
  );
};

const TicTacToe = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let i=0; i<lines.length; i++) {
      const [a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const aiMove = (squares) => {
    const empty = squares.map((v, i) => v === null ? i : null).filter(v => v !== null);
    if (empty.length > 0) {
      const rand = Math.floor(Math.random() * empty.length);
      return empty[rand];
    }
    return -1;
  };

  const handleClick = (i) => {
    if (winner || board[i] || !isXNext) return;
    
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    
    const w = checkWinner(newBoard);
    if (w) { setWinner(w); return; }
    if (!newBoard.includes(null)) { setWinner('Draw'); return; }

    setIsXNext(false);
    
    setTimeout(() => {
      const aiIdx = aiMove(newBoard);
      if (aiIdx !== -1) {
        newBoard[aiIdx] = 'O';
        setBoard([...newBoard]);
        const wAI = checkWinner(newBoard);
        if (wAI) setWinner(wAI);
        else if (!newBoard.includes(null)) setWinner('Draw');
      }
      setIsXNext(true);
    }, 500);
  };

  const handleEnd = () => {
    if (winner === 'X') recordGameResult(100, 30); 
    else if (winner === 'Draw') recordGameResult(50, 5);
    else recordGameResult(0, 0);
  };

  return (
    <div className="w-full h-full bg-[#010101] rounded border border-[#e8e3d5]/30 flex flex-col items-center justify-center relative">
       <div className="text-2xl font-bold text-[#e8e3d5] mb-8 font-mono tracking-widest uppercase">
         {winner ? (winner === 'Draw' ? "IT'S A DRAW" : `${winner} WINS!`) : `Turn: ${isXNext ? 'YOU (X)' : 'AI (O)'}`}
       </div>
       
       <div className="grid grid-cols-3 gap-4 mb-8">
         {board.map((val, i) => (
           <button key={i} onClick={() => handleClick(i)} 
             className="w-24 h-24 bg-[#0a0a0a] border border-[#e8e3d5]/20 rounded text-5xl font-black flex items-center justify-center hover:bg-[#e8e3d5]/10 transition-colors">
             <span className={val === 'X' ? 'text-[#a9ddd3]' : 'text-[#e8e3d5]'}>{val}</span>
           </button>
         ))}
       </div>

       {winner && (
         <div className="absolute inset-0 bg-[#010101]/90 flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in z-20">
            <h2 className="text-4xl font-black text-[#e8e3d5] mb-4 tracking-tighter">{winner === 'X' ? 'VICTORY!' : winner === 'Draw' ? 'DRAW' : 'DEFEAT'}</h2>
            <button onClick={handleEnd} className="bg-[#a9ddd3] hover:bg-white text-[#010101] px-8 py-3 font-bold uppercase tracking-widest">
              {winner === 'X' ? 'Claim Reward' : 'Continue'}
            </button>
         </div>
       )}
    </div>
  );
};

// --- Game Engine 5: Lane Runner (Used for Cyber Racer) ---

const LaneRunner = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // 3 Lanes: 0 (Left), 1 (Center), 2 (Right)
    let lane = 1; 
    let obstacles = [];
    let frame = 0;
    
    const handleInput = (e) => {
      if (e.key === 'ArrowLeft' && lane > 0) lane--;
      if (e.key === 'ArrowRight' && lane < 2) lane++;
    };
    
    const handleTouch = (e) => {
        const width = canvas.clientWidth;
        if (e.changedTouches[0].clientX < width / 2 && lane > 0) lane--;
        else if (e.changedTouches[0].clientX > width / 2 && lane < 2) lane++;
    }

    window.addEventListener('keydown', handleInput);
    canvas.addEventListener('touchstart', handleTouch);

    const gameLoop = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const laneWidth = canvas.width / 3;
      
      ctx.fillStyle = '#010101';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw Lanes
      ctx.strokeStyle = '#e8e3d5';
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.moveTo(laneWidth, 0); ctx.lineTo(laneWidth, canvas.height);
      ctx.moveTo(laneWidth * 2, 0); ctx.lineTo(laneWidth * 2, canvas.height);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Player
      const playerX = (lane * laneWidth) + (laneWidth / 2) - 20;
      ctx.fillStyle = '#a9ddd3';
      ctx.fillRect(playerX, canvas.height - 80, 40, 60);

      // Obstacles
      if (frame % 60 === 0) {
        const obsLane = Math.floor(Math.random() * 3);
        obstacles.push({ lane: obsLane, y: -50 });
      }

      ctx.fillStyle = '#e8e3d5'; // Red obstacles in styling but using beige for theme consistency
      obstacles.forEach((obs, i) => {
        obs.y += 5 + (score / 500);
        const obsX = (obs.lane * laneWidth) + (laneWidth / 2) - 20;
        ctx.fillRect(obsX, obs.y, 40, 40);

        if (obs.y > canvas.height - 80 && obs.y < canvas.height - 20 && obs.lane === lane) {
          setGameOver(true);
        }

        if (obs.y > canvas.height) {
          obstacles.splice(i, 1);
          setScore(s => s + 10);
        }
      });

      if (!gameOver) {
        frame++;
        animationId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();
    return () => {
      window.removeEventListener('keydown', handleInput);
      canvas.removeEventListener('touchstart', handleTouch);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver]);

  return (
    <div className="relative w-full h-full bg-[#010101] rounded-3xl overflow-hidden border border-[#e8e3d5]/30">
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      <div className="absolute top-4 left-4 text-[#a9ddd3] font-mono font-bold text-xl">SCORE: {score}</div>
      {gameOver && <GameOverScreen score={score} onClaim={() => recordGameResult(score, Math.floor(score/10))} />}
    </div>
  );
};

// --- Game Engine 6: Bit Miner (Clicker) ---

const BitMiner = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const [nodes, setNodes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameAreaRef = useRef(null);

  useEffect(() => {
    if (gameOver) return;
    
    const spawn = setInterval(() => {
      const id = Date.now();
      const x = Math.random() * 80 + 10; // %
      const y = Math.random() * 80 + 10; // %
      const type = Math.random() > 0.8 ? 'BAD' : 'GOOD';
      
      setNodes(prev => [...prev, { id, x, y, type }]);
      
      // Auto remove after time
      setTimeout(() => {
        setNodes(prev => {
            const exists = prev.find(n => n.id === id);
            if (exists && exists.type === 'GOOD') {
                // If good node vanished, lose points or game over? let's lose life
                // For simple arcade, let's just ignore or minor penalty
            }
            return prev.filter(n => n.id !== id);
        });
      }, 2000); // 2 seconds life

    }, 800); // Spawn rate

    return () => clearInterval(spawn);
  }, [gameOver]);

  const handleClick = (id, type) => {
    if (type === 'BAD') {
      setGameOver(true);
    } else {
      setScore(s => s + 50);
      setNodes(prev => prev.filter(n => n.id !== id));
    }
  };

  return (
    <div ref={gameAreaRef} className="relative w-full h-full bg-[#010101] rounded-3xl overflow-hidden border border-[#e8e3d5]/30">
      <div className="absolute top-4 left-4 text-[#a9ddd3] font-mono font-bold text-xl z-10">SCORE: {score}</div>
      
      {nodes.map(node => (
        <div 
            key={node.id}
            onClick={() => handleClick(node.id, node.type)}
            className={`absolute w-12 h-12 rounded-full cursor-pointer animate-pulse ${node.type === 'BAD' ? 'bg-red-500 border-2 border-red-300' : 'bg-[#a9ddd3] border-2 border-white'}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
        />
      ))}

      {gameOver && <GameOverScreen score={score} onClaim={() => recordGameResult(score, Math.floor(score/10))} />}
    </div>
  );
}

// --- Game Engine 7: Crypto Flap (Flappy) ---

const CryptoFlap = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let frame = 0;
    
    let bird = { x: 50, y: 150, radius: 15, velocity: 0 };
    let pipes = [];
    const gravity = 0.5;
    const jump = -8;

    const handleInput = () => {
      bird.velocity = jump;
    };

    window.addEventListener('keydown', handleInput);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleInput(); });

    const gameLoop = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      // Update Bird
      bird.velocity += gravity;
      bird.y += bird.velocity;

      // Gen Pipes
      if (frame % 100 === 0) {
        const gap = 150;
        const topHeight = Math.random() * (canvas.height - gap - 50) + 20;
        pipes.push({ x: canvas.width, top: topHeight, gap: gap });
      }

      ctx.fillStyle = '#010101';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Bird
      ctx.fillStyle = '#a9ddd3';
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw Pipes
      ctx.fillStyle = '#e8e3d5';
      pipes.forEach((p, i) => {
        p.x -= 3;
        
        // Top Pipe
        ctx.fillRect(p.x, 0, 50, p.top);
        // Bottom Pipe
        ctx.fillRect(p.x, p.top + p.gap, 50, canvas.height - (p.top + p.gap));

        // Collision
        if (
            (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + 50) &&
            (bird.y - bird.radius < p.top || bird.y + bird.radius > p.top + p.gap)
        ) {
            setGameOver(true);
        }

        if (p.x + 50 < 0) {
            pipes.splice(i, 1);
            setScore(s => s + 10);
        }
      });

      // Floor/Ceiling Collision
      if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
          setGameOver(true);
      }

      if (!gameOver) {
        frame++;
        animationId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();
    return () => {
      window.removeEventListener('keydown', handleInput);
      canvas.removeEventListener('touchstart', handleInput);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver]);

  return (
    <div className="relative w-full h-full bg-[#010101] rounded-3xl overflow-hidden border border-[#e8e3d5]/30">
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      <div className="absolute top-4 left-4 text-[#a9ddd3] font-mono font-bold text-xl">SCORE: {score}</div>
      {gameOver && <GameOverScreen score={score} onClaim={() => recordGameResult(score, Math.floor(score/10))} />}
    </div>
  );
};

// --- Game Engine 8: Hex Sweeper (Minesweeper Logic) ---

const HexSweeper = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const SIZE = 5;

  useEffect(() => {
    // Init Grid
    const newGrid = [];
    for (let i = 0; i < SIZE * SIZE; i++) {
        newGrid.push({ 
            id: i, 
            isMine: Math.random() < 0.2, 
            revealed: false 
        });
    }
    setGrid(newGrid);
  }, []);

  const handleCellClick = (index) => {
    if (gameOver || grid[index].revealed) return;

    const newGrid = [...grid];
    newGrid[index].revealed = true;
    setGrid(newGrid);

    if (newGrid[index].isMine) {
        setGameOver(true);
    } else {
        setScore(s => s + 20);
        // Check win (all non-mines revealed)
        const safeCells = newGrid.filter(c => !c.isMine);
        const revealedSafe = safeCells.filter(c => c.revealed);
        if (safeCells.length === revealedSafe.length) {
            recordGameResult(score + 100, (score + 100) / 10);
        }
    }
  };

  return (
    <div className="w-full h-full bg-[#010101] flex flex-col items-center justify-center relative">
       <div className="grid grid-cols-5 gap-2">
         {grid.map((cell, i) => (
           <div 
             key={i} 
             onClick={() => handleCellClick(i)}
             className={`w-12 h-12 flex items-center justify-center border border-[#e8e3d5]/20 cursor-pointer transition-all ${
                 cell.revealed 
                    ? (cell.isMine ? 'bg-red-500' : 'bg-[#a9ddd3] text-black') 
                    : 'bg-[#0a0a0a] hover:bg-[#e8e3d5]/10'
             }`}
           >
             {cell.revealed && (cell.isMine ? <Flame size={20}/> : <CheckCircle size={20}/>)}
           </div>
         ))}
       </div>
       <div className="mt-4 text-[#e8e3d5] font-mono">SAFE ZONES CLEARED: {score / 20}</div>
       {gameOver && <GameOverScreen score={score} onClaim={() => recordGameResult(score, Math.floor(score/10))} />}
    </div>
  );
};

// --- Game Engine 9: Void Runner (Jump Game) ---

const VoidRunner = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let frame = 0;
    
    let player = { x: 50, y: 0, width: 30, height: 30, dy: 0, jumping: false };
    let obstacles = [];
    const gravity = 0.6;
    
    const handleInput = () => {
      if (!player.jumping) {
        player.jumping = true;
        player.dy = -12;
      }
    };

    window.addEventListener('keydown', handleInput);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleInput(); });

    const gameLoop = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const groundLevel = canvas.height - 50;

      // Update Logic
      if (player.jumping) {
        player.dy += gravity;
        player.y += player.dy;
        if (player.y > groundLevel - player.height) {
          player.y = groundLevel - player.height;
          player.jumping = false;
          player.dy = 0;
        }
      } else {
        player.y = groundLevel - player.height;
      }

      if (frame % 100 === 0) {
        obstacles.push({ x: canvas.width, y: groundLevel - 30, width: 30, height: 30 });
      }

      // Draw
      ctx.fillStyle = '#010101';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Ground
      ctx.fillStyle = '#e8e3d5';
      ctx.fillRect(0, groundLevel, canvas.width, 2);

      // Player
      ctx.fillStyle = '#a9ddd3';
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // Obstacles
      ctx.fillStyle = '#e8e3d5';
      obstacles.forEach((obs, i) => {
        obs.x -= 5 + (score / 500);
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        // Collision
        if (
          player.x < obs.x + obs.width &&
          player.x + player.width > obs.x &&
          player.y < obs.y + obs.height &&
          player.y + player.height > obs.y
        ) {
          setGameOver(true);
        }

        if (obs.x + obs.width < 0) {
          obstacles.splice(i, 1);
          setScore(s => s + 10);
        }
      });

      if (!gameOver) {
        frame++;
        animationId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();
    return () => {
      window.removeEventListener('keydown', handleInput);
      canvas.removeEventListener('touchstart', handleInput);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver]);

  return (
    <div className="relative w-full h-full bg-[#010101] rounded-3xl overflow-hidden border border-[#e8e3d5]/30">
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      <div className="absolute top-4 left-4 text-[#a9ddd3] font-mono font-bold text-xl">SCORE: {score}</div>
      {gameOver && <GameOverScreen score={score} onClaim={() => recordGameResult(score, Math.floor(score/10))} />}
    </div>
  );
};

// --- Game Engine 10: Neural Link (Memory Game) ---

const NeuralLink = ({ onExit }) => {
  const { recordGameResult } = useGame();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  const ICONS = ['⚡', '💎', '🛡️', '👑', '🔮', '🚀'];

  useEffect(() => {
    const deck = [...ICONS, ...ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, id) => ({ id, icon }));
    setCards(deck);
  }, []);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        if (solved.length + 2 === cards.length) {
           setTimeout(() => recordGameResult(1000 - (moves * 10), 100), 1000);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="w-full h-full bg-[#010101] flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-4 gap-4 w-full max-w-sm">
        {cards.map((card, i) => (
          <div 
            key={i} 
            onClick={() => handleCardClick(i)}
            className={`aspect-square flex items-center justify-center text-3xl cursor-pointer rounded border transition-all duration-300 ${
              flipped.includes(i) || solved.includes(i) 
                ? 'bg-[#a9ddd3] text-black border-[#a9ddd3]' 
                : 'bg-[#0a0a0a] border-[#e8e3d5]/30 text-transparent'
            }`}
          >
            {flipped.includes(i) || solved.includes(i) ? card.icon : '?'}
          </div>
        ))}
      </div>
      <div className="mt-8 text-[#e8e3d5] font-mono">MOVES: {moves}</div>
    </div>
  );
};

// --- Helper Components ---

const GameNotification = () => {
  const { notification } = useGame();
  if (!notification) return null;

  return (
    <div className={`fixed bottom-12 right-6 bg-[#010101] border-l-4 border-[#a9ddd3] px-6 py-4 shadow-[0_0_20px_rgba(169,221,211,0.2)] z-50 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300`}>
      {notification.type === 'process' && <Loader2 className="animate-spin text-[#a9ddd3]" size={20}/>}
      {notification.type === 'success' && <CheckCircle className="text-[#a9ddd3]" size={20}/>}
      {notification.type === 'error' && <X className="text-red-500" size={20}/>}
      <span className="font-bold text-[#e8e3d5] font-mono uppercase tracking-wide">{notification.msg}</span>
    </div>
  );
};

const GameOverScreen = ({ score, onClaim }) => (
  <div className="absolute inset-0 bg-[#010101]/90 flex flex-col items-center justify-center z-20 backdrop-blur-sm animate-in fade-in">
    <h2 className="text-4xl font-black text-[#e8e3d5] mb-2 tracking-tighter">GAME OVER</h2>
    <p className="text-[#a9ddd3] text-xl mb-6 font-mono">FINAL SCORE: {score}</p>
    <div className="bg-[#0a0a0a] p-8 border border-[#e8e3d5] text-center w-80">
      <p className="text-gray-500 text-xs mb-2 uppercase tracking-widest">Payout Generated</p>
      <div className="text-3xl font-mono text-[#a9ddd3] mb-8 flex items-center justify-center gap-2">
          {Math.floor(score/10) || Math.floor(score/5)} CADE
      </div>
      <button 
          onClick={onClaim}
          className="bg-[#a9ddd3] hover:bg-[#86c5b9] text-[#010101] px-8 py-3 font-bold w-full uppercase tracking-wider transition-all">
          Confirm
      </button>
    </div>
  </div>
);

const Ticker = () => {
  const { logs } = useGame();
  return (
    <>
    <style>{`
      @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
      .animate-marquee-infinite { animation: marquee 30s linear infinite; }
    `}</style>
    <div className="fixed bottom-0 left-0 right-0 bg-[#010101] border-t border-[#e8e3d5]/20 h-10 flex items-center z-40 overflow-hidden">
      <div className="whitespace-nowrap flex animate-marquee-infinite items-center w-full hover:pause">
        {logs.map((log, i) => (
           <span key={i} className="mx-8 text-xs text-[#e8e3d5] font-mono uppercase flex items-center gap-2 tracking-wider">
             <span className="w-1.5 h-1.5 bg-[#a9ddd3] rotate-45"/> 
             {log.user} <span className="text-gray-500">{log.action}</span> <span className="text-[#a9ddd3] drop-shadow-[0_0_5px_rgba(169,221,211,0.5)]">{log.amount}</span>
           </span>
        ))}
      </div>
    </div>
    </>
  );
};

// --- VIEW COMPONENTS ---

const Navbar = () => {
  const { user, connectWallet, disconnectWallet, view, setView } = useGame();
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsWalletMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const NavLink = ({ id, label }) => (
    <button 
      onClick={() => setView(id)}
      className={`text-sm font-bold uppercase tracking-widest transition-colors ${view === id ? 'text-[#a9ddd3]' : 'text-gray-500 hover:text-[#e8e3d5]'}`}>
      {label}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#010101]/80 backdrop-blur-md border-b border-[#e8e3d5]/10 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setView(VIEW.HOME)}>
           <div className="bg-[#e8e3d5] text-[#010101] font-black px-1.5 py-0.5 text-lg">R</div>
           <span className="text-[#a9ddd3] font-black text-xl tracking-tighter group-hover:drop-shadow-[0_0_8px_rgba(169,221,211,0.6)] transition-all">CADE</span>
        </div>
        <div className="hidden md:flex gap-8 ml-8">
          <NavLink id={VIEW.ARENA} label="Games" />
          <NavLink id={VIEW.BETTING} label="Betting" />
          <NavLink id={VIEW.MARKET} label="Market" />
          <NavLink id={VIEW.PROFILE} label="Profile" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user.isConnected ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsWalletMenuOpen(!isWalletMenuOpen)}
              className="flex items-center gap-3 border border-[#a9ddd3] px-4 py-2 rounded-full cursor-pointer hover:bg-[#a9ddd3]/10 transition-colors">
              <div className="text-[#e8e3d5] font-mono text-sm">{user.cadeBalance} CADE</div>
              <div className="w-px h-3 bg-[#e8e3d5]/30"></div>
              <div className="text-gray-500 font-mono text-xs truncate w-20">{user.address?.slice(0, 6)}...{user.address?.slice(-4)}</div>
            </button>
            
            {isWalletMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] border border-[#e8e3d5]/20 rounded-lg shadow-xl z-50 overflow-hidden">
                <button 
                  onClick={() => { setView(VIEW.PROFILE); setIsWalletMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-[#e8e3d5] hover:bg-[#e8e3d5]/10 flex items-center gap-2">
                  <User size={14}/> Profile
                </button>
                <button 
                  onClick={() => { disconnectWallet(); setIsWalletMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 flex items-center gap-2 border-t border-[#e8e3d5]/10">
                  <LogOut size={14}/> Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={connectWallet}
            className="border border-[#a9ddd3] text-[#a9ddd3] px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-[#a9ddd3] hover:text-black transition-all shadow-[0_0_10px_rgba(169,221,211,0.1)] hover:shadow-[0_0_20px_rgba(169,221,211,0.4)]">
            Connect_Wallet
          </button>
        )}
        <button className="md:hidden text-[#e8e3d5]"><Menu /></button>
      </div>
    </nav>
  );
};

const HeroSection = () => {
    const { launchGame } = useGame(); 
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Auto-scroll logic
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
                if (scrollRef.current.scrollLeft >= maxScroll) {
                    scrollRef.current.scrollLeft = 0; // Loop back
                } else {
                    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }
        }, 3000); // 3 seconds per slide
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div className="mb-12">
            {/* Inject styles locally to ensure scrollbar is hidden */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <h2 className="text-[#e8e3d5] font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2"><Flame size={14} className="text-[#a9ddd3]"/> Featured Protocols</h2>
            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Manual "Featured" Cards */}
                {GAMES.slice(0, 5).map((game) => (
                    <div key={game.id} className="min-w-[85vw] md:min-w-[600px] h-[300px] md:h-[400px] rounded-sm overflow-hidden border border-[#e8e3d5]/10 group relative snap-center flex-shrink-0">
                        <div className={`absolute inset-0 ${game.image} bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <h1 className="text-3xl md:text-5xl font-black text-[#e8e3d5] mb-2 tracking-tighter uppercase">{game.name}</h1>
                            <p className="text-gray-400 text-xs md:text-sm max-w-md mb-6">{game.description}</p>
                            <button 
                                onClick={() => launchGame(game.id, game.cost)}
                                className="bg-[#a9ddd3] text-[#010101] px-6 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                                Initialize <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const ProtocolStats = () => {
    return (
        <div className="mt-20 border-t border-[#e8e3d5]/10 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="p-6 bg-[#0a0a0a] border border-[#e8e3d5]/10">
                    <div className="text-[#a9ddd3] mb-4"><Globe size={32}/></div>
                    <h4 className="text-[#e8e3d5] font-bold uppercase tracking-widest text-sm mb-2">Network Status</h4>
                    <div className="text-2xl font-mono text-white mb-1">ONLINE</div>
                    <div className="text-xs text-green-500 font-mono">Latency: 12ms</div>
                </div>
                <div className="p-6 bg-[#0a0a0a] border border-[#e8e3d5]/10">
                    <div className="text-[#a9ddd3] mb-4"><Users size={32}/></div>
                    <h4 className="text-[#e8e3d5] font-bold uppercase tracking-widest text-sm mb-2">Active Nodes</h4>
                    <div className="text-2xl font-mono text-white mb-1">1,248</div>
                    <div className="text-xs text-gray-500 font-mono">+12% (24h)</div>
                </div>
                <div className="p-6 bg-[#0a0a0a] border border-[#e8e3d5]/10">
                    <div className="text-[#a9ddd3] mb-4"><Activity size={32}/></div>
                    <h4 className="text-[#e8e3d5] font-bold uppercase tracking-widest text-sm mb-2">Total Volume</h4>
                    <div className="text-2xl font-mono text-white mb-1">4.2M</div>
                    <div className="text-xs text-[#a9ddd3] font-mono">CADE Tokens</div>
                </div>
                <div className="p-6 bg-[#0a0a0a] border border-[#e8e3d5]/10">
                    <div className="text-[#a9ddd3] mb-4"><Server size={32}/></div>
                    <h4 className="text-[#e8e3d5] font-bold uppercase tracking-widest text-sm mb-2">Treasury</h4>
                    <div className="text-2xl font-mono text-white mb-1">$842k</div>
                    <div className="text-xs text-gray-500 font-mono">TVL (Locked)</div>
                </div>
            </div>
            
            <div className="mt-12 p-8 border border-[#e8e3d5] flex flex-col md:flex-row items-center justify-between gap-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[#050505]">
                <div>
                    <h3 className="text-3xl font-black text-[#e8e3d5] uppercase tracking-tighter mb-2">Join The Network</h3>
                    <p className="text-gray-400 text-sm max-w-md">Participate in the decentralized arcade economy. Earn rewards, trade assets, and govern the future of R-CADE.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-4 border border-[#e8e3d5] text-[#e8e3d5] font-bold uppercase tracking-widest hover:bg-[#e8e3d5] hover:text-black transition-all">Read Whitepaper</button>
                    <button className="px-8 py-4 bg-[#a9ddd3] text-black font-bold uppercase tracking-widest hover:bg-white transition-all">Start Playing</button>
                </div>
            </div>
        </div>
    )
}

const ControlCenter = ({ activeFilter, setFilter }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex gap-2">
                {['ALL_GAMES', 'SKILL', 'STRATEGY'].map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setFilter(filter)}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border transition-all ${activeFilter === filter ? 'bg-[#e8e3d5] text-[#010101] border-[#e8e3d5]' : 'bg-transparent text-[#e8e3d5] border-[#e8e3d5]/30 hover:border-[#e8e3d5]'}`}>
                        {filter.replace('_', ' ')}
                    </button>
                ))}
            </div>
            <div className="relative w-full md:w-64">
                <input 
                    type="text" 
                    placeholder="SEARCH_PROTOCOL..." 
                    className="w-full bg-transparent border border-[#e8e3d5]/30 px-4 py-2 text-[#a9ddd3] text-sm font-mono focus:outline-none focus:border-[#e8e3d5] placeholder:text-gray-700"
                />
                <Search className="absolute right-3 top-2.5 text-gray-700" size={14} />
            </div>
        </div>
    )
}

const GameCard = ({ game, onClick }) => (
    <div 
        onClick={onClick}
        className="group bg-[#0a0a0a] border border-[#e8e3d5]/10 hover:border-[#a9ddd3] transition-all duration-300 cursor-pointer relative overflow-hidden h-80 flex flex-col">
        <div className={`h-48 ${game.image} bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500`}>
             <div className="absolute inset-0 bg-[#010101]/20 group-hover:bg-transparent"></div>
        </div>
        <div className="p-5 flex flex-col justify-between flex-1 relative z-10 bg-[#0a0a0a]">
             <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#a9ddd3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#e8e3d5] uppercase tracking-tight">{game.name}</h3>
                    <span className="text-[#a9ddd3] font-mono text-xs">{game.cost} CADE</span>
                </div>
                <p className="text-gray-500 text-xs line-clamp-2">{game.description}</p>
             </div>
             <div className="flex items-center gap-2 mt-4 text-[#a9ddd3] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                 Initialize <ArrowRight size={12} />
             </div>
        </div>
    </div>
);

const FreeGameCard = ({ game }) => (
  <div className="group bg-[#0a0a0a] border border-[#e8e3d5]/10 hover:border-green-400 transition-all duration-300 relative overflow-hidden h-80 flex flex-col">
      <div className={`h-48 bg-gradient-to-br ${game.color} relative p-6 flex flex-col justify-end`}>
           <div className="absolute inset-0 bg-[#010101]/20 group-hover:bg-transparent transition-colors"></div>
           <Gamepad2 className="text-white/20 absolute top-4 right-4 rotate-12" size={80} />
           <div className="relative z-10">
               <span className="text-[10px] font-bold bg-[#010101]/60 backdrop-blur-sm text-green-400 px-2 py-1 rounded mb-2 inline-block border border-green-500/30">FREE TO PLAY</span>
               <h3 className="text-xl font-black text-white leading-none uppercase tracking-tight">{game.name}</h3>
           </div>
      </div>
      
      <div className="p-5 bg-[#0a0a0a] flex-1 flex flex-col justify-between">
          <div>
              <p className="text-gray-500 text-xs line-clamp-2 mb-2">{game.description}</p>
              <div className="text-[10px] text-gray-400 font-mono uppercase">Dev: <span className="text-[#e8e3d5]">{game.dev}</span></div>
          </div>
          
          <a 
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4 bg-[#0a0a0a] hover:bg-green-900/20 border border-green-900/50 hover:border-green-500 text-green-400 py-2 rounded font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            Launch External <ExternalLink size={12} />
          </a>
      </div>
  </div>
);

// --- RESTORED (BUT RE-COLORED) LAYOUTS ---

const HallOfFame = () => (
  <div className="bg-[#0a0a0a] border border-[#e8e3d5]/20 p-8 mb-12">
    <h3 className="text-2xl font-black text-[#e8e3d5] mb-6 flex items-center gap-3 uppercase tracking-tighter">
      <Flame className="text-[#a9ddd3]" /> Hall of Fame
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-xs uppercase border-b border-[#e8e3d5]/20 tracking-widest">
            <th className="pb-4 pl-4">Rank</th>
            <th className="pb-4">User</th>
            <th className="pb-4">Game</th>
            <th className="pb-4">Score</th>
            <th className="pb-4">Reward</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {HALL_OF_FAME.map((entry) => (
            <tr key={entry.rank} className="border-b border-[#e8e3d5]/10 hover:bg-[#e8e3d5]/5 transition-colors">
              <td className="py-4 pl-4 font-bold text-[#e8e3d5]">
                {entry.rank === 1 ? <span className="text-yellow-500 text-lg">🥇</span> : 
                 entry.rank === 2 ? <span className="text-gray-400 text-lg">🥈</span> : 
                 entry.rank === 3 ? <span className="text-orange-400 text-lg">🥉</span> : `#${entry.rank}`}
              </td>
              <td className="py-4 font-mono text-[#a9ddd3]">{entry.user}</td>
              <td className="py-4 text-gray-400">{entry.game}</td>
              <td className="py-4 font-bold text-[#e8e3d5]">{entry.score}</td>
              <td className="py-4 text-[#a9ddd3] font-mono">{entry.reward}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const BettingHub = () => {
  const { processBet, user } = useGame();
  const [betMode, setBetMode] = useState('house'); // house, pvp, spectator
  const [amount, setAmount] = useState(10);
  const [simMatch, setSimMatch] = useState(null); // For spectator mode

  const handleBet = async (option) => {
    await processBet(amount, betMode);
  };

  const startSpectatorMatch = () => {
    setSimMatch({ p1: 'CyberNinja', p2: 'BaseGod', p1Score: 0, p2Score: 0, status: 'live' });
    let p1 = 0;
    let p2 = 0;
    const interval = setInterval(() => {
        p1 += Math.floor(Math.random() * 20);
        p2 += Math.floor(Math.random() * 20);
        setSimMatch(prev => ({ ...prev, p1Score: p1, p2Score: p2 }));
        if (p1 > 100 || p2 > 100) {
            clearInterval(interval);
            const winner = p1 > p2 ? 'p1' : 'p2';
            setSimMatch(prev => ({ ...prev, status: 'finished', winner }));
        }
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-[#e8e3d5] flex items-center gap-3 uppercase tracking-tighter">
          <TrendingUp className="text-[#a9ddd3]" /> Betting Station
        </h2>
        <div className="border border-[#e8e3d5]/30 p-1 flex">
            {['house', 'pvp', 'spectator'].map(mode => (
                <button 
                    key={mode}
                    onClick={() => setBetMode(mode)}
                    className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${betMode === mode ? 'bg-[#e8e3d5] text-black' : 'text-gray-500 hover:text-[#e8e3d5]'}`}>
                    {mode === 'house' ? 'Vs House' : mode}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Input Column */}
        <div className="bg-[#0a0a0a] border border-[#e8e3d5]/20 p-6 h-fit">
            <h3 className="text-[#e8e3d5] text-xs font-bold uppercase mb-4 tracking-widest">Wager Settings</h3>
            <div className="mb-6">
                <label className="block text-xs text-gray-500 mb-2 uppercase">Bet Amount (CADE)</label>
                <div className="flex gap-2 mb-2">
                    {[10, 50, 100].map(val => (
                        <button key={val} onClick={() => setAmount(val)} className={`flex-1 py-2 border text-xs font-bold ${amount === val ? 'border-[#a9ddd3] text-[#a9ddd3]' : 'border-[#e8e3d5]/20 text-gray-500'}`}>{val}</button>
                    ))}
                </div>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-[#010101] border border-[#e8e3d5]/20 p-3 text-[#e8e3d5] font-mono focus:border-[#a9ddd3] outline-none"
                />
            </div>
            <div className="text-xs text-gray-500 uppercase">
                Balance: <span className="text-[#a9ddd3] font-mono">{user.cadeBalance}</span>
            </div>
        </div>

        {/* Content Column */}
        <div className="md:col-span-2">
            {betMode === 'house' && (
                <div className="bg-[#0a0a0a] border border-[#e8e3d5]/20 p-8 text-center">
                    <Dices className="mx-auto text-[#a9ddd3] mb-4" size={48} />
                    <h3 className="text-2xl font-bold text-[#e8e3d5] mb-2 uppercase">High / Low</h3>
                    <p className="text-gray-500 mb-8 font-mono text-sm">Predict if the next hash is High ({'>'}50) or Low ({'<'}50).</p>
                    <div className="flex gap-4">
                        <button onClick={() => handleBet('low')} className="flex-1 border border-red-900 text-red-500 hover:bg-red-900/20 py-4 text-sm font-bold uppercase tracking-widest transition-all">
                            LOW ({'<'}50)
                        </button>
                        <button onClick={() => handleBet('high')} className="flex-1 border border-green-900 text-green-500 hover:bg-green-900/20 py-4 text-sm font-bold uppercase tracking-widest transition-all">
                            HIGH ({'>'}50)
                        </button>
                    </div>
                </div>
            )}

            {betMode === 'pvp' && (
                <div className="bg-[#0a0a0a] border border-[#e8e3d5]/20 p-8 text-center relative overflow-hidden">
                    <Swords className="mx-auto text-[#a9ddd3] mb-4" size={48} />
                    <h3 className="text-2xl font-bold text-[#e8e3d5] mb-2 uppercase">PvP Matchmaking</h3>
                    <p className="text-gray-500 mb-8 font-mono text-sm">Wager {amount} CADE against a peer.</p>
                    <button onClick={() => handleBet('pvp')} className="w-full bg-[#a9ddd3] hover:bg-[#e8e3d5] text-black py-4 font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(169,221,211,0.2)]">
                        INITIATE MATCH ({amount} CADE)
                    </button>
                </div>
            )}

            {betMode === 'spectator' && (
                <div className="bg-[#0a0a0a] border border-[#e8e3d5]/20 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[#e8e3d5] font-bold flex items-center gap-2 uppercase tracking-widest"><Eye size={20}/> Live Arena Feed</h3>
                        {!simMatch && <button onClick={startSpectatorMatch} className="text-xs border border-[#a9ddd3] text-[#a9ddd3] px-3 py-1 uppercase hover:bg-[#a9ddd3] hover:text-black transition-colors">Start Sim</button>}
                    </div>
                    
                    {simMatch ? (
                        <div className="bg-[#010101] border border-[#e8e3d5]/10 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-center">
                                    <div className="text-[#a9ddd3] font-bold">{simMatch.p1}</div>
                                    <div className="text-3xl text-[#e8e3d5] font-mono">{simMatch.p1Score}</div>
                                </div>
                                <div className="text-gray-500 text-xs font-bold">VS</div>
                                <div className="text-center">
                                    <div className="text-[#e8e3d5] font-bold">{simMatch.p2}</div>
                                    <div className="text-3xl text-[#e8e3d5] font-mono">{simMatch.p2Score}</div>
                                </div>
                            </div>
                            
                            {simMatch.status === 'live' ? (
                                <div className="w-full bg-[#333] h-1 overflow-hidden">
                                    <div className="bg-[#a9ddd3] h-full transition-all duration-500" style={{width: `${(simMatch.p1Score + simMatch.p2Score) / 2}%`}}></div>
                                </div>
                            ) : (
                                <div className="text-center mt-4">
                                    <div className="text-[#a9ddd3] font-bold uppercase mb-2 tracking-widest">{simMatch.winner === 'p1' ? simMatch.p1 : simMatch.p2} WINS!</div>
                                    <button onClick={() => {processBet(amount, 'spectator'); setSimMatch(null)}} className="border border-[#e8e3d5] text-[#e8e3d5] px-6 py-2 text-xs font-bold uppercase hover:bg-[#e8e3d5] hover:text-black">Claim</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-12 font-mono text-sm">WAITING FOR SIGNAL...</div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

const MarketplaceView = () => {
    const { buyAsset, sellAsset, user } = useGame();
    return (
        <div className="max-w-6xl mx-auto">
             <h2 className="text-3xl font-black text-[#e8e3d5] mb-8 uppercase tracking-tighter">
                Asset Marketplace
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {MARKETPLACE.map((item) => {
                    const isOwned = user.inventory.some(i => i.name === item.name);
                    return (
                        <div key={item.id} className={`bg-[#0a0a0a] p-6 border ${isOwned ? 'border-green-500/50' : 'border-[#e8e3d5]/20'} hover:border-[#a9ddd3] transition-all flex flex-col group`}>
                        <div className="aspect-square bg-[#010101] mb-4 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-[#e8e3d5] font-bold truncate uppercase text-sm">{item.name}</h4>
                                <p className="text-gray-500 text-xs uppercase">{item.type}</p>
                            </div>
                        </div>
                        
                        {isOwned ? (
                            <div className="mt-auto flex gap-2">
                                <div className="w-full py-3 font-bold text-xs text-center uppercase tracking-widest border border-green-900 text-green-500 cursor-default bg-green-900/10">
                                    OWNED
                                </div>
                                <button 
                                    onClick={() => sellAsset(item)}
                                    className="px-3 py-3 font-bold text-xs uppercase border border-red-900 text-red-500 hover:bg-red-900/20 transition-colors">
                                    SELL
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => buyAsset(item)}
                                className="w-full py-3 font-bold text-xs mt-auto transition-colors uppercase tracking-widest border border-[#e8e3d5] text-[#010101] bg-[#e8e3d5] hover:bg-white">
                                BUY {item.price} CADE
                            </button>
                        )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const ProfilePage = () => {
    const { user, swapEthForCade } = useGame();
    const [depositAmount, setDepositAmount] = useState(100);
    
    if (!user.isConnected) return <div className="text-center text-gray-500 mt-20 font-mono">CONNECT WALLET TO VIEW PROFILE</div>;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="border border-[#e8e3d5] p-8 mb-8 flex items-center gap-6 bg-[#0a0a0a]">
                <div className="w-24 h-24 border-2 border-[#a9ddd3] p-1">
                    <div className="w-full h-full bg-[#010101] flex items-center justify-center">
                        <User size={40} className="text-[#e8e3d5]" />
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-black text-[#e8e3d5] uppercase tracking-tighter">Player_One</h2>
                    <div className="flex gap-4 mt-2 text-sm">
                        <span className="bg-[#010101] text-gray-400 px-3 py-1 border border-[#e8e3d5]/30 font-mono text-xs">
                            {user.address}
                        </span>
                        <span className="bg-[#010101] text-[#a9ddd3] px-3 py-1 border border-[#a9ddd3]/30 font-mono text-xs uppercase">
                            Level 5
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Wallet & Stats */}
                <div className="space-y-6">
                    
                    {/* NEW: Wallet Section */}
                    <div className="bg-[#0a0a0a] p-6 border border-[#e8e3d5]/20">
                        <h3 className="text-[#e8e3d5] text-xs font-bold uppercase mb-4 flex items-center gap-2 tracking-widest">
                            <Wallet size={14}/> Wallet
                        </h3>
                        <div className="mb-6">
                            <div className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Available Funds</div>
                            <div className="text-3xl font-mono text-[#a9ddd3]">{user.cadeBalance} <span className="text-xs text-gray-500">CADE</span></div>
                        </div>
                        
                        <div className="border-t border-[#e8e3d5]/10 pt-4">
                            <label className="text-gray-500 text-[10px] uppercase tracking-wider mb-2 block">Quick Deposit</label>
                            <div className="flex gap-2">
                                <input 
                                    type="number" 
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                                    className="w-full bg-[#010101] border border-[#e8e3d5]/30 p-2 text-[#e8e3d5] font-mono text-sm focus:border-[#a9ddd3] outline-none"
                                />
                                <button 
                                    onClick={() => swapEthForCade(depositAmount)}
                                    className="bg-[#a9ddd3] hover:bg-white text-[#010101] px-4 py-2 font-bold uppercase text-xs tracking-widest transition-colors">
                                    MINT
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-[#0a0a0a] p-6 border border-[#e8e3d5]/20">
                        <h3 className="text-[#e8e3d5] text-xs font-bold uppercase mb-4 flex items-center gap-2 tracking-widest"><Crown size={14}/> Career Stats</h3>
                        <div className="space-y-3 font-mono">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Matches</span>
                                <span className="text-[#e8e3d5]">{user.matchesPlayed}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Wins</span>
                                <span className="text-[#a9ddd3]">{user.wins}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Losses</span>
                                <span className="text-red-500">{user.losses}</span>
                            </div>
                            <div className="h-px bg-[#e8e3d5]/10 my-2"></div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Win Rate</span>
                                <span className="text-[#e8e3d5]">{user.matchesPlayed > 0 ? Math.round((user.wins/user.matchesPlayed)*100) : 0}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Inventory */}
                <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-[#e8e3d5] mb-4 uppercase tracking-tight">Inventory ({user.inventory.length})</h3>
                    {user.inventory.length > 0 ? (
                         <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                            {user.inventory.map((item, i) => (
                                <div key={i} className="bg-[#0a0a0a] p-4 border border-[#e8e3d5]/20 flex flex-col items-center text-center group hover:border-[#a9ddd3] transition-colors">
                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                                    <div className="text-xs font-bold text-[#e8e3d5] truncate w-full uppercase">{item.name}</div>
                                    <div className="text-[10px] text-gray-500 uppercase">{item.type}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-[#0a0a0a] border border-[#e8e3d5]/10 border-dashed p-12 text-center text-gray-500 font-mono text-sm">
                            NO ITEMS DETECTED.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const TopUpModal = () => {
    const { swapEthForCade } = useGame();
    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="bg-[#0a0a0a] border-2 border-[#e8e3d5] p-12 text-center">
                 <RotateCw className="mx-auto text-[#a9ddd3] mb-6 animate-spin-slow" size={64} />
                 <h2 className="text-3xl font-black text-[#e8e3d5] uppercase tracking-tighter mb-2">Acquire Liquidity</h2>
                 <p className="text-gray-500 mb-8 font-mono text-sm">Exchange Testnet ETH for CADE Tokens.</p>
                 
                 <div className="flex justify-between items-center border border-[#e8e3d5]/20 p-4 mb-8 bg-[#010101]">
                     <div className="text-left">
                         <div className="text-xs text-gray-500 uppercase tracking-widest">Input</div>
                         <div className="text-xl text-[#e8e3d5] font-mono">0.01 ETH</div>
                     </div>
                     <ArrowRight className="text-gray-600"/>
                     <div className="text-right">
                         <div className="text-xs text-gray-500 uppercase tracking-widest">Output</div>
                         <div className="text-xl text-[#a9ddd3] font-mono">500 CADE</div>
                     </div>
                 </div>

                 <button 
                    onClick={() => swapEthForCade(500)}
                    className="w-full bg-[#a9ddd3] text-[#010101] py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    Confirm Transaction
                 </button>
            </div>
        </div>
    )
}

// --- Main Layout ---

const MainLayout = () => {
    const { view, setView, activeGameId, launchGame } = useGame();
    const [filter, setFilter] = useState('ALL_GAMES');

    return (
        <div className="min-h-screen bg-[#010101] text-[#e8e3d5] font-sans selection:bg-[#a9ddd3] selection:text-[#010101]">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 py-8 pb-20">
                {view === VIEW.HOME && (
                    <>
                        <HeroSection />
                        <ControlCenter activeFilter={filter} setFilter={setFilter} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {GAMES.map(game => (
                                <GameCard key={game.id} game={game} onClick={() => launchGame(game.id, game.cost)} />
                            ))}
                        </div>
                        <ProtocolStats />
                    </>
                )}

                {view === VIEW.ARENA && (
                    <>
                        <h2 className="text-3xl font-black text-[#e8e3d5] mb-8 uppercase tracking-tighter">Game Arena</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {GAMES.map(game => (
                                <GameCard key={game.id} game={game} onClick={() => launchGame(game.id, game.cost)} />
                            ))}
                        </div>
                        <h2 className="text-3xl font-black text-[#e8e3d5] mb-8 uppercase tracking-tighter border-t border-[#e8e3d5]/10 pt-12">Indie Arcade (Free)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {FREE_GAMES.map(game => (
                                <FreeGameCard key={game.id} game={game} />
                            ))}
                        </div>
                        <HallOfFame />
                    </>
                )}

                {view === VIEW.GAME_ACTIVE && (
                    <div className="h-[600px] border border-[#e8e3d5]/20 bg-[#0a0a0a] p-1">
                        <div className="flex justify-between items-center p-4 bg-[#010101] border-b border-[#e8e3d5]/10 mb-1">
                            <span className="text-[#a9ddd3] font-mono text-sm uppercase">/// RUNNING PROTOCOL: {GAMES.find(g => g.id === activeGameId)?.name}</span>
                            <button onClick={() => setView(VIEW.HOME)} className="text-red-500 hover:text-red-400 uppercase text-xs font-bold tracking-widest flex items-center gap-2">Terminate <X size={14}/></button>
                        </div>
                        {activeGameId === 1 ? <CosmicDodger /> : 
                         activeGameId === 2 ? <SnakeGame /> :
                         activeGameId === 3 ? <BlockBuster /> :
                         activeGameId === 4 ? <TicTacToe /> :
                         activeGameId === 5 ? <LaneRunner /> :
                         activeGameId === 6 ? <BitMiner /> :
                         activeGameId === 7 ? <CryptoFlap /> :
                         activeGameId === 8 ? <HexSweeper /> :
                         activeGameId === 9 ? <VoidRunner /> :
                         activeGameId === 10 ? <NeuralLink /> :
                         <div className="h-full flex items-center justify-center text-gray-500 font-mono">MODULE NOT LOADED</div>}
                    </div>
                )}

                {view === VIEW.BETTING && <BettingHub />}
                {view === VIEW.MARKET && <MarketplaceView />}
                {view === VIEW.TOPUP && <TopUpModal />}
                {view === VIEW.PROFILE && <ProfilePage />}

            </main>
            
            <Ticker />
            <GameNotification />
        </div>
    )
}

export default function App() {
  return (
    <GameProvider>
      <MainLayout />
    </GameProvider>
  );
}