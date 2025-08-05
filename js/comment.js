(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const usernameInput = document.getElementById('username');
        const commentInput = document.getElementById('comment-content');
        const submitBtn = document.getElementById('submit-comment');
        const todayCommentsList = document.getElementById('today-comments-list');
        const dateSelector = document.getElementById('date-selector');
        const loadDateBtn = document.getElementById('load-date');
        const emojiPicker = document.getElementById('emoji-picker');
        const emojiToggle = document.getElementById('emoji-toggle');
        const commentsTitle = document.getElementById('comments-title'); // 新增标题元素

        // 常用 emoji 列表
        const emojis = ['😊', '😂', '👍', '🎉', '❤️', '🤔', '😢', '🥳'];

        const today = new Date();
        const formattedDate = formatDate(today);

        dateSelector.valueAsDate = today;
        renderEmojiPicker();
        updateCommentsTitle(today);
        loadComments(today);

        function adjustTextareaHeight() {
            commentInput.style.height = 'auto';
            commentInput.style.height = commentInput.scrollHeight + 'px';
        }
        commentInput.addEventListener('input', adjustTextareaHeight);

        emojiToggle.addEventListener('click', () => {
            const open = emojiPicker.style.display !== 'block';
            emojiPicker.style.display = open ? 'block' : 'none';
        });

        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const username = usernameInput.value.trim();
            const content = commentInput.value.trim();
            if (!username || !content) {
                alert('请填写完整信息');
                return;
            }
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            const comment = {
                username,
                content,
                date: Date.now(),
                displayDate: formattedDate
            };

            fetch('/comments', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(comment)
            })
                .then(res => {
                    if (!res.ok) throw new Error('提交失败');
                    return res.json();
                })
                .then(data => {
                    commentInput.value = '';
                    adjustTextareaHeight();
                    updateCommentsTitle(today); // 新增
                    loadComments(today);
                    submitBtn.classList.add('success');
                    setTimeout(() => submitBtn.classList.remove('success'), 1000);
                })
                .catch(err => {
                    alert(err.message);
                })
                .finally(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                });
        });

        loadDateBtn.addEventListener('click', function() {
            const selectedDate = new Date(dateSelector.value);
            updateCommentsTitle(selectedDate); // 新增
            loadComments(selectedDate);
        });

        function insertEmoji(emoji) {
            commentInput.value += emoji;
            adjustTextareaHeight();
            commentInput.focus();
        }

        function renderEmojiPicker() {
            if (!emojiPicker) return;
            emojiPicker.innerHTML = '';
            emojis.forEach(emoji => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'emoji-btn';
                btn.textContent = emoji;
                btn.addEventListener('click', () => insertEmoji(emoji));
                emojiPicker.appendChild(btn);
            });
            emojiPicker.style.display = 'none';
        }

        // 删除评论
        function deleteComment(id, date) {
            fetch(`/comments/${id}`, { method: 'DELETE' })
                .then(res => {
                    if (!res.ok) throw new Error('删除失败');
                    loadComments(date);
                })
                .catch(err => alert(err.message));
        }

        // 加载评论并渲染
        function loadComments(date) {
            fetch('/comments')
                .then(res => {
                    if (!res.ok) throw new Error('获取评论失败');
                    return res.json();
                })
                .then(allComments => {
                    const start = new Date(date); start.setHours(0,0,0,0);
                    const end = new Date(date); end.setHours(23,59,59,999);
                    const filtered = allComments.filter(c => {
                        const t = new Date(c.date);
                        return t >= start && t <= end;
                    });
                    todayCommentsList.innerHTML = '';
                    if (filtered.length === 0) {
                        todayCommentsList.innerHTML = `<p>${isToday(date) ? '今日暂无打卡' : '暂无打卡记录'}</p>`;
                        return;
                    }
                    filtered.forEach(c => {
                        const displayDate = c.displayDate || formatDate(new Date(c.date));
                        const item = document.createElement('div');
                        item.className = 'comment-item';
                        item.innerHTML = `
                          <div class="comment-header">
                            <strong>${escapeHTML(c.username)}</strong> <span>${escapeHTML(displayDate)}</span>
                          </div>
                          <div class="comment-content">${escapeHTML(c.content)}</div>
                          <button class="delete-btn" data-id="${c._id}">删除</button>
                        `;
                        const delBtn = item.querySelector('.delete-btn');
                        delBtn.addEventListener('click', () => deleteComment(c._id, date));
                        todayCommentsList.appendChild(item);
                    });
                })
                .catch(err => {
                    todayCommentsList.innerHTML = `<p>加载评论失败</p>`;
                    console.error(err);
                });
        }

        // 根据日期更新标题
        function updateCommentsTitle(date) {
            if (isToday(date)) {
                commentsTitle.textContent = '今日已打卡';
            } else {
                const opts = { year: 'numeric', month: 'long', day: 'numeric' };
                const formatted = date.toLocaleDateString('zh-CN', opts);
                commentsTitle.textContent = `${formatted} 已打卡`;
            }
        }

        function formatDate(d) {
            const opts = { year:'numeric', month:'long', day:'numeric', weekday:'long' };
            return d.toLocaleDateString('zh-CN', opts);
        }

        function isToday(d) {
            const n = new Date();
            return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
        }

        // 防止XSS
        function escapeHTML(str) {
            if (!str) return '';
            return String(str).replace(/[&<>"']/g, function(m) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                }[m];
            });
        }
    });
})();
