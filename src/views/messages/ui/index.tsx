
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Search, Send, Users, User as UserIcon, Phone, Video } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { mockChats, mockMessages, Chat } from '../lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const ChatListItem = ({ chat, isActive, onSelect }: { chat: Chat, isActive: boolean, onSelect: (chatId: string) => void }) => (
    <div
        className={cn(
            "flex items-start gap-4 p-3 rounded-lg cursor-pointer transition-colors",
            isActive ? "bg-muted" : "hover:bg-muted/50"
        )}
        onClick={() => onSelect(chat.id)}
    >
        <Avatar className="h-12 w-12 border">
            <AvatarImage src={chat.avatarUrl} />
            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow overflow-hidden">
            <div className="flex justify-between items-center">
                <p className="font-semibold truncate">{chat.name}</p>
                <p className="text-xs text-muted-foreground whitespace-nowrap">{chat.lastMessageTime}</p>
            </div>
            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
        </div>
    </div>
);

const ChatWindow = ({ chat, messages, currentUser }: { chat: Chat | null, messages: (typeof mockMessages)[string], currentUser: any }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        // In a real app, this would send the message to a backend
        console.log(`Sending message to ${chat?.id}: ${newMessage}`);
        setNewMessage('');
    };

    if (!chat) {
        return (
            <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center text-muted-foreground">
                    <p>Выберите чат, чтобы начать общение</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex flex-col h-full bg-card rounded-lg border">
            <header className="flex items-center gap-4 p-4 border-b">
                 <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.avatarUrl} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{chat.name}</h3>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Phone /></Button>
                    <Button variant="ghost" size="icon"><Video /></Button>
                </div>
            </header>
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map(msg => (
                    <div key={msg.id} className={cn("flex items-end gap-2", msg.sender.id === currentUser.id ? "justify-end" : "justify-start")}>
                        {msg.sender.id !== currentUser.id && (
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={msg.sender.avatarUrl} />
                                <AvatarFallback>{msg.sender.nickname.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            "max-w-xs md:max-w-md p-3 rounded-lg",
                            msg.sender.id === currentUser.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                         {msg.sender.id === currentUser.id && (
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={msg.sender.avatarUrl} />
                                <AvatarFallback>{msg.sender.nickname.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>
            <footer className="p-4 border-t">
                <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
                    <Input 
                        placeholder="Напишите сообщение..." 
                        className="flex-grow"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button type="submit" size="icon"><Send /></Button>
                </form>
            </footer>
        </div>
    )
}

const InfoPanel = ({ chat }: { chat: Chat | null }) => {
    if (!chat) return null;
    
    return (
        <Card>
            <CardContent className="p-4 text-center">
                 <Avatar className="h-24 w-24 mx-auto border-4 border-primary">
                    <AvatarImage src={chat.avatarUrl} />
                    <AvatarFallback className="text-4xl">{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mt-4">{chat.name}</h3>
                <p className="text-sm text-muted-foreground">{chat.type === 'team' ? 'Командный чат' : 'Личный диалог'}</p>
                
                <div className="mt-6 flex justify-center">
                    <Button asChild variant="secondary">
                        <Link href={chat.type === 'team' ? `/teams/${chat.entityId}` : `/users/${chat.entityId}`}>
                            {chat.type === 'team' ? <Users className="mr-2 h-4 w-4" /> : <UserIcon className="mr-2 h-4 w-4" />}
                            Перейти в профиль
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


export function MessagesPage() {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(mockChats[0].id);
    const { user: currentUser } = useUserStore();

    const selectedChat = mockChats.find(c => c.id === selectedChatId);
    const messagesForSelectedChat = selectedChatId ? mockMessages[selectedChatId] || [] : [];
    
    if (!currentUser) {
        return null; // or a loading state
    }

    return (
       <div className="h-[calc(100vh-4rem)] flex">
            {/* Chat List */}
            <div className="w-full md:w-1/3 lg:w-1/4 h-full flex flex-col border-r">
                <div className="p-4 border-b">
                    <h2 className="text-2xl font-bold">Чаты</h2>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Поиск..." className="pl-9" />
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto p-2">
                    {mockChats.map(chat => (
                        <ChatListItem 
                            key={chat.id} 
                            chat={chat} 
                            isActive={chat.id === selectedChatId}
                            onSelect={setSelectedChatId}
                        />
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-grow h-full p-4 hidden md:block">
                <ChatWindow chat={selectedChat || null} messages={messagesForSelectedChat} currentUser={currentUser} />
            </div>

            {/* Info Panel */}
            <div className="w-1/4 h-full p-4 border-l hidden lg:block">
                <InfoPanel chat={selectedChat || null} />
            </div>
       </div>
    );
}
