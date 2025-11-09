// ============================================
// SOUND EFFECTS MANAGER
// ============================================

class SoundManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.5;
  }

  // ============================================
  // PLAY SOUND (Using Web Audio API)
  // ============================================

  playSound(frequency, duration, type = 'sine') {
    if (!this.enabled) return;

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(this.volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Sound failed:', error);
    }
  }

  // ============================================
  // SPECIFIC SOUND EFFECTS
  // ============================================

  click() {
    this.playSound(800, 0.1, 'square');
  }

  select() {
    this.playSound(600, 0.15, 'sine');
  }

  move() {
    this.playSound(400, 0.2, 'triangle');
  }

  attack() {
    // Explosion-like sound
    this.playSound(100, 0.3, 'sawtooth');
    setTimeout(() => this.playSound(150, 0.2, 'square'), 50);
  }

  hit() {
    this.playSound(200, 0.15, 'square');
  }

  dodge() {
    this.playSound(1200, 0.1, 'sine');
    setTimeout(() => this.playSound(1400, 0.1, 'sine'), 100);
  }

  victory() {
    this.playSound(523, 0.2, 'sine'); // C
    setTimeout(() => this.playSound(659, 0.2, 'sine'), 200); // E
    setTimeout(() => this.playSound(784, 0.3, 'sine'), 400); // G
  }

  defeat() {
    this.playSound(400, 0.3, 'sawtooth');
    setTimeout(() => this.playSound(300, 0.3, 'sawtooth'), 200);
    setTimeout(() => this.playSound(200, 0.5, 'sawtooth'), 400);
  }

  turnStart() {
    this.playSound(500, 0.1, 'sine');
    setTimeout(() => this.playSound(700, 0.15, 'sine'), 100);
  }

  // ============================================
  // SETTINGS
  // ============================================

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Export individual functions for convenience
export const playClick = () => soundManager.click();
export const playSelect = () => soundManager.select();
export const playMove = () => soundManager.move();
export const playAttack = () => soundManager.attack();
export const playHit = () => soundManager.hit();
export const playDodge = () => soundManager.dodge();
export const playVictory = () => soundManager.victory();
export const playDefeat = () => soundManager.defeat();
export const playTurnStart = () => soundManager.turnStart();