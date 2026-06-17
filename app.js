const DASH_HTML = `
<header class="top">
  <h1 id="h-program">RSR Program Dashboard</h1>
  <div class="sub" id="h-sub"></div>
  <div class="meta" id="h-meta"></div>
</header>

<nav class="tabs" id="tabs">
  <button data-tab="overview" class="active">Overview</button>
  <button data-tab="weekly">Weekly Updates</button>
  <button data-tab="workpackages">Work Packages</button>
  <button data-tab="timeline">Timeline</button>
  <button data-tab="gantt">Plan on a Page</button>
  <button data-tab="deliverables">Deliverables</button>
  <button data-tab="stories">Functional Build Packages</button>
  <button data-tab="gaps">Product Gaps</button>
  <button data-tab="catalog">Product Catalog</button>
  <button data-tab="payments">Payments</button>
  <button data-tab="resources">Resources</button>
  <button data-tab="newsletter">Newsletter</button>
  <span class="spacer"></span>
  <button class="toolbtn" id="editToggle" title="Toggle edit mode">✎ Edit: Off</button>
  <button class="toolbtn primary no-print" id="download" title="Download data.json to commit to Git">⬇ Save data.json</button>
</nav>

<div class="wrap">

  <!-- OVERVIEW -->
  <section class="tab active" id="overview">
    <div class="kpis" id="kpis"></div>
    <div class="card">
      <h2 class="sec">Program Details</h2>
      <div class="pgrid">
        <div><div class="l">Program Manager</div><div class="editable bindfill" data-bind="meta.projectManager"></div></div>
        <div><div class="l">Start Date</div><div class="editable bindfill" data-bind="meta.programStartDate"></div></div>
        <div><div class="l">End Date</div><div class="editable bindfill" data-bind="meta.programEndDate"></div></div>
        <div><div class="l">Account / Client</div><div class="editable bindfill" data-bind="meta.client"></div></div>
        <div><div class="l">Supplier</div><div class="editable bindfill" data-bind="meta.supplier"></div></div>
        <div><div class="l">SOW Reference</div><div class="editable bindfill" data-bind="meta.sowRef"></div></div>
      </div>
    </div>
    <div class="card">
      <h2 class="sec">Program Health — Scope · Timeline · Quality</h2>
      <p class="hint">Top-level RAG against the three reporting pillars. Edit mode lets you change status and narrative; click <b>Save data.json</b> to publish to Git.</p>
      <div class="grid3" id="pillars"></div>
    </div>
    <div class="card">
      <h2 class="sec">Executive Summary</h2>
      <p class="editable bindfill" data-bind="meta.overallNarrative" style="margin:0"></p>
    </div>
    <div class="card" style="border-left:4px solid var(--brand2)">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <h2 class="sec" style="margin:0">Weekly Update — <span class="editable bindfill" data-bind="meta.reportWeek"></span></h2>
        <span style="flex:1"></span>
        <button class="toolbtn warn no-print" id="archiveWeek" title="Save this week as a snapshot in the archive">📌 Archive this week</button>
      </div>
      <p class="hint">Update the three lists, set the week label, then click <b>Archive this week</b> to snapshot it into the Weekly Updates archive — and <b>Save data.json</b> + commit so every user can see it. Lists also flow into the Newsletter.</p>
      <div class="grid3">
        <div class="pillar" style="background:#f0fdf4">
          <h3>✓ Accomplished this week</h3>
          <ul id="wkAcc" style="margin:6px 0 0;padding-left:18px;font-size:12.5px"></ul>
          <div class="addrow no-print"><button class="toolbtn" data-addlist="weekly.accomplishments">+ Add</button></div>
        </div>
        <div class="pillar" style="background:#eff6ff">
          <h3>→ Planned next week</h3>
          <ul id="wkPlan" style="margin:6px 0 0;padding-left:18px;font-size:12.5px"></ul>
          <div class="addrow no-print"><button class="toolbtn" data-addlist="weekly.planned">+ Add</button></div>
        </div>
        <div class="pillar" style="background:#fef2f2">
          <h3>⚠ Blockers / Issues</h3>
          <ul id="wkBlock" style="margin:6px 0 0;padding-left:18px;font-size:12.5px"></ul>
          <div class="addrow no-print"><button class="toolbtn" data-addlist="weekly.blockers">+ Add</button></div>
        </div>
      </div>
    </div>
    <div class="card">
      <h2 class="sec">Top Risks &amp; Watch Items</h2>
      <table id="risks"><thead><tr><th>ID</th><th>Risk</th><th>Impact</th><th class="pillcell">RAG</th><th>Mitigation</th><th class="no-print"></th></tr></thead><tbody></tbody></table>
      <div class="addrow no-print"><button class="toolbtn" data-add="risks">+ Add risk</button></div>
    </div>
  </section>

  <!-- WEEKLY UPDATES ARCHIVE -->
  <section class="tab" id="weekly">
    <div class="card">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <h2 class="sec" style="margin:0">Weekly Updates — Archive</h2>
        <span style="flex:1"></span>
        <label style="font-size:12px;color:var(--muted)">View week:</label>
        <select class="st" id="weekPicker"></select>
      </div>
      <p class="hint">Every archived week is saved here and available on demand to all viewers. Newest first. Use the picker to read any past week.</p>
      <div id="weekSnapshot"></div>
    </div>
    <div class="card">
      <h2 class="sec">All Weeks</h2>
      <table id="weekTable"><thead><tr><th>Week</th><th class="pillcell">Status</th><th class="pillcell">Complete</th><th>Summary</th><th class="no-print"></th></tr></thead><tbody></tbody></table>
    </div>
  </section>

  <!-- WORK PACKAGES -->
  <section class="tab" id="workpackages">
    <div class="card">
      <h2 class="sec">Work Packages (Scope)</h2>
      <p class="hint">The 11 SOW work packages that move the program forward. % complete and RAG roll up into the Overview KPIs.</p>
      <table id="wpTable"><thead><tr>
        <th>WP</th><th>Name</th><th>Owner</th><th>Phase</th><th class="pillcell">Status</th><th>Progress</th><th class="pillcell">RAG</th><th>Note</th><th class="no-print"></th>
      </tr></thead><tbody></tbody></table>
      <div class="addrow no-print"><button class="toolbtn" data-add="workPackages">+ Add work package</button></div>
    </div>
    <div class="card">
      <h2 class="sec">Scope Detail — click to drill into Entry / Exit Criteria</h2>
      <p class="hint">Each work package expands to its scope, SOW Entry &amp; Exit Criteria, and deliverables.</p>
      <div id="wpDetail"></div>
    </div>
  </section>

  <!-- TIMELINE -->
  <section class="tab" id="timeline">
    <div class="card">
      <h2 class="sec">Milestone Timeline (DM0 → DM16)</h2>
      <p class="hint">Payment / delivery milestones PM1–PM9 across the 16-month delivery window. Bars position by delivery month.</p>
      <div class="tlaxis"><div>Milestone</div><div class="ticks" id="tlticks"></div></div>
      <div class="timeline" id="timelineBars"></div>
      <div class="legend">
        <span><span class="dot" style="background:var(--green)"></span>Complete</span>
        <span><span class="dot" style="background:var(--blue)"></span>In Progress</span>
        <span><span class="dot" style="background:var(--grey)"></span>Not Started</span>
      </div>
    </div>
    <div class="card">
      <h2 class="sec">Milestone Schedule</h2>
      <table id="msTable"><thead><tr>
        <th>PM</th><th>Del Month</th><th>Phase</th><th>Milestone</th><th>Trigger / Deliverables</th><th class="pillcell">% Price</th><th class="pillcell">Status</th><th class="no-print"></th>
      </tr></thead><tbody></tbody></table>
      <div class="addrow no-print"><button class="toolbtn" data-add="milestones">+ Add milestone</button></div>
    </div>
  </section>

  <!-- PLAN ON A PAGE (GANTT) -->
  <section class="tab" id="gantt">
    <div class="card">
      <h2 class="sec">Plan on a Page — Implementation Timeline</h2>
      <p class="hint">Swimlane Gantt across the program months. In the admin, edit the tables below the chart to set the date range, add streams, tasks/sub-tasks with start &amp; end months, and milestone flags — the chart updates live.</p>
      <div style="overflow-x:auto"><div id="ganttChart"></div></div>
    </div>
    <div class="card no-print" id="ganttEdit"></div>
  </section>

  <!-- DELIVERABLES -->
  <section class="tab" id="deliverables">
    <div class="card">
      <h2 class="sec">Deliverables Register</h2>
      <p class="hint">Acceptance-tracked deliverables with draft/final target months (SOW Part F / acceptance schedule).</p>
      <table id="delTable"><thead><tr>
        <th style="width:18px"></th><th>Phase</th><th>Deliverable</th><th>Acceptance Criteria</th><th class="pillcell">Draft</th><th class="pillcell">Final</th><th class="pillcell">Status</th><th class="no-print"></th>
      </tr></thead><tbody></tbody></table>
      <div class="addrow no-print"><button class="toolbtn" data-add="deliverables">+ Add deliverable</button></div>
    </div>
  </section>

  <!-- OOTB -->
  <section class="tab" id="stories">
    <div class="card">
      <h2 class="sec">Functional Build Packages</h2>
      <p class="hint">User stories as line items — track status and progress, and allocate the resource doing the work. Assignees come from the Resources tab.</p>
      <div class="kpis" id="storyKpis" style="grid-template-columns:repeat(4,1fr)"></div>
      <table id="storyTable"><thead><tr>
        <th>ID</th><th>User Story</th><th>Area</th><th class="pillcell">Platform</th><th class="pillcell">Type</th><th class="pillcell">Assignee</th><th class="pillcell">Status</th><th>Progress</th><th class="pillcell">Sprint</th><th class="no-print"></th>
      </tr></thead><tbody></tbody></table>
      <div class="addrow no-print"><button class="toolbtn" data-add="stories">+ Add user story</button></div>
    </div>
    <div class="card">
      <h2 class="sec">Allocation — Who’s Doing What</h2>
      <p class="hint">Rolled up from the Assignee column. Helps see workload and unassigned stories at a glance.</p>
      <table id="allocTable"><thead><tr><th>Resource</th><th class="pillcell">Stories</th><th class="pillcell">In Progress</th><th class="pillcell">Complete</th><th class="pillcell">Avg Progress</th></tr></thead><tbody></tbody></table>
    </div>
  </section>

  <!-- GAPS -->
  <section class="tab" id="gaps">
    <div class="card">
      <h2 class="sec">Product Gaps Register</h2>
      <p class="hint">Where OOTB does not meet a requirement — with disposition (Adopt / Configure / Adapt / Customise) and owner.</p>
      <table id="gapTable"><thead><tr>
        <th>ID</th><th>Area</th><th>Description</th><th class="pillcell">OOTB?</th><th class="pillcell">Disposition</th><th class="pillcell">Priority</th><th class="pillcell">Status</th><th>Owner</th><th class="no-print"></th>
      </tr></thead><tbody></tbody></table>
      <div class="addrow no-print"><button class="toolbtn" data-add="gaps">+ Add gap</button></div>
    </div>
  </section>

  <!-- CATALOG -->
  <section class="tab" id="catalog">
    <div class="card">
      <h2 class="sec">Product Catalog</h2>
      <p class="hint">Products, charges and adjustments being configured across G2 and VFN.</p>
      <table id="catTable"><thead><tr>
        <th>Catalog Item</th><th class="pillcell">Type</th><th class="pillcell">Platform</th><th class="pillcell">Status</th><th>Note</th><th class="no-print"></th>
      </tr></thead><tbody></tbody></table>
      <div class="addrow no-print"><button class="toolbtn" data-add="catalog">+ Add item</button></div>
    </div>
  </section>

  <!-- PAYMENTS -->
  <section class="tab" id="payments">
    <div class="card">
      <h2 class="sec">Payment Milestones</h2>
      <p class="hint">Milestone-based payment schedule (SOW Part B). Amounts are blank in the customer SOW — enter values as agreed; the total updates automatically.</p>
      <table id="payTable"><thead><tr>
        <th>PM</th><th>Del Month</th><th>Milestone</th><th class="pillcell">% of Total</th><th class="pillcell">Amount (ex GST)</th><th class="pillcell">Invoice Status</th><th class="no-print"></th>
      </tr></thead><tbody></tbody><tfoot></tfoot></table>
      <div class="addrow no-print"><button class="toolbtn" data-add="payments">+ Add payment</button></div>
    </div>
  </section>

  <!-- RESOURCES -->
  <section class="tab" id="resources">
    <div class="card">
      <h2 class="sec">Resources / Key Personnel</h2>
      <p class="hint">Program team across Gentrack and Horizon Power (SOW Part G). Track names, roles, allocation and onboarding status.</p>
      <div class="kpis" id="resKpis" style="grid-template-columns:repeat(4,1fr)"></div>
      <table id="resTable"><thead><tr>
        <th>Name</th><th class="pillcell">Org</th><th>Role</th><th>Responsibility</th><th class="pillcell">Location</th><th class="pillcell">Availability</th><th class="pillcell">Status</th><th class="no-print"></th>
      </tr></thead><tbody></tbody></table>
      <div class="addrow no-print"><button class="toolbtn" data-add="resources">+ Add resource</button></div>
    </div>
  </section>

  <!-- NEWSLETTER -->
  <section class="tab" id="newsletter">
    <div class="card no-print" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <h2 class="sec" style="margin:0">Management Newsletter</h2>
      <span class="spacer" style="flex:1"></span>
      <button class="toolbtn" id="copyNews">📋 Copy (rich)</button>
      <button class="toolbtn" id="copyNewsText">📋 Copy (plain text)</button>
      <button class="toolbtn primary" id="mailNews">✉ Open in email</button>
      <button class="toolbtn" onclick="window.print()">🖨 Print / PDF</button>
    </div>
    <p class="hint no-print">Auto-generated from the current dashboard data. Update the dashboard, then copy this into your email or click "Open in email".</p>
    <div class="news"><div class="paper" id="newsPaper"></div></div>
  </section>

  <div class="footer" id="footer"></div>
</div>

`;


/* ---------- Embedded fallback so the file works opened directly (file://) ---------- */
let DATA={};
let EDIT=false;

const RAGS = ["Green","Amber","Red"];
const WP_STATUS = ["Not Started","In Progress","Complete","At Risk","On Hold"];
const ragClass = s => ({Green:'b-green',Amber:'b-amber',Red:'b-red'}[s]||'b-grey');
const stClass = s => ({"Complete":'b-green',"In Progress":'b-blue',"At Risk":'b-red',"On Hold":'b-amber',"Not Started":'b-grey',"Under Review":'b-amber','Configured':'b-green','Open':'b-amber'}[s]||'b-grey');
const ragColor = s => ({Green:'var(--green)',Amber:'var(--amber)',Red:'var(--red)'}[s]||'var(--grey)');
const payClass = s => ({Paid:'b-green',Invoiced:'b-blue','Not Due':'b-grey',Overdue:'b-red'}[s]||'b-grey');
const orgClass = s => (s==='Gentrack'?'b-blue':'b-amber');
function dmToDate(dm){ // DM number -> "Mon YYYY" using programStartDate as DM0
  const start=DATA.meta.programStartDate; if(!start) return '';
  const n=parseInt(String(dm).replace(/\D/g,''))||0;
  const d=new Date(start+'T00:00:00'); if(isNaN(d)) return '';
  d.setMonth(d.getMonth()+n);
  return d.toLocaleDateString('en-AU',{month:'short',year:'numeric'});
}

/* ---------- helpers ---------- */
function esc(s){return (s==null?'':String(s)).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function ce(bind,val){ // editable text cell
  return `<span class="editable" data-bind="${bind}">${esc(val)}</span>`;
}
function ragSelect(bind,val){
  if(!EDIT) return `<span class="badge ${ragClass(val)}">${esc(val)}</span>`;
  return `<select class="st" data-bind="${bind}">`+RAGS.map(r=>`<option ${r===val?'selected':''}>${r}</option>`).join('')+`</select>`;
}
function statusSelect(bind,val,opts){
  opts=opts||WP_STATUS;
  if(!opts.includes(val)) opts=[val,...opts];
  if(!EDIT) return `<span class="badge ${stClass(val)}">${esc(val)}</span>`;
  return `<select class="st" data-bind="${bind}">`+opts.map(o=>`<option ${o===val?'selected':''}>${o}</option>`).join('')+`</select>`;
}
function delBtn(arr,i){ return EDIT?`<td class="row-actions"><button class="xbtn" data-del="${arr}:${i}" title="Delete row">✕</button></td>`:'<td class="no-print"></td>'; }
function moveCtrls(arr,i,len){
  if(!EDIT) return '<td class="no-print"></td>';
  const up=i>0, dn=i<len-1;
  return `<td class="row-actions" style="white-space:nowrap">`+
    `<button class="mvbtn" data-move="${arr}:${i}:-1" title="Move up" ${up?'':'disabled'}>▲</button>`+
    `<button class="mvbtn" data-move="${arr}:${i}:1" title="Move down" ${dn?'':'disabled'}>▼</button>`+
    `<button class="xbtn" data-del="${arr}:${i}" title="Delete row">✕</button></td>`;
}
function moveRow(arr,i,dir){
  const a=DATA[arr]; const j=i+dir;
  if(j<0||j>=a.length) return;
  const t=a[i]; a[i]=a[j]; a[j]=t;
  renderAll();
}

/* ---------- renderers ---------- */
function renderHeader(){
  const m=DATA.meta;
  document.getElementById('h-program').textContent=m.program+' — Program Dashboard';
  document.getElementById('h-sub').textContent=m.subtitle;
  const fd=s=>{ if(!s)return '—'; const d=new Date(s+'T00:00:00'); return isNaN(d)?s:(String(d.getDate()).padStart(2,'0')+'/'+String(d.getMonth()+1).padStart(2,'0')+'/'+d.getFullYear()); };
  document.getElementById('h-meta').innerHTML=[
    ['Client',m.client],['Supplier',m.supplier],['PM',m.projectManager||'—'],
    ['Start',fd(m.programStartDate)],['End',fd(m.programEndDate)],['Reporting',m.reportWeek]
  ].map(([k,v])=>`<span><b>${esc(k)}:</b> ${esc(v)}</span>`).join('');
  document.getElementById('footer').textContent=`${m.program} · ${m.sowRef} · generated from data.json · ${m.reportDate}`;
}

function renderKpis(){
  const wp=DATA.workPackages;
  const avg=wp.length?Math.round(wp.reduce((a,b)=>a+(+b.pct||0),0)/wp.length):0;
  const done=wp.filter(w=>w.status==='Complete').length;
  const inprog=wp.filter(w=>w.status==='In Progress').length;
  const ms=DATA.milestones, msDone=ms.filter(x=>x.status==='Complete').length;
  document.getElementById('kpis').innerHTML=[
    ['Overall Complete',avg+'%'],['Work Packages',`${done}/${wp.length} done`],
    ['In Progress',inprog+' WPs'],['Milestones',`${msDone}/${ms.length} met`]
  ].map(([l,n])=>`<div class="kpi"><div class="n">${esc(n)}</div><div class="l">${esc(l)}</div></div>`).join('');
}

function renderPillars(){
  document.getElementById('pillars').innerHTML=DATA.pillars.map((p,i)=>`
    <div class="pillar" style="background:${p.status==='Green'?'#f0fdf4':p.status==='Amber'?'#fffbeb':'#fef2f2'}">
      <h3>${esc(p.name)} ${ragSelect('pillars.'+i+'.status',p.status)}</h3>
      <p class="editable" data-bind="pillars.${i}.summary">${esc(p.summary)}</p>
    </div>`).join('');
}

function renderRisks(){
  const tb=document.querySelector('#risks tbody');
  tb.innerHTML=DATA.risks.map((r,i)=>`<tr>
    <td>${ce('risks.'+i+'.id',r.id)}</td>
    <td>${ce('risks.'+i+'.title',r.title)}</td>
    <td>${ce('risks.'+i+'.impact',r.impact)}</td>
    <td class="pillcell">${ragSelect('risks.'+i+'.rag',r.rag)}</td>
    <td>${ce('risks.'+i+'.mitigation',r.mitigation)}</td>
    ${delBtn('risks',i)}
  </tr>`).join('');
}

function renderList(elId,arrPath){
  const arr=arrPath.split('.').reduce((o,k)=>o[k],DATA);
  document.getElementById(elId).innerHTML=arr.map((t,i)=>
    `<li><span class="editable" data-bind="${arrPath}.${i}">${esc(t)}</span>${EDIT?` <button class="xbtn" data-dellist="${arrPath}:${i}" title="Remove">✕</button>`:''}</li>`
  ).join('')||'<li style="color:#94a3b8">—</li>';
}
function renderWeekly(){
  renderList('wkAcc','weekly.accomplishments');
  renderList('wkPlan','weekly.planned');
  renderList('wkBlock','weekly.blockers');
}
let weekView=0;
function renderWeeklyArchive(){
  const arr=DATA.weeklyUpdates||[];
  const pick=document.getElementById('weekPicker');
  if(weekView>=arr.length) weekView=0;
  pick.innerHTML=arr.map((w,i)=>`<option value="${i}" ${i===weekView?'selected':''}>${esc(w.week)}</option>`).join('')||'<option>No weeks archived yet</option>';
  pick.onchange=()=>{ weekView=+pick.value; renderWeeklyArchive(); };
  const ragChip=s=>`<span class="badge ${ragClass(s)}">${esc(s)}</span>`;
  const snap=document.getElementById('weekSnapshot');
  if(!arr.length){ snap.innerHTML='<p style="color:#94a3b8">No weekly updates archived yet. On the Overview tab, fill in the week then click <b>📌 Archive this week</b>.</p>'; }
  else{
    const w=arr[weekView];
    const lst=a=>(a&&a.length)?`<ul style="margin:4px 0;padding-left:18px">${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'<p style="color:#94a3b8;margin:4px 0">—</p>';
    snap.innerHTML=`
      <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center;margin:6px 0 12px;padding:10px 12px;background:#f8fafc;border-radius:10px">
        <span><b>Status:</b> ${ragChip(w.overallStatus)}</span>
        <span><b>Completion:</b> ${esc(w.completion||'—')}</span>
        <span><b>Next milestone:</b> ${esc(w.nextMilestone||'—')}</span>
      </div>
      ${w.summary?`<p style="margin:0 0 12px">${esc(w.summary)}</p>`:''}
      <div class="grid3">
        <div class="pillar" style="background:#f0fdf4"><h3>✓ Accomplished</h3>${lst(w.accomplishments)}</div>
        <div class="pillar" style="background:#eff6ff"><h3>→ Planned next</h3>${lst(w.planned)}</div>
        <div class="pillar" style="background:#fef2f2"><h3>⚠ Blockers</h3>${lst(w.blockers)}</div>
      </div>`;
  }
  const tb=document.querySelector('#weekTable tbody');
  tb.innerHTML=arr.map((w,i)=>`<tr style="cursor:pointer" data-week="${i}">
    <td><b>${esc(w.week)}</b></td>
    <td class="pillcell">${ragChip(w.overallStatus)}</td>
    <td class="pillcell">${esc(w.completion||'—')}</td>
    <td>${esc(w.summary||'')}</td>
    ${EDIT?`<td class="row-actions"><button class="xbtn" data-delweek="${i}" title="Delete week">✕</button></td>`:'<td class="no-print"></td>'}
  </tr>`).join('')||'<tr><td colspan="5" style="color:#94a3b8">No weeks archived yet.</td></tr>';
  tb.querySelectorAll('tr[data-week]').forEach(r=>r.onclick=e=>{ if(e.target.dataset.delweek)return; weekView=+r.dataset.week; renderWeeklyArchive(); document.querySelector('nav.tabs button[data-tab=weekly]').click(); });
  tb.querySelectorAll('[data-delweek]').forEach(b=>b.onclick=()=>{ DATA.weeklyUpdates.splice(+b.dataset.delweek,1); renderAll(); });
}
function archiveWeek(){
  const wp=DATA.workPackages;
  const avg=wp.length?Math.round(wp.reduce((a,b)=>a+(+b.pct||0),0)/wp.length):0;
  const next=DATA.milestones.find(x=>x.status!=='Complete');
  const snap={
    week:DATA.meta.reportWeek||('Week ending '+new Date().toISOString().slice(0,10)),
    overallStatus:DATA.meta.overallStatus,
    completion:avg+'%',
    nextMilestone:next?(next.id+' '+next.name+' ('+next.delMonth+')'):'—',
    summary:DATA.meta.overallNarrative,
    accomplishments:[...(DATA.weekly.accomplishments||[])],
    planned:[...(DATA.weekly.planned||[])],
    blockers:[...(DATA.weekly.blockers||[])]
  };
  DATA.weeklyUpdates=DATA.weeklyUpdates||[];
  const ex=DATA.weeklyUpdates.findIndex(w=>w.week===snap.week);
  if(ex>=0){ if(!confirm('A snapshot for "'+snap.week+'" already exists. Overwrite it?')) return; DATA.weeklyUpdates[ex]=snap; }
  else DATA.weeklyUpdates.unshift(snap);
  weekView=0;
  renderAll();
  document.querySelector('nav.tabs button[data-tab=weekly]').click();
  alert('Week archived. Click "⬇ Save data.json" and commit to publish it to everyone.');
}
function renderPayments(){
  const tb=document.querySelector('#payTable tbody');
  tb.innerHTML=DATA.payments.map((p,i)=>`<tr>
    <td><b>${ce('payments.'+i+'.id',p.id)}</b></td>
    <td>${ce('payments.'+i+'.delMonth',p.delMonth)} <small style="color:#94a3b8">${esc(dmToDate(p.delMonth))}</small></td>
    <td>${ce('payments.'+i+'.milestone',p.milestone)}</td>
    <td class="pillcell">${ce('payments.'+i+'.pct',p.pct)}</td>
    <td class="pillcell">${ce('payments.'+i+'.amount',p.amount)}</td>
    <td class="pillcell">${statusSelect('payments.'+i+'.status',p.status,["Not Due","Invoiced","Paid","Overdue"])}</td>
    ${delBtn('payments',i)}
  </tr>`).join('');
  const sum=DATA.payments.reduce((a,p)=>a+(parseFloat(String(p.amount).replace(/[^0-9.]/g,''))||0),0);
  const paid=DATA.payments.filter(p=>p.status==='Paid').reduce((a,p)=>a+(parseFloat(String(p.amount).replace(/[^0-9.]/g,''))||0),0);
  document.querySelector('#payTable tfoot').innerHTML=`<tr style="font-weight:700;background:#f8fafc">
    <td colspan="4">Total</td><td class="pillcell">${sum?('$'+sum.toLocaleString()):'—'}</td>
    <td class="pillcell">${paid?('Paid $'+paid.toLocaleString()):''}</td><td class="no-print"></td></tr>`;
}
function renderResources(){
  const tb=document.querySelector('#resTable tbody');
  tb.innerHTML=DATA.resources.map((r,i)=>`<tr>
    <td><b>${ce('resources.'+i+'.name',r.name)}</b></td>
    <td class="pillcell"><span class="badge ${orgClass(r.org)}">${esc(r.org)}</span></td>
    <td>${ce('resources.'+i+'.role',r.role)}</td>
    <td>${ce('resources.'+i+'.responsibility',r.responsibility)}</td>
    <td class="pillcell">${ce('resources.'+i+'.location',r.location)}</td>
    <td class="pillcell">${ce('resources.'+i+'.availability',r.availability)}</td>
    <td class="pillcell">${statusSelect('resources.'+i+'.status',r.status,["Active","To Be Confirmed","Rolled Off","On Leave"])}</td>
    ${delBtn('resources',i)}
  </tr>`).join('');
  const total=DATA.resources.length;
  const gt=DATA.resources.filter(r=>r.org==='Gentrack').length;
  const hp=DATA.resources.filter(r=>r.org==='Horizon Power').length;
  const tbc=DATA.resources.filter(r=>r.status==='To Be Confirmed').length;
  document.getElementById('resKpis').innerHTML=[
    ['Total',total],['Gentrack',gt],['Horizon Power',hp],['To Be Confirmed',tbc]
  ].map(([l,n])=>`<div class="kpi"><div class="n">${n}</div><div class="l">${esc(l)}</div></div>`).join('');
}

function renderWP(){
  const tb=document.querySelector('#wpTable tbody');
  tb.innerHTML=DATA.workPackages.map((w,i)=>`<tr>
    <td><b>${ce('workPackages.'+i+'.id',w.id)}</b></td>
    <td>${ce('workPackages.'+i+'.name',w.name)}</td>
    <td>${ce('workPackages.'+i+'.owner',w.owner)}</td>
    <td>${ce('workPackages.'+i+'.phase',w.phase)}</td>
    <td class="pillcell">${statusSelect('workPackages.'+i+'.status',w.status)}</td>
    <td><div class="prog"><i style="width:${+w.pct||0}%;background:${ragColor(w.rag)}"></i></div>
        <small>${(EDIT && w.status!=='Not Started' && w.status!=='Complete')?`<span class="editable" data-bind="workPackages.${i}.pct">${esc(w.pct)}</span>`:esc(w.pct)}%${(EDIT&&(w.status==='Not Started'||w.status==='Complete'))?' <span style="color:#94a3b8" title="Set by status">🔒</span>':''}</small></td>
    <td class="pillcell">${ragSelect('workPackages.'+i+'.rag',w.rag)}</td>
    <td>${ce('workPackages.'+i+'.note',w.note)}</td>
    ${delBtn('workPackages',i)}
  </tr>`).join('');
  const critList=(arr,bind)=>{
    arr=arr||[];
    const items=arr.map((t,i)=>`<li><span class="editable" data-bind="${bind}.${i}">${esc(t)}</span>${EDIT?` <button class="xbtn" data-dellist="${bind}:${i}" title="Remove">✕</button>`:''}</li>`).join('');
    return `<ul class="critlist">${items||'<li style="color:#94a3b8">—</li>'}</ul>${EDIT?`<button class="toolbtn" style="font-size:11px;padding:4px 8px" data-addlist="${bind}">+ Add</button>`:''}`;
  };
  document.getElementById('wpDetail').innerHTML=DATA.workPackages.map((w,i)=>`
    <details class="wpdrill" style="border-left:3px solid ${ragColor(w.rag)}">
      <summary>
        <span class="wpdrill-tri">▸</span>
        <b>${esc(w.id)}</b> · ${esc(w.name)}
        <span class="badge ${stClass(w.status)}">${esc(w.status)}</span>
        <span class="badge ${ragClass(w.rag)}">${esc(w.rag)}</span>
        <span style="color:#94a3b8;font-size:11px;margin-left:auto">${+w.pct||0}% · ${esc(w.phase)}</span>
      </summary>
      <div class="wpdrill-body">
        <div style="margin:2px 0 10px;color:#334155"><b>Scope:</b> <span class="editable" data-bind="workPackages.${i}.scopeNote">${esc(w.scopeNote)}</span></div>
        <div class="critcols">
          <div class="critcol entry"><h4>✓ Entry Criteria</h4>${critList(w.entry,'workPackages.'+i+'.entry')}</div>
          <div class="critcol exit"><h4>⚑ Exit Criteria</h4>${critList(w.exit,'workPackages.'+i+'.exit')}</div>
        </div>
        <div style="margin-top:10px;color:#64748b"><b>Deliverables:</b> <span class="editable" data-bind="workPackages.${i}.deliverables">${esc(w.deliverables)}</span></div>
      </div>
    </details>`).join('');
}

function renderTimeline(){
  const ms=DATA.milestones;
  const nums=ms.map(m=>parseInt(String(m.delMonth).replace(/\D/g,''))||0);
  const maxM=Math.max(16,...nums);
  const ticksEl=document.getElementById('tlticks');
  ticksEl.innerHTML='';
  for(let i=0;i<=maxM;i+=2){const s=document.createElement('span');s.innerHTML='DM'+i+(dmToDate('DM'+i)?'<br><span style="opacity:.7">'+esc(dmToDate('DM'+i))+'</span>':'');ticksEl.appendChild(s);}
  document.getElementById('timelineBars').innerHTML=ms.map(m=>{
    const n=parseInt(String(m.delMonth).replace(/\D/g,''))||0;
    const left=(n/maxM)*100;
    const col=m.status==='Complete'?'var(--green)':m.status==='In Progress'?'var(--blue)':'var(--grey)';
    const lp=Math.min(left,86);
    return `<div class="tlrow"><div style="font-size:11.5px"><b>${esc(m.id)}</b> ${esc(m.name)}</div>
      <div class="tlbar"><div class="tlseg" style="left:${lp}%;background:${col}">${esc(m.delMonth)}${dmToDate(m.delMonth)?' · '+esc(dmToDate(m.delMonth)):''} · ${esc(m.pct)}</div></div></div>`;
  }).join('');
  const tb=document.querySelector('#msTable tbody');
  tb.innerHTML=ms.map((m,i)=>`<tr>
    <td><b>${ce('milestones.'+i+'.id',m.id)}</b></td>
    <td>${ce('milestones.'+i+'.delMonth',m.delMonth)}</td>
    <td>${ce('milestones.'+i+'.phase',m.phase)}</td>
    <td>${ce('milestones.'+i+'.name',m.name)}</td>
    <td>${ce('milestones.'+i+'.deliverables',m.deliverables)}</td>
    <td class="pillcell">${ce('milestones.'+i+'.pct',m.pct)}</td>
    <td class="pillcell">${statusSelect('milestones.'+i+'.status',m.status,["Not Started","In Progress","Complete","At Risk"])}</td>
    ${moveCtrls('milestones',i,ms.length)}
  </tr>`).join('');
}

/* ---------- Plan on a Page (Gantt) ---------- */
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function parseD(d){ const p=String(d||'').split('-'); if(p.length<3) return null; const dt=new Date(+p[0],+p[1]-1,+p[2]); return isNaN(dt.getTime())?null:dt; }
function toYMD(dt){ return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0'); }
function dDiff(a,b){ return Math.round((b-a)/86400000); }
function fmtD(d){ const dt=parseD(d); return dt?(String(dt.getDate()).padStart(2,'0')+'/'+String(dt.getMonth()+1).padStart(2,'0')+'/'+dt.getFullYear()):(d||''); }
function shiftD(d,days){ const dt=parseD(d); if(!dt) return d; dt.setDate(dt.getDate()+days); return toYMD(dt); }
function shiftGantt(weeks){
  const g=DATA.gantt; if(!g) return; const days=weeks*7;
  g.start=shiftD(g.start,days); g.end=shiftD(g.end,days);
  (g.tasks||[]).forEach(t=>{ t.start=shiftD(t.start,days); t.end=shiftD(t.end,days); });
  (g.milestones||[]).forEach(m=>{ m.date=shiftD(m.date,days); });
  renderAll();
}
function renderGantt(){
  const g=DATA.gantt||{lanes:[],tasks:[],milestones:[],start:'',end:''};
  const chart=document.getElementById('ganttChart'); if(!chart) return;
  const gs=parseD(g.start), ge=parseD(g.end);
  if(!gs||!ge||ge<gs){ chart.innerHTML='<p style="color:#94a3b8">Set a valid Start and End date (YYYY-MM-DD) below to draw the timeline.</p>'; }
  else{
    const total=dDiff(gs,ge)||1;
    const pos=d=>{ const dt=parseD(d); return dt?Math.max(0,Math.min(100,dDiff(gs,dt)/total*100)):0; };
    // month axis header (variable width per month)
    let head='<div class="glabel ghead">Stream</div><div class="gtrack ghead">';
    let cur=new Date(gs.getFullYear(),gs.getMonth(),1);
    while(cur<=ge){
      const next=new Date(cur.getFullYear(),cur.getMonth()+1,1);
      const L=dDiff(gs,cur<gs?gs:cur)/total*100;
      const R=dDiff(gs,next>ge?ge:next)/total*100;
      head+=`<div class="gcell" style="left:${L}%;width:${Math.max(R-L,0)}%">${MON[cur.getMonth()]}${cur.getMonth()===0?'<br><b>'+cur.getFullYear()+'</b>':''}</div>`;
      cur=next;
    }
    head+='</div>';
    // milestone flags row — stagger labels so they don't overlap
    const mlist=(g.milestones||[]).filter(m=>parseD(m.date)).sort((a,b)=>parseD(a.date)-parseD(b.date));
    let flags='<div class="glabel"></div><div class="gtrack" style="height:36px">';
    let lastL=-99, level=0;
    mlist.forEach(m=>{ const L=pos(m.date); if(L-lastL<14){ level=(level+1)%3; } else { level=0; } lastL=L;
      flags+=`<div class="gflag" style="left:${L}%;top:${level*12}px" title="${esc(m.name)} (${esc(fmtD(m.date))})">⚑ ${esc(m.name)}</div>`; });
    flags+='</div>';
    // month gridlines + milestone guide lines (reuse boundaries)
    let grid=''; let gc=new Date(gs.getFullYear(),gs.getMonth(),1);
    while(gc<=ge){ grid+=`<div class="ggrid" style="left:${dDiff(gs,gc<gs?gs:gc)/total*100}%"></div>`; gc=new Date(gc.getFullYear(),gc.getMonth()+1,1); }
    let mlines=''; mlist.forEach(m=>{ mlines+=`<div class="gmile" style="left:${pos(m.date)}%"></div>`; });
    // lanes
    let rows='';
    (g.lanes||[]).forEach(lane=>{
      const tks=(g.tasks||[]).filter(t=>t.lane===lane.id);
      const h=Math.max(1,tks.length)*24+6;
      let bars='';
      tks.forEach((t,ti)=>{
        if(!parseD(t.start)||!parseD(t.end))return;
        const L=pos(t.start), W=Math.max(pos(t.end)-L, 0.8);
        bars+=`<div class="gbar" style="left:${L}%;width:${W}%;top:${ti*24+3}px;background:${t.color||lane.color||'#64748b'}" title="${esc(t.name)} (${esc(fmtD(t.start))} → ${esc(fmtD(t.end))})">${esc(t.name)}</div>`;
      });
      rows+=`<div class="grow"><div class="glabel" style="border-left:4px solid ${lane.color||'#64748b'}">${esc(lane.name)}</div><div class="gtrack" style="height:${h}px">${grid}${mlines}${bars}</div></div>`;
    });
    chart.innerHTML=`<div class="gantt"><div class="grow">${head}</div><div class="grow">${flags}</div>${rows||'<p style="padding:10px;color:#94a3b8">No streams yet. Add a stream below.</p>'}</div>`;
  }
  // editor (admin)
  const ed=document.getElementById('ganttEdit');
  const dCell=(path,val)=> EDIT?`<input type="date" value="${esc(val||'')}" data-dval="${path}">`:esc(fmtD(val));
  const taskRows=(g.tasks||[]).map((t,i)=>`<tr>
    <td>${ce('gantt.tasks.'+i+'.name',t.name)}</td>
    <td class="pillcell">${EDIT?laneSelect('gantt.tasks.'+i+'.lane',t.lane):esc((g.lanes.find(l=>l.id===t.lane)||{}).name||t.lane)}</td>
    <td class="pillcell">${dCell('gantt.tasks.'+i+'.start',t.start)}</td>
    <td class="pillcell">${dCell('gantt.tasks.'+i+'.end',t.end)}</td>
    <td class="pillcell">${EDIT?`<input type="color" value="${t.color||'#64748b'}" data-color="gantt.tasks.${i}.color">`:`<span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:${t.color||'#64748b'}"></span>`}</td>
    ${EDIT?`<td class="row-actions" style="white-space:nowrap"><button class="mvbtn" data-gmove="tasks:${i}:-1" ${i>0?'':'disabled'}>▲</button><button class="mvbtn" data-gmove="tasks:${i}:1" ${i<g.tasks.length-1?'':'disabled'}>▼</button><button class="xbtn" data-gdel="tasks:${i}">✕</button></td>`:'<td></td>'}
  </tr>`).join('');
  const laneRows=(g.lanes||[]).map((l,i)=>`<tr>
    <td>${ce('gantt.lanes.'+i+'.name',l.name)}</td>
    <td class="pillcell">${EDIT?`<input type="color" value="${l.color||'#64748b'}" data-color="gantt.lanes.${i}.color">`:`<span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:${l.color||'#64748b'}"></span>`}</td>
    ${EDIT?`<td class="row-actions"><button class="mvbtn" data-gmove="lanes:${i}:-1" ${i>0?'':'disabled'}>▲</button><button class="mvbtn" data-gmove="lanes:${i}:1" ${i<g.lanes.length-1?'':'disabled'}>▼</button><button class="xbtn" data-gdel="lanes:${i}">✕</button></td>`:'<td></td>'}
  </tr>`).join('');
  const msRows=(g.milestones||[]).map((m,i)=>`<tr>
    <td>${ce('gantt.milestones.'+i+'.name',m.name)}</td>
    <td class="pillcell">${dCell('gantt.milestones.'+i+'.date',m.date)}</td>
    ${EDIT?`<td class="row-actions"><button class="xbtn" data-gdel="milestones:${i}">✕</button></td>`:'<td></td>'}
  </tr>`).join('');
  ed.innerHTML=`
    <h2 class="sec">Timeline Setup</h2>
    <div class="adminrow"><label>Date range:</label> Start ${dCell('gantt.start',g.start)} &nbsp; End ${dCell('gantt.end',g.end)}</div>
    ${EDIT?`<div class="adminrow"><label>Shift whole plan:</label><button class="toolbtn" id="gShiftBack">◀ −1 week</button><button class="toolbtn" id="gShiftFwd">+1 week ▶</button><button class="toolbtn" id="gShiftBack4">◀ −4 wks</button><button class="toolbtn" id="gShiftFwd4">+4 wks ▶</button><span class="pill-note">Moves the range, every task and every milestone together (by week).</span></div>`:''}
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px" class="gedit-grid">
      <div>
        <h2 class="sec">Tasks / Sub-tasks</h2>
        <table><thead><tr><th>Task</th><th>Stream</th><th>Start</th><th>End</th><th>Colour</th><th class="no-print"></th></tr></thead><tbody>${taskRows||'<tr><td colspan="6" style="color:#94a3b8">No tasks yet.</td></tr>'}</tbody></table>
        ${EDIT?'<div class="addrow"><button class="toolbtn" id="gAddTask">+ Add task</button></div>':''}
      </div>
      <div>
        <h2 class="sec">Streams (Lanes)</h2>
        <table><thead><tr><th>Stream</th><th>Colour</th><th class="no-print"></th></tr></thead><tbody>${laneRows||'<tr><td colspan="3" style="color:#94a3b8">No streams yet.</td></tr>'}</tbody></table>
        ${EDIT?'<div class="addrow"><button class="toolbtn" id="gAddLane">+ Add stream</button></div>':''}
        <h2 class="sec" style="margin-top:16px">Milestone Flags</h2>
        <table><thead><tr><th>Milestone</th><th>Date</th><th class="no-print"></th></tr></thead><tbody>${msRows||'<tr><td colspan="3" style="color:#94a3b8">No milestones yet.</td></tr>'}</tbody></table>
        ${EDIT?'<div class="addrow"><button class="toolbtn" id="gAddMs">+ Add milestone flag</button></div>':''}
      </div>
    </div>`;
  // wire gantt-specific controls
  ed.querySelectorAll('[data-color]').forEach(inp=>{ inp.oninput=()=>{ setByPath(inp.dataset.color,inp.value); renderGantt(); }; });
  ed.querySelectorAll('[data-dval]').forEach(inp=>{ inp.onchange=()=>{ setByPath(inp.dataset.dval,inp.value); renderGantt(); }; });
  ed.querySelectorAll('[data-gdel]').forEach(b=>{ b.onclick=()=>{ const [a,i]=b.dataset.gdel.split(':'); DATA.gantt[a].splice(+i,1); renderAll(); }; });
  ed.querySelectorAll('[data-gmove]').forEach(b=>{ b.onclick=()=>{ if(b.disabled)return; const [a,i,d]=b.dataset.gmove.split(':'); const arr=DATA.gantt[a],j=+i+ +d; if(j<0||j>=arr.length)return; const t=arr[+i];arr[+i]=arr[j];arr[j]=t; renderAll(); }; });
  const gat=document.getElementById('gAddTask'); if(gat) gat.onclick=()=>{ const lane=(DATA.gantt.lanes[0]||{}).id||''; DATA.gantt.tasks.push({id:'T'+Date.now(),lane,name:'New task',start:DATA.gantt.start,end:DATA.gantt.start,color:'#64748b'}); renderAll(); };
  const gal=document.getElementById('gAddLane'); if(gal) gal.onclick=()=>{ DATA.gantt.lanes.push({id:'lane'+Date.now(),name:'New stream',color:'#64748b'}); renderAll(); };
  const gam=document.getElementById('gAddMs'); if(gam) gam.onclick=()=>{ DATA.gantt.milestones.push({name:'New milestone',date:DATA.gantt.start}); renderAll(); };
  const gsb=document.getElementById('gShiftBack'); if(gsb) gsb.onclick=()=>shiftGantt(-1);
  const gsf=document.getElementById('gShiftFwd'); if(gsf) gsf.onclick=()=>shiftGantt(1);
  const gsb4=document.getElementById('gShiftBack4'); if(gsb4) gsb4.onclick=()=>shiftGantt(-4);
  const gsf4=document.getElementById('gShiftFwd4'); if(gsf4) gsf4.onclick=()=>shiftGantt(4);
}
function laneSelect(bind,val){
  const lanes=(DATA.gantt&&DATA.gantt.lanes)||[];
  return `<select class="st" data-bind="${bind}">`+lanes.map(l=>`<option value="${l.id}" ${l.id===val?'selected':''}>${esc(l.name)}</option>`).join('')+`</select>`;
}

function renderDeliverables(){
  const tb=document.querySelector('#delTable tbody');
  // group by work package, ordered by WP number
  const wpName={}; DATA.workPackages.forEach(w=>wpName[w.id]=w.name);
  const groups={};
  DATA.deliverables.forEach((d,i)=>{ (groups[d.wp]=groups[d.wp]||[]).push({d,i}); });
  const order=Object.keys(groups).sort((a,b)=>(parseInt(a.replace(/\D/g,''))||0)-(parseInt(b.replace(/\D/g,''))||0));
  let html='';
  order.forEach(wp=>{
    const done=groups[wp].filter(x=>x.d.status==='Complete').length;
    html+=`<tr style="background:#eef2ff"><td colspan="7" style="font-weight:700;color:var(--brand)">
      ${esc(wp)} — ${esc(wpName[wp]||'')} <span class="badge b-grey">${done}/${groups[wp].length} done</span></td><td class="no-print"></td></tr>`;
    groups[wp].forEach(({d,i})=>{
      html+=`<tr>
        <td></td>
        <td>${ce('deliverables.'+i+'.phase',d.phase)}</td>
        <td>${ce('deliverables.'+i+'.name',d.name)}</td>
        <td>${ce('deliverables.'+i+'.criteria',d.criteria)}</td>
        <td class="pillcell">${ce('deliverables.'+i+'.draft',d.draft)}</td>
        <td class="pillcell">${ce('deliverables.'+i+'.final',d.final)}</td>
        <td class="pillcell">${statusSelect('deliverables.'+i+'.status',d.status,["Not Started","In Progress","Complete","At Risk"])}</td>
        ${delBtn('deliverables',i)}
      </tr>`;
    });
  });
  tb.innerHTML=html;
}

function assigneeSelect(bind,val){
  if(!EDIT) return `<b>${esc(val||'—')}</b>`;
  const names=(DATA.resources||[]).map(r=>r.name);
  if(val && !names.includes(val)) names.unshift(val);
  return `<select class="st" data-bind="${bind}"><option value="">— unassigned —</option>`+
    names.map(n=>`<option ${n===val?'selected':''}>${esc(n)}</option>`).join('')+`</select>`;
}
function renderStories(){
  const arr=DATA.stories||[];
  const tb=document.querySelector('#storyTable tbody');
  tb.innerHTML=arr.map((o,i)=>{
    const locked=(o.status==='Not Started'||o.status==='Complete');
    const pctCell=(EDIT&&!locked)?`<span class="editable" data-bind="stories.${i}.pct">${esc(o.pct)}</span>`:esc(o.pct);
    return `<tr>
    <td><b>${ce('stories.'+i+'.id',o.id)}</b></td>
    <td>${ce('stories.'+i+'.title',o.title)}</td>
    <td>${ce('stories.'+i+'.area',o.area)}</td>
    <td class="pillcell">${ce('stories.'+i+'.platform',o.platform)}</td>
    <td class="pillcell">${ce('stories.'+i+'.type',o.type)}</td>
    <td class="pillcell">${assigneeSelect('stories.'+i+'.assignee',o.assignee)}</td>
    <td class="pillcell">${statusSelect('stories.'+i+'.status',o.status,["Not Started","In Progress","Complete","At Risk","On Hold"])}</td>
    <td><div class="prog"><i style="width:${+o.pct||0}%;background:${ragColor(o.status==='At Risk'?'Amber':o.status==='Complete'?'Green':'Amber')}"></i></div><small>${pctCell}%${(EDIT&&locked)?' <span style="color:#94a3b8" title="Set by status">🔒</span>':''}</small></td>
    <td class="pillcell">${ce('stories.'+i+'.sprint',o.sprint)}</td>
    ${delBtn('stories',i)}
  </tr>`;}).join('')||'<tr><td colspan="10" style="color:#94a3b8">No user stories yet. Click “+ Add user story”.</td></tr>';
  // KPIs
  const total=arr.length, inprog=arr.filter(s=>s.status==='In Progress').length,
        done=arr.filter(s=>s.status==='Complete').length, unassigned=arr.filter(s=>!s.assignee).length;
  document.getElementById('storyKpis').innerHTML=[
    ['User Stories',total],['In Progress',inprog],['Complete',done],['Unassigned',unassigned]
  ].map(([l,n])=>`<div class="kpi"><div class="n">${n}</div><div class="l">${esc(l)}</div></div>`).join('');
  // Allocation rollup
  const by={};
  arr.forEach(s=>{ const k=s.assignee||'— Unassigned —'; (by[k]=by[k]||[]).push(s); });
  const rows=Object.keys(by).sort().map(k=>{
    const list=by[k], ip=list.filter(s=>s.status==='In Progress').length, cp=list.filter(s=>s.status==='Complete').length;
    const avg=Math.round(list.reduce((a,s)=>a+(+s.pct||0),0)/list.length);
    return `<tr><td><b>${esc(k)}</b></td><td class="pillcell">${list.length}</td><td class="pillcell">${ip}</td><td class="pillcell">${cp}</td><td class="pillcell">${avg}%</td></tr>`;
  }).join('');
  document.querySelector('#allocTable tbody').innerHTML=rows||'<tr><td colspan="5" style="color:#94a3b8">No stories to allocate yet.</td></tr>';
}

function renderGaps(){
  const tb=document.querySelector('#gapTable tbody');
  tb.innerHTML=DATA.gaps.map((g,i)=>`<tr>
    <td><b>${ce('gaps.'+i+'.id',g.id)}</b></td>
    <td>${ce('gaps.'+i+'.area',g.area)}</td>
    <td>${ce('gaps.'+i+'.description',g.description)}</td>
    <td class="pillcell">${ce('gaps.'+i+'.ootb',g.ootb)}</td>
    <td class="pillcell">${ce('gaps.'+i+'.disposition',g.disposition)}</td>
    <td class="pillcell">${ce('gaps.'+i+'.priority',g.priority)}</td>
    <td class="pillcell">${statusSelect('gaps.'+i+'.status',g.status,["Open","Under Review","Complete","On Hold"])}</td>
    <td>${ce('gaps.'+i+'.owner',g.owner)}</td>
    ${delBtn('gaps',i)}
  </tr>`).join('');
}

function renderCatalog(){
  const tb=document.querySelector('#catTable tbody');
  tb.innerHTML=DATA.catalog.map((c,i)=>`<tr>
    <td>${ce('catalog.'+i+'.item',c.item)}</td>
    <td class="pillcell">${ce('catalog.'+i+'.type',c.type)}</td>
    <td class="pillcell">${ce('catalog.'+i+'.platform',c.platform)}</td>
    <td class="pillcell">${statusSelect('catalog.'+i+'.status',c.status,["Not Started","In Progress","Configured","Complete"])}</td>
    <td>${ce('catalog.'+i+'.note',c.note)}</td>
    ${delBtn('catalog',i)}
  </tr>`).join('');
}

function renderNewsletter(){
  const m=DATA.meta, wp=DATA.workPackages;
  const avg=wp.length?Math.round(wp.reduce((a,b)=>a+(+b.pct||0),0)/wp.length):0;
  const ragChip=s=>`<span class="badge ${ragClass(s)}">${s}</span>`;
  const inFocus=wp.filter(w=>w.status==='In Progress');
  const next=DATA.milestones.find(x=>x.status!=='Complete');
  const openGaps=DATA.gaps.filter(g=>g.status==='Open'||g.status==='Under Review');
  const html=`
    <h1>${esc(m.program)} — Program Update</h1>
    <div style="color:#64748b;font-size:12px">${esc(m.subtitle)} · Reporting period as at ${esc(m.reportDate)} · ${esc(m.reportOwner)}</div>
    <div style="margin:14px 0;padding:12px 14px;background:#f8fafc;border-radius:10px">
      <b>Overall status:</b> ${ragChip(m.overallStatus)} &nbsp; <b>Completion:</b> ${avg}% &nbsp;
      <b>Next milestone:</b> ${next?esc(next.id+' '+next.name+' ('+next.delMonth+')'):'—'}
      <div style="margin-top:6px">${esc(m.overallNarrative)}</div>
    </div>
    <h3>Health — Scope · Timeline · Quality</h3>
    <ul>${DATA.pillars.map(p=>`<li><b>${esc(p.name)}</b> ${ragChip(p.status)} — ${esc(p.summary)}</li>`).join('')}</ul>
    <h3>Accomplished This Week</h3>
    <ul>${(DATA.weekly.accomplishments||[]).map(x=>`<li>${esc(x)}</li>`).join('')||'<li>—</li>'}</ul>
    <h3>Planned Next Week</h3>
    <ul>${(DATA.weekly.planned||[]).map(x=>`<li>${esc(x)}</li>`).join('')||'<li>—</li>'}</ul>
    ${(DATA.weekly.blockers&&DATA.weekly.blockers.length)?`<h3>Blockers / Issues</h3><ul>${DATA.weekly.blockers.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
    <h3>In Focus This Period</h3>
    <ul>${inFocus.length?inFocus.map(w=>`<li><b>${esc(w.id)} ${esc(w.name)}</b> — ${w.pct}% ${ragChip(w.rag)}${w.note?' · '+esc(w.note):''}</li>`).join(''):'<li>No work packages currently in progress.</li>'}</ul>
    <h3>Upcoming Milestones</h3>
    <ul>${DATA.milestones.filter(x=>x.status!=='Complete').slice(0,4).map(x=>`<li><b>${esc(x.id)} ${esc(x.name)}</b> — ${esc(x.delMonth)} (${esc(x.pct)}) · ${esc(x.deliverables)}</li>`).join('')}</ul>
    <h3>Product Gaps — Open</h3>
    <ul>${openGaps.length?openGaps.map(g=>`<li><b>${esc(g.id)}</b> ${esc(g.area)} — ${esc(g.disposition)} · ${esc(g.priority)} priority · owner ${esc(g.owner)}</li>`).join(''):'<li>No open gaps.</li>'}</ul>
    <h3>Risks &amp; Watch Items</h3>
    <ul>${DATA.risks.map(r=>`<li>${ragChip(r.rag)} <b>${esc(r.title)}</b> — ${esc(r.impact)}. <i>Mitigation:</i> ${esc(r.mitigation)}</li>`).join('')}</ul>
    <div style="margin-top:18px;color:#94a3b8;font-size:11px">Generated from the RSR Program Dashboard · ${esc(m.sowRef)}</div>`;
  document.getElementById('newsPaper').innerHTML=html;
}

function renderAll(){
  renderHeader();renderKpis();renderPillars();renderWeekly();renderWeeklyArchive();renderRisks();renderWP();
  renderTimeline();renderGantt();renderDeliverables();renderStories();renderGaps();renderCatalog();
  renderPayments();renderResources();renderNewsletter();
  fillBinds();
  bindEditables();
}

/* ---------- editing ---------- */
function getByPath(path){
  try{ return path.split('.').reduce((o,k)=>o[k],DATA); }catch(e){ return undefined; }
}
function fillBinds(){
  document.querySelectorAll('.bindfill').forEach(el=>{
    const v=getByPath(el.dataset.bind);
    el.textContent=(v==null?'':String(v));
  });
}
function setByPath(path,val){
  const parts=path.split('.');let o=DATA;
  for(let i=0;i<parts.length-1;i++){o=o[parts[i]];}
  o[parts[parts.length-1]]=val;
}
function bindEditables(){
  document.querySelectorAll('.editable').forEach(el=>{
    el.setAttribute('contenteditable',EDIT?'true':'false');
    el.onblur=()=>{ setByPath(el.dataset.bind, el.textContent.trim()); softRefresh(); };
  });
  document.querySelectorAll('select[data-bind]').forEach(s=>{
    s.onchange=()=>{
      setByPath(s.dataset.bind,s.value);
      // Work Package status drives the progress bar: Not Started → 0%, Complete → 100%
      const m=s.dataset.bind.match(/^workPackages\.(\d+)\.status$/);
      if(m){ const wp=DATA.workPackages[+m[1]];
        if(s.value==='Not Started') wp.pct=0;
        else if(s.value==='Complete'){ wp.pct=100; wp.rag='Green'; }
      }
      const ms=s.dataset.bind.match(/^stories\.(\d+)\.status$/);
      if(ms){ const st=DATA.stories[+ms[1]];
        if(s.value==='Not Started') st.pct=0;
        else if(s.value==='Complete') st.pct=100;
      }
      renderAll();
    };
  });
  document.querySelectorAll('[data-del]').forEach(b=>{
    b.onclick=()=>{ const [arr,idx]=b.dataset.del.split(':'); DATA[arr].splice(+idx,1); renderAll(); };
  });
  document.querySelectorAll('[data-move]').forEach(b=>{
    b.onclick=()=>{ if(b.disabled)return; const [arr,idx,dir]=b.dataset.move.split(':'); moveRow(arr,+idx,+dir); };
  });
  document.querySelectorAll('[data-add]').forEach(b=>{
    b.onclick=()=>{ addRow(b.dataset.add); };
  });
  document.querySelectorAll('[data-dellist]').forEach(b=>{
    b.onclick=()=>{ const [path,idx]=b.dataset.dellist.split(':');
      const parts=path.split('.');let o=DATA;for(let i=0;i<parts.length-1;i++)o=o[parts[i]];
      o[parts[parts.length-1]].splice(+idx,1); renderAll(); };
  });
  document.querySelectorAll('[data-addlist]').forEach(b=>{
    b.onclick=()=>{ if(!EDIT){alert('Turn on Edit mode first (✎ button, top right).');return;}
      const parts=b.dataset.addlist.split('.');let o=DATA;for(let i=0;i<parts.length-1;i++)o=o[parts[i]];
      o[parts[parts.length-1]].push('New item'); renderAll(); };
  });
}
function softRefresh(){ renderKpis();renderPillars();renderWeekly();renderNewsletter(); }

const TEMPLATES={
  risks:{id:'R?',title:'New risk',impact:'',rag:'Amber',mitigation:''},
  workPackages:{id:'WP?',name:'New work package',owner:'Gentrack',status:'Not Started',pct:0,rag:'Green',phase:'',scopeNote:'',deliverables:'',note:''},
  milestones:{id:'PM?',delMonth:'DM0',phase:'',name:'New milestone',trigger:'',pct:'0%',status:'Not Started',deliverables:''},
  deliverables:{wp:'WP?',phase:'',name:'New deliverable',criteria:'',draft:'—',final:'—',status:'Not Started'},
  stories:{id:'FBP-???',title:'New user story',area:'',platform:'G2',type:'OOTB',assignee:'',status:'Not Started',pct:0,sprint:'',note:''},
  gaps:{id:'GAP-???',area:'',description:'',ootb:'No',disposition:'Adapt',status:'Open',owner:'',priority:'Medium'},
  catalog:{item:'New item',type:'Product',platform:'G2',status:'Not Started',note:''},
  payments:{id:'PM?',delMonth:'DM0',milestone:'New milestone',pct:'0%',amount:'',status:'Not Due'},
  resources:{name:'TBC',org:'Gentrack',role:'',responsibility:'',location:'Melbourne',availability:'Full Time',status:'To Be Confirmed'}
};
function addRow(arr){
  if(!EDIT){ alert('Turn on Edit mode first (✎ button, top right).'); return; }
  DATA[arr].push(JSON.parse(JSON.stringify(TEMPLATES[arr])));
  renderAll();
}

function wireDashboard(){
/* ---------- tabs ---------- */
document.getElementById('tabs').addEventListener('click',e=>{
  const b=e.target.closest('button[data-tab]'); if(!b)return;
  document.querySelectorAll('nav.tabs button[data-tab]').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('section.tab').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  document.getElementById(b.dataset.tab).classList.add('active');
});

document.getElementById('archiveWeek').onclick=function(){
  if(!EDIT){ alert('Turn on Edit mode first (✎ button, top right).'); return; }
  archiveWeek();
};

document.getElementById('editToggle').onclick=function(){
  EDIT=!EDIT;
  this.textContent='✎ Edit: '+(EDIT?'On':'Off');
  this.style.background=EDIT?'var(--amberbg)':'#fff';
  renderAll();
};

document.getElementById('download').onclick=function(){
  DATA.meta.reportDate=new Date().toISOString().slice(0,10);
  const blob=new Blob([JSON.stringify(DATA,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='data.json';a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
};

/* ---------- newsletter actions ---------- */
document.getElementById('copyNews').onclick=async function(){
  const html=document.getElementById('newsPaper').innerHTML;
  try{ await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([document.getElementById('newsPaper').innerText],{type:'text/plain'})})]);
    this.textContent='✓ Copied'; }catch(e){ this.textContent='Press Ctrl/Cmd+C'; }
  setTimeout(()=>this.textContent='📋 Copy (rich)',1500);
};
document.getElementById('copyNewsText').onclick=async function(){
  try{ await navigator.clipboard.writeText(document.getElementById('newsPaper').innerText); this.textContent='✓ Copied'; }
  catch(e){ this.textContent='Failed'; } setTimeout(()=>this.textContent='📋 Copy (plain text)',1500);
};
document.getElementById('mailNews').onclick=function(){
  const m=DATA.meta;
  const subject=`${m.program} — Program Update (${m.reportDate})`;
  const body=document.getElementById('newsPaper').innerText;
  window.location.href='mailto:?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
};


}

function setData(d){
  // Normalise so a program file missing any field can never break rendering.
  d=d||{};
  d.meta=d.meta||{};
  ['workPackages','milestones','deliverables','stories','gaps','catalog','risks','weeklyUpdates','payments','resources'].forEach(k=>{ if(!Array.isArray(d[k])) d[k]=[]; });
  if(!Array.isArray(d.pillars)||!d.pillars.length) d.pillars=[
    {id:'scope',name:'Scope',status:'Green',summary:''},
    {id:'timeline',name:'Timeline',status:'Green',summary:''},
    {id:'quality',name:'Quality',status:'Green',summary:''}];
  d.weekly=d.weekly||{};
  ['accomplishments','planned','blockers'].forEach(k=>{ if(!Array.isArray(d.weekly[k])) d.weekly[k]=[]; });
  d.gantt=d.gantt||{};
  d.gantt.start=d.gantt.start||''; d.gantt.end=d.gantt.end||'';
  ['lanes','tasks','milestones'].forEach(k=>{ if(!Array.isArray(d.gantt[k])) d.gantt[k]=[]; });
  DATA=d;
}
function mountDashboard(containerId){
  document.getElementById(containerId).innerHTML = DASH_HTML;
  wireDashboard();
}
