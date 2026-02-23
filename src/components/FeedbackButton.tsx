"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, MessageSquare, Send, ThumbsUp } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function FeedbackButton() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Send to Supabase or email service
    console.log({ rating, feedback, email, page: window.location.href });
    
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setRating(null);
      setFeedback("");
      setEmail("");
    }, 2000);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-50"
        size="lg"
      >
        <MessageSquare className="w-5 h-5 mr-2" />
        {language === 'de' ? 'Feedback' : 'Feedback'}
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">
              {language === 'de' ? 'Dein Feedback' : 'Your Feedback'}
            </CardTitle>
            <CardDescription>
              {language === 'de' 
                ? 'Hilf uns, agents-ranking.ai zu verbessern'
                : 'Help us improve agents-ranking.ai'}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          {submitted ? (
            <div className="text-center py-8">
              <ThumbsUp className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <p className="text-lg font-medium">
                {language === 'de' ? 'Danke für dein Feedback!' : 'Thank you for your feedback!'}
              </p>
              <p className="text-muted-foreground">
                {language === 'de' ? 'Wir werden es uns ansehen.' : 'We will review it.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm">
                  {language === 'de' 
                    ? 'Wie gefällt dir agents-ranking.ai?' 
                    : 'How do you like agents-ranking.ai?'}
                </Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      type="button"
                      variant={rating === star ? "default" : "outline"}
                      size="sm"
                      onClick={() => setRating(star)}
                    >
                      {star}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="feedback">
                  {language === 'de' ? 'Deine Meinung' : 'Your opinion'}
                </Label>
                <Textarea
                  id="feedback"
                  placeholder={language === 'de' 
                    ? 'Was gefällt dir? Was können wir besser machen?'
                    : 'What do you like? What can we improve?'}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="email">
                  {language === 'de' ? 'E-Mail (optional)' : 'Email (optional)'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={language === 'de' ? 'für Rückfragen' : 'for follow-up'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                {language === 'de' ? 'Feedback senden' : 'Send Feedback'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
