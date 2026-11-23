// Background Music & Interactive Audio Engine
// "Oohale" instrumental background score from Jaanu (2020) by Govind Vasantha
// Features automatic continuous playback, seamless looping across all scenes,
// browser autoplay restriction handling with first-interaction trigger,
// and zero play/pause UI controls as requested.

class AudioEngine {
  private bgAudio: HTMLAudioElement | null = null;
  private isInitialized: boolean = false;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.38; // Consistent, comfortable background volume
  private interactionListenersArmed: boolean = false;

  // Web Audio Context for concurrent interactive sound effects
  private sfxCtx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;

  // Fallback procedural ambient synth state (only if audio files are completely unavailable)
  private fallbackIntervalId: number | null = null;
  private fallbackChordIndex: number = 0;
  private useFallbackSynth: boolean = false;

  // Romantic Love Theme Progression for procedural fallback
  private romanticChords = [
    { root: 110.00, notes: [220.00, 277.18, 329.63, 440.00, 493.88], guitar: [329.63, 440.00, 554.37] }, // Aadd9
    { root: 92.50, notes: [185.00, 220.00, 277.18, 329.63, 415.30], guitar: [277.18, 329.63, 415.30] },  // F#m9
    { root: 73.42, notes: [146.83, 220.00, 277.18, 369.99, 440.00], guitar: [369.99, 440.00, 554.37] },  // Dmaj7
    { root: 82.41, notes: [164.81, 246.94, 329.63, 369.99, 440.00], guitar: [329.63, 369.99, 493.88] },  // E6/9
    { root: 69.30, notes: [138.59, 207.65, 277.18, 329.63, 392.00], guitar: [277.18, 329.63, 440.00] },  // C#m7
    { root: 61.74, notes: [123.47, 185.00, 246.94, 293.66, 369.99], guitar: [293.66, 369.99, 440.00] },  // Bm11
    { root: 73.42, notes: [146.83, 220.00, 277.18, 369.99, 554.37], guitar: [369.99, 440.00, 554.37] },  // Dmaj9
    { root: 110.00, notes: [220.00, 329.63, 440.00, 493.88, 554.37], guitar: [329.63, 440.00, 659.25] }, // Asus2
  ];

  constructor() {
    // Only initialize in browser environment
    if (typeof window !== 'undefined') {
      this.initBackgroundAudio();
      this.setupVisibilityListener();
    }
  }

  /**
   * Resolve public asset base path considering Vite base config and GitHub Pages subpaths.
   */
  private getAssetUrl(relativePath: string): string {
    const metaEnv = (import.meta as unknown as { env?: { BASE_URL?: string } }).env;
    const base = metaEnv?.BASE_URL || './';
    const cleanBase = base.endsWith('/') ? base : `${base}/`;
    const cleanRelative = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    return `${cleanBase}${cleanRelative}`;
  }

  /**
   * Initializes the single audio instance for continuous background music.
   * Guarantees only one audio element exists across the entire app lifecycle.
   */
  private initBackgroundAudio() {
    if (this.isInitialized || typeof document === 'undefined') return;
    this.isInitialized = true;

    try {
      const audio = document.createElement('audio');
      audio.preload = 'auto';
      audio.loop = true;
      audio.volume = this.volume;
      audio.muted = this.isMuted;
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');

      // Candidate sources in priority order:
      // Includes both user-supplied MP3 paths and local high-fidelity WebM/M4A instrumental audio.
      const candidateSources = [
        { src: this.getAssetUrl('audio/jaanu-oohale-instrumental.mp3'), type: 'audio/mpeg' },
        { src: this.getAssetUrl('audio/oohale-instrumental.mp3'), type: 'audio/mpeg' },
        { src: this.getAssetUrl('audio/jaanu-oohale-instrumental.webm'), type: 'audio/webm' },
        { src: this.getAssetUrl('audio/oohale-instrumental.webm'), type: 'audio/webm' },
        { src: this.getAssetUrl('audio/jaanu-oohale-instrumental.m4a'), type: 'audio/mp4' },
        { src: this.getAssetUrl('audio/oohale-instrumental.m4a'), type: 'audio/mp4' },
      ];

      candidateSources.forEach(({ src, type }) => {
        const sourceEl = document.createElement('source');
        sourceEl.src = src;
        sourceEl.type = type;
        audio.appendChild(sourceEl);
      });

      // Seamless looping guarantee:
      // Even if browser audio buffers drop loop flag, restart immediately on 'ended'
      audio.addEventListener('ended', () => {
        if (this.bgAudio && this.isPlaying) {
          this.bgAudio.currentTime = 0;
          const restartPromise = this.bgAudio.play();
          if (restartPromise) {
            restartPromise.catch(() => {
              // Graceful catch
            });
          }
        }
      });

      // Handle file loading errors gracefully
      audio.addEventListener('error', () => {
        // If external audio file fails to load, gracefully switch to procedural ambient synth
        if (!this.isPlaying) {
          this.useFallbackSynth = true;
          this.startFallbackSynth();
        }
      });

      this.bgAudio = audio;
    } catch {
      // In case DOM audio creation fails, fallback to procedural audio
      this.useFallbackSynth = true;
    }
  }

  /**
   * Listen for tab visibility changes so background audio resumes smoothly if paused by OS.
   */
  private setupVisibilityListener() {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isPlaying && this.bgAudio && this.bgAudio.paused) {
        this.bgAudio.play().catch(() => {
          // Handled gracefully
        });
      }
    });
  }

  /**
   * Sets up one-time user interaction listeners to satisfy browser autoplay policies.
   * If autoplay is blocked on initial launch, the user's first legitimate interaction
   * (tap, click, keydown) immediately starts the music without requiring any music UI.
   */
  private setupInteractionListeners() {
    if (this.interactionListenersArmed || typeof window === 'undefined') return;
    this.interactionListenersArmed = true;

    const userEvents = ['pointerdown', 'touchstart', 'click', 'keydown'];

    const handleFirstInteraction = () => {
      userEvents.forEach((event) => {
        window.removeEventListener(event, handleFirstInteraction, true);
        document.removeEventListener(event, handleFirstInteraction, true);
      });
      this.interactionListenersArmed = false;

      // Resume or play the background audio
      this.playAudioInstance();
    };

    userEvents.forEach((event) => {
      window.addEventListener(event, handleFirstInteraction, { capture: true, once: true, passive: true });
      document.addEventListener(event, handleFirstInteraction, { capture: true, once: true, passive: true });
    });
  }

  /**
   * Internal helper to start playing the HTML5 audio instance.
   */
  private playAudioInstance(): Promise<void> {
    if (!this.bgAudio) {
      this.initBackgroundAudio();
    }

    if (!this.bgAudio) {
      this.startFallbackSynth();
      return Promise.resolve();
    }

    const promise = this.bgAudio.play();
    if (promise !== undefined) {
      return promise
        .then(() => {
          this.isPlaying = true;
        })
        .catch(() => {
          // Autoplay blocked by browser policy: arm interaction listeners
          this.isPlaying = false;
          this.setupInteractionListeners();
        });
    }

    return Promise.resolve();
  }

  /**
   * Starts background music playback.
   * Called on initial page launch and continues seamlessly across all scenes.
   * Safe to call multiple times: will never restart music if it is already playing.
   */
  public start() {
    if (this.isPlaying) return;

    if (this.useFallbackSynth) {
      this.startFallbackSynth();
      return;
    }

    this.playAudioInstance().catch(() => {
      this.setupInteractionListeners();
    });
  }

  /**
   * Alias for start to maintain clear semantics.
   */
  public startBackgroundMusic() {
    this.start();
  }

  /**
   * Pauses playback if needed.
   */
  public pause() {
    this.isPlaying = false;
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    if (this.fallbackIntervalId !== null) {
      clearInterval(this.fallbackIntervalId);
      this.fallbackIntervalId = null;
    }
  }

  /**
   * Toggle playback state (legacy support).
   */
  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  /**
   * Sets music volume between 0 and 1.
   */
  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgAudio) {
      this.bgAudio.volume = this.volume;
    }
    if (this.sfxGain && this.sfxCtx) {
      this.sfxGain.gain.setValueAtTime(this.volume, this.sfxCtx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  // =========================================================================
  // Web Audio Context & Interactive Sound Effects (Candles, Gifts, Chocolates)
  // Plays smoothly on top of background music without restarting or interrupting it.
  // =========================================================================

  private initSfxContext() {
    if (!this.sfxCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.sfxCtx = new AudioCtx();
      this.sfxGain = this.sfxCtx.createGain();
      this.sfxGain.gain.setValueAtTime(this.volume, this.sfxCtx.currentTime);
      this.sfxGain.connect(this.sfxCtx.destination);
    }
    if (this.sfxCtx && this.sfxCtx.state === 'suspended') {
      this.sfxCtx.resume().catch(() => {});
    }
  }

  /**
   * Interactive Sound: Blowing out birthday candles (gentle breath puff + celestial chimes)
   */
  public playCandleBlow() {
    try {
      this.initSfxContext();
      if (!this.sfxCtx || !this.sfxGain) return;

      const now = this.sfxCtx.currentTime;

      // Soft breath / whoosh using lowpass-filtered white noise
      const bufferSize = this.sfxCtx.sampleRate * 0.8;
      const buffer = this.sfxCtx.createBuffer(1, bufferSize, this.sfxCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.sfxCtx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.sfxCtx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(450, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(150, now + 0.7);

      const noiseGain = this.sfxCtx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.12, now + 0.15);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      noise.start(now);
      noise.stop(now + 0.8);

      // Celestial sparkle chimes celebrating candle blow-out
      const sparkleNotes = [659.25, 739.99, 880.00, 1108.73, 1318.51];
      sparkleNotes.forEach((freq, idx) => {
        const osc = this.sfxCtx!.createOscillator();
        const gain = this.sfxCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.4 + idx * 0.09);

        gain.gain.setValueAtTime(0.0001, now + 0.4 + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.4 + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4 + idx * 0.09 + 1.2);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(now + 0.4 + idx * 0.09);
        osc.stop(now + 0.4 + idx * 0.09 + 1.3);
      });
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Interactive Sound: Opening a birthday gift box
   */
  public playGiftOpen() {
    try {
      this.initSfxContext();
      if (!this.sfxCtx || !this.sfxGain) return;

      const now = this.sfxCtx.currentTime;
      const notes = [554.37, 659.25, 880.00, 1108.73];

      notes.forEach((freq, i) => {
        const osc = this.sfxCtx!.createOscillator();
        const gain = this.sfxCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.0001, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.09, now + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 1.1);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 1.2);
      });
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Interactive Sound: Chocolate pick treat
   */
  public playChocolatePick() {
    try {
      this.initSfxContext();
      if (!this.sfxCtx || !this.sfxGain) return;

      const now = this.sfxCtx.currentTime;
      const notes = [659.25, 880.00];

      notes.forEach((freq, i) => {
        const osc = this.sfxCtx!.createOscillator();
        const gain = this.sfxCtx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.0001, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.06, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.9);
      });
    } catch {
      // Graceful fallback
    }
  }

  public playEnvelopeOpen() {
    this.playGiftOpen();
  }

  public playWishChime() {
    this.playGiftOpen();
  }

  /**
   * Interactive Sound: Realistic crisp wax seal crack and soft paper peel
   */
  public playWaxSealBreak() {
    try {
      this.initSfxContext();
      if (!this.sfxCtx || !this.sfxGain) return;

      const now = this.sfxCtx.currentTime;

      // 1. Crisp wax crack (filtered noise burst)
      const bufferSize = Math.floor(this.sfxCtx.sampleRate * 0.12);
      const buffer = this.sfxCtx.createBuffer(1, bufferSize, this.sfxCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.sfxCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.sfxCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(3, now);

      const noiseGain = this.sfxCtx.createGain();
      noiseGain.gain.setValueAtTime(0.14, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      noise.start(now);
      noise.stop(now + 0.13);

      // 2. Warm resonant parchment slide chime
      const osc = this.sfxCtx.createOscillator();
      const oscGain = this.sfxCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(329.63, now + 0.05); // E4
      osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.35); // C5

      oscGain.gain.setValueAtTime(0.0001, now + 0.05);
      oscGain.gain.linearRampToValueAtTime(0.08, now + 0.09);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(oscGain);
      oscGain.connect(this.sfxGain);

      osc.start(now + 0.05);
      osc.stop(now + 0.75);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Interactive Sound: Celestial constellation connect chime
   */
  public playConstellationChime() {
    try {
      this.initSfxContext();
      if (!this.sfxCtx || !this.sfxGain) return;

      const now = this.sfxCtx.currentTime;
      // Dreamy pentatonic upward sparkle
      const notes = [440.00, 554.37, 659.25, 880.00, 1108.73, 1318.51, 1760.00];

      notes.forEach((freq, i) => {
        const osc = this.sfxCtx!.createOscillator();
        const gain = this.sfxCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.0001, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.4);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.5);
      });
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Interactive Sound: Ring reveal golden bell chime
   */
  public playRingRevealChime() {
    try {
      this.initSfxContext();
      if (!this.sfxCtx || !this.sfxGain) return;

      const now = this.sfxCtx.currentTime;
      // Deep warm chord + crystalline ring resonance
      const chord = [277.18, 415.30, 554.37, 830.61, 1108.73];

      chord.forEach((freq, idx) => {
        const osc = this.sfxCtx!.createOscillator();
        const gain = this.sfxCtx!.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.04 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 2.2);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 2.4);
      });
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Interactive Sound: Full romantic "Yes" proposal celebration chime cascade
   */
  public playProposalYesCelebration() {
    try {
      this.initSfxContext();
      if (!this.sfxCtx || !this.sfxGain) return;

      const now = this.sfxCtx.currentTime;
      // Majestic ascending fanfare arpeggios
      const notes = [
        329.63, 440.00, 554.37, 659.25, 880.00, 1108.73, 1318.51, 1760.00,
        1318.51, 1760.00, 2217.46
      ];

      notes.forEach((freq, i) => {
        const osc = this.sfxCtx!.createOscillator();
        const gain = this.sfxCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);

        gain.gain.setValueAtTime(0.0001, now + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.09 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 2.0);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 2.2);
      });
    } catch {
      // Graceful fallback
    }
  }

  // =========================================================================
  // Procedural Web Audio Synth Fallback
  // Only engaged if audio files are completely inaccessible or blocked.
  // =========================================================================

  private startFallbackSynth() {
    this.initSfxContext();
    if (!this.sfxCtx || this.isPlaying) return;

    this.isPlaying = true;
    this.playFallbackChordCycle();

    this.fallbackIntervalId = window.setInterval(() => {
      this.playFallbackChordCycle();
    }, 4400);
  }

  private playFallbackChordCycle() {
    if (!this.sfxCtx || !this.isPlaying || !this.sfxGain) return;

    const currentChord = this.romanticChords[this.fallbackChordIndex];
    const now = this.sfxCtx.currentTime;

    currentChord.notes.forEach((freq, idx) => {
      const osc = this.sfxCtx!.createOscillator();
      const gain = this.sfxCtx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.2 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(now + idx * 0.2);
      osc.stop(now + 4.0);
    });

    this.fallbackChordIndex = (this.fallbackChordIndex + 1) % this.romanticChords.length;
  }
}

export const audioEngine = new AudioEngine();
