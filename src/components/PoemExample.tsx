import { useState, useEffect } from "react";
import { BookOpen, Volume2, Pause, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface PoemExampleProps {
  line: string;
  poemTitle: string;
  author: string;
  fullPoem: string;
}

type AudioState = 'stopped' | 'playing' | 'paused';

export function PoemExample({ line, poemTitle, author, fullPoem }: PoemExampleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>('stopped');

  useEffect(() => {
    // Reset audio state when dialog closes
    if (!isOpen) {
      speechSynthesis.cancel();
      setAudioState('stopped');
    }
  }, [isOpen]);

  const handlePlayPoemAudio = () => {
    if (audioState === 'stopped') {
      // Start playing
      const utterance = new SpeechSynthesisUtterance(fullPoem);
      utterance.lang = 'ht';
      
      utterance.onstart = () => setAudioState('playing');
      utterance.onend = () => setAudioState('stopped');
      utterance.onerror = () => setAudioState('stopped');
      
      speechSynthesis.speak(utterance);
    } else if (audioState === 'playing') {
      // Pause
      speechSynthesis.pause();
      setAudioState('paused');
    } else if (audioState === 'paused') {
      // Resume
      speechSynthesis.resume();
      setAudioState('playing');
    }
  };

  const stopAudio = () => {
    speechSynthesis.cancel();
    setAudioState('stopped');
  };

  const getAudioButtonContent = () => {
    switch (audioState) {
      case 'playing':
        return (
          <>
            <Pause className="h-4 w-4 mr-2" />
            Rete
          </>
        );
      case 'paused':
        return (
          <>
            <Play className="h-4 w-4 mr-2" />
            Kontinye
          </>
        );
      default:
        return (
          <>
            <Volume2 className="h-4 w-4 mr-2" />
            Koute
          </>
        );
    }
  };

  const handlePlayLineAudio = () => {
    // Mock audio playback for just the example line
    const utterance = new SpeechSynthesisUtterance(line);
    utterance.lang = 'ht';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white/70 rounded-lg p-4 border border-[#00209F]/20">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <blockquote className="text-lg italic text-[#00209F] flex-1">
            "{line}"
          </blockquote>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePlayLineAudio}
            className="text-[#CE1126] hover:text-[#CE1126] hover:bg-red-50"
          >
            <Volume2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
          <div className="text-sm text-slate-600">
            <p className="font-medium">— {poemTitle}</p>
            <p>pa {author}</p>
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#00209F] text-[#00209F] hover:bg-[#00209F] hover:text-white"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Li powèm konpè a
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-start justify-between gap-4 pr-8">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl text-[#00209F] text-left">
                      {poemTitle}
                    </DialogTitle>
                    <p className="text-lg text-left text-slate-600 mt-1">pa {author}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePlayPoemAudio}
                      className="border-[#CE1126] text-[#CE1126] hover:bg-[#CE1126] hover:text-white mt-1 flex-shrink-0"
                    >
                      {getAudioButtonContent()}
                    </Button>
                    {audioState !== 'stopped' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={stopAudio}
                        className="border-slate-400 text-slate-600 hover:bg-slate-100 hover:text-slate-800 mt-1 flex-shrink-0"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-red-50 p-6 rounded-lg border border-[#00209F]/20">
                  <pre className="whitespace-pre-wrap text-lg leading-relaxed text-[#00209F] font-medium">
                    {fullPoem}
                  </pre>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}