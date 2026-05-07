import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Activity, Heart, Zap } from 'lucide-react';
import { OrnateFrame, OrnateDivider } from '../app/components/OrnateFrame';
import { GoldButton } from '../app/components/GoldButton';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
} from 'recharts';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const MAX_HISTORY_LENGTH = 20;
const POLL_INTERVAL = 3000;

function Dashboard() {
  const counterRef = useRef(0);
  const [vfc, setVfc] = useState(58);
  const [bpm, setBpm] = useState(74);
  const [eda, setEda] = useState(0.15);
  const [mode, setMode] = useState('auto');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const addPoint = (v, b, e) => {
      const id = counterRef.current++;
      const time = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setHistory((prev) => [
        ...prev.slice(-(MAX_HISTORY_LENGTH - 1)),
        { id, time, vfc: v, bpm: b, eda: Number((e * 100).toFixed(1)) },
      ]);
    };

    let currentVfc = 58;
    let currentBpm = 74;
    let currentEda = 0.15;
    addPoint(currentVfc, currentBpm, currentEda);

    const interval = setInterval(() => {
      currentVfc = Math.max(20, Math.min(120, currentVfc + getRandom(-4, 3)));
      currentBpm = Math.max(45, Math.min(140, currentBpm + getRandom(-3, 3)));
      currentEda = Math.max(
        0.05,
        Math.min(0.4, Number((currentEda + (Math.random() - 0.5) * 0.02).toFixed(3)))
      );
      setVfc(currentVfc);
      setBpm(currentBpm);
      setEda(currentEda);
      addPoint(currentVfc, currentBpm, currentEda);
    }, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const profile = useMemo(() => {
    if (vfc < 45 || eda > 0.28)
      return {
        state: 'Estresse Alto',
        desc: 'Neuro-Sync ativa Equilibre Zen (Matcha & Sandalo) — dosagem 70%',
        aura: 'Equilibre Zen (Amadeirado Terroso)',
        color: '#8b2020',
        glow: 'rgba(180,60,30,0.15)',
      };
    if (bpm > 110 || eda > 0.22)
      return {
        state: 'Alerta & Energia',
        desc: 'Sugestão: Energie Verte (Pitanga & Chá Branco) para foco produtivo',
        aura: 'Energie Verte (Cítrico Vibrante)',
        color: 'var(--color-gold)',
        glow: 'rgba(196,162,78,0.1)',
      };
    return {
      state: 'Equilibrado',
      desc: 'Uso ideal. Layering Digital disponível para potencializar ritual',
      aura: "Jasmin d'Eveil (Floral Verde Solar)",
      color: '#2d6a4f',
      glow: 'rgba(45,106,79,0.1)',
    };
  }, [bpm, eda, vfc]);

  const news = useMemo(
    () => [
      `VFC ${vfc} — Resiliencia autonoma: ${Math.max(0, Math.round(((vfc - 30) / 90) * 100))}%`,
      `BPM ${bpm} — Bloom mecanico Nitinol ajustando difusao ceramica`,
      `EDA ${eda.toFixed(3)} — Dosagem sugerida: ${Math.round(eda * 220)}% (ceramica microporosa)`,
    ],
    [vfc, bpm, eda]
  );

  const barData = [
    { name: 'VFC', value: Math.min(100, (vfc / 120) * 100), fill: '#c4a24e' },
    { name: 'BPM', value: Math.min(100, (bpm / 150) * 100), fill: '#8b6914' },
    { name: 'EDA', value: Math.min(100, (eda / 0.4) * 100), fill: '#d4b060' },
  ];

  const stateColors = {
    'Estresse Alto': '#e85450',
    'Alerta & Energia': '#f4b860',
    Equilibrado: '#4ade80',
  };

  const timeFormatter = (id) => {
    const p = history.find((h) => h.id === id);
    return p ? p.time : '';
  };

  return (
    <>
      <article
        style={{
          maxWidth: '1120px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <OrnateFrame glow>
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <h1
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: 'var(--color-gold)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontSize: '1.1rem',
                }}
              >
                Painel Biometrico
              </h1>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  color: 'rgba(212, 196, 160, 0.7)',
                  fontSize: '0.95rem',
                }}
              >
                Monitoramento neuro-olfativo em tempo real — Hidden Bloom
              </p>
            </div>
          </OrnateFrame>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {[
            {
              icon: Activity,
              label: 'VFC',
              value: `${vfc} ms`,
              sub: 'Variabilidade Cardiaca',
              color: 'var(--color-gold)',
            },
            {
              icon: Heart,
              label: 'BPM',
              value: `${bpm}`,
              sub: 'Batimentos / min',
              color: '#e05050',
            },
            {
              icon: Zap,
              label: 'EDA',
              value: `${eda.toFixed(3)} µS`,
              sub: 'Atividade Eletrodermica',
              color: '#50a0e0',
            },
          ].map((card) => (
            <OrnateFrame key={card.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <card.icon size={20} style={{ color: card.color, opacity: 0.7 }} />
                <div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: card.color,
                    }}
                  >
                    {card.label}
                  </div>
                  <div
                    style={{
                      color: 'var(--color-parchment)',
                      fontSize: '1.3rem',
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {card.value}
                  </div>
                  <div style={{ color: 'rgba(212, 196, 160, 0.4)', fontSize: '0.7rem' }}>
                    {card.sub}
                  </div>
                </div>
              </div>
            </OrnateFrame>
          ))}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <OrnateFrame glow>
            <div
              style={{
                textAlign: 'center',
                background: profile.glow,
                borderRadius: '4px',
                padding: '1rem',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(212, 196, 160, 0.4)',
                }}
              >
                Estado Neuro-Olfativo
              </div>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.2rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: stateColors[profile.state],
                  margin: '0.5rem 0',
                }}
              >
                {profile.state}
              </div>
              <div
                style={{
                  color: 'rgba(212, 196, 160, 0.6)',
                  fontSize: '0.8rem',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                }}
              >
                {profile.desc}
              </div>
              <div
                style={{
                  color: 'var(--color-gold)',
                  fontSize: '0.7rem',
                  opacity: 0.5,
                  marginTop: '0.5rem',
                }}
              >
                Aura: {profile.aura}
              </div>
            </div>
          </OrnateFrame>
        </div>

        <div
          style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}
        >
          {['auto', 'manual'].map((m) => (
            <GoldButton
              key={m}
              variant={mode === m ? 'primary' : 'ghost'}
              onClick={() => setMode(m)}
            >
              {m === 'auto' ? 'Modo Automatico' : 'Modo Manual'}
            </GoldButton>
          ))}
        </div>

        <OrnateDivider />

        <div style={{ marginBottom: '2rem' }}>
          <OrnateFrame glow>
            <h2
              style={{
                fontFamily: "'Cinzel', serif",
                color: 'rgba(196, 162, 78, 0.8)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                textAlign: 'center',
                marginBottom: '1.5rem',
              }}
            >
              Monitoramento em Tempo Real
            </h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ width: '12px', height: '1px', background: 'var(--color-gold)' }} />
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      color: 'rgba(196, 162, 78, 0.6)',
                      textTransform: 'uppercase',
                    }}
                  >
                    VFC — Variabilidade da Frequencia Cardiaca
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      color: 'var(--color-gold)',
                      fontSize: '0.85rem',
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {vfc} ms
                  </span>
                </div>
                <div style={{ height: '112px', minHeight: '112px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={100}>
                    <AreaChart data={history} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gVfc1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-gold)" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="var(--color-gold)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,162,78,0.06)" />
                      <XAxis
                        dataKey="id"
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={timeFormatter}
                      />
                      <YAxis
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[20, 130]}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#0e0c08',
                          border: '1px solid rgba(196,162,78,0.3)',
                          borderRadius: 4,
                          fontSize: 12,
                          color: 'var(--foreground)',
                        }}
                        labelFormatter={(id) => timeFormatter(id)}
                      />
                      <Area
                        type="monotone"
                        dataKey="vfc"
                        stroke="var(--color-gold)"
                        fill="url(#gVfc1)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ width: '12px', height: '1px', background: '#e05050' }} />
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      color: 'rgba(224, 80, 80, 0.6)',
                      textTransform: 'uppercase',
                    }}
                  >
                    BPM — Batimentos por Minuto
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      color: '#e05050',
                      fontSize: '0.85rem',
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {bpm}
                  </span>
                </div>
                <div style={{ height: '112px', minHeight: '112px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={100}>
                    <AreaChart data={history} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gBpm1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#e05050" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#e05050" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,162,78,0.06)" />
                      <XAxis
                        dataKey="id"
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={timeFormatter}
                      />
                      <YAxis
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[40, 150]}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#0e0c08',
                          border: '1px solid rgba(196,162,78,0.3)',
                          borderRadius: 4,
                          fontSize: 12,
                          color: 'var(--foreground)',
                        }}
                        labelFormatter={(id) => timeFormatter(id)}
                      />
                      <Area
                        type="monotone"
                        dataKey="bpm"
                        stroke="#e05050"
                        fill="url(#gBpm1)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ width: '12px', height: '1px', background: '#50a0e0' }} />
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      color: 'rgba(80, 160, 224, 0.6)',
                      textTransform: 'uppercase',
                    }}
                  >
                    EDA — Atividade Eletrodermica
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      color: '#50a0e0',
                      fontSize: '0.85rem',
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    {eda.toFixed(3)} µS
                  </span>
                </div>
                <div style={{ height: '112px', minHeight: '112px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={100}>
                    <AreaChart data={history} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gEda1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#50a0e0" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#50a0e0" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,162,78,0.06)" />
                      <XAxis
                        dataKey="id"
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={timeFormatter}
                      />
                      <YAxis
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, 40]}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#0e0c08',
                          border: '1px solid rgba(196,162,78,0.3)',
                          borderRadius: 4,
                          fontSize: 12,
                          color: 'var(--foreground)',
                        }}
                        labelFormatter={(id) => timeFormatter(id)}
                        formatter={(value) => [`${(value / 100).toFixed(3)} µS`, 'EDA']}
                      />
                      <Area
                        type="monotone"
                        dataKey="eda"
                        stroke="#50a0e0"
                        fill="url(#gEda1)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {[
                { c: 'var(--color-gold)', l: 'VFC' },
                { c: '#e05050', l: 'BPM' },
                { c: '#50a0e0', l: 'EDA' },
              ].map((x) => (
                <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '12px', height: '1px', background: x.c }} />
                  <span style={{ color: 'rgba(212, 196, 160, 0.6)' }}>{x.l}</span>
                </div>
              ))}
            </div>
          </OrnateFrame>
        </div>

        <OrnateDivider />

        <div style={{ marginBottom: '2rem' }}>
          <OrnateFrame>
            <h2
              style={{
                fontFamily: "'Cinzel', serif",
                color: 'rgba(196, 162, 78, 0.8)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                textAlign: 'center',
                marginBottom: '1rem',
              }}
            >
              Indicadores Normalizados
            </h2>
            <div style={{ height: '192px', minHeight: '192px' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={100}>
                <BarChart data={barData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,162,78,0.06)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontFamily: 'Cinzel' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#0e0c08',
                      border: '1px solid rgba(196,162,78,0.3)',
                      borderRadius: 4,
                      fontSize: 12,
                      color: 'var(--foreground)',
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {barData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </OrnateFrame>
        </div>

        <OrnateDivider />

        <OrnateFrame>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              color: 'rgba(196, 162, 78, 0.8)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              textAlign: 'center',
              marginBottom: '0.75rem',
            }}
          >
            Telemetria Neuro-Sync
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {news.map((n, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  color: 'rgba(212, 196, 160, 0.5)',
                  fontSize: '0.75rem',
                }}
              >
                <span
                  style={{ color: 'rgba(196, 162, 78, 0.4)', marginTop: '0.125rem', flexShrink: 0 }}
                >
                  ◇
                </span>
                <span style={{ fontFamily: 'Raleway, sans-serif' }}>{n}</span>
              </div>
            ))}
          </div>
        </OrnateFrame>
      </article>
    </>
  );
}

export default Dashboard;
// Force recompile
