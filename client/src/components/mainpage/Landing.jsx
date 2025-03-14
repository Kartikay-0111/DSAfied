import React, { useState, useEffect } from 'react';
import { Aperture } from 'lucide-react';
import FAQ from './Faq';
import Testimonials from './Review';
const Landing = () => {

  const [transformStyle, setTransformStyle] = useState(
    'perspective(1200px) scaleX(0.8) scaleY(0.8) rotateX(28deg)'
  );
  const [activeTab, setActiveTab] = useState(1);
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('#landing-image');
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          // Calculate progress as the section enters the viewport
          const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));

          // Update transform properties based on scroll progress
          const perspective = 1200;
          const translateY = 20 * (1 - progress);
          const scaleX = 0.8 + 0.2 * progress;
          const scaleY = 0.8 + 0.2 * progress;
          const rotateX = 28 * (1 - progress);

          setTransformStyle(
            `perspective(${perspective}px) translateY(${translateY}px) scaleX(${scaleX}) scaleY(${scaleY}) rotateX(${rotateX}deg)`
          );
        } else if (rect.top > windowHeight) {
          // Reset style if out of viewport
          setTransformStyle('perspective(1200px) scaleX(0.8) scaleY(0.8) rotateX(28deg)');
        } else if (rect.bottom < 0) {
          // Final style when completely in view
          setTransformStyle('perspective(1200px) scaleX(1) scaleY(1) rotateX(0deg)');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="flex min-h-screen flex-col" >
      {/* <header className="sticky top-0 z-50">
        <Navbar />
      </header> */}

      <main className='flex-1'>
        <section className='relative py-16 pt-28 sm:pb-16 bg-gradient-to-b from-black from-20% via-indigo-900 to-black' >
          <div className='container relative z-20 flex flex-col items-center gap-8 sm:gap-10'>
            <h1 className='text-5xl text-center sm:text-6xl w-full sm:w-3/5'>🚀 DSAfied – Master DSA with Discipline & Consistency!</h1>
            <p className='max-w-[33rem] text-center text-lg text-[#d4d8dd] sm:text-xl'>Crack coding interviews with personalized DSA roadmaps, adaptive learning, and an active community.</p>
            <a
              className="inline-flex items-center justify-center gap-2 btn btn-accent btn-primary"
              href="/login"
            >
              Get Started
            </a>
          </div>
          <div className='w-full'>
            <img src='./journey.svg' className='w-full' />
          </div>
          <div
            id="landing-image"
            className="hidden md:flex justify-center rounded-md bg-background sm:mt-8 "
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'center top',
              transform: transformStyle,
            }}
          >
            <img
              src="./image.png"
              className="rounded-md border-4 border-blue-500 shadow-md duration-500 animate-in fade-in w-4/6 h-auto hover:shadow-lg hover:border-blue-400 hover:brightness-125"
              alt="Landing"
            />
          </div>
        </section>
        <section className='relative pt-20 pb-8 bg-black'>
          <div className='container flex flex-col items-center gap-10'>
            <h2 className='max-w-3xl text-balance text-center font-heading text-3xl font-medium tracking-tighter sm:text-5xl'>You just have to be consistent!</h2>
            <p className='max-w-[50rem] text-balance text-center text-muted-foreground sm:text-wrap sm:text-lg mb-6'>Crack coding interviews with personalized DSA roadmaps, adaptive learning, and an active community</p>
          </div>
          <div className="border-4 border-blue-400 bg-slate-900 p-8 rounded-3xl lg:w-3/5 lg:mx-auto m-8">
            {/* Tabs Header */}
            <div className="bg-slate-700 flex justify-center gap-6 mb-8 lg:w-3/6 rounded-full p-2 m-auto">
              <button className={`btn btn-outline rounded-full w-1/4 ${activeTab === 1 ? 'bg-blue-500 text-white' : ''}`} onClick={() => { setActiveTab(1) }}>Learn</button>
              <button className={`btn btn-outline rounded-full w-1/4 ${activeTab === 2 ? 'bg-blue-500 text-white' : ''}`} onClick={() => { setActiveTab(2) }}>Solve</button>
              <button className={`btn btn-outline rounded-full w-1/4 ${activeTab === 3 ? 'bg-blue-500 text-white' : ''}`} onClick={() => { setActiveTab(3) }}>Achieve</button>
            </div>
            <div className='content'>
              <img src={`./image${activeTab}.png`} alt="" />
            </div>
          </div>
        </section>
        <div className='flex justify-center bg-black'>
          <img src="./arrow.png" alt="" />
        </div>
        <section className='relative pb-20 bg-black'>
          <div className='container flex flex-col items-center gap-10'>
            <h2 className='max-w-3xl text-balance text-center font-heading text-3xl font-medium tracking-tighter sm:text-5xl'>Struggling with consistency in DSA? </h2>
            <p className='max-w-[50rem] text-balance text-center text-muted-foreground sm:text-wrap sm:text-lg mb-6'>DSAfied helps you stay on track with personalized recommendations, adaptive learning paths, and leaderboard challenges. Whether you're a beginner or an advanced coder, our system ensures discipline, consistency, and expertise in problem-solving.</p>
          </div>
          <div className='container gap-10 grid lg:grid-rows-2 w-4/5 mx-auto'>
            <div className="card shadow-xl flex lg:flex-row gap-6">
              <div className="card-body basis-1/2 border-2 rounded-2xl bg-gradient-to-r from-blue-700 to-neutral-900">
                {/* <Aperture className="" /> */}
                <h2 className="card-title"> Personalized Learning Paths
                </h2>
                <p>🚀 Get customized problem recommendations based on your strengths and weaknesses. No more confusion about what to solve next!</p>
              </div>
              <div className="card-body basis-1/2 border-2 rounded-2xl bg-gradient-to-l from-blue-700 to-neutral-900">
                {/* <Aperture className="" /> */}
                <h2 className="card-title">Daily Streak & Progress Tracking</h2>
                <p>🔥 Maintain consistency with daily practice streaks and see how you stack up against others on the leaderboard.</p>
              </div>
            </div>

            <div className="card shadow-xl flex lg:flex-row gap-6">
              <div className="card-body basis-1/3  border-2 rounded-2xl bg-gradient-to-tr from-blue-700 to-neutral-900">
                {/* <Aperture className="" /> */}
                <h2 className="card-title"> Adaptive Problem Solving</h2>
                <p>🧠 As you solve problems, DSAfied dynamically adjusts the difficulty level, ensuring gradual improvement without burnout.</p>
              </div>
              <div className="card-body basis-1/3 border-2 rounded-2xl bg-gradient-to-b from-blue-700 to-neutral-900">
                {/* <Aperture className="" /> */}
                <h2 className="card-title"> Doubt Solving Community</h2>
                <p>💡 Stuck on a problem? Ask your doubts in the dedicated discussion section and get help from peers & mentors.</p>
              </div>
              <div className="card-body basis-1/3 border-2 rounded-2xl bg-gradient-to-l from-blue-700 to-neutral-900">
                {/* <Aperture className="" /> */}
                <h2 className="card-title">No In-Built Editor – Focused Learning</h2>
                <p>🔗 We link problems from LeetCode, Codeforces, and more, allowing you to practice on platforms you prefer.</p>
              </div>
            </div>
          </div>
        </section>
        <section className='relative pb-20 bg-black'>
        <div className='container flex flex-col items-center gap-10'>
            <h2 className='max-w-3xl text-balance text-center font-heading text-3xl font-medium tracking-tighter sm:text-5xl'>What programmers say about us</h2>
            <p className='max-w-[50rem] text-balance text-center text-muted-foreground sm:text-wrap sm:text-lg mb-6'>Don't take our word for it.Look what they are saying.</p>
          </div>
          <div>
            <Testimonials />
          </div>
        </section>
        <section className='relative pb-20 bg-black'>
          <div className='container flex flex-col items-center gap-10'>
            <h2 className='max-w-3xl text-balance text-center font-heading text-3xl font-medium tracking-tighter sm:text-5xl'>Frequently asked questions</h2>
            <p className='max-w-[50rem] text-balance text-center text-muted-foreground sm:text-wrap sm:text-lg mb-6'>Got other questions? Reach out in our <a href="" className='font-bold'>Discord.</a></p>
          </div>
          <div>
            <FAQ />
          </div>
        </section>
        {/* <div>
          <Footer />
        </div> */}
      </main>
    </div>
  );
};

export default Landing;
