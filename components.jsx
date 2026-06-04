/* M. A. Sarees — shared UI primitives */
const { useState, useEffect, useRef } = React;

/* ---- icon set (simple, line-based) ---- */
const I = {
  wa:(p)=><svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>,
  chat:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  send:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  arrow:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  heart:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>,
  menu:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  x:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>,
  filter:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/></svg>,
  check:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  pin:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  seal:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 2 2.4 1.8 3-.2 1 2.8 2.4 1.8-1 2.8 1 2.8-2.4 1.8-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3.2 16l1-2.8-1-2.8 2.4-1.8 1-2.8 3 .2L12 2Z"/><path d="m9 12 2 2 4-4"/></svg>,
  truck:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 18V6a1 1 0 0 0-1-1H2v13M14 9h5l3 3v6h-8M9 18h5"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>,
  tag:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2H2v10l9.3 9.3a1 1 0 0 0 1.4 0l8.6-8.6a1 1 0 0 0 0-1.4Z"/><circle cx="7" cy="7" r="1.4" fill="currentColor"/></svg>,
  factory:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 20h20M4 20V9l5 4V9l5 4V4l6 3v13"/></svg>,
  heritage:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>,
  scissors:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 12.5 20 20M8.1 8.1 12 12"/></svg>,
  phone:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/></svg>,
  clock:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  mail:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>,
  lock:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>,
  spark:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></svg>,
  users:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>,
  trend:(p)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></svg>,
};

/* placeholder media — striped, labelled */
function Ph({label, tone='', className=''}){
  return <div className={`ph ${tone} ${className}`}><span className="ph-label">{label}</span></div>;
}

function Btn({variant='primary', size='', as='button', href, icon, children, onDark, className='', ...rest}){
  const cls = `btn btn-${variant} ${size?'btn-'+size:''} ${onDark?'on-dark':''} ${className}`;
  const inner = <>{icon}{children}</>;
  if(as==='a') return <a className={cls} href={href} target={href&&href.startsWith('http')?'_blank':undefined} rel="noreferrer" {...rest}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}

function Logo({onNav, footer}){
  return (
    <div className="logo" onClick={()=>onNav&&onNav('home')}>
      <div className="mark">MA</div>
      <div className="lt"><b>M. A. Sarees</b><span>{window.MA_BIZ.tagline}</span></div>
    </div>
  );
}

const NAV_ITEMS = [
  ['home','Home'],['catalog','Catalog'],['wholesale','Wholesale'],['advisor','AI Advisor'],['about','About'],['contact','Contact'],
];

function Nav({page, onNav, lang, setLang}){
  const [open, setOpen] = useState(false);
  useEffect(()=>{ setOpen(false); }, [page]);
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Logo onNav={onNav}/>
        <nav className="nav-links">
          {NAV_ITEMS.map(([id,label])=>(
            <a key={id} className={page===id?'active':''} onClick={()=>onNav(id)}>{label}</a>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang-toggle">
            <button className={lang==='en'?'on':''} onClick={()=>setLang('en')}>EN</button>
            <button className={lang==='hi'?'on':''} onClick={()=>setLang('hi')}>हिं</button>
          </div>
          <Btn as="a" href={window.MA_wa()} variant="wa" size="sm" icon={<I.wa/>}>WhatsApp</Btn>
          <button className="hamburger" onClick={()=>setOpen(o=>!o)} aria-label="Menu">{open?<I.x/>:<I.menu/>}</button>
        </div>
      </div>
      <div className={`mobile-menu ${open?'open':''}`}>
        <div className="wrap">
          {NAV_ITEMS.map(([id,label])=>(
            <a key={id} className={page===id?'active':''} onClick={()=>{onNav(id);setOpen(false);}}>{label}</a>
          ))}
        </div>
      </div>
    </header>
  );
}

function Footer({onNav}){
  const b = window.MA_BIZ;
  return (
    <footer className="footer">
      <div className="wrap top">
        <div>
          <Logo onNav={onNav}/>
          <p className="blurb">Handwoven Banarasi silk, factory-direct from Lallapura, Varanasi. Serving retail families, pan-India wholesalers and NRI buyers since generations.</p>
          <div className="phones mt16" style={{fontSize:14,lineHeight:1.9}}>
            {b.phones.map(p=><div key={p.num}><b>{p.name}</b> · {p.num}</div>)}
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          {NAV_ITEMS.map(([id,label])=><a key={id} onClick={()=>onNav(id)}>{label}</a>)}
        </div>
        <div>
          <h4>Categories</h4>
          {window.MA_CATEGORIES.map(c=><a key={c.id} onClick={()=>onNav('catalog')}>{c.en}</a>)}
        </div>
        <div>
          <h4>Visit the Factory</h4>
          <p className="blurb" style={{margin:0}}>{b.address}</p>
          <p className="blurb">{b.hours}</p>
          <a href={window.MA_wa()} target="_blank" rel="noreferrer" style={{color:'var(--gold-soft)',fontWeight:600}}>WhatsApp · {b.whatsapp}</a>
        </div>
      </div>
      <div className="wrap bottom">
        <span>© 2025 M. A. Sarees — Silk Factory, Varanasi. GI-Certified Banarasi Handloom.</span>
        <span>Manufacturer · Wholesaler · Retailer</span>
      </div>
    </footer>
  );
}

/* product card */
function ProductCard({p, lang, onNav}){
  const money = window.MA_money;
  const msg = `Namaste! I'm interested in *${p.en}* (${p.id}). Please share details, price and availability.`;
  return (
    <div className="prod-card">
      <div className="media">
        <Ph label={`${p.id} · saree shot`} tone={p.ph}/>
        {p.pure && <span className="badge-silk"><I.seal style={{width:13,height:13}}/>Pure Silk</span>}
        <div className="fav"><I.heart/></div>
      </div>
      <div className="body">
        <span className="ptag">{window.MA_CAT_LABEL[p.cat]} · {p.fabric}</span>
        <div className="deva">{p.hi}</div>
        <h3>{p.en}</h3>
        <div className="price">{window.MA_t('startingFrom')} {money(p.min)} <small>{p.unit||''}</small></div>
        <div className="acts">
          <Btn as="a" href={window.MA_wa(msg)} variant="wa" size="sm" className="btn-block" icon={<I.wa/>}>Order on WhatsApp</Btn>
          <Btn variant="outline" size="sm" className="btn-block" onClick={()=>onNav('wholesale')}>Request Sample</Btn>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {MA_I:I, MA_Ph:Ph, MA_Btn:Btn, MA_Logo:Logo, MA_Nav:Nav, MA_Footer:Footer,
  MA_ProductCard:ProductCard, MA_NAV_ITEMS:NAV_ITEMS});
