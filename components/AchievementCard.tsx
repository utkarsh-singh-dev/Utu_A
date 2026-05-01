import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface Achievement {
  title: string;
  link: string | null;
}

interface AchievementCardProps {
  name: string;
  role: string;
  duration: string;
  logo: string;
  achievements: Achievement[];
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  name, 
  role, 
  duration, 
  logo, 
  achievements = [] 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <CollapsibleTrigger className="w-full">
        <Card className="flex items-center justify-between p-4 mb-2 bg-card hover:bg-accent/50 transition-colors duration-200 cursor-pointer">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={logo} alt={`${name} logo`} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold leading-tight">{name}</h3>
              <p className="text-sm text-muted-foreground leading-tight mt-1">{role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <p className="text-sm text-muted-foreground">{duration}</p>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="p-4 bg-muted/50">
          <h4 className="font-semibold mb-3">Achievements & Certificates</h4>
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between bg-background p-2 rounded-md">
                <span>{achievement.title}</span>
                {achievement.link && (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AchievementCard;