console.log('FakeOS initialized!');
let zIndex = 1000;
function createWindow(title, content) {
  const windowId = 'window-' + Date.now();
  const windowDiv = document.createElement('div');
  windowDiv.className = 'window';
  windowDiv.id = windowId;
  windowDiv.style.zIndex = zIndex++;
  windowDiv.innerHTML = `<div class="window-header"><span>${title}</span><button class="close-btn">×</button></div><div class="window-content">${content}</div>`;
  document.body.appendChild(windowDiv);
  makeWindowDraggable(windowId);
  windowDiv.querySelector('.close-btn').addEventListener('click', () => windowDiv.remove());
}
function makeWindowDraggable(windowId) {
  const windowDiv = document.getElementById(windowId);
  const header = windowDiv.querySelector('.window-header');
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  header.onmousedown = (e) => {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    windowDiv.style.zIndex = zIndex++;
    document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
    document.onmousemove = (e) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      windowDiv.style.top = (windowDiv.offsetTop - pos2) + "px";
      windowDiv.style.left = (windowDiv.offsetLeft - pos1) + "px";
    };
  };
}
window.addEventListener('load', () => {
  createWindow('Welcome to FakeOS', '<h2>Welcome! 🖥️</h2><p>This is a fake operating system built with HTML, CSS, and JavaScript.</p><p>Click and drag windows to move them around!</p><button onclick="createWindow('New Window', '<p>A new window!</p>')" style="padding:10px 20px; background:#0078d4; color:white; border:none; border-radius:4px; cursor:pointer;">Create Window</button>');
  createWindow('File Manager', '<p>📁 File Manager</p><p>Files:</p><ul><li>Documents</li><li>Photos</li><li>Videos</li></ul>');
});