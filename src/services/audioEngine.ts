// Romantic Love Theme & Interactive Sound Effects Engine
// Web Audio API: Felt piano, acoustic guitar, warm pads, and responsive sound effects.
// 100% royalty-free, zero-network dependency, completely offline.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private intervalId: number | null = null;
  private chordIndex: number = 0;

  // Romantic Love Theme Progression (Hz)
  private romanticChords = [
    { root: 110.00, notes: [220.00, 277.18, 329.63, 440.00, 493.88], guitar: [329.63, 440.00, 554.37] }, // Aadd9
    { root: 92.50, notes: [185.00, 220.00, 277.18, 329.63, 415.30], guitar: [277.18, 329.63, 415.30] },  // F#m9
    { root: 73.42, notes: [146.83, 220.00, 277.18, 369.99, 440.00], guitar: [369.99, 440.00, 554.37] },  // Dmaj7(add9)
    { root: 82.41, notes: [164.81, 246.94, 329.63, 369.99, 440.00], guitar: [329.63, 369.99, 493.88] },  // E6/9
    { root: 69.30, notes: [138.59, 207.65, 277.18, 329.63, 392.00], guitar: [277.18, 329.63, 440.00] },  // C#m7
    { root: 61.74, notes: [123.47, 185.00, 246.94, 293.66, 369.99], guitar: [293.66, 369.99, 440.00] },  // Bm11
    { root: 73.42, notes: [146.83, 220.00, 277.18, 369.99, 554.37], guitar: [369.99, 440.00, 554.37] },  // Dmaj9
    { root: 110.00, notes: [220.00, 329.63, 440.00, 493.88, 554.37], guitar: [329.63, 440.00, 659.25] }, // Asus2
  ];

  private romanticMelodyNotes = [440.00, 493.88, 554.37, 659.25, 739.99, 880.00, 987.77, 1108.73];

  constructor() {
    const savedMuted = sessionStorage.getItem('isha_bday_muted');
    if (savedMuted !== null) {
      this.isMuted = savedMuted === 'true';
    }
    const savedVol = sessionStorage.getItem('isha_bday_volume');
    if (savedVol !== null) {
      this.volume = parseFloat(savedVol);
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playPianoNote(freq: number, startTime: number, duration: number = 3.8, velocity: number = 0.22) {
    if (!this.ctx || !this.masterGain) return;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1350, startTime);
    filter.frequency.exponentialRampToValueAtTime(320, startTime + duration);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(velocity, startTime + 0.045);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.45, startTime + 0.9);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.2, startTime);

    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 1.0025, startTime);
    const osc3Gain = this.ctx.createGain();
    osc3Gain.gain.setValueAtTime(0.12, startTime);

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    osc3.connect(osc3Gain);
    osc3Gain.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc3.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
    osc3.stop(startTime + duration);
  }

  private playGuitarPluck(freq: number, startTime: number, velocity: number = 0.14) {
    if (!this.ctx || !this.masterGain) return;

    const pluckFilter = this.ctx.createBiquadFilter();
    pluckFilter.type = 'bandpass';
    pluckFilter.frequency.setValueAtTime(freq * 1.8, startTime);
    pluckFilter.Q.setValueAtTime(2.5, startTime);

    const pluckGain = this.ctx.createGain();
    pluckGain.gain.setValueAtTime(0.0001, startTime);
    pluckGain.gain.linearRampToValueAtTime(velocity, startTime + 0.015);
    pluckGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.4);

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    osc.connect(pluckFilter);
    pluckFilter.connect(pluckGain);
    pluckGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 2.5);
  }

  private playWarmPad(freq: number, startTime: number, duration: number = 4.5) {
    if (!this.ctx || !this.masterGain) return;

    const padFilter = this.ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(320, startTime);
    padFilter.frequency.linearRampToValueAtTime(450, startTime + duration * 0.5);
    padFilter.frequency.linearRampToValueAtTime(260, startTime + duration);

    const padGain = this.ctx.createGain();
    padGain.gain.setValueAtTime(0.0001, startTime);
    padGain.gain.linearRampToValueAtTime(0.08, startTime + 1.2);
    padGain.gain.linearRampToValueAtTime(0.0001, startTime + duration);

    const padOsc = this.ctx.createOscillator();
    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(freq, startTime);

    padOsc.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(this.masterGain);

    padOsc.start(startTime);
    padOsc.stop(startTime + duration);
  }

  private playChordCycle() {
    if (!this.ctx || !this.isPlaying) return;

    const currentChord = this.romanticChords[this.chordIndex];
    const now = this.ctx.currentTime;

    this.playWarmPad(currentChord.root, now, 4.5);

    currentChord.notes.forEach((freq, idx) => {
      const noteDelay = idx * 0.22 + (Math.random() * 0.04);
      const vel = 0.17 + (Math.random() * 0.04);
      this.playPianoNote(freq, now + noteDelay, 4.2, vel);
    });

    currentChord.guitar.forEach((freq, idx) => {
      const guitarDelay = 0.6 + idx * 0.35 + (Math.random() * 0.06);
      this.playGuitarPluck(freq, now + guitarDelay, 0.11);
    });

    if (Math.random() > 0.25) {
      const melodyFreq = this.romanticMelodyNotes[Math.floor(Math.random() * this.romanticMelodyNotes.length)];
      this.playPianoNote(melodyFreq, now + 1.6 + Math.random() * 0.6, 3.2, 0.11);
    }

    if (Math.random() > 0.45) {
      const melodyFreq2 = this.romanticMelodyNotes[Math.floor(Math.random() * this.romanticMelodyNotes.length)];
      this.playPianoNote(melodyFreq2, now + 2.7 + Math.random() * 0.5, 3.0, 0.09);
    }

    this.chordIndex = (this.chordIndex + 1) % this.romanticChords.length;
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.playChordCycle();

    this.intervalId = window.setInterval(() => {
      this.playChordCycle();
    }, 4400);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    sessionStorage.setItem('isha_bday_muted', String(this.isMuted));
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    sessionStorage.setItem('isha_bday_volume', String(this.volume));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  // Interactive Sound: Blowing out candles (gentle breath puff + starlight sparkle)
  public playCandleBlow() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;

      // Soft breath / whoosh using lowpass-filtered noise
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(450, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(150, now + 0.7);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.8);

      // Celestial chime celebration right after the candles go out
      const sparkleNotes = [659.25, 739.99, 880.00, 1108.73, 1318.51]; // E5, F#5, A5, C#6, E6
      sparkleNotes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.4 + idx * 0.09);

        gain.gain.setValueAtTime(0.0001, now + 0.4 + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.4 + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4 + idx * 0.09 + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + 0.4 + idx * 0.09);
        osc.stop(now + 0.4 + idx * 0.09 + 1.3);
      });
    } catch {
      // Graceful fallback
    }
  }

  // Interactive Sound: Opening a gift box
  public playGiftOpen() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const notes = [554.37, 659.25, 880.00, 1108.73]; // C#5, E5, A5, C#6

      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.0001, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.09, now + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 1.1);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 1.2);
      });
    } catch {
      // Graceful fallback
    }
  }

  // Interactive Sound: Chocolate pick treat
  public playChocolatePick() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const notes = [659.25, 880.00];

      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.0001, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.06, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.9);
      });
    } catch {
      // Graceful fallback
    }
  }

  // Legacy aliases for full backward compatibility
  public playEnvelopeOpen() {
    this.playGiftOpen();
  }

  public playWishChime() {
    this.playGiftOpen();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const audioEngine = new AudioEngine();
