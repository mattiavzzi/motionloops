'use client';

import { useState, useRef, useEffect } from 'react';

interface Choice {
  id: number;
  text: string;
  icon: string;
}

export default function Video4() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const choices: Choice[] = [
    { id: 1, text: "Test", icon: "A" },
    { id: 2, text: "Meet one of your colleagues", icon: "B" },
    { id: 3, text: "Apply now", icon: "C" },
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setShowControls(true);
      } else {
        videoRef.current.play();
        setShowControls(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const PANEL_TRIGGER_TIME = 0;

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.currentTime >= PANEL_TRIGGER_TIME && !showRightPanel) {
        setShowRightPanel(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setShowControls(true);
    setIsPlaying(false);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className={`${showRightPanel ? 'w-1/2' : 'w-full'} bg-white-900 relative transition-all duration-700 ease-in-out`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300/50 z-10">
          <div 
            className="h-full bg-white rounded-full" 
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        
        <div 
          className="w-full h-screen cursor-pointer" 
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            className="w-full h-screen object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnd}
            onContextMenu={(e) => e.preventDefault()}
            src="/video4.mp4"
            preload="metadata"
            playsInline
          />
        </div>
        
        {showControls && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/70 hover:bg-white/90 flex items-center justify-center transition-all hover:scale-105"
          >
            {isPlaying ? (
              <img src="/play.png" alt="pause" className="w-8 h-8 mx-auto" />
            ) : (
              <img src="/play.png" alt="play" className="w-8 h-8 mx-auto" />
            )}
          </button>
        )}
    
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2 ml-auto">
              <div className="text-sm font-semibold">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              <button 
                onClick={toggleMute}
                className="p-2 hover:bg-white/90 rounded-[14px] transition-all hover:scale-110 bg-white/100"
              >
                <img 
                  src={isMuted ? "/mute.png" : "/volume.png"}
                  alt="volume" 
                  className="w-4 h-4 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showRightPanel && (
        <div className="w-1/2 bg-white p-8 flex flex-col justify-center transition-all duration-700 ease-in-out">
          <h2 className="text-3xl font-bold text-center mb-8 font-inter">Select a choice</h2>
          <div className="max-w-md mx-auto w-full space-y-4">
              <h2 className="text-3xl font-bold text-center mb-8 text-white pt-[20px] font-poppins">Select a choice</h2>
            {choices.map((choice) => (
              <button
                key={choice.id}
                className="w-full flex items-center gap-3 px-6 py-4 transition-all text-left border-transparent border-2"
                style={{ 
                  borderRadius: '25px',
                  backgroundColor: '#f5f5f5',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.border = '2px solid #000000';
                  e.currentTarget.style.color = '#ffffff';
                  const letterSpan = e.currentTarget.querySelector('span:first-child');
                  if (letterSpan) {
                    (letterSpan as HTMLElement).style.backgroundColor = '#ffffff';
                    (letterSpan as HTMLElement).style.color = '#000000';
                    (letterSpan as HTMLElement).style.fontWeight = 'bold';
                  }
                }}
                onClick={() => {
                  if (choice.id === 1) {
                    window.location.href = '/';
                  } else if (choice.id === 2) {
                    window.location.href = '/video2';
                  } else if (choice.id === 3) {
                    window.location.href = '/video3';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.border = '2px solid transparent';
                  e.currentTarget.style.color = '';
                  const letterSpan = e.currentTarget.querySelector('span:first-child');
                  if (letterSpan) {
                    (letterSpan as HTMLElement).style.backgroundColor = '#000000';
                    (letterSpan as HTMLElement).style.color = '#ffffff';
                  }
                }}
              >
                <span 
                  style={{ 
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    width: '28px',
                    height: '28px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter',
                    fontWeight: 'normal'
                  }}
                  className="hover:bg-white hover:text-black"
                >
                  {choice.icon}
                </span>
                <span className="font-medium">{choice.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}