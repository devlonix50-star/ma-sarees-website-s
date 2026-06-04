/* M. A. Sarees — pages: About, Contact, Admin */
const { useState:useStateP2 } = React;

/* ---------------- ABOUT ---------------- */
function About({onNav}){
  const I = window.MA_I, Btn = window.MA_Btn, Ph = window.MA_Ph;
  return (
    <>
      <div className="pageintro">
        <div className="wrap">
          <div className="crumb">Our Story</div>
          <h1>Three generations on the Banaras loom</h1>
          <p>From a single handloom in Lallapura to a factory serving families, boutiques and NRI buyers worldwide — woven with the same patience and zari it began with.</p>
        </div>
      </div>

      <section className="block">
        <div className="wrap">
          <div className="story">
            <div>
              <span className="eyebrow">The Family</span>
              <h2 style={{fontSize:32,margin:'12px 0 16px'}}>A weaving legacy, kept honest</h2>
              <p style={{color:'var(--gray)',fontSize:16}}>M. A. Sarees began as a family of master weavers in Varanasi, the home of Banarasi silk. For over five decades we have woven Pure Katan, Shikargah and Jangla sarees on our own looms — never outsourcing the craft, never compromising the silk.</p>
              <p style={{color:'var(--gray)',fontSize:16}}>Today we manufacture, wholesale and retail directly from our Lallapura factory, so every saree you receive carries the true weight and finish of authentic Banarasi handloom — at factory-direct prices.</p>
              <div className="stat-row mt24">
                <div className="stat"><b>50+</b><span>YEARS OF CRAFT</span></div>
                <div className="stat"><b>3</b><span>GENERATIONS</span></div>
                <div className="stat"><b>10+</b><span>CITIES SERVED</span></div>
                <div className="stat"><b>100%</b><span>FACTORY-DIRECT</span></div>
              </div>
            </div>
            <div style={{borderRadius:'var(--r-xl)',overflow:'hidden',aspectRatio:'4/5'}}>
              <Ph label="Factory — weaver at the handloom" tone="navy"/>
            </div>
          </div>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <div className="split" style={{alignItems:'center'}}>
            <div style={{borderRadius:'var(--r-xl)',overflow:'hidden',aspectRatio:'4/3'}}>
              <Ph label="GI certificate / silk mark close-up" tone="gold"/>
            </div>
            <div>
              <span className="eyebrow">Authenticity</span>
              <h2 style={{fontSize:30,margin:'12px 0 16px'}}>GI-Certified Banarasi Silk</h2>
              <p style={{color:'var(--gray)',fontSize:16}}>Banarasi silk carries a Geographical Indication (GI) tag — a legal mark of authenticity reserved for genuine handloom woven in the Varanasi region. Our weaves qualify, and we share documentation with wholesale and NRI buyers on request.</p>
              <div className="gi-tag mt16">
                <div className="seal">GI<br/>TAG</div>
                <div><b style={{display:'block',fontSize:16}}>Geographical Indication Protected</b><span style={{fontSize:13.5,color:'var(--gray)'}}>Authentic Banarasi handloom · Varanasi region</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">The People</span>
            <h2>Meet the family behind the looms</h2>
          </div>
          <div className="team-grid">
            {window.MA_TEAM.map(m=>(
              <div className="team" key={m.n} style={{textAlign:'center'}}>
                <div className="media"><Ph label={`${m.n} — portrait`} tone={m.ph}/></div>
                <b>{m.n}</b><span>{m.role}</span>
                <p>{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block alt">
        <div className="wrap">
          <div className="sec-head"><span className="eyebrow">Find us</span><h2>Visit the factory</h2><p>{window.MA_BIZ.address}</p></div>
          <MapEmbed/>
        </div>
      </section>
    </>
  );
}

function MapEmbed(){
  const I = window.MA_I;
  return (
    <div className="map-embed" style={{position:'relative'}}>
      <div className="ph navy" style={{position:'absolute',inset:0,opacity:.9}}>
        <span className="ph-label">Embedded Google Map · Lallapura, Varanasi</span>
      </div>
      <div style={{position:'absolute',left:'50%',top:'46%',transform:'translate(-50%,-50%)',zIndex:2,color:'#fff',textAlign:'center'}}>
        <I.pin style={{width:34,height:34,color:'var(--gold-soft)',margin:'0 auto'}}/>
        <div style={{fontWeight:700,marginTop:4}}>M. A. Sarees — Silk Factory</div>
      </div>
    </div>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact({onNav}){
  const I = window.MA_I, Btn = window.MA_Btn, Field = window.MA_Field, b = window.MA_BIZ;
  const [form, setForm] = useStateP2({name:'',phone:'',msg:''});
  const [errors, setErrors] = useStateP2({});
  const [done, setDone] = useStateP2(false);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submit=(e)=>{
    e.preventDefault();
    const er={};
    if(!form.name.trim()) er.name='Please enter your name';
    if(!/^[0-9+\s-]{8,}$/.test(form.phone)) er.phone='Enter a valid phone number';
    if(!form.msg.trim()) er.msg='Please add a message';
    setErrors(er); if(Object.keys(er).length) return;
    window.MA_addLead && window.MA_addLead({name:form.name, phone:form.phone, source:'contact', interest:form.msg.slice(0,40), status:'New'});
    setDone(true);
  };
  return (
    <>
      <div className="pageintro">
        <div className="wrap">
          <div className="crumb">Get in touch</div>
          <h1>Talk to M. A. Sarees</h1>
          <p>Call any of our team, message us on WhatsApp, or send an inquiry — we reply within business hours, {b.hours}.</p>
        </div>
      </div>
      <section className="block">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <div className="contact-cards">
                {b.phones.map(p=>(
                  <div className="ccard" key={p.num}>
                    <div className="ic"><I.phone/></div>
                    <div style={{flex:1}}><b>{p.name}</b><span>Click to call</span></div>
                    <a href={`tel:+91${p.num}`}>{p.num}</a>
                  </div>
                ))}
                <div className="ccard">
                  <div className="ic" style={{background:'color-mix(in oklab,var(--whatsapp),transparent 86%)'}}><I.wa style={{color:'var(--whatsapp)'}}/></div>
                  <div style={{flex:1}}><b>WhatsApp</b><span>Fastest — pre-filled message</span></div>
                  <a href={window.MA_wa()} target="_blank" rel="noreferrer" style={{color:'var(--whatsapp)'}}>{b.whatsapp}</a>
                </div>
                <div className="ccard">
                  <div className="ic"><I.pin/></div>
                  <div style={{flex:1}}><b>Factory Address</b><span>{b.address}</span></div>
                </div>
                <div className="ccard">
                  <div className="ic"><I.clock/></div>
                  <div style={{flex:1}}><b>Business Hours</b><span>{b.hours}</span></div>
                </div>
              </div>
              <div className="mt16"><MapEmbed/></div>
            </div>

            <div className="form-card">
              {done ? (
                <div className="form-success">
                  <div className="ck"><I.check/></div>
                  <h3 style={{fontSize:22}}>Message sent!</h3>
                  <p style={{color:'var(--gray)',margin:'8px 0 18px'}}>Aapka message hamare team tak pahunch gaya. We'll reply within 1 business hour.</p>
                  <Btn as="a" href={window.MA_wa()} variant="wa" icon={<I.wa/>}>Or message on WhatsApp</Btn>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3 style={{fontSize:22,marginBottom:4}}>Send an inquiry</h3>
                  <p style={{color:'var(--gray)',fontSize:14,margin:'0 0 18px'}}>We'll get back to you by phone or WhatsApp.</p>
                  <Field label="Your Name" req v={form.name} on={v=>set('name',v)} err={errors.name}/>
                  <Field label="Phone / WhatsApp" req v={form.phone} on={v=>set('phone',v)} err={errors.phone} placeholder="+91"/>
                  <div className={`field ${errors.msg?'err':''}`}>
                    <label>Message<span className="req"> *</span></label>
                    <textarea value={form.msg} onChange={e=>set('msg',e.target.value)} placeholder="Tell us what you're looking for…"/>
                    {errors.msg && <div className="msg">{errors.msg}</div>}
                  </div>
                  <Btn variant="primary" className="btn-block" type="submit" icon={<I.arrow/>}>Send Inquiry</Btn>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- ADMIN ---------------- */
function Admin({leads, setLeads, onNav}){
  const I = window.MA_I;
  const [tab, setTab] = useStateP2('leads');
  const srcLabel = {chat:'AI Chat', form:'Wholesale', wa:'WhatsApp', contact:'Contact'};
  const statusClass = {New:'dot-new', Contacted:'dot-cont', Converted:'dot-conv'};
  const counts = {
    total: leads.length,
    nw: leads.filter(l=>l.status==='New').length,
    conv: leads.filter(l=>l.status==='Converted').length,
  };
  const setStatus=(id,v)=> setLeads(ls=>ls.map(l=>l.id===id?{...l,status:v}:l));
  return (
    <div className="admin">
      <div className="admin-top">
        <window.MA_Logo onNav={onNav}/>
        <span style={{marginLeft:18,fontSize:13,color:'rgba(255,255,255,.55)'}}>Admin Dashboard</span>
        <span className="pill">Logged in · Anas</span>
      </div>
      <div className="admin-body">
        <div className="kpi-row">
          <div className="kpi"><div className="lab"><I.users style={{width:15,height:15,color:'var(--teal)'}}/>Total Leads</div><b>{counts.total}</b><span className="delta">+{counts.nw} new today</span></div>
          <div className="kpi"><div className="lab"><I.chat style={{width:15,height:15,color:'var(--teal)'}}/>AI Conversations</div><b>214</b><span className="delta">+18% vs last wk</span></div>
          <div className="kpi"><div className="lab"><I.wa style={{width:15,height:15,color:'var(--whatsapp)'}}/>WhatsApp Leads</div><b>96</b><span className="delta">+12 this week</span></div>
          <div className="kpi"><div className="lab"><I.trend style={{width:15,height:15,color:'var(--teal)'}}/>Converted</div><b>{counts.conv}</b><span className="delta">₹ pipeline growing</span></div>
        </div>

        <div className="admin-card">
          <div className="ahd">
            <h3>{tab==='leads'?'Recent Leads':'Product Catalog'}</h3>
            <div className="tabs">
              <button className={tab==='leads'?'on':''} onClick={()=>setTab('leads')}>Leads</button>
              <button className={tab==='products'?'on':''} onClick={()=>setTab('products')}>Products</button>
            </div>
          </div>
          {tab==='leads' ? (
            <table className="ltable">
              <thead><tr><th>Name</th><th>Phone</th><th>Source</th><th>Interest</th><th>When</th><th>Status</th></tr></thead>
              <tbody>
                {leads.map(l=>(
                  <tr key={l.id}>
                    <td><b>{l.name}</b></td>
                    <td style={{fontFamily:'var(--mono)',fontSize:12.5}}>{l.phone}</td>
                    <td><span className={`src ${l.source}`}>{srcLabel[l.source]}</span></td>
                    <td style={{color:'var(--gray)'}}>{l.interest}</td>
                    <td style={{color:'var(--gray)',fontSize:12.5}}>{l.when||'Just now'}</td>
                    <td>
                      <select className="status-sel" value={l.status} onChange={e=>setStatus(l.id,e.target.value)}>
                        <option>New</option><option>Contacted</option><option>Converted</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="ltable">
              <thead><tr><th>SKU</th><th>Product</th><th>Category</th><th>Fabric</th><th>From</th><th>Stock</th></tr></thead>
              <tbody>
                {window.MA_PRODUCTS.map(p=>(
                  <tr key={p.id}>
                    <td style={{fontFamily:'var(--mono)',fontSize:12.5}}>{p.id}</td>
                    <td><b>{p.en}</b></td>
                    <td>{window.MA_CAT_LABEL[p.cat]}</td>
                    <td style={{color:'var(--gray)'}}>{p.fabric}</td>
                    <td>{window.MA_money(p.min)}</td>
                    <td><span className="src wa">In stock</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <p style={{fontSize:12.5,color:'var(--gray)',marginTop:14}}>Demo dashboard · leads captured from the chatbot, forms and WhatsApp appear here live. Change a status to see it persist.</p>
      </div>
    </div>
  );
}

Object.assign(window, {MA_About:About, MA_Contact:Contact, MA_Admin:Admin});
