import React, { useState, useEffect } from 'react';

export default function AssemblyLineLanding() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none opacity-60">
        <div className="absolute w-64 h-64 rounded-full animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, #ff00ff 0%, transparent 70%)',
               top: '20%',
               left: '10%',
               animation: 'float 8s ease-in-out infinite',
               filter: 'blur(60px)'
             }} />
        <div className="absolute w-80 h-80 rounded-full animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)',
               top: '60%',
               right: '15%',
               animation: 'float 10s ease-in-out infinite 2s',
               filter: 'blur(80px)'
             }} />
        <div className="absolute w-72 h-72 rounded-full animate-pulse" 
             style={{ 
               background: 'radial-gradient(circle, #39ff14 0%, transparent 70%)',
               bottom: '10%',
               left: '50%',
               animation: 'float 12s ease-in-out infinite 4s',
               filter: 'blur(70px)'
             }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff; }
          50% { text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 50px #ff00ff; }
        }
        .neon-text {
          animation: glow 3s ease-in-out infinite;
        }
        .glitch-hover:hover {
          animation: glitch 0.3s infinite;
        }
        .glass-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0,255,255,0.3);
        }
      `}</style>

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-cyan-400/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black tracking-widest" style={{ color: '#00ffff', textShadow: '0 0 10px #00ffff' }}>
            ASSEMBLY <span style={{ color: '#ff00ff' }}>LINE</span>
          </div>
          <a 
            href="https://calendly.com/yosoycarlos48/30min?month=2025-11" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 font-black tracking-wider glitch-hover"
            style={{
              background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
              color: '#0a0a0a',
              border: '3px solid #ffffff',
              boxShadow: '0 0 20px #00ffff, inset 0 0 10px rgba(255,255,255,0.5)',
              textTransform: 'uppercase'
            }}>
            BOOK CALL
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 mb-8 glass-card" style={{ border: '1px solid #00ffff' }}>
              <span className="text-sm font-black tracking-widest" style={{ color: '#00ffff' }}>
                BEAUTY × SKINCARE × FASHION
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-wider uppercase neon-text"
                style={{ color: '#00ffff', letterSpacing: '4px' }}>
              HIGH-CONVERTING<br/>
              <span style={{ color: '#ff00ff' }}>VIDEO CONTENT</span>
            </h1>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-2xl md:text-4xl font-black leading-relaxed" style={{ color: '#ffffff' }}>
                WITHOUT{' '}
                <span className="line-through" style={{ color: '#ff0040' }}>5-FIGURE SHOOTS</span>{' '}
                OR{' '}
                <span className="line-through" style={{ color: '#ff0040' }}>6-WEEK DELAYS</span>
              </p>
            </div>

            <a 
              href="https://calendly.com/yosoycarlos48/30min?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-6 font-black text-2xl tracking-wider glitch-hover mb-12"
              style={{
                background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                color: '#0a0a0a',
                border: '3px solid #ffffff',
                boxShadow: '0 0 20px #00ffff, inset 0 0 10px rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
              BOOK 15-MIN CALL →
            </a>

            <p className="text-lg font-bold" style={{ color: '#7df9ff' }}>
              Done-for-you video systems for brands making{' '}
              <span style={{ color: '#ffff33' }}>$500K–$10M/year</span>
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-wider neon-text"
                style={{ color: '#00ffff' }}>
              SEE IT IN <span style={{ color: '#ff00ff' }}>ACTION</span>
            </h2>
            <p className="text-xl font-bold" style={{ color: '#7df9ff' }}>Real content. Real results.</p>
          </div>

          <div className="relative glass-card p-4" style={{ border: '2px solid #00ffff', boxShadow: '0 0 30px rgba(0,255,255,0.3)' }}>
            <div className="relative" style={{ paddingBottom: '177.78%' }}>
              <iframe
                src="https://www.youtube.com/embed/CslVgT8GIsg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 text-center uppercase tracking-wider"
              style={{ color: '#ff0040', textShadow: '0 0 20px #ff0040' }}>
            YOU'RE <span style={{ color: '#ffff33' }}>STUCK</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="p-8 glass-card glitch-hover" style={{ border: '1px solid #ff00ff' }}>
              <div className="text-6xl mb-6">💸</div>
              <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#ff00ff' }}>$5K–$20K</h3>
              <p className="text-lg font-bold" style={{ color: '#ffffff' }}>PER SHOOT</p>
            </div>
            
            <div className="p-8 glass-card glitch-hover" style={{ border: '1px solid #00ffff' }}>
              <div className="text-6xl mb-6">⏰</div>
              <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#00ffff' }}>4–6 WEEKS</h3>
              <p className="text-lg font-bold" style={{ color: '#ffffff' }}>FOR EDITS</p>
            </div>
            
            <div className="p-8 glass-card glitch-hover" style={{ border: '1px solid #39ff14' }}>
              <div className="text-6xl mb-6">📉</div>
              <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#39ff14' }}>5 / 30</h3>
              <p className="text-lg font-bold" style={{ color: '#ffffff' }}>VIDEOS NEEDED</p>
            </div>
          </div>

          <div className="glass-card p-10" style={{ border: '2px solid #ff0040', boxShadow: '0 0 30px rgba(255,0,64,0.3)' }}>
            <h3 className="text-4xl font-black mb-8 uppercase" style={{ color: '#ff0040' }}>THE REAL COST:</h3>
            <div className="space-y-6 text-xl font-bold">
              <div className="flex items-start gap-4">
                <span className="text-4xl" style={{ color: '#ff0040' }}>✗</span>
                <span style={{ color: '#ffffff' }}>MISSING TRENDS (content takes too long)</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-4xl" style={{ color: '#ff0040' }}>✗</span>
                <span style={{ color: '#ffffff' }}>DELAYING LAUNCHES (chasing freelancers)</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-4xl" style={{ color: '#ff0040' }}>✗</span>
                <span style={{ color: '#ffffff' }}>BURNING BUDGET (content that doesn't convert)</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://calendly.com/yosoycarlos48/30min?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 font-black text-xl tracking-wider uppercase glitch-hover"
              style={{
                background: 'linear-gradient(45deg, #ff0040, #ff00ff)',
                color: '#ffffff',
                border: '3px solid #ffffff',
                boxShadow: '0 0 30px #ff0040'
              }}>
              FIX THIS NOW →
            </a>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-wider neon-text"
                style={{ color: '#00ffff' }}>
              WE GET IT.
            </h2>
            <p className="text-2xl font-bold leading-relaxed mb-6" style={{ color: '#ffffff' }}>
              You're tired of <span style={{ color: '#ff00ff' }}>freelancers ghosting you</span> and{' '}
              <span style={{ color: '#ff00ff' }}>agencies overcharging you</span>.
            </p>
            <p className="text-2xl font-bold leading-relaxed" style={{ color: '#ffffff' }}>
              You're sick of being{' '}
              <span style={{ color: '#ffff33' }}>creative director AND project manager</span>.
            </p>
          </div>

          <div className="glass-card p-10 text-center" style={{ border: '2px solid #ff00ff', boxShadow: '0 0 30px rgba(255,0,255,0.3)' }}>
            <p className="text-2xl font-black mb-6 uppercase" style={{ color: '#7df9ff' }}>
              We built a lean video system for DTC brands—
            </p>
            <p className="text-4xl md:text-5xl font-black uppercase leading-tight"
               style={{ color: '#ff00ff', textShadow: '0 0 20px #ff00ff' }}>
              WHO NEED MORE CONTENT WITHOUT HIRING A FULL IN-HOUSE STUDIO
            </p>
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://calendly.com/yosoycarlos48/30min?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 font-black text-xl tracking-wider uppercase glitch-hover"
              style={{
                background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                color: '#0a0a0a',
                border: '3px solid #ffffff',
                boxShadow: '0 0 30px #00ffff'
              }}>
              SCHEDULE STRATEGY CALL
            </a>
          </div>
        </div>
      </section>

      {/* Plan Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 text-center uppercase tracking-wider neon-text"
              style={{ color: '#39ff14' }}>
            3 STEPS
          </h2>
          
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -left-4 top-6 w-16 h-16 flex items-center justify-center font-black text-3xl rounded-full"
                   style={{ 
                     background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                     border: '3px solid #ffffff',
                     boxShadow: '0 0 20px #00ffff'
                   }}>
                1
              </div>
              <div className="ml-20 p-8 glass-card glitch-hover" style={{ border: '1px solid #00ffff' }}>
                <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#00ffff' }}>BOOK A CALL</h3>
                <p className="text-xl font-bold" style={{ color: '#ffffff' }}>
                  We review your current content, bottlenecks, and launch calendar.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -left-4 top-6 w-16 h-16 flex items-center justify-center font-black text-3xl rounded-full"
                   style={{ 
                     background: 'linear-gradient(45deg, #ff00ff, #39ff14)',
                     border: '3px solid #ffffff',
                     boxShadow: '0 0 20px #ff00ff'
                   }}>
                2
              </div>
              <div className="ml-20 p-8 glass-card glitch-hover" style={{ border: '1px solid #ff00ff' }}>
                <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#ff00ff' }}>BUILD YOUR VIDEO SYSTEM</h3>
                <p className="text-xl font-bold" style={{ color: '#ffffff' }}>
                  You get a clear package: X videos/month, fixed cost, fixed turnaround.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -left-4 top-6 w-16 h-16 flex items-center justify-center font-black text-3xl rounded-full"
                   style={{ 
                     background: 'linear-gradient(45deg, #39ff14, #ffff33)',
                     border: '3px solid #ffffff',
                     boxShadow: '0 0 20px #39ff14',
                     color: '#0a0a0a'
                   }}>
                3
              </div>
              <div className="ml-20 p-8 glass-card glitch-hover" style={{ border: '1px solid #39ff14' }}>
                <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#39ff14' }}>LAUNCH & SCALE</h3>
                <p className="text-xl font-bold" style={{ color: '#ffffff' }}>
                  Zero content bottleneck. Enough creative to test without chasing freelancers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 text-center uppercase tracking-wider neon-text"
              style={{ color: '#ffff33' }}>
            WHAT YOU GET
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 glass-card glitch-hover" style={{ border: '2px solid #00ffff' }}>
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#00ffff' }}>PREDICTABLE COSTS</h3>
              <p className="text-xl font-bold" style={{ color: '#ffffff' }}>
                Stop spending $5K–$20K per shoot. Fixed monthly packages.
              </p>
            </div>

            <div className="p-8 glass-card glitch-hover" style={{ border: '2px solid #ff00ff' }}>
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#ff00ff' }}>30+ VIDEOS/MONTH</h3>
              <p className="text-xl font-bold" style={{ color: '#ffffff' }}>
                From 5 to 30+ videos. Test enough creative to find what converts.
              </p>
            </div>

            <div className="p-8 glass-card glitch-hover" style={{ border: '2px solid #39ff14' }}>
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#39ff14' }}>48-72H TURNAROUND</h3>
              <p className="text-xl font-bold" style={{ color: '#ffffff' }}>
                Never miss a trend. Get content while it's still relevant.
              </p>
            </div>

            <div className="p-8 glass-card glitch-hover" style={{ border: '2px solid #ffff33' }}>
              <div className="text-6xl mb-6">✓</div>
              <h3 className="text-3xl font-black mb-4 uppercase" style={{ color: '#ffff33' }}>NO GHOSTING</h3>
              <p className="text-xl font-bold" style={{ color: '#ffffff' }}>
                Consistent, on-brand content that shows up on time. Every time.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://calendly.com/yosoycarlos48/30min?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 font-black text-xl tracking-wider uppercase glitch-hover"
              style={{
                background: 'linear-gradient(45deg, #00ffff, #39ff14)',
                color: '#0a0a0a',
                border: '3px solid #ffffff',
                boxShadow: '0 0 30px #00ffff'
              }}>
              GET STARTED NOW →
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 text-center uppercase tracking-wider neon-text"
              style={{ color: '#ff00ff' }}>
            REAL RESULTS
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 glass-card text-center glitch-hover" style={{ border: '2px solid #00ffff', boxShadow: '0 0 30px rgba(0,255,255,0.3)' }}>
              <div className="text-7xl font-black mb-4 neon-text" style={{ color: '#00ffff' }}>
                5→22
              </div>
              <p className="text-xl font-black uppercase" style={{ color: '#ffffff' }}>VIDEOS/MONTH IN 30 DAYS</p>
            </div>

            <div className="p-10 glass-card text-center glitch-hover" style={{ border: '2px solid #ff00ff', boxShadow: '0 0 30px rgba(255,0,255,0.3)' }}>
              <div className="text-7xl font-black mb-4 neon-text" style={{ color: '#ff00ff' }}>
                40%
              </div>
              <p className="text-xl font-black uppercase" style={{ color: '#ffffff' }}>CUT IN PRODUCTION COSTS</p>
            </div>

            <div className="p-10 glass-card text-center glitch-hover" style={{ border: '2px solid #39ff14', boxShadow: '0 0 30px rgba(57,255,20,0.3)' }}>
              <div className="text-7xl font-black mb-4 neon-text" style={{ color: '#39ff14' }}>
                ZERO
              </div>
              <p className="text-xl font-black uppercase" style={{ color: '#ffffff' }}>LAUNCH DELAYS</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 text-center uppercase tracking-wider neon-text"
              style={{ color: '#00ffff' }}>
            FAQ
          </h2>
          
          <div className="space-y-6">
            {[
              { q: "What if we don't like the videos?", a: "Revisions included. We align on creative direction before shooting." },
              { q: "How fast do we get first drafts?", a: "48–72 hours for most edits. Built for speed without sacrificing quality." },
              { q: "Are we locked into a contract?", a: "No. Flexible monthly packages. Cancel anytime (but you won't want to)." },
              { q: "Do we need to appear on camera?", a: "Not at all. Product-focused, UGC-style, whatever fits your brand." }
            ].map((item, i) => (
              <div key={i} className="p-8 glass-card glitch-hover" style={{ border: '1px solid #7df9ff' }}>
                <h3 className="text-2xl font-black mb-4 uppercase" style={{ color: '#7df9ff' }}>{item.q}</h3>
                <p className="text-lg font-bold" style={{ color: '#ffffff' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass-card p-16" style={{ border: '3px solid #ff00ff', boxShadow: '0 0 50px rgba(255,0,255,0.5)' }}>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight uppercase tracking-wider"
                style={{ color: '#ff00ff', textShadow: '0 0 30px #ff00ff' }}>
              READY TO STOP LETTING{' '}
              <span style={{ color: '#ff0040' }}>CONTENT BOTTLENECKS</span>{' '}
              KILL YOUR GROWTH?
            </h2>
            <p className="text-2xl font-bold mb-12" style={{ color: '#7df9ff' }}>
              Book a 15-minute call. Build your video system.
            </p>
            <a 
              href="https://calendly.com/yosoycarlos48/30min?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-16 py-8 font-black text-2xl tracking-wider uppercase glitch-hover"
              style={{
                background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                color: '#0a0a0a',
                border: '3px solid #ffffff',
                boxShadow: '0 0 40px #ff00ff, inset 0 0 20px rgba(255,255,255,0.5)'
              }}>
              BOOK YOUR CALL NOW →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t glass-card relative" style={{ borderColor: '#00ffff' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-4xl font-black mb-4 tracking-widest neon-text" style={{ color: '#00ffff' }}>
            ASSEMBLY <span style={{ color: '#ff00ff' }}>LINE STUDIO</span>
          </div>
          <p className="text-lg font-bold" style={{ color: '#7df9ff' }}>
            High-converting video content for beauty, skincare & fashion brands
          </p>
        </div>
      </footer>
    </div>
  );
}