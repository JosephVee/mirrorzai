(function(){
  try{
    const path = location.pathname.toLowerCase();
    if(!path.includes('/admin') && !document.title.toLowerCase().includes('admin')) return;
    const a = document.createElement('a');
    a.href = '/api/admin-users-ui?secret=LexatxilaAriber1!';
    a.textContent = 'Users';
    a.style.position = 'fixed';
    a.style.top = '12px';
    a.style.right = '12px';
    a.style.background = '#0b6';
    a.style.color = '#fff';
    a.style.padding = '8px 12px';
    a.style.borderRadius = '6px';
    a.style.zIndex = 9999;
    document.body.appendChild(a);
  }catch(e){console.error(e)}
})();
