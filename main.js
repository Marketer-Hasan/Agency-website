(function(){
  // ---- Persisted customization ----
  var root = document.documentElement;
  var saved = {
    theme: localStorage.getItem('sh-theme') || 'light',
    accent: localStorage.getItem('sh-accent') || 'signal',
    fontsize: localStorage.getItem('sh-fontsize') || 'md'
  };
  applyTheme(saved.theme);
  applyAccent(saved.accent);
  applyFontsize(saved.fontsize);

  function applyTheme(v){
    root.setAttribute('data-theme', v);
    document.querySelectorAll('[data-set-theme]').forEach(function(el){
      el.classList.toggle('is-active', el.dataset.setTheme === v);
    });
  }
  function applyAccent(v){
    root.setAttribute('data-accent', v);
    document.querySelectorAll('[data-set-accent]').forEach(function(el){
      el.classList.toggle('is-active', el.dataset.setAccent === v);
    });
  }
  function applyFontsize(v){
    if(v === 'md'){ root.removeAttribute('data-fontsize'); } else { root.setAttribute('data-fontsize', v); }
    document.querySelectorAll('[data-set-fontsize]').forEach(function(el){
      el.classList.toggle('is-active', el.dataset.setFontsize === v);
    });
  }

  document.querySelectorAll('[data-set-theme]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var v = btn.dataset.setTheme;
      localStorage.setItem('sh-theme', v); applyTheme(v);
    });
  });
  document.querySelectorAll('[data-set-accent]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var v = btn.dataset.setAccent;
      localStorage.setItem('sh-accent', v); applyAccent(v);
    });
  });
  document.querySelectorAll('[data-set-fontsize]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var v = btn.dataset.setFontsize;
      localStorage.setItem('sh-fontsize', v); applyFontsize(v);
    });
  });

  // ---- Customize panel open/close ----
  var panel = document.querySelector('.customize-panel');
  var scrim = document.querySelector('.scrim');
  document.querySelectorAll('[data-open-customize]').forEach(function(btn){
    btn.addEventListener('click', function(){ panel.classList.add('open'); scrim.classList.add('open'); });
  });
  document.querySelectorAll('[data-close-customize]').forEach(function(btn){
    btn.addEventListener('click', function(){ panel.classList.remove('open'); scrim.classList.remove('open'); closeDrawer(); });
  });

  // ---- Mobile nav drawer ----
  var drawer = document.querySelector('.mobile-drawer');
  function closeDrawer(){ if(drawer){ drawer.classList.remove('open'); } }
  document.querySelectorAll('[data-open-menu]').forEach(function(btn){
    btn.addEventListener('click', function(){ drawer.classList.add('open'); scrim.classList.add('open'); });
  });
  if(scrim){
    scrim.addEventListener('click', function(){
      panel.classList.remove('open'); closeDrawer(); scrim.classList.remove('open');
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if(!q) return;
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // ---- Pricing billing toggle ----
  var billingBtns = document.querySelectorAll('[data-billing]');
  billingBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      billingBtns.forEach(function(b){ b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var mode = btn.dataset.billing;
      document.querySelectorAll('[data-price-monthly]').forEach(function(el){
        el.textContent = mode === 'monthly' ? el.dataset.priceMonthly : el.dataset.priceAnnual;
      });
    });
  });

  // ---- Budget chip select (contact form) ----
  document.querySelectorAll('.budget-chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      document.querySelectorAll('.budget-chip').forEach(function(c){ c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var hidden = document.querySelector('#budget-hidden');
      if(hidden) hidden.value = chip.textContent.trim();
    });
  });

  // ---- Contact form (front-end demo submit) ----
  var form = document.querySelector('#contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      form.style.display = 'none';
      document.querySelector('.form-success').classList.add('show');
    });
  }
})();
