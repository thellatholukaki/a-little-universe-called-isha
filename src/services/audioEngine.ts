// Romantic Love Theme & Cinematic Ambient Web Audio Engine
// Generates soft romantic felt-piano chords, delicate acoustic guitar plucks,
// and warm ambient textures in A-Major & F#-Minor with subtle romantic arpeggios.
// 100% royalty-free, zero-network dependency, completely offline, seamlessly infinite.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private intervalId: number | null = null;
  private chordIndex: number = 0;

  // Romantic Love Theme Progression (Hz)
  // Tender, emotional, cinematic, warm without being dramatic or melancholic
  private romanticChords = [
    // 1. Aadd9 (warm, welcoming, luminous affection)
    { root: 110.00, notes: [220.00, 277.18, 329.63, 440.00, 493.88], guitar: [329.63, 440.00, 554.37] },
    // 2. F#m9 (tender, romantic, heartfelt)
    { root: 92.50, notes: [185.00, 220.00, 277.18, 329.63, 415.30], guitar: [277.18, 329.63, 415.30] },
    // 3. Dmaj7(add9) (expansive, gentle adoration, floating)
    { root: 73.42, notes: [146.83, 220.00, 277.18, 369.99, 440.00], guitar: [369.99, 440.00, 554.37] },
    // 4. E6/9 (sweet, hopeful resolution)
    { root: 82.41, notes: [164.81, 246.94, 329.63, 369.99, 440.00], guitar: [329.63, 369.99, 493.88] },
    // 5. C#m7 (intimate, thoughtful, reflective)
    { root: 69.30, notes: [138.59, 207.65, 277.18, 329.63, 392.00], guitar: [277.18, 329.63, 440.00] },
    // 6. Bm11 (soft, delicate emotional depth)
    { root: 61.74, notes: [123.47, 185.00, 246.94, 293.66, 369.99], guitar: [293.66, 369.99, 440.00] },
    // 7. Dmaj9 (warm blooming affirmation)
    { root: 73.42, notes: [146.83, 220.00, 277.18, 369.99, 554.37], guitar: [369.99, 440.00, 554.37] },
    // 8. Asus2 / A (peaceful, contented return)
    { root: 110.00, notes: [220.00, 329.63, 440.00, 493.88, 554.37], guitar: [329.63, 440.00, 659.25] },
  ];

  // Expressive romantic melodic phrases (A Major / Pentatonic)
  private romanticMelodyNotes = [
    440.00, // A4
    493.88, // B4
    554.37, // C#5
    659.25, // E5
    739.99, // F#5
    880.00, // A5
    987.77, // B5
    1108.73 // C#6
  ];

  constructor() {
    // Session persistence
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

  // Play an authentic felt piano note (wooden felt hammer lowpass + natural harmonics)
  private playPianoNote(freq: number, startTime: number, duration: number = 3.8, velocity: number = 0.22) {
    if (!this.ctx || !this.masterGain) return;

    // Filter to emulate soft wooden felt hammer strike
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1350, startTime);
    filter.frequency.exponentialRampToValueAtTime(320, startTime + duration);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    // Soft attack
    noteGain.gain.linearRampToValueAtTime(velocity, startTime + 0.045);
    // Exponential piano decay
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.45, startTime + 0.9);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Fundamental oscillator (warm sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Subtle 2nd harmonic (warm wooden body resonance)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.2, startTime);

    // Gentle chorus detune for lush romantic depth
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

  // Play gentle acoustic guitar fingerpicked note
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

  // Warm ambient pad swell under each chord
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

  // Play next romantic harmony cycle
  private playChordCycle() {
    if (!this.ctx || !this.isPlaying) return;

    const currentChord = this.romanticChords[this.chordIndex];
    const now = this.ctx.currentTime;

    // 1. Warm ambient bass pad root
    this.playWarmPad(currentChord.root, now, 4.5);

    // 2. Soft romantic felt-piano arpeggiation
    currentChord.notes.forEach((freq, idx) => {
      const noteDelay = idx * 0.22 + (Math.random() * 0.04);
      const vel = 0.17 + (Math.random() * 0.04);
      this.playPianoNote(freq, now + noteDelay, 4.2, vel);
    });

    // 3. Delicate acoustic guitar fingerpicking
    currentChord.guitar.forEach((freq, idx) => {
      const guitarDelay = 0.6 + idx * 0.35 + (Math.random() * 0.06);
      this.playGuitarPluck(freq, now + guitarDelay, 0.11);
    });

    // 4. Subtle tender romantic melodic run
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

  // Start background playback
  public start() {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.playChordCycle();

    // Loop cycle every 4.4 seconds for a slow, peaceful romantic cadence
    this.intervalId = window.setInterval(() => {
      this.playChordCycle();
    }, 4400);
  }

  // Pause playback
  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Toggle play/pause
  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  // Toggle mute
  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    sessionStorage.setItem('isha_bday_muted', String(this.isMuted));
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  // Set volume (0.0 to 1.0)
  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    sessionStorage.setItem('isha_bday_volume', String(this.volume));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  // Interactive Sound Effect: Celestial chime when unlocking a wish
  public playWishChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const chimeNotes = [554.37, 659.25, 880.00, 1108.73]; // C#5, E5, A5, C#6

      chimeNotes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.0001, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.07, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.3);
      });
    } catch {
      // Graceful fallback
    }
  }

  // Interactive Sound Effect: Soft envelope opening rustle & chime
  public playEnvelopeOpen() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const notes = [440.00, 554.37, 659.25, 880.00]; // A4, C#5, E5, A5

      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);

        gain.gain.setValueAtTime(0.0001, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.12 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 1.8);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 1.9);
      });
    } catch {
      // Graceful fallback
    }
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
