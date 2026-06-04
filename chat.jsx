/* M. A. Sarees — "Razia" AI Saree Advisor (live Claude) */
const { useState:useStateC, useEffect:useEffectC, useRef:useRefC } = React;

const RAZIA_SYSTEM = `You are "Razia", a warm, friendly AI saree advisor for M. A. Sarees — a Banarasi Silk Factory in Varanasi (since generations, factory-direct, GI-certified).
You speak in a light, respectful Hindi-English mix (Hinglish) but keep it easy to read. Keep replies SHORT (2-4 sentences max), warm and helpful.

RULES:
1. Be warm and respectful. Greet with "Namaste".
2. Before recommending, gently ask about OCCASION (Wedding / Festival / Daily / Gift / Wholesale), then BUDGET, then fabric preference — but don't interrogate; one question at a time.
3. Recommend ONLY products from the CATALOG below. Never invent products.
4. Quote price as "starting from ₹X" ranges (exact prices change).
5. Always nudge toward WhatsApp for ordering: "WhatsApp pe order kar sakte hain".
6. For wholesale: collect business name, city, quantity, then say the team will follow up.
7. When you recommend specific products, end your message with a line exactly like: [RECO: ID1, ID2] using the product IDs (max 3). Only add this when you are actually recommending products.

CATALOG (id | name | category | fabric | starting price | occasions):
`;

function catalogText(){
  return window.MA_PRODUCTS.map(p=>`${p.id} | ${p.en} | ${window.MA_CAT_LABEL[p.cat]} | ${p.fabric} | ₹${p.min} | ${p.occ.join('/')}`).join('\n');
}

const RAZIA_GREETING = "Namaste! \uD83D\uDE4F Main Razia hoon — apki pasand ki saree dhundne mein help karungi. Kis occasion ke liye saree chahiye?";

const QUICK_REPLIES = [
  {label:'Wedding Saree Chahiye', send:'I need a wedding saree'},
  {label:'Festival Look', send:'Something for a festival, mid budget'},
  {label:'Wholesale Inquiry', send:'I want wholesale / bulk pricing'},
  {label:'Price Puchna Hai', send:'What are your price ranges?'},
];

function parseReco(text){
  const m = text.match(/\[RECO:\s*([^\]]+)\]/i);
  if(!m) return {clean:text, ids:[]};
  const ids = m[1].split(',').map(s=>s.trim().toUpperCase()).filter(Boolean);
  return {clean:text.replace(m[0],'').trim(), ids};
}

function useRazia(){
  const [messages, setMessages] = useStateC([{role:'bot', text:RAZIA_GREETING, ids:[]}]);
  const [busy, setBusy] = useStateC(false);

  async function send(userText){
    if(!userText.trim() || busy) return;
    const next = [...messages, {role:'user', text:userText}];
    setMessages(next);
    setBusy(true);
    try{
      const convo = next.filter(m=>m.role==='user'||m.role==='bot')
        .map(m=>({role:m.role==='user'?'user':'assistant', content:m.text}));
      const reply = await window.claude.complete({
        system: RAZIA_SYSTEM + catalogText(),
        messages: convo,
      });
      const {clean, ids} = parseReco(reply||'');
      setMessages(m=>[...m, {role:'bot', text:clean||"Main samajh gayi! WhatsApp pe humari team aapki help karegi.", ids}]);
    }catch(e){
      setMessages(m=>[...m, {role:'bot', text:"Maaf kijiye, abhi connect nahi ho paya. Aap humein direct WhatsApp pe message kar sakte hain — hum turant reply karenge!", ids:[]}]);
    }finally{ setBusy(false); }
  }
  return {messages, busy, send, setMessages};
}

function RecoCards({ids, onNav}){
  const prods = ids.map(id=>window.MA_PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  if(!prods.length) return null;
  return (
    <div className="chat-recos">
      {prods.map(p=>{
        const msg = `Namaste! Razia ne suggest kiya — *${p.en}* (${p.id}). Please share details.`;
        return (
          <div className="reco" key={p.id}>
            <div className="rm"><window.MA_Ph label={p.id} tone={p.ph}/></div>
            <div className="ri" style={{flex:1}}>
              <b>{p.en}</b>
              <span>{window.MA_t('startingFrom')} {window.MA_money(p.min)}</span>
              <div style={{display:'flex',gap:10,marginTop:3}}>
                <a href={window.MA_wa(msg)} target="_blank" rel="noreferrer">Order ↗</a>
                <a style={{color:'var(--accent)'}} onClick={()=>onNav&&onNav('catalog')}>View</a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* the conversation core — reused by widget + full page */
function ChatThread({razia, onNav, showQuick=true}){
  const I = window.MA_I;
  const [draft, setDraft] = useStateC('');
  const bodyRef = useRefC(null);
  useEffectC(()=>{ if(bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [razia.messages, razia.busy]);
  const submit = (e)=>{ e&&e.preventDefault(); razia.send(draft); setDraft(''); };
  return (
    <>
      <div className="chat-body" ref={bodyRef}>
        {razia.messages.map((m,i)=>(
          <React.Fragment key={i}>
            <div className={`bubble ${m.role==='user'?'user':'bot'}`}>{m.text}</div>
            {m.ids&&m.ids.length>0 && <RecoCards ids={m.ids} onNav={onNav}/>}
          </React.Fragment>
        ))}
        {razia.busy && <div className="bubble bot typing"><i></i><i></i><i></i></div>}
      </div>
      {showQuick && (
        <div className="quick">
          {QUICK_REPLIES.map(q=>(
            <button key={q.label} onClick={()=>razia.send(q.send)} disabled={razia.busy}>{q.label}</button>
          ))}
        </div>
      )}
      <form className="chat-input" onSubmit={submit}>
        <input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Type your message…" disabled={razia.busy}/>
        <button className="send" type="submit" disabled={razia.busy||!draft.trim()}><I.send/></button>
      </form>
    </>
  );
}

/* floating widget (bottom-left bubble that expands) */
function ChatWidget({onNav}){
  const I = window.MA_I;
  const [open, setOpen] = useStateC(false);
  const razia = useRazia();
  if(!open){
    return (
      <button className="fab-chat" onClick={()=>setOpen(true)}>
        <span className="dot"><I.chat/><span className="pip"></span></span>
        Ask Razia
      </button>
    );
  }
  return (
    <div className="chat-pop">
      <div className="chat-head">
        <div className="av">R</div>
        <div>
          <b>Razia</b>
          <span><span className="on-dot"></span>AI Saree Advisor</span>
        </div>
        <button className="x" onClick={()=>setOpen(false)}><I.x/></button>
      </div>
      <ChatThread razia={razia} onNav={onNav}/>
    </div>
  );
}

/* full advisor page */
function AdvisorPage({onNav}){
  const I = window.MA_I;
  const razia = useRazia();
  return (
    <>
      <div className="pageintro">
        <div className="wrap">
          <div className="crumb">AI Saree Advisor</div>
          <h1>Meet Razia, your personal saree guide</h1>
          <p>Tell Razia your occasion, budget and style — she'll suggest the right Banarasi pieces from our factory and connect you on WhatsApp to order. Powered by Claude AI.</p>
        </div>
      </div>
      <section className="block">
        <div className="wrap">
          <div className="form-card" style={{padding:0,overflow:'hidden'}}>
            <div className="advisor-page">
              <aside className="advisor-side">
                <div className="av-lg">R</div>
                <h2>Razia</h2>
                <p>Your AI advisor, available 24×7 in Hinglish. She knows every weave on our looms.</p>
                <ul>
                  <li><I.check/>Personalised saree picks by occasion & budget</li>
                  <li><I.check/>Honest guidance on pure silk vs. blends</li>
                  <li><I.check/>Instant WhatsApp ordering links</li>
                  <li><I.check/>Wholesale & bulk inquiry handling</li>
                </ul>
                <div style={{marginTop:24,fontSize:12,color:'rgba(255,255,255,.5)'}}>Tip: try "Wedding saree under ₹20,000"</div>
              </aside>
              <main className="advisor-main">
                <ChatThread razia={razia} onNav={onNav}/>
              </main>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, {MA_ChatWidget:ChatWidget, MA_AdvisorPage:AdvisorPage, MA_useRazia:useRazia, MA_ChatThread:ChatThread});
