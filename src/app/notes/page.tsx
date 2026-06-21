'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import ReactMarkdown from 'react-markdown';

export default function Notes() {
  const { topics, topicNotes, saveTopicNotes } = useStore();
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || 't1');

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[0];
  const currentNotes = topicNotes[selectedTopicId] || '';

  const handleNotesChange = (val: string) => {
    saveTopicNotes(selectedTopicId, val);
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)] pt-2 md:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Study Notes</h1>
          <p className="text-white/50 text-sm">Categorize algorithm patterns, logic summaries, and complexities.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-white/50">Select Topic:</label>
          <select 
            className="bg-neutral-900 border border-white/10 focus:border-emerald-500 rounded-lg p-2 text-sm outline-none text-white font-medium"
            value={selectedTopicId}
            onChange={(e) => setSelectedTopicId(e.target.value)}
          >
            {topics.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Editor */}
        <div className="flex flex-col h-full">
          <textarea 
            className="w-full flex-1 bg-white/5 p-4 rounded-xl outline-none font-mono text-sm border border-white/10 focus:border-emerald-500 resize-none overflow-y-auto"
            placeholder={`# ${selectedTopic?.name} notes\nWrite key patterns, complexities, and code templates in Markdown...`}
            value={currentNotes}
            onChange={(e) => handleNotesChange(e.target.value)}
          />
        </div>

        {/* Live Preview */}
        <div className="glass p-4 rounded-xl overflow-y-auto prose prose-invert max-w-none border border-white/10 h-full">
          {currentNotes.trim() ? (
            <ReactMarkdown>{currentNotes}</ReactMarkdown>
          ) : (
            <p className="text-white/30 italic">No notes created for this topic. Type on the left side to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
}
