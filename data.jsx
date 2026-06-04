/* M. A. Sarees — content + catalogue data (window.MA) */
const BIZ = {
  name:'M. A. Sarees',
  tagline:'Silk Factory',
  estd:'Est. Varanasi',
  address:'C 15/345-A-1-A, Lallapura, Varanasi 221001, U.P.',
  whatsapp:'9305453226',
  phones:[
    {name:'Abu Bhai', num:'8299459682'},
    {name:'Anas', num:'9794476400'},
    {name:'Adnan', num:'9696156849'},
  ],
  hours:'Mon – Sat · 10 AM – 8 PM',
  email:'hello@masarees.in',
};

// pre-filled WhatsApp deep link
const wa = (msg) => `https://wa.me/91${BIZ.whatsapp}?text=${encodeURIComponent(msg||'Namaste! I would like to know more about your sarees.')}`;

const CATEGORIES = [
  {id:'saree', en:'Banarasi Sarees', hi:'बनारसी साड़ी', blurb:'Pure Katan, Tissue, Organza, Shikargah & Jangla', ph:'navy'},
  {id:'stole',  en:'Silk Stoles', hi:'रेशमी स्टोल', blurb:'Silk, Chiffon & cotton-silk blends', ph:'gold'},
  {id:'suit',   en:'Ladies Suit', hi:'सूट सेट', blurb:'Banarasi suit sets & printed kurta sets', ph:'cream'},
  {id:'fabric', en:'Dress Material', hi:'ड्रेस मटेरियल', blurb:'Running fabric, zari fabric & brocade', ph:''},
];

const CAT_LABEL = {saree:'Saree', stole:'Stole', suit:'Suit', fabric:'Fabric'};
const FABRICS = ['Pure Katan Silk','Tissue Silk','Georgette','Organza','Chiffon','Cotton Silk','Brocade','Zari Fabric'];
const OCCASIONS = ['Wedding','Festival','Daily','Gift'];

const PRODUCTS = [
  {id:'KAT-101', cat:'saree', en:'Royal Katan Silk Saree', hi:'रॉयल कातान सिल्क साड़ी', fabric:'Pure Katan Silk', occ:['Wedding','Gift'], min:18500, pure:true, ph:'navy', tag:'Bestseller'},
  {id:'SHK-204', cat:'saree', en:'Shikargah Bridal Saree', hi:'शिकारगाह ब्राइडल साड़ी', fabric:'Pure Katan Silk', occ:['Wedding'], min:24000, pure:true, ph:'gold', tag:'Premium'},
  {id:'JNG-118', cat:'saree', en:'Jangla Zari Saree', hi:'जंगला ज़री साड़ी', fabric:'Pure Katan Silk', occ:['Wedding','Festival'], min:16500, pure:true, ph:'cream'},
  {id:'TIS-301', cat:'saree', en:'Tissue Silk Saree', hi:'टिशू सिल्क साड़ी', fabric:'Tissue Silk', occ:['Festival','Gift'], min:8900, pure:false, ph:'gold'},
  {id:'ORG-410', cat:'saree', en:'Organza Banarasi Saree', hi:'ऑर्गेंज़ा बनारसी साड़ी', fabric:'Organza', occ:['Festival','Gift'], min:7200, pure:false, ph:'navy'},
  {id:'GEO-512', cat:'saree', en:'Georgette Banarasi Saree', hi:'जॉर्जेट बनारसी साड़ी', fabric:'Georgette', occ:['Festival','Daily'], min:4300, pure:false, ph:'cream'},
  {id:'GEO-518', cat:'saree', en:'Everyday Georgette Saree', hi:'डेली जॉर्जेट साड़ी', fabric:'Georgette', occ:['Daily'], min:2800, pure:false, ph:''},
  {id:'STL-602', cat:'stole', en:'Pure Silk Banarasi Stole', hi:'प्योर सिल्क स्टोल', fabric:'Pure Katan Silk', occ:['Gift','Festival'], min:3200, pure:true, ph:'gold'},
  {id:'STL-611', cat:'stole', en:'Chiffon Zari Stole', hi:'शिफॉन ज़री स्टोल', fabric:'Chiffon', occ:['Daily','Gift'], min:1600, pure:false, ph:'navy'},
  {id:'STL-620', cat:'stole', en:'Cotton-Silk Blend Stole', hi:'कॉटन सिल्क स्टोल', fabric:'Cotton Silk', occ:['Daily'], min:1200, pure:false, ph:'cream'},
  {id:'SUT-704', cat:'suit', en:'Banarasi Suit Set', hi:'बनारसी सूट सेट', fabric:'Pure Katan Silk', occ:['Wedding','Festival'], min:6800, pure:true, ph:'navy'},
  {id:'SUT-712', cat:'suit', en:'Printed Kurta Set', hi:'प्रिंटेड कुर्ता सेट', fabric:'Cotton Silk', occ:['Daily','Festival'], min:2400, pure:false, ph:'gold'},
  {id:'FAB-803', cat:'fabric', en:'Pure Zari Running Fabric', hi:'ज़री रनिंग फ़ैब्रिक', fabric:'Zari Fabric', occ:['Wedding'], min:1400, pure:true, ph:'cream', unit:'/ metre'},
  {id:'FAB-810', cat:'fabric', en:'Brocade Fabric (per m)', hi:'ब्रोकेड फ़ैब्रिक', fabric:'Brocade', occ:['Festival'], min:950, pure:false, ph:'navy', unit:'/ metre'},
  {id:'FAB-820', cat:'fabric', en:'Banarasi Silk Running Fabric', hi:'सिल्क रनिंग फ़ैब्रिक', fabric:'Tissue Silk', occ:['Festival','Gift'], min:1100, pure:false, ph:'gold', unit:'/ metre'},
];

const USPS = [
  {icon:'factory', t:'Factory Direct', d:'No middlemen — woven in our own Lallapura looms and shipped straight to you.'},
  {icon:'heritage', t:'50+ Years Heritage', d:'Three generations of master weavers carrying forward the Banarasi craft.'},
  {icon:'seal', t:'GI-Certified Silk', d:'Authentic Banarasi handloom protected under the Geographical Indication tag.'},
  {icon:'truck', t:'Pan-India Delivery', d:'Trusted dispatch to retailers, boutiques and homes across every state.'},
  {icon:'scissors', t:'Custom Orders', d:'Bespoke colours, motifs and bulk weaving to your exact specification.'},
  {icon:'tag', t:'Wholesale Available', d:'Tiered factory pricing for boutiques, resellers and bulk buyers.'},
];

const TRUST = [
  {icon:'pin', b:'Est. in Varanasi', s:'Lallapura looms'},
  {icon:'seal', b:'GI Certified', s:'Authentic Banarasi'},
  {icon:'truck', b:'Pan-India Wholesale', s:'10+ cities served'},
  {icon:'tag', b:'Factory-Direct Pricing', s:'No middlemen'},
];

const TESTIMONIALS = [
  {q:'Ordered 40 sarees for my Delhi boutique. The Katan quality is exactly factory-grade and the WhatsApp ordering made reordering effortless.', n:'Ramesh Gupta', r:'Boutique Owner · Delhi', av:'R'},
  {q:'Bought a Shikargah saree for my daughter\u2019s wedding. Photos did not do justice — the zari work is breathtaking in person.', n:'Sunita Devi', r:'Retail Customer · Lucknow', av:'S'},
  {q:'As an NRI I was nervous about authenticity. They shared the GI documentation and shipped to London beautifully packed. Truly genuine Banarasi.', n:'Anjali Mehra', r:'NRI Buyer · London', av:'A'},
];

const MOQ = [
  {cat:'Banarasi Sarees', moq:'10 pcs', lead:'7–12 days'},
  {cat:'Silk Stoles', moq:'20 pcs', lead:'5–8 days'},
  {cat:'Ladies Suit Sets', moq:'15 pcs', lead:'8–12 days'},
  {cat:'Dress Material / Fabric', moq:'50 metres', lead:'6–10 days'},
];

const TIERS = [
  {q:'10–24 pcs', d:'Standard factory rate'},
  {q:'25–49 pcs', d:'8% off factory rate'},
  {q:'50–99 pcs', d:'15% off + free dispatch'},
  {q:'100+ pcs / custom', d:'Bespoke quote + priority weaving'},
];

const TEAM = [
  {n:'Abu Bhai', role:'Founder & Master Weaver', d:'Leads the loom floor and quality control across every weave.', ph:'navy'},
  {n:'Anas', role:'Wholesale & Operations', d:'Manages bulk orders, dispatch and pan-India retailer relations.', ph:'gold'},
  {n:'Adnan', role:'Retail & Customer Care', d:'Helps families and NRI buyers find their perfect saree.', ph:'cream'},
];

// seed leads for admin dashboard
const SEED_LEADS = [
  {id:1, name:'Ramesh Gupta', phone:'+91 98xxxx2201', source:'wa', interest:'Katan Silk · 40 pcs', status:'Converted', when:'Today, 11:24'},
  {id:2, name:'Priya Sharma', phone:'+91 99xxxx8843', source:'chat', interest:'Wedding Saree under \u20b920k', status:'New', when:'Today, 10:02'},
  {id:3, name:'Boutique Élan', phone:'+91 80xxxx1190', source:'form', interest:'Wholesale · Stoles 200 pcs', status:'Contacted', when:'Yesterday'},
  {id:4, name:'Anjali Mehra', phone:'+44 7xxx xx9921', source:'contact', interest:'NRI · International shipping', status:'Contacted', when:'Yesterday'},
  {id:5, name:'Kavita Singh', phone:'+91 97xxxx3320', source:'chat', interest:'Festival Georgette', status:'New', when:'2 days ago'},
  {id:6, name:'Star Textiles', phone:'+91 90xxxx7765', source:'form', interest:'Wholesale · Fabric 500m', status:'New', when:'2 days ago'},
];

// i18n — English primary, Hindi accents on key UI
const I18N = {
  en:{
    nav:{home:'Home', catalog:'Catalog', wholesale:'Wholesale', advisor:'AI Advisor', about:'About', contact:'Contact'},
    waUs:'WhatsApp Us', shopNow:'Shop Collection', wholesaleCta:'Wholesale Inquiry',
    heroDeva:'असली बनारसी रेशम — सीधे कारखाने से',
    heroH1a:'Authentic Banarasi Silk —', heroH1b:'Directly from the Factory',
    heroSub:'Manufacturer · Wholesaler · Retailer for generations. Handwoven in Varanasi, shipped across India and the world.',
    orderWa:'Order on WhatsApp', reqSample:'Request Sample', viewColl:'View Collection',
    startingFrom:'Starting from',
  },
};
const t = (path) => path.split('.').reduce((o,k)=>o&&o[k], I18N.en) ?? path;

Object.assign(window, {MA_BIZ:BIZ, MA_wa:wa, MA_CATEGORIES:CATEGORIES, MA_CAT_LABEL:CAT_LABEL,
  MA_FABRICS:FABRICS, MA_OCCASIONS:OCCASIONS, MA_PRODUCTS:PRODUCTS, MA_USPS:USPS, MA_TRUST:TRUST,
  MA_TESTIMONIALS:TESTIMONIALS, MA_MOQ:MOQ, MA_TIERS:TIERS, MA_TEAM:TEAM, MA_SEED_LEADS:SEED_LEADS,
  MA_t:t, MA_money:(n)=>'\u20b9'+n.toLocaleString('en-IN')});
