/* M. A. Sarees — app shell, routing, tweaks, device preview */
const { useState:useStateA, useEffect:useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroMood": "Luxury",
  "colorEmph": "Teal",
  "typeFace": "Playfair",
  "cardStyle": "Standard",
  "chatStyle": "Teal"
}/*EDITMODE-END*/;

const HERO_CLASS = {Luxury:'', Modern:'hero-modern', Editorial:'hero-editorial'};
const EMPH_CLASS = {Teal:'emph-teal', Gold:'emph-gold', Cream:'emph-cream'};
const TYPE_CLASS = {Playfair:'type-classic', Cormorant:'type-cormorant', Marcellus:'type-marcellus'};
const CARD_CLASS = {Standard:'', Minimal:'cards-minimal', Editorial:'cards-editorial'};
const CHAT_CLASS = {Teal:'', Minimal:'chat-minimal', Warm:'chat-warm'};

function FabWA(){
  const I = window.MA_I;
  return (
    <a className="fab-wa" href={window.MA_wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp us">
      <span className="pulse"></span><I.wa/>
    </a>
  );
}

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [device, setDevice] = useStateA('desktop');
  const [page, setPage] = useStateA('home');
  const [params, setParams] = useStateA({});
  const [lang, setLang] = useStateA('en');
  const [leads, setLeads] = useStateA(window.MA_SEED_LEADS);

  // lead store exposed to forms + chat
  useEffectA(()=>{
    window.MA_addLead = (lead)=> setLeads(ls=>[{id:Date.now(), when:'Just now', ...lead}, ...ls]);
    return ()=>{ delete window.MA_addLead; };
  }, []);

  const nav = (p, pr={})=>{ setPage(p); setParams(pr); 
    const sc = document.querySelector('.site'); if(sc) sc.scrollTop=0;
    window.scrollTo&&window.scrollTo(0,0);
  };

  const isAdmin = page==='admin';
  const compact = device==='mobile';

  const siteClasses = [
    'site',
    compact?'compact':'',
    HERO_CLASS[t.heroMood], EMPH_CLASS[t.colorEmph], TYPE_CLASS[t.typeFace],
    CARD_CLASS[t.cardStyle], CHAT_CLASS[t.chatStyle],
  ].filter(Boolean).join(' ');

  let body;
  if(page==='home') body=<window.MA_Home onNav={nav} lang={lang}/>;
  else if(page==='catalog') body=<window.MA_Catalog onNav={nav} initial={params} lang={lang} key={JSON.stringify(params)}/>;
  else if(page==='wholesale') body=<window.MA_Wholesale onNav={nav}/>;
  else if(page==='advisor') body=<window.MA_AdvisorPage onNav={nav}/>;
  else if(page==='about') body=<window.MA_About onNav={nav}/>;
  else if(page==='contact') body=<window.MA_Contact onNav={nav}/>;
  else if(page==='admin') body=<window.MA_Admin leads={leads} setLeads={setLeads} onNav={nav}/>;

  return (
    <div className="stage">
      <div className="preview-bar">
        <div className="brandmini">M. A. Sarees <b>·</b> Interactive Prototype</div>
        <div className="seg">
          <button className={device==='desktop'?'on':''} onClick={()=>setDevice('desktop')}>Desktop</button>
          <button className={device==='mobile'?'on':''} onClick={()=>setDevice('mobile')}>Mobile</button>
        </div>
        <span className="hint" onClick={()=>nav('admin')} style={{cursor:'pointer'}}>{isAdmin?'← back to site':'Admin Dashboard →'}</span>
      </div>

      <div className={`viewport ${device}`}>
        <div className="frame">
          {compact && <div className="notch"></div>}
          <div className={siteClasses}>
            {isAdmin
              ? body
              : <>
                  <window.MA_Nav page={page} onNav={nav} lang={lang} setLang={setLang}/>
                  {body}
                  <window.MA_Footer onNav={nav}/>
                </>}
          </div>
          {!isAdmin && <>
            <window.MA_ChatWidget onNav={nav}/>
            <FabWA/>
          </>}
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand mood" />
        <TweakRadio label="Hero style" value={t.heroMood} options={['Luxury','Modern','Editorial']} onChange={v=>setTweak('heroMood',v)} />
        <TweakRadio label="Colour emphasis" value={t.colorEmph} options={['Teal','Gold','Cream']} onChange={v=>setTweak('colorEmph',v)} />
        <TweakSelect label="Display typeface" value={t.typeFace} options={['Playfair','Cormorant','Marcellus']} onChange={v=>setTweak('typeFace',v)} />
        <TweakSection label="Components" />
        <TweakRadio label="Product cards" value={t.cardStyle} options={['Standard','Minimal','Editorial']} onChange={v=>setTweak('cardStyle',v)} />
        <TweakRadio label="Chat UI" value={t.chatStyle} options={['Teal','Minimal','Warm']} onChange={v=>setTweak('chatStyle',v)} />
        <TweakSection label="Preview" />
        <TweakRadio label="Device" value={device} options={['desktop','mobile']} onChange={setDevice} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
