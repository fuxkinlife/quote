"use client";

import { useState, useEffect } from "react";
import { quotes } from "@/lib/quotes";
import { Button } from "@/components/ui/button";
import { Quote, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [bgColor, setBgColor] = useState("from-purple-400 via-pink-500 to-red-500");

  useEffect(() => {
    getNewQuote();
  }, []);

  const getNewQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * quotes.length);
      } while (quotes[newIndex].text === currentQuote.text);
      setCurrentQuote(quotes[newIndex]);
      setIsLoading(false);
      changeBackgroundColor();
    }, 500);
  };

  const changeBackgroundColor = () => {
    const colors = [
      "from-purple-400 via-pink-500 to-red-500",
      "from-green-400 via-blue-500 to-purple-500",
      "from-yellow-400 via-orange-500 to-red-500",
      "from-blue-400 via-indigo-500 to-purple-500",
      "from-teal-400 via-cyan-500 to-blue-500"
    ];
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(newColor);
  };

  return (
    <main className={`min-h-screen bg-gradient-to-br ${bgColor} flex items-center justify-center p-4 transition-colors duration-1000`}>
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <Quote className="w-10 h-10 text-white" />
            <Button
              variant="ghost"
              size="icon"
              onClick={getNewQuote}
              disabled={isLoading}
              className="transition-all duration-300 hover:rotate-180 text-white hover:bg-white hover:bg-opacity-20"
            >
              <RefreshCw className={`w-6 h-6 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-3xl md:text-4xl font-serif text-white leading-relaxed">
                "{currentQuote.text}"
              </p>
              <p className="text-xl text-white text-right italic">
                — {currentQuote.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Welcome to the Quote Generator!</DialogTitle>
            <DialogDescription className="text-white text-opacity-80">
              Prepare to be inspired by beautiful quotes in a vibrant setting!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            {/* <Button onClick={() => setShowPopup(false)} variant="outline" className="text-white border-white hover:bg-white hover:bg-opacity-20">
              Maybe Later
            </Button> */}
            <Button onClick={() => {
              // getNewQuote();
              setShowPopup(false);
            }} className="bg-white text-pink-500 hover:bg-opacity-90">
              Show Me a Quote
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

