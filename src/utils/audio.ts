// Web Audio API generative dark ambient drone for N°8

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private listeners: Array<(playing: boolean) => void> = [];

  public get active(): boolean {
    return this.isPlaying;
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.push(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.isPlaying));
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      await this.start();
      return true;
    }
  }

  public async start(): Promise<void> {
    if (this.isPlaying) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioContextClass();
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, now + 3);
      this.masterGain.connect(this.ctx.destination);

      // Warm low-pass filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(220, now);
      this.filter.Q.setValueAtTime(3.5, now);
      this.filter.connect(this.masterGain);

      // Low frequency modulation (breathing effect)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.08, now); // ~12 sec cycle
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(80, now);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      // Deep root tone (55Hz - A1, sub-bass)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(55, now);
      const osc1Gain = this.ctx.createGain();
      osc1Gain.gain.setValueAtTime(0.7, now);
      this.osc1.connect(osc1Gain);
      osc1Gain.connect(this.filter);
      this.osc1.start();

      // Soft 5th harmonic (82.4Hz - E2)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(82.4, now);
      const osc2Gain = this.ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.25, now);
      this.osc2.connect(osc2Gain);
      osc2Gain.connect(this.filter);
      this.osc2.start();

      this.isPlaying = true;
      this.notify();
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop(): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) {
      this.isPlaying = false;
      this.notify();
      return;
    }

    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.lfo?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.lfo?.disconnect();
        } catch {
          // ignore
        }
        this.isPlaying = false;
        this.notify();
      }, 1300);
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
