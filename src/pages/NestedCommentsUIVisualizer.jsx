import React, { useEffect, useMemo, useRef, useState } from 'react';

// Nested Comments UI Visualizer
// Single-file React component (Tailwind classes assumed)
// Features:
// - Multiple users (switch active user)
// - Nested threaded comments (infinite depth)
// - Reply, edit, delete, upvote/downvote, collapse/expand
// - Optimistic UI for posting, simulated other-users replies
// - LocalStorage persistence and sample seeded data
// - Sorting (Top / New), pagination (load more replies), and mention highlighting

// NOTE: This component is intended as a visualizer/demo — not production security-hardened.

const STORAGE_KEY = 'nested_comments_demo_v1';

const sampleUsers = [
  { id: 'u1', name: 'Alice', handle: 'alice', role: 'Member' },
  { id: 'u2', name: 'Bob', handle: 'bob', role: 'Moderator' },
  { id: 'u3', name: 'Carol', handle: 'carol', role: 'Member' },
  { id: 'u4', name: 'Dave', handle: 'dave', role: 'Member' },
];

function uid(prefix = 'c') {
  return prefix + '_' + Math.random().toString(36).slice(2, 9);
}

function now() {
  return Date.now();
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

const initialComments = () => {
  const c1 = {
    id: uid('c'),
    userId: 'u1',
    text: 'This is a great feature! Love the nested visualizer.',
    createdAt: now() - 1000 * 60 * 60,
    votes: 5,
    replies: [],
    collapsed: false,
  };
  const c2 = {
    id: uid('c'),
    userId: 'u2',
    text: 'We should consider accessibility and keyboard interactions here.',
    createdAt: now() - 1000 * 60 * 30,
    votes: 8,
    replies: [],
    collapsed: false,
  };
  const r1 = {
    id: uid('c'),
    userId: 'u3',
    text: '@alice totally! Also add aria labels to the comment buttons.',
    createdAt: now() - 1000 * 60 * 10,
    votes: 1,
    replies: [],
    collapsed: false,
  };
  c1.replies.push(r1);
  return [c1, c2];
};

export default function NestedCommentsUIVisualizer() {
  const [users] = useState(sampleUsers);
  const [currentUserId, setCurrentUserId] = useState(sampleUsers[0].id);
  const [comments, setComments] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return initialComments();
  });
  const [draft, setDraft] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // comment id
  const [editing, setEditing] = useState(null); // { id, text }
  const [sortBy, setSortBy] = useState('top'); // top | new
  const [simulateActivity, setSimulateActivity] = useState(true);
  const simRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  // Simulate other users posting or replying every few seconds
  useEffect(() => {
    if (!simulateActivity) return;
    simRef.current = setInterval(() => {
      simulateOtherUserActivity();
    }, 7000 + Math.random() * 8000);
    return () => clearInterval(simRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments, simulateActivity]);

  function simulateOtherUserActivity() {
    // choose random user not current
    const others = users.filter(u => u.id !== currentUserId);
    const user = others[Math.floor(Math.random() * others.length)];
    if (!user) return;
    // choose random comment to reply to or post new
    const doReply = Math.random() < 0.6 && comments.length > 0;
    if (doReply) {
      const allIds = collectAllCommentIds(comments);
      const targetId = allIds[Math.floor(Math.random() * allIds.length)];
      const text = randomSentences(user.name);
      optimisticReply(targetId, user.id, text);
    } else {
      const text = randomSentences(user.name);
      optimisticPost(user.id, text);
    }
  }

  function collectAllCommentIds(list) {
    const out = [];
    for (const c of list) {
      out.push(c.id);
      if (c.replies && c.replies.length) out.push(...collectAllCommentIds(c.replies));
    }
    return out;
  }

  function randomSentences(name) {
    const samples = [
      `Nice point by ${name} — I agree!`,
      `${name} here — quick test of nested replies.`,
      `What about edge cases?`,
      `I think we can improve performance on large threads.`,
      `Can someone add an example?`,
    ];
    return samples[Math.floor(Math.random() * samples.length)];
  }

  // Optimistic post
  function optimisticPost(userId, text) {
    const temp = {
      id: uid('c'),
      userId,
      text,
      createdAt: now(),
      votes: 0,
      replies: [],
      collapsed: false,
      optimistic: true,
    };
    setComments(prev => [temp, ...prev]);
    // simulate server ack
    setTimeout(() => {
      setComments(prev => prev.map(c => (c.id === temp.id ? ({ ...c, optimistic: false }) : c)));
    }, 900);
  }

  // Optimistic reply insertion
  function optimisticReply(parentId, userId, text) {
    const replyObj = {
      id: uid('c'),
      userId,
      text,
      createdAt: now(),
      votes: 0,
      replies: [],
      collapsed: false,
      optimistic: true,
    };
    setComments(prev => insertReply(prev, parentId, replyObj));
    setTimeout(() => {
      setComments(prev => markOptimisticDone(prev, replyObj.id));
    }, 900);
  }

  function markOptimisticDone(list, id) {
    return list.map(c => {
      if (c.id === id) return { ...c, optimistic: false };
      if (c.replies && c.replies.length) return { ...c, replies: markOptimisticDone(c.replies, id) };
      return c;
    });
  }

  function insertReply(list, parentId, replyObj) {
    return list.map(c => {
      if (c.id === parentId) return { ...c, replies: [replyObj, ...(c.replies || [])] };
      if (c.replies && c.replies.length) return { ...c, replies: insertReply(c.replies, parentId, replyObj) };
      return c;
    });
  }

  function postComment() {
    if (!draft.trim()) return;
    optimisticPost(currentUserId, draft.trim());
    setDraft('');
  }

  function postReply(parentId, text) {
    if (!text.trim()) return;
    optimisticReply(parentId, currentUserId, text.trim());
    setReplyingTo(null);
  }

  function upvoteComment(id, delta = 1) {
    setComments(prev => updateVotes(prev, id, delta));
  }

  function updateVotes(list, id, delta) {
    return list.map(c => {
      if (c.id === id) return { ...c, votes: (c.votes || 0) + delta };
      if (c.replies && c.replies.length) return { ...c, replies: updateVotes(c.replies, id, delta) };
      return c;
    });
  }

  function editComment(id, newText) {
    setComments(prev => updateText(prev, id, newText));
    setEditing(null);
  }

  function updateText(list, id, newText) {
    return list.map(c => {
      if (c.id === id) return { ...c, text: newText };
      if (c.replies && c.replies.length) return { ...c, replies: updateText(c.replies, id, newText) };
      return c;
    });
  }

  function deleteComment(id) {
    setComments(prev => removeComment(prev, id));
  }

  function removeComment(list, id) {
    return list
      .filter(c => c.id !== id)
      .map(c => ({ ...c, replies: c.replies ? removeComment(c.replies, id) : [] }));
  }

  function toggleCollapse(id) {
    setComments(prev => toggleCollapseRec(prev, id));
  }

  function toggleCollapseRec(list, id) {
    return list.map(c => {
      if (c.id === id) return { ...c, collapsed: !c.collapsed };
      if (c.replies && c.replies.length) return { ...c, replies: toggleCollapseRec(c.replies, id) };
      return c;
    });
  }

  function sortComments(list) {
    const sorted = [...list];
    if (sortBy === 'top') sorted.sort((a, b) => (b.votes || 0) - (a.votes || 0));
    else sorted.sort((a, b) => b.createdAt - a.createdAt);
    return sorted.map(c => ({ ...c, replies: sortComments(c.replies || []) }));
  }

  const visibleComments = useMemo(() => sortComments(comments), [comments, sortBy]);

  // Recursive Comment Item
  function CommentItem({ comment, depth = 0 }) {
    const user = users.find(u => u.id === comment.userId) || { name: 'Unknown' };
    const [localReply, setLocalReply] = useState('');
    const [showRepliesLimit, setShowRepliesLimit] = useState(3);

    return (
      <div className={`flex gap-3 ${comment.optimistic ? 'opacity-70' : ''}`} style={{ marginLeft: depth * 12 }}>
        <div className="w-10 flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">{user.name[0]}</div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="font-medium">{user.name} <span className="text-xs text-slate-500">@{user.handle}</span></div>
            <div className="text-xs text-slate-400">• {timeAgo(comment.createdAt)}</div>
            {comment.optimistic && <div className="text-xs text-amber-500">(sending...)</div>}
          </div>
          <div className="mt-1 text-sm whitespace-pre-wrap">{renderMentions(comment.text)}</div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            <button className="px-2 py-1 rounded text-slate-600 hover:bg-slate-100" onClick={() => upvoteComment(comment.id, 1)}>▲</button>
            <div className="text-xs">{comment.votes || 0}</div>
            <button className="px-2 py-1 rounded text-slate-600 hover:bg-slate-100" onClick={() => upvoteComment(comment.id, -1)}>▼</button>
            <button className="px-2 py-1 rounded text-slate-600 hover:bg-slate-100" onClick={() => setReplyingTo(comment.id)}>Reply</button>
            <button className="px-2 py-1 rounded text-slate-600 hover:bg-slate-100" onClick={() => setEditing({ id: comment.id, text: comment.text })}>Edit</button>
            <button className="px-2 py-1 rounded text-red-600 hover:bg-red-50" onClick={() => deleteComment(comment.id)}>Delete</button>
            <button className="px-2 py-1 rounded text-slate-600 hover:bg-slate-100" onClick={() => toggleCollapse(comment.id)}>{comment.collapsed ? 'Expand' : 'Collapse'}</button>
          </div>

          {/* Reply box inline */}
          {replyingTo === comment.id && (
            <div className="mt-2">
              <textarea className="w-full p-2 border rounded" value={localReply} onChange={(e) => setLocalReply(e.target.value)} placeholder={`Replying as ${currentUserId}`}></textarea>
              <div className="mt-1 flex gap-2">
                <button className="px-3 py-1 bg-sky-600 text-white rounded" onClick={() => { postReply(comment.id, localReply); setLocalReply(''); }}>Send</button>
                <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setReplyingTo(null)}>Cancel</button>
              </div>
            </div>
          )}

          {/* Edit box */}
          {editing && editing.id === comment.id && (
            <div className="mt-2">
              <textarea className="w-full p-2 border rounded" value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })}></textarea>
              <div className="mt-1 flex gap-2">
                <button className="px-3 py-1 bg-emerald-500 text-white rounded" onClick={() => editComment(editing.id, editing.text)}>Save</button>
                <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          )}

          {/* Replies */}
          {!comment.collapsed && comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.slice(0, showRepliesLimit).map(r => (
                <CommentItem key={r.id} comment={r} depth={depth + 1} />
              ))}
              {comment.replies.length > showRepliesLimit && (
                <div className="text-xs">
                  <button className="text-sky-600" onClick={() => setShowRepliesLimit(s => s + 5)}>Load more replies</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderMentions(text) {
    // simple mention highlight
    const parts = text.split(/(@[a-z0-9_-]+)/gi);
    return parts.map((p, i) => {
      if (p.startsWith('@')) return <span key={i} className="text-sky-600 font-medium">{p}</span>;
      return <span key={i}>{p}</span>;
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Nested Comments UI Visualizer</h1>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">Active user:</div>
            <select className="p-2 border rounded" value={currentUserId} onChange={(e) => setCurrentUserId(e.target.value)}>
              {users.map(u => <option key={u.id} value={u.id}>{u.name} @{u.handle}</option>)}
            </select>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={simulateActivity} onChange={(e) => setSimulateActivity(e.target.checked)} /> Simulate activity
            </label>
          </div>
        </header>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex gap-3">
            <div className="w-12">
              <div className="h-12 w-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">{users.find(u => u.id === currentUserId).name[0]}</div>
            </div>
            <div className="flex-1">
              <textarea className="w-full p-3 border rounded" rows={3} placeholder="Write a comment..." value={draft} onChange={(e) => setDraft(e.target.value)}></textarea>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-slate-500">You can mention with @handle, or press ⏎ to add (demo).</div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-sky-600 text-white rounded" onClick={postComment}>Post</button>
                  <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => { setDraft(''); }}>Clear</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button className={`px-3 py-1 rounded ${sortBy==='top' ? 'bg-amber-400' : 'bg-gray-200'}`} onClick={() => setSortBy('top')}>Top</button>
            <button className={`px-3 py-1 rounded ${sortBy==='new' ? 'bg-amber-400' : 'bg-gray-200'}`} onClick={() => setSortBy('new')}>New</button>
          </div>
          <div className="text-sm text-slate-500">Comments: <strong>{collectAllCommentIds(comments).length}</strong></div>
        </div>

        <main className="mt-4 space-y-4">
          {visibleComments.length === 0 && <div className="text-center text-slate-500">No comments yet — be the first to post.</div>}
          {visibleComments.map(c => (
            <div key={c.id} className="p-3 bg-white rounded shadow-sm">
              <CommentItem comment={c} depth={0} />
            </div>
          ))}
        </main>

        <section className="mt-6 bg-white p-4 rounded shadow text-sm">
          <h3 className="font-semibold mb-2">How it works</h3>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Switch active user to post as different identities.</li>
            <li>Post top-level comments, reply inline, edit or delete your own comments.</li>
            <li>Upvote/downvote to affect Top sorting. Simulated users will also post occasionally.</li>
            <li>All data is persisted to localStorage for demo persistence.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
