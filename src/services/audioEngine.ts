// Ambient Piano & Celestial Soundscape Web Audio Engine
// Generates warm, felt-piano chords in D major with dreamy reverb and gentle pentatonic arpeggios.
// 100% royalty-free, zero-network dependency, seamlessly infinite.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private intervalId: number | null = null;
  private chordIndex: number = 0;

  // D Major / B Minor Pentatonic Chords (Hz)
  // Peaceful, reflective, warm felt piano harmonies
  private chords = [
    // Dmaj9 (warm, hopeful)
    [146.83, 220.00, 369.99, 440.00, 554.37], 
    // Bm9 (tender, gentle)
    [123.47, 185.00, 293.66, 440.00, 554.37], 
    // Gmaj9 (open, dreamy)
    [98.00, 146.83, 246.94, 369.99, 440.00], 
    // Aadd9 / Asus4 (nostalgic, resolving)
    [110.00, 164.81, 220.00, 293.66, 329.63, 440.00]
  ];

  // Soft sparkle melodic notes
  private melodyNotes = [
    440.00, // A4
    493.88, // B4
    587.33, // D5
    659.25, // E5
    739.99, // F#5
    880.00  // A5
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

  // Play an authentic felt piano note using multiple harmonics & filtered envelope
  private playPianoNote(freq: number, startTime: number, duration: number = 3.5, velocity: number = 0.25) {
    if (!this.ctx || !this.masterGain) return;

    // Filter to emulate soft wooden felt hammer strike
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(350, startTime + duration);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    // Soft attack
    noteGain.gain.linearRampToValueAtTime(velocity, startTime + 0.04);
    // Exponential piano decay
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.4, startTime + 0.8);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Fundamental oscillator (warm sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Subtle 2nd harmonic (triangle for wooden warmth)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.2, startTime);

    // Gentle chorus detune
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 1.002, startTime);
    const osc3Gain = this.ctx.createGain();
    osc3Gain.gain.setValueAtTime(0.15, startTime);

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

  // Play next ambient progression chord + gentle arpeggios
  private playChordCycle() {
    if (!this.ctx || !this.isPlaying) return;

    const chord = this.chords[this.chordIndex];
    const now = this.ctx.currentTime;

    // Arpeggiate the chord softly across 1.5 seconds
    chord.forEach((freq, idx) => {
      const noteDelay = idx * 0.18 + (Math.random() * 0.05);
      const vel = 0.16 + (Math.random() * 0.05);
      this.playPianoNote(freq, now + noteDelay, 4.5, vel);
    });

    // Occasional high sparkle melody note
    if (Math.random() > 0.3) {
      const melodyFreq = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
      this.playPianoNote(melodyFreq, now + 1.2 + Math.random() * 0.8, 3.2, 0.12);
    }

    if (Math.random() > 0.5) {
      const melodyFreq2 = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
      this.playPianoNote(melodyFreq2, now + 2.4 + Math.random() * 0.6, 3.0, 0.10);
    }

    this.chordIndex = (this.chordIndex + 1) % this.chords.length;
  }

  // Start background playback
  public start() {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.playChordCycle();

    // Loop cycle every 4.2 seconds
    this.intervalId = window.setInterval(() => {
      this.playChordCycle();
    }, 4200);
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
      const chimeNotes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6

      chimeNotes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.0001, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.3);
      });
    } catch {
      // Graceful fallback if Web Audio is blocked
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
        gain.gain.linearRampToValueAtTime(0.09, now + i * 0.12 + 0.03);
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
