// public/cardSwap.js
class CardSwap {
  constructor(container, options = {}) {
    this.container = container;
    this.width = options.width || 400;
    this.height = options.height || 300;
    this.cardDistance = options.cardDistance || 60;
    this.verticalDistance = options.verticalDistance || 70;
    this.delay = options.delay || 5000;
    this.pauseOnHover = options.pauseOnHover !== false;
    this.skewAmount = options.skewAmount || 6;
    this.easing = options.easing || 'elastic';
    
    this.config = this.easing === 'elastic' ? {
      ease: 'elastic.out(0.6,0.9)',
      durDrop: 2,
      durMove: 2,
      durReturn: 2,
      promoteOverlap: 0.9,
      returnDelay: 0.05
    } : {
      ease: 'power1.inOut',
      durDrop: 0.8,
      durMove: 0.8,
      durReturn: 0.8,
      promoteOverlap: 0.45,
      returnDelay: 0.2
    };

    this.refs = Array.from(this.container.children);
    this.order = this.refs.map((_, i) => i);
    this.tlRef = null;
    this.intervalRef = null;

    this.init();
  }

  makeSlot(i, distX, distY, total) {
    return {
      x: i * distX,
      y: -i * distY,
      z: -i * distX * 1.5,
      zIndex: total - i
    };
  }

  placeNow(el, slot, skew) {
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: skew,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true
    });
  }

  init() {
    this.container.style.position = 'relative';
    this.container.style.perspective = '1200px';
    
    // Create wrapper for the absolute centering
    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.inset = '0';
    wrapper.style.transformStyle = 'preserve-3d';
    wrapper.style.left = '50%';
    wrapper.style.top = '50%';
    
    this.refs.forEach((ref, index) => {
      ref.style.position = 'absolute';
      ref.style.top = '0';
      ref.style.left = '0';
      ref.style.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      ref.style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      ref.style.transformStyle = 'preserve-3d';
      ref.style.willChange = 'transform';
      ref.style.backfaceVisibility = 'hidden';
      ref.style.cursor = 'pointer';

      // Click to trigger next
      ref.addEventListener('click', () => {
        // Only swap if it's the front card (index 0 in order)
        if (this.order[0] === index) {
          this.swap();
          this.start(); // reset timer
        }
      });

      wrapper.appendChild(ref);
    });

    this.container.appendChild(wrapper);

    const total = this.refs.length;
    this.refs.forEach((r, i) => {
      this.placeNow(r, this.makeSlot(i, this.cardDistance, this.verticalDistance, total), this.skewAmount);
    });

    this.start();

    if (this.pauseOnHover) {
      this.container.addEventListener('mouseenter', () => this.pause());
      this.container.addEventListener('mouseleave', () => this.resume());
    }
  }

  swap() {
    if (this.order.length < 2) return;
    const [front, ...rest] = this.order;
    const elFront = this.refs[front];
    if (!elFront) return;

    if (this.tlRef && this.tlRef.isActive()) {
      this.tlRef.progress(1);
    }

    const tl = gsap.timeline();
    this.tlRef = tl;

    tl.to(elFront, {
      y: '+=500',
      duration: this.config.durDrop,
      ease: this.config.ease
    });

    tl.addLabel('promote', `-=${this.config.durDrop * this.config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = this.refs[idx];
      if (!el) return;
      const slot = this.makeSlot(i, this.cardDistance, this.verticalDistance, this.refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: this.config.durMove,
          ease: this.config.ease
        },
        `promote+=${i * 0.15}`
      );
    });

    const backSlot = this.makeSlot(this.refs.length - 1, this.cardDistance, this.verticalDistance, this.refs.length);
    tl.addLabel('return', `promote+=${this.config.durMove * this.config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      'return'
    );

    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: this.config.durReturn,
        ease: this.config.ease
      },
      'return'
    );

    tl.call(() => {
      this.order = [...rest, front];
    });
  }

  start() {
    if (this.intervalRef) clearInterval(this.intervalRef);
    this.intervalRef = setInterval(() => this.swap(), this.delay);
  }

  pause() {
    if (this.tlRef) this.tlRef.pause();
    if (this.intervalRef) clearInterval(this.intervalRef);
  }

  resume() {
    if (this.tlRef) this.tlRef.play();
    this.start();
  }
}
window.CardSwap = CardSwap;
