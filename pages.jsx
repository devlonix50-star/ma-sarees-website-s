/* M. A. Sarees — pages: Home, Catalog, Wholesale */
const { useState:useStateP, useMemo:useMemoP } = React;

/* ---------------- HOME ---------------- */
function Home({onNav, lang}){
  const I = window.MA_I, Btn = window.MA_Btn, Ph = window.MA_Ph;
  const t = window.MA_t;
  return (
    <>
      {/* hero */}
      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <span className="deva-head">{t('heroDeva')}</span>
            <h1>{t('heroH1a')} <span className="gold">{t('heroH1b')}</span></h1>
            <p className="sub">{t('heroSub')}</p>
            <div className="hero-cta">
              <Btn variant="gold" size="lg" icon={<I.arrow/>} onClick={()=>onNav('catalog')}>{t('shopNow')}</Btn>
              <Btn variant="outline" size="lg" onDark onClick={()=>onNav('wholesale')}>{t('wholesaleCta')}</Btn>
            </div>
          </div>
          <div className="hero-art">
            <Ph label="Hero — Banarasi silk drape / weaving loom" tone="gold"/>
            <div className="hero-badge"><I.seal style={{width:15,height:15,color:'var(--gold-soft)'}}/>GI-Certified Banarasi Handloom</div>
          </div>
        </div>
      </section>

      {/* trust bar */}
      <div className="trustbar">
        <div className="wrap"><div className="row">
          {window.MA_TRUST.map((x,i)=>{ const Icon=I[x.icon]; return (
            <div className="trust-item" key={i}><Icon/><div><b>{x.b}</b><span>{x.s}</span></div></div>
          );})}
        </div></div>
      </div>

      {/* featured categories */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head center">
            <div className="divider-orn"><I.seal style={{width:18,height:18}}/></div>
            <span className="eyebrow">The Collection</span>
            <h2>Shop by category</h2>
            <p>From bridal Katan silk to everyday georgette and dress material by the metre.</p>
          </div>
          <div className="cat-grid">
            {window.MA_CATEGORIES.map(c=>(
              <div className="cat-card" key={c.id} onClick={()=>onNav('catalog', {cat:c.id})}>
                <div className="media"><Ph label={`${c.en} shot`} tone={c.ph}/></div>
                <div className="body">
                  <div className="deva">{c.hi}</div>
                  <h3>{c.en}</h3>
                  <div className="view">View Collection <I.arrow style={{width:15,height:15}}/></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI advisor banner */}
      <section className="block alt">
        <div className="wrap">
          <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:30,alignItems:'center',background:'var(--navy)',color:'#fff',borderRadius:'var(--r-xl)',padding:'40px 44px'}} className="advisor-banner">
            <div>
              <span className="eyebrow on-dark">AI Saree Advisor</span>
              <h2 style={{color:'#fff',fontSize:32,margin:'10px 0 8px'}}>Not sure which saree? Ask Razia.</h2>
              <p style={{color:'rgba(255,255,255,.74)',maxWidth:'34em',margin:0}}>Our AI advisor recommends the perfect Banarasi piece by occasion and budget — in Hinglish, 24×7.</p>
            </div>
            <Btn variant="gold" size="lg" icon={<I.chat/>} onClick={()=>onNav('advisor')}>Chat with Razia</Btn>
          </div>
        </div>
      </section>

      {/* why us */}
      <section className="block dark">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow on-dark">Why M. A. Sarees</span>
            <h2>Factory-direct, the way Banaras intended</h2>
          </div>
          <div className="usp-grid">
            {window.MA_USPS.map((u,i)=>{ const Icon=I[u.icon]; return (
              <div className="usp" key={i}>
                <div className="ic"><Icon/></div>
                <h3>{u.t}</h3>
                <p>{u.d}</p>
              </div>
            );})}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="block">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Loved across India & abroad</span>
            <h2>What our buyers say</h2>
          </div>
          <div className="tcards">
            {window.MA_TESTIMONIALS.map((tm,i)=>(
              <div className="tcard" key={i}>
                <div className="stars">★★★★★</div>
                <p>“{tm.q}”</p>
                <div className="who"><div className="av">{tm.av}</div><div><b>{tm.n}</b><span>{tm.r}</span></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- CATALOG ---------------- */
function Catalog({onNav, initial, lang}){
  const I = window.MA_I, Btn = window.MA_Btn, PC = window.MA_ProductCard;
  const [cat, setCat] = useStateP(initial?.cat || 'all');
  const [occ, setOcc] = useStateP([]);
  const [fabrics, setFabrics] = useStateP([]);
  const [maxPrice, setMaxPrice] = useStateP(25000);
  const [sort, setSort] = useStateP('featured');
  const [drawer, setDrawer] = useStateP(false);

  const toggle = (arr,set,v)=> set(arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]);

  const list = useMemoP(()=>{
    let r = window.MA_PRODUCTS.filter(p=>
      (cat==='all'||p.cat===cat) &&
      (occ.length===0||p.occ.some(o=>occ.includes(o))) &&
      (fabrics.length===0||fabrics.includes(p.fabric)) &&
      p.min<=maxPrice
    );
    if(sort==='low') r=[...r].sort((a,b)=>a.min-b.min);
    if(sort==='high') r=[...r].sort((a,b)=>b.min-a.min);
    return r;
  }, [cat,occ,fabrics,maxPrice,sort]);

  const reset = ()=>{ setCat('all'); setOcc([]); setFabrics([]); setMaxPrice(25000); };

  const FilterBody = () => (
    <>
      <div className="fgroup">
        <div className="ft">Category</div>
        <div className="chip-row">
          <button className={`chip ${cat==='all'?'on':''}`} onClick={()=>setCat('all')}>All</button>
          {window.MA_CATEGORIES.map(c=>(
            <button key={c.id} className={`chip ${cat===c.id?'on':''}`} onClick={()=>setCat(c.id)}>{window.MA_CAT_LABEL[c.id]}</button>
          ))}
        </div>
      </div>
      <div className="fgroup">
        <div className="ft">Occasion</div>
        {window.MA_OCCASIONS.map(o=>(
          <label className="opt" key={o}><input type="checkbox" checked={occ.includes(o)} onChange={()=>toggle(occ,setOcc,o)}/>{o}</label>
        ))}
      </div>
      <div className="fgroup">
        <div className="ft">Fabric</div>
        {window.MA_FABRICS.map(f=>(
          <label className="opt" key={f}><input type="checkbox" checked={fabrics.includes(f)} onChange={()=>toggle(fabrics,setFabrics,f)}/>{f}</label>
        ))}
      </div>
      <div className="fgroup">
        <div className="ft">Max price · {window.MA_money(maxPrice)}</div>
        <input type="range" min="900" max="25000" step="100" value={maxPrice} onChange={e=>setMaxPrice(+e.target.value)} style={{width:'100%',accentColor:'var(--teal)'}}/>
      </div>
      <Btn variant="ghost" size="sm" onClick={reset} style={{paddingLeft:0}}>Clear all filters</Btn>
    </>
  );

  return (
    <>
      <div className="pageintro">
        <div className="wrap">
          <div className="crumb">Product Catalog</div>
          <h1>Banarasi sarees, stoles, suits & fabric</h1>
          <p>Every piece is factory-direct from our Lallapura looms. Tap “Order on WhatsApp” for live pricing and to confirm your piece.</p>
        </div>
      </div>
      <section className="block">
        <div className="wrap">
          <div className="catalog">
            <aside className="filters">
              <h4>Filter</h4>
              <FilterBody/>
            </aside>
            <div>
              <div className="catalog-top">
                <span className="count">{list.length} {list.length===1?'piece':'pieces'}</span>
                <div style={{display:'flex',gap:10}}>
                  <Btn variant="outline" size="sm" className="filter-toggle" icon={<I.filter/>} onClick={()=>setDrawer(true)}>Filters</Btn>
                  <select value={sort} onChange={e=>setSort(e.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                  </select>
                </div>
              </div>
              {list.length===0
                ? <div className="empty">No pieces match those filters.<br/><Btn variant="ghost" size="sm" onClick={reset}>Clear filters</Btn></div>
                : <div className="prod-grid">{list.map(p=><PC key={p.id} p={p} lang={lang} onNav={onNav}/>)}</div>}
            </div>
          </div>
        </div>
      </section>

      {/* mobile filter drawer */}
      {drawer && (
        <div onClick={()=>setDrawer(false)} style={{position:'absolute',inset:0,zIndex:70,background:'rgba(0,0,0,.45)'}}>
          <div onClick={e=>e.stopPropagation()} style={{position:'absolute',bottom:0,left:0,right:0,background:'var(--bg)',borderRadius:'18px 18px 0 0',padding:'18px',maxHeight:'85%',overflowY:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <b style={{fontSize:17,fontFamily:'var(--display)'}}>Filters</b>
              <button className="x" onClick={()=>setDrawer(false)} style={{width:34,height:34}}><I.x/></button>
            </div>
            <FilterBody/>
            <Btn variant="primary" className="btn-block mt16" onClick={()=>setDrawer(false)}>Show {list.length} results</Btn>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- WHOLESALE ---------------- */
function Wholesale({onNav}){
  const I = window.MA_I, Btn = window.MA_Btn;
  const [form, setForm] = useStateP({name:'',biz:'',city:'',phone:'',products:'Banarasi Sarees',qty:'',found:''});
  const [errors, setErrors] = useStateP({});
  const [done, setDone] = useStateP(false);
  const set = (k,v)=> setForm(f=>({...f,[k]:v}));
  const submit = (e)=>{
    e.preventDefault();
    const er={};
    if(!form.name.trim()) er.name='Please enter your name';
    if(!form.biz.trim()) er.biz='Business name required';
    if(!form.city.trim()) er.city='City required';
    if(!/^[0-9+\s-]{8,}$/.test(form.phone)) er.phone='Enter a valid WhatsApp number';
    if(!form.qty.trim()) er.qty='Quantity required';
    setErrors(er);
    if(Object.keys(er).length) return;
    window.MA_addLead && window.MA_addLead({name:form.name, phone:form.phone, source:'form', interest:`Wholesale · ${form.products} · ${form.qty}`, status:'New'});
    setDone(true);
  };
  return (
    <>
      <div className="pageintro">
        <div className="wrap">
          <div className="crumb">Wholesale & Bulk Orders</div>
          <h1>M. A. Sarees — Wholesale Portal</h1>
          <p>Factory pricing for boutiques, resellers and bulk buyers across India. No middlemen, custom weaving, and tiered rates that improve with volume.</p>
        </div>
      </div>

      <section className="block">
        <div className="wrap">
          <div className="split">
            <div>
              <span className="eyebrow">Why buy wholesale from us</span>
              <h2 style={{fontSize:30,margin:'10px 0 22px'}}>Straight from the loom floor</h2>
              <ul className="benefits">
                {[['factory','Factory pricing','Buy at source — the same looms that supply premium retail brands.'],
                  ['tag','No middleman','Margins stay with you, not a chain of distributors.'],
                  ['truck','Pan-India delivery','Insured dispatch to 10+ cities, packed for resale.'],
                  ['scissors','Custom weaving','Your colours, motifs and private-label borders on bulk orders.']].map(([ic,b,s])=>{
                  const Icon=I[ic]; return (
                  <li key={b}><div className="bk"><Icon/></div><div><b>{b}</b><span>{s}</span></div></li>
                );})}
              </ul>

              <h3 style={{fontSize:20,margin:'34px 0 14px'}}>Minimum order quantities</h3>
              <table className="moq-table">
                <thead><tr><th>Category</th><th>MOQ</th><th>Lead time</th></tr></thead>
                <tbody>{window.MA_MOQ.map(m=><tr key={m.cat}><td>{m.cat}</td><td className="tier">{m.moq}</td><td>{m.lead}</td></tr>)}</tbody>
              </table>

              <div className="gated mt24">
                <span className="lock"><I.lock style={{width:13,height:13}}/>Bulk pricing tiers</span>
                <p style={{margin:'0 0 8px',color:'rgba(255,255,255,.74)',fontSize:14}}>{done?'Unlocked — here are your factory tiers:':'Submit the inquiry form to unlock live tier pricing.'}</p>
                <div className={`tier-rows ${done?'unlocked':''}`}>
                  {window.MA_TIERS.map(t=><div className="tier-row" key={t.q}><span>{t.q}</span><b style={{color:'var(--gold-soft)'}}>{t.d}</b></div>)}
                </div>
              </div>
            </div>

            <div className="form-card">
              {done ? (
                <div className="form-success">
                  <div className="ck"><I.check/></div>
                  <h3 style={{fontSize:22}}>Inquiry received!</h3>
                  <p style={{color:'var(--gray)',margin:'8px 0 18px'}}>Anas from our wholesale team will WhatsApp you within 1 business hour with tier pricing and a catalog link.</p>
                  <Btn as="a" href={window.MA_wa('Namaste! I just submitted a wholesale inquiry on your website.')} variant="wa" icon={<I.wa/>}>Message us now</Btn>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h3 style={{fontSize:22,marginBottom:4}}>Wholesale Inquiry</h3>
                  <p style={{color:'var(--gray)',fontSize:14,margin:'0 0 18px'}}>Goes straight to Abu Bhai & Anas via email + WhatsApp.</p>
                  <div className="grid2">
                    <Field label="Your Name" req v={form.name} on={v=>set('name',v)} err={errors.name}/>
                    <Field label="Business Name" req v={form.biz} on={v=>set('biz',v)} err={errors.biz}/>
                    <Field label="City" req v={form.city} on={v=>set('city',v)} err={errors.city}/>
                    <Field label="WhatsApp Number" req v={form.phone} on={v=>set('phone',v)} err={errors.phone} placeholder="+91"/>
                  </div>
                  <div className="field">
                    <label>Products Interested</label>
                    <select value={form.products} onChange={e=>set('products',e.target.value)}>
                      {window.MA_CATEGORIES.map(c=><option key={c.id}>{c.en}</option>)}
                      <option>Mixed / Multiple categories</option>
                    </select>
                  </div>
                  <Field label="Quantity Required" req v={form.qty} on={v=>set('qty',v)} err={errors.qty} placeholder="e.g. 50 sarees"/>
                  <div className="field">
                    <label>How did you find us?</label>
                    <select value={form.found} onChange={e=>set('found',e.target.value)}>
                      <option value="">Select…</option>
                      <option>Google Search</option><option>Instagram / Social</option><option>Referral</option><option>WhatsApp</option><option>Other</option>
                    </select>
                  </div>
                  <Btn variant="primary" className="btn-block" type="submit" icon={<I.arrow/>}>Submit Wholesale Inquiry</Btn>
                  <p style={{textAlign:'center',fontSize:12,color:'var(--gray)',margin:'12px 0 0'}}>We reply within 1 business hour · Mon–Sat</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* shared field */
function Field({label, req, v, on, err, placeholder, type='text'}){
  return (
    <div className={`field ${err?'err':''}`}>
      <label>{label}{req&&<span className="req"> *</span>}</label>
      <input type={type} value={v} onChange={e=>on(e.target.value)} placeholder={placeholder}/>
      {err && <div className="msg">{err}</div>}
    </div>
  );
}

Object.assign(window, {MA_Home:Home, MA_Catalog:Catalog, MA_Wholesale:Wholesale, MA_Field:Field});
