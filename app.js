const addons=[
{name:"Dragon Expansion",desc:"عالم ضخم مع تنين أسطوري ومخلوقات جديدة",tags:["عالم","مخلوقات"],rating:"4.9",downloads:"12.4K",icon:"🐉",hot:true},
{name:"Modern House",desc:"بيت عصري مذهل بتصميم داخلي كامل",tags:["مباني","ديكور"],rating:"4.8",downloads:"8.7K",icon:"🏠"},
{name:"Realistic Weapons",desc:"أسلحة واقعية وقوية بتأثيرات مميزة",tags:["أسلحة","قتال"],rating:"4.9",downloads:"15.2K",icon:"🔫",hot:true},
{name:"End Portal",desc:"بوابة إندر أسطورية مع عالم سري",tags:["عالم","مغامرة"],rating:"4.8",downloads:"10.6K",icon:"🌀"},
{name:"Elemental Mobs",desc:"مخلوقات عنصرية وقدرات خاصة",tags:["كائنات","مغامرة"],rating:"4.7",downloads:"7.9K",icon:"🔥"},
{name:"Hero Characters",desc:"شخصيات وقدرات جديدة للقتال",tags:["شخصيات","قتال"],rating:"4.6",downloads:"6.3K",icon:"🦸"},
{name:"Lost Islands",desc:"جزر غامضة ومهام واستكشاف",tags:["مابات","عالم"],rating:"4.8",downloads:"9.1K",icon:"🏝️"},
{name:"Dragon Tools",desc:"أدوات ودروع تنين بقوة أسطورية",tags:["موارد","أسلحة"],rating:"4.7",downloads:"5.8K",icon:"⚒️"}
];
let favorites=new Set();
const grid=document.getElementById("addonGrid");
function render(list=addons){document.getElementById("resultCount").textContent=list.length+" إضافات";grid.innerHTML=list.map((a,i)=>`<article class="addon"><div class="art" style="background:linear-gradient(135deg,hsl(${i*35},45%,18%),#06100b)"><span>${a.icon}</span>${a.hot?'<b class="crown">رائج</b>':''}<button class="heart ${favorites.has(a.name)?"active":""}" onclick="favorite('${a.name}',this)">♡</button></div><div class="addon-body"><h3>${a.name}</h3><p>${a.desc}</p><div class="tags">${a.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div><div class="meta"><span class="rating">★ ${a.rating}</span><span>${a.downloads} ⇩</span></div><button class="download" onclick="download('${a.name}')">تحميل الآن　⇩</button></div></article>`).join("")}
function favorite(name,btn){favorites.has(name)?favorites.delete(name):favorites.add(name);btn.classList.toggle("active");toast(favorites.has(name)?"تمت الإضافة للمفضلة ❤️":"تمت الإزالة من المفضلة")}
function download(name){toast("واجهة التحميل جاهزة للربط بالـ Backend: "+name)}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove("show"),2300)}
function openModal(html){document.getElementById("modalContent").innerHTML=html;document.getElementById("modal").classList.add("open")}
function closeModal(){document.getElementById("modal").classList.remove("open")}
function openAuth(mode){openModal(mode==="login"?`<h2>تسجيل الدخول</h2><form class="form" onsubmit="event.preventDefault();closeModal();toast('تم تسجيل الدخول — الواجهة جاهزة للربط الحقيقي')"><input placeholder="البريد الإلكتروني أو اسم المستخدم" required><input type="password" placeholder="كلمة المرور" required><button>دخول</button></form>`:`<h2>إنشاء حساب</h2><form class="form" onsubmit="event.preventDefault();closeModal();toast('تم إنشاء الحساب — الواجهة جاهزة للربط الحقيقي')"><input placeholder="اسم المستخدم" required><input type="email" placeholder="البريد الإلكتروني" required><input type="password" placeholder="كلمة المرور" required><button>إنشاء الحساب</button></form>`)}
function openHelp(){openModal(`<h2>كيفية استخدام KIM ADDONS</h2><p>ابحث عن الإضافة، اختر التصنيف، افتح البطاقة ثم اضغط تحميل. بعد ربط Supabase تصبح الحسابات والتعليقات والتقييمات والتحميلات حقيقية.</p><button class="neon" onclick="closeModal()">حسناً</button>`)}
document.getElementById("search").addEventListener("input",e=>{const q=e.target.value.toLowerCase();render(addons.filter(a=>(a.name+a.desc+a.tags.join(" ")).toLowerCase().includes(q)))});
document.getElementById("searchBtn").onclick=()=>document.getElementById("addons").scrollIntoView({behavior:"smooth"});
document.querySelectorAll(".categories button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".categories button").forEach(x=>x.classList.remove("active"));b.classList.add("active");const c=b.dataset.cat;render(addons.filter(a=>a.tags.includes(c)))});
document.getElementById("viewAll").onclick=()=>{document.querySelectorAll(".categories button").forEach(x=>x.classList.remove("active"));render()};
document.getElementById("mobileBtn").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
document.getElementById("publishBtn").onclick=()=>openAuth("login");
document.getElementById("modal").onclick=e=>{if(e.target.id==="modal")closeModal()};
render();
