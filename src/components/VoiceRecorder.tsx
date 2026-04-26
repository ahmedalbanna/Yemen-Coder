import React, { useState, useRef } from 'react';
import { Mic, Square, Trash2, CheckCircle, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('لا يمكن الوصول إلى الميكروفون. يرجى التحقق من الأذونات.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const deleteRecording = () => {
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-indigo-50 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">معرض الأعمال الصوتي</h3>
        <p className="text-sm text-gray-500">سجل رسالة صوتية (بحد أقصى 60 ثانية) لعرض مهاراتك.</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          {!audioUrl ? (
            <motion.div
              key="recording-ui"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-4"
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center relative transition-all duration-300 ${isRecording ? 'bg-red-50' : 'bg-indigo-50'}`}>
                {isRecording && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-red-400 rounded-full"
                  />
                )}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all active:scale-95 z-10 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-8 h-8" />}
                </button>
              </div>
              <p className={`text-xl font-mono font-bold ${isRecording ? 'text-red-500' : 'text-gray-400'}`}>
                {formatTime(recordingTime)}
              </p>
              {isRecording && <p className="text-red-500 font-bold animate-pulse">جاري التسجيل...</p>}
            </motion.div>
          ) : (
            <motion.div
              key="playback-ui"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-6"
            >
              <div className="w-full bg-indigo-50 p-4 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  <Volume2 className="w-5 h-5" />
                </div>
                <audio src={audioUrl} controls className="flex-1 h-10" />
              </div>
              
              <div className="flex gap-4 w-full">
                <button
                  onClick={deleteRecording}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                  حذف
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  <CheckCircle className="w-5 h-5" />
                  حفظ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
