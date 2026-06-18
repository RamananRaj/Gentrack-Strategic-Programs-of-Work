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
  <button data-tab="deliverables">Deliverables</button>
  <button data-tab="stories">Functional Build Packages</button>
  <button data-tab="gaps">Product Gaps</button>
  <button data-tab="catalog">Product Catalog</button>
  <button data-tab="payments">Payments</button>
  <button data-tab="resources">Resources</button>
  <button data-tab="newsletter">Newsletter</button>
  <span class="spacer"></span>
  <span class="exp-wrap no-print">
    <button class="toolbtn" id="exportBtn" title="Export / print this program update">⤓ Export ▾</button>
    <div class="exp-menu" id="exportMenu">
      <button data-export="email">✉ Email update</button>
      <button data-export="slack">💬 Copy for Slack</button>
      <button data-export="ppt">📊 PowerPoint (.pptx)</button>
      <button data-export="print">🖨 Print / PDF</button>
    </div>
  </span>
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
        <button class="toolbtn" id="addWeekReport" style="display:none">+ New weekly report</button>
        <label style="font-size:12px;color:var(--muted)">View week:</label>
        <select class="st" id="weekPicker"></select>
      </div>
      <p class="hint">Every archived week is saved here and available on demand to all viewers. Newest first. Use the picker to read any past week. In the admin (edit mode) you can add a new report and edit the fields below directly.</p>
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

  <!-- TIMELINE (Gantt + Milestones combined) -->
  <section class="tab" id="timeline">
    <div class="seg-toggle">
      <button data-tlview="gantt" class="active">📊 Timeline (Plan on a Page)</button>
      <button data-tlview="milestones">🏁 Milestones</button>
    </div>

    <div id="tlGantt">
      <div class="card">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <h2 class="sec" style="margin:0">Plan on a Page — Implementation Timeline</h2>
          <span style="flex:1"></span>
          <span class="exp-wrap no-print">
            <button class="toolbtn" id="tlExportBtn">⤓ Export timeline ▾</button>
            <div class="exp-menu" id="tlExportMenu">
              <button data-tlexport="a4">📄 Fit to A4 (PDF)</button>
              <button data-tlexport="ppt">📊 PowerPoint slide</button>
              <button data-tlexport="png">🖼 Image (PNG)</button>
            </div>
          </span>
        </div>
        <p class="hint">Swimlane Gantt across the program. In the admin, edit the tables below the chart to set the date range, add streams, tasks/sub-tasks with start &amp; end dates, and milestone flags — the chart updates live. Milestone flags here are the same milestones shown in the Milestones view.</p>
        <p class="pill-note no-print">Tip (admin): drag the middle of a bar to move it, or drag its left/right edge to change start/end. Dates show while you drag.</p>
        <div style="overflow-x:auto"><div id="ganttChart"></div></div>
      </div>
      <div id="dragTip" class="drag-tip"></div>
      <div class="card no-print" id="ganttEdit"></div>
    </div>

    <div id="tlMilestones" style="display:none">
      <div class="card">
        <h2 class="sec">Milestone Timeline (DM0 → DM16)</h2>
        <p class="hint">Payment / delivery milestones PM1–PM9 across the delivery window. Bars position by delivery month.</p>
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
          <th>PM</th><th>Del Month</th><th class="pillcell">Target Date</th><th>Phase</th><th>Milestone</th><th>Trigger / Deliverables</th><th class="pillcell">% Price</th><th class="pillcell">Status</th><th class="no-print"></th>
        </tr></thead><tbody></tbody><tfoot></tfoot></table>
        <div class="addrow no-print"><button class="toolbtn" data-add="milestones">+ Add milestone</button></div>
      </div>
    </div>
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
      <p class="hint">Driven by the <b>Milestone Schedule</b> (Timeline → Milestones). PM, month, milestone and % come from there — edit them once and they reflect here. Enter the total contract value below; each Amount = Total × %. Only the Invoice Status is set here.</p>
      <div class="adminrow" style="margin-bottom:10px">
        <label style="font-weight:600">Total Contract Value (ex GST):</label>
        <span id="cvWrap"></span>
        <span id="pctCheck" class="pill-note"></span>
      </div>
      <table id="payTable"><thead><tr>
        <th>PM</th><th>Del Month</th><th>Milestone</th><th class="pillcell">% of Total</th><th class="pillcell">Amount (ex GST)</th><th class="pillcell">Invoice Status</th><th class="no-print"></th>
      </tr></thead><tbody></tbody><tfoot></tfoot></table>
      <p class="pill-note">To add or remove a payment line, add/remove a milestone in <b>Timeline → Milestones</b>.</p>
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
  const addBtn=document.getElementById('addWeekReport');
  if(addBtn){ addBtn.style.display=EDIT?'inline-block':'none'; addBtn.onclick=()=>{ addWeeklyReport(); }; }
  const snap=document.getElementById('weekSnapshot');
  if(!arr.length){ snap.innerHTML= EDIT
      ? '<p style="color:#94a3b8">No weekly updates yet. Click <b>+ New weekly report</b> above to create one, or use <b>📌 Archive this week</b> on the Overview tab.</p>'
      : '<p style="color:#94a3b8">No weekly updates archived yet.</p>'; }
  else{
    const w=arr[weekView]; const i=weekView;
    // editable inline list
    const elist=(a,path)=>{ a=a||[];
      const items=a.map((x,j)=>`<li><span class="editable" data-bind="${path}.${j}">${esc(x)}</span>${EDIT?` <button class="xbtn" data-dellist="${path}:${j}">✕</button>`:''}</li>`).join('');
      return `<ul style="margin:4px 0;padding-left:18px">${items||'<li style="color:#94a3b8">—</li>'}</ul>${EDIT?`<button class="toolbtn" style="font-size:11px;padding:3px 8px" data-addlist="${path}">+ Add</button>`:''}`;
    };
    const f=(label,bind,val)=>`<span><b>${label}:</b> ${EDIT?`<span class="editable" data-bind="${bind}">${esc(val||'')}</span>`:esc(val||'—')}</span>`;
    snap.innerHTML=`
      <div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center;margin:6px 0 12px;padding:10px 12px;background:#f8fafc;border-radius:10px">
        <span><b>Week:</b> ${EDIT?`<span class="editable" data-bind="weeklyUpdates.${i}.week">${esc(w.week)}</span>`:esc(w.week)}</span>
        <span><b>Status:</b> ${EDIT?ragSelect('weeklyUpdates.'+i+'.overallStatus',w.overallStatus):`<span class="badge ${ragClass(w.overallStatus)}">${esc(w.overallStatus)}</span>`}</span>
        ${f('Completion','weeklyUpdates.'+i+'.completion',w.completion)}
        ${f('Next milestone','weeklyUpdates.'+i+'.nextMilestone',w.nextMilestone)}
      </div>
      <p style="margin:0 0 12px"><b>Summary:</b> ${EDIT?`<span class="editable" data-bind="weeklyUpdates.${i}.summary">${esc(w.summary||'')}</span>`:esc(w.summary||'')}</p>
      <div class="grid3">
        <div class="pillar" style="background:#f0fdf4"><h3>✓ Accomplished</h3>${elist(w.accomplishments,'weeklyUpdates.'+i+'.accomplishments')}</div>
        <div class="pillar" style="background:#eff6ff"><h3>→ Planned next</h3>${elist(w.planned,'weeklyUpdates.'+i+'.planned')}</div>
        <div class="pillar" style="background:#fef2f2"><h3>⚠ Blockers</h3>${elist(w.blockers,'weeklyUpdates.'+i+'.blockers')}</div>
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
function addWeeklyReport(){
  const today=new Date().toISOString().slice(0,10);
  const wp=DATA.workPackages||[];
  const avg=wp.length?Math.round(wp.reduce((a,b)=>a+(+b.pct||0),0)/wp.length):0;
  const next=(DATA.milestones||[]).find(x=>x.status!=='Complete');
  DATA.weeklyUpdates=DATA.weeklyUpdates||[];
  DATA.weeklyUpdates.unshift({
    week:'Week ending '+today,
    overallStatus:(DATA.meta&&DATA.meta.overallStatus)||'Amber',
    completion:avg+'%',
    nextMilestone: next?(next.id+' '+next.name+' ('+next.delMonth+')'):'—',
    summary:'', accomplishments:[], planned:[], blockers:[]
  });
  weekView=0;
  renderAll();
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
function pctNum(p){ return parseFloat(String(p==null?'':p).replace(/[^0-9.]/g,''))||0; }
function money(n){ return '$'+Math.round(n).toLocaleString(); }
function renderPayments(){
  const cv=parseFloat(String((DATA.meta||{}).contractValue||'').replace(/[^0-9.]/g,''))||0;
  // total contract value input
  const cvWrap=document.getElementById('cvWrap');
  if(cvWrap){
    cvWrap.innerHTML = EDIT
      ? `<input id="cvInput" type="text" inputmode="decimal" value="${cv?cv:''}" placeholder="e.g. 5000000" style="font:inherit;border:1px solid var(--line);border-radius:7px;padding:6px 9px;min-width:160px">`
      : `<b>${cv?money(cv):'—'}</b>`;
    const ci=document.getElementById('cvInput');
    if(ci) ci.onchange=()=>{ if(!DATA.meta)DATA.meta={}; DATA.meta.contractValue=ci.value.replace(/[^0-9.]/g,''); renderPayments(); };
  }
  DATA.paymentStatus=DATA.paymentStatus||{};
  const ms=DATA.milestones||[];
  const invSel=(id,val)=> EDIT
    ? `<select class="st" data-paystatus="${esc(id)}">`+["Not Due","Invoiced","Paid","Overdue"].map(o=>`<option ${o===val?'selected':''}>${o}</option>`).join('')+`</select>`
    : `<span class="badge ${payClass(val)}">${esc(val)}</span>`;
  const tb=document.querySelector('#payTable tbody');
  tb.innerHTML=ms.map((m)=>{
    const amt=cv*pctNum(m.pct)/100;
    const st=DATA.paymentStatus[m.id]||'Not Due';
    return `<tr>
    <td><b>${esc(m.id)}</b></td>
    <td>${esc(m.delMonth)} <small style="color:#94a3b8">${esc(dmToDate(m.delMonth))}</small></td>
    <td>${esc(m.name)}</td>
    <td class="pillcell">${esc(m.pct||'—')}</td>
    <td class="pillcell">${cv?money(amt):'—'}</td>
    <td class="pillcell">${invSel(m.id,st)}</td>
    <td class="no-print"></td>
  </tr>`;}).join('')||'<tr><td colspan="7" style="color:#94a3b8">No milestones yet — add them in Timeline → Milestones.</td></tr>';
  const pctSum=ms.reduce((a,m)=>a+pctNum(m.pct),0);
  const total=cv*pctSum/100;
  const paid=ms.filter(m=>(DATA.paymentStatus[m.id])==='Paid').reduce((a,m)=>a+cv*pctNum(m.pct)/100,0);
  document.querySelector('#payTable tfoot').innerHTML=`<tr style="font-weight:700;background:#f8fafc">
    <td colspan="3">Total</td><td class="pillcell">${Math.round(pctSum*100)/100}%</td><td class="pillcell">${cv?money(total):'—'}</td>
    <td class="pillcell">${paid?('Paid '+money(paid)):''}</td><td class="no-print"></td></tr>`;
  // wire invoice-status selects (id may contain dots, so handle directly)
  document.querySelectorAll('#payTable [data-paystatus]').forEach(s=>{ s.onchange=()=>{ DATA.paymentStatus[s.dataset.paystatus]=s.value; renderPayments(); }; });
  const pc=document.getElementById('pctCheck');
  if(pc){ pc.textContent = pctSum===100?'✓ percentages add up to 100%' : ('⚠ percentages add up to '+(Math.round(pctSum*100)/100)+'% (should be 100%)');
    pc.className='pill-note '+(pctSum===100?'gh-ok':'gh-bad'); }
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
    <td class="pillcell">${EDIT?`<input type="date" value="${esc(m.date||'')}" data-dval="milestones.${i}.date">`:(m.date?esc(fmtD(m.date)):'<span style="color:#94a3b8" title="positioned by Del Month">DM</span>')}</td>
    <td>${ce('milestones.'+i+'.phase',m.phase)}</td>
    <td>${ce('milestones.'+i+'.name',m.name)}</td>
    <td>${ce('milestones.'+i+'.deliverables',m.deliverables)}</td>
    <td class="pillcell">${ce('milestones.'+i+'.pct',m.pct)}</td>
    <td class="pillcell">${statusSelect('milestones.'+i+'.status',m.status,["Not Started","In Progress","Complete","At Risk"])}</td>
    ${moveCtrls('milestones',i,ms.length)}
  </tr>`).join('');
  const pctTotal=ms.reduce((a,m)=>a+(parseFloat(String(m.pct||'').replace(/[^0-9.]/g,''))||0),0);
  const tf=document.querySelector('#msTable tfoot');
  if(tf) tf.innerHTML=`<tr style="font-weight:700;background:#f8fafc">
    <td colspan="6">Total</td>
    <td class="pillcell">${Math.round(pctTotal*100)/100}%</td>
    <td class="pillcell">${pctTotal===100?'<span class="badge b-green">100%</span>':'<span class="badge b-amber">≠100%</span>'}</td>
    <td class="no-print"></td></tr>`;
}

/* ---------- Plan on a Page (Gantt) ---------- */
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function parseD(d){ const p=String(d||'').split('-'); if(p.length<3) return null; const dt=new Date(+p[0],+p[1]-1,+p[2]); return isNaN(dt.getTime())?null:dt; }
function toYMD(dt){ return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0'); }
function dDiff(a,b){ return Math.round((b-a)/86400000); }
function fmtD(d){ const dt=parseD(d); return dt?(String(dt.getDate()).padStart(2,'0')+'/'+String(dt.getMonth()+1).padStart(2,'0')+'/'+dt.getFullYear()):(d||''); }
function shiftD(d,days){ const dt=parseD(d); if(!dt) return d; dt.setDate(dt.getDate()+days); return toYMD(dt); }
function dmToYMD(dm){ // Delivery month "DMn" -> a real date using meta.programStartDate
  const start=parseD((DATA.meta||{}).programStartDate); if(!start) return null;
  const n=parseInt(String(dm).replace(/\D/g,''))||0;
  const d=new Date(start.getFullYear(),start.getMonth()+n,start.getDate()); return toYMD(d);
}
function shiftGantt(weeks){
  const g=DATA.gantt; if(!g) return; const days=weeks*7;
  g.start=shiftD(g.start,days); g.end=shiftD(g.end,days);
  (g.tasks||[]).forEach(t=>{ t.start=shiftD(t.start,days); t.end=shiftD(t.end,days); });
  // move the program start/end too, so PM milestone flags shift with the plan
  if(DATA.meta){
    if(DATA.meta.programStartDate) DATA.meta.programStartDate=shiftD(DATA.meta.programStartDate,days);
    if(DATA.meta.programEndDate) DATA.meta.programEndDate=shiftD(DATA.meta.programEndDate,days);
  }
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
    // milestone flags row — sourced from PM milestones; use explicit date if set, else DM-derived
    const mlist=(DATA.milestones||[]).map((mm,mi)=>({mi, name:(mm.id?mm.id+' ':'')+mm.name, date:(mm.date&&parseD(mm.date))?mm.date:dmToYMD(mm.delMonth)}))
      .filter(m=>parseD(m.date)).sort((a,b)=>parseD(a.date)-parseD(b.date));
    let flags='<div class="glabel"></div><div class="gtrack gmflags" style="height:36px">';
    let lastL=-99, level=0;
    mlist.forEach(m=>{ const L=pos(m.date); if(L-lastL<14){ level=(level+1)%3; } else { level=0; } lastL=L;
      flags+=`<div class="gflag${EDIT?' gflag-edit':''}" data-mi="${m.mi}" style="left:${L}%;top:${level*12}px" title="${esc(m.name)} (${esc(fmtD(m.date))})">⚑ ${esc(m.name)}</div>`; });
    flags+='</div>';
    // month gridlines + milestone guide lines (reuse boundaries)
    let grid=''; let gc=new Date(gs.getFullYear(),gs.getMonth(),1);
    while(gc<=ge){ grid+=`<div class="ggrid" style="left:${dDiff(gs,gc<gs?gs:gc)/total*100}%"></div>`; gc=new Date(gc.getFullYear(),gc.getMonth()+1,1); }
    let mlines=''; mlist.forEach(m=>{ mlines+=`<div class="gmile" style="left:${pos(m.date)}%"></div>`; });
    // lanes (swimlanes) + sub-lanes
    const rowOf=(t,idx)=> (typeof t.row==='number'&&t.row>=0)? t.row : idx;
    const trackInner=(tks)=>{
      let bars='';
      tks.forEach((t,ti)=>{
        if(!parseD(t.start)||!parseD(t.end))return;
        const r=rowOf(t,ti);
        const L=pos(t.start), W=Math.max(pos(t.end)-L, 0.8);
        const gi=g.tasks.indexOf(t);
        bars+=`<div class="gbar${EDIT?' gbar-edit':''}" data-ti="${gi}" style="left:${L}%;width:${W}%;top:${r*24+3}px;background:${t.color||'#64748b'}" title="${esc(t.name)} (${esc(fmtD(t.start))} → ${esc(fmtD(t.end))})">${EDIT?'<span class="gh-l"></span>':''}<span class="gbar-lbl">${esc(t.name)}</span>${EDIT?'<span class="gh-r"></span>':''}</div>`;
      });
      return grid+mlines+bars;
    };
    let rows='';
    (g.lanes||[]).forEach(lane=>{
      const subIds=new Set((lane.sublanes||[]).map(s=>s.id));
      const orphans=(g.tasks||[]).some(t=>t.lane===lane.id && !subIds.has(String(t.sublane||'')));
      let subs=(lane.sublanes&&lane.sublanes.length)? lane.sublanes.slice() : [];
      if(!subs.length) subs=[{id:'',name:''}];
      else if(orphans) subs=[{id:'',name:'(unassigned)'}].concat(subs);
      const hasSubs = subs.length>1 || (subs[0]&&subs[0].name);
      subs.forEach((sub,si)=>{
        const tks=(g.tasks||[]).filter(t=> t.lane===lane.id && ( String(t.sublane||'')===String(sub.id||'') || (String(sub.id||'')==='' && !subIds.has(String(t.sublane||''))) ));
        let maxRow=0; tks.forEach((t,ti)=>{ const r=rowOf(t,ti); if(r>maxRow)maxRow=r; });
        const h=(maxRow+1)*24+6;
        const streamCol=`<div class="glabel-stream">${si===0?esc(lane.name):''}</div>`;
        const subCol=`<div class="glabel-sub">${sub.name?esc(sub.name):(hasSubs?'—':'')}</div>`;
        rows+=`<div class="grow${si===0?' glane-top':''}${hasSubs?' has-sub':''}"><div class="glabel two-col" style="border-left:4px solid ${lane.color||'#64748b'}">${streamCol}${subCol}</div><div class="gtrack gdrop${hasSubs&&si%2?' gsub-alt':''}" data-lane="${esc(lane.id)}" data-sublane="${esc(sub.id||'')}" style="height:${h}px">${trackInner(tks)}</div></div>`;
      });
    });
    chart.innerHTML=`<div class="gantt"><div class="grow">${head}</div><div class="grow">${flags}</div>${rows||'<p style="padding:10px;color:#94a3b8">No streams yet. Add a stream below.</p>'}</div>`;
  }
  // editor (admin)
  const ed=document.getElementById('ganttEdit');
  const dCell=(path,val)=> EDIT?`<input type="date" value="${esc(val||'')}" data-dval="${path}">`:esc(fmtD(val));
  const sublaneSelect=(bind,val,laneId)=>{
    const lane=(g.lanes||[]).find(l=>l.id===laneId)||{}; const subs=lane.sublanes||[];
    return `<select class="st" data-bind="${bind}"><option value="">—</option>`+subs.map(s=>`<option value="${esc(s.id)}" ${s.id===val?'selected':''}>${esc(s.name)}</option>`).join('')+`</select>`;
  };
  const taskRows=(g.tasks||[]).map((t,i)=>`<tr>
    <td>${ce('gantt.tasks.'+i+'.name',t.name)}</td>
    <td class="pillcell">${EDIT?laneSelect('gantt.tasks.'+i+'.lane',t.lane):esc((g.lanes.find(l=>l.id===t.lane)||{}).name||t.lane)}</td>
    <td class="pillcell">${EDIT?sublaneSelect('gantt.tasks.'+i+'.sublane',t.sublane,t.lane):esc((((g.lanes.find(l=>l.id===t.lane)||{}).sublanes||[]).find(s=>s.id===t.sublane)||{}).name||'')}</td>
    <td class="pillcell">${dCell('gantt.tasks.'+i+'.start',t.start)}</td>
    <td class="pillcell">${dCell('gantt.tasks.'+i+'.end',t.end)}</td>
    <td class="pillcell">${EDIT?`<input type="color" value="${t.color||'#64748b'}" data-color="gantt.tasks.${i}.color">`:`<span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:${t.color||'#64748b'}"></span>`}</td>
    ${EDIT?`<td class="row-actions" style="white-space:nowrap"><button class="mvbtn" data-gmove="tasks:${i}:-1" ${i>0?'':'disabled'}>▲</button><button class="mvbtn" data-gmove="tasks:${i}:1" ${i<g.tasks.length-1?'':'disabled'}>▼</button><button class="xbtn" data-gdel="tasks:${i}">✕</button></td>`:'<td></td>'}
  </tr>`).join('');
  let laneRows='';
  (g.lanes||[]).forEach((l,i)=>{
    laneRows+=`<tr>
      <td>${ce('gantt.lanes.'+i+'.name',l.name)}</td>
      <td class="pillcell">${EDIT?`<input type="color" value="${l.color||'#64748b'}" data-color="gantt.lanes.${i}.color">`:`<span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:${l.color||'#64748b'}"></span>`}</td>
      ${EDIT?`<td class="row-actions"><button class="subbtn" data-gsubadd="${i}" title="Add sub-stream">+ sub</button><button class="mvbtn" data-gmove="lanes:${i}:-1" ${i>0?'':'disabled'}>▲</button><button class="mvbtn" data-gmove="lanes:${i}:1" ${i<g.lanes.length-1?'':'disabled'}>▼</button><button class="xbtn" data-gdel="lanes:${i}">✕</button></td>`:'<td></td>'}
    </tr>`;
    (l.sublanes||[]).forEach((s,si)=>{
      laneRows+=`<tr><td style="padding-left:22px;color:#64748b">↳ ${ce('gantt.lanes.'+i+'.sublanes.'+si+'.name',s.name)}</td><td></td>${EDIT?`<td class="row-actions"><button class="xbtn" data-gsubdel="${i}:${si}">✕</button></td>`:'<td></td>'}</tr>`;
    });
  });
  const _gs=parseD(g.start), _ge=parseD(g.end);
  let lenStr='';
  if(_gs&&_ge&&_ge>=_gs){ const days=dDiff(_gs,_ge); const wks=Math.round(days/7);
    let mo=(_ge.getFullYear()-_gs.getFullYear())*12+(_ge.getMonth()-_gs.getMonth()); if(_ge.getDate()<_gs.getDate())mo--;
    lenStr=`<b>${mo}</b> months · <b>${wks}</b> weeks (${days} days)`; }
  ed.innerHTML=`
    <h2 class="sec">Timeline Setup</h2>
    <div class="adminrow"><label>Date range:</label> Start ${dCell('gantt.start',g.start)} &nbsp; End ${dCell('gantt.end',g.end)}
      ${lenStr?`&nbsp;&nbsp;<span class="badge b-blue" style="font-size:12px">⏱ Program length: ${lenStr}</span>`:''}</div>
    ${EDIT?`<div class="adminrow"><label>Shift whole plan:</label><button class="toolbtn" id="gShiftBack">◀ −1 week</button><button class="toolbtn" id="gShiftFwd">+1 week ▶</button><button class="toolbtn" id="gShiftBack4">◀ −4 wks</button><button class="toolbtn" id="gShiftFwd4">+4 wks ▶</button><span class="pill-note">Moves the range, every task and every milestone together (by week).</span></div>`:''}
    <div class="gedit-grid">
      <div>
        <h2 class="sec">Tasks / Sub-tasks</h2>
        <div style="overflow-x:auto"><table><thead><tr><th>Task</th><th>Stream</th><th>Sub-stream</th><th>Start</th><th>End</th><th>Colour</th><th class="no-print"></th></tr></thead><tbody>${taskRows||'<tr><td colspan="7" style="color:#94a3b8">No tasks yet.</td></tr>'}</tbody></table></div>
        ${EDIT?'<div class="addrow"><button class="toolbtn" id="gAddTask">+ Add task</button></div>':''}
      </div>
      <div>
        <h2 class="sec">Streams (Lanes)</h2>
        <div style="overflow-x:auto"><table><thead><tr><th>Stream</th><th>Colour</th><th class="no-print" style="width:130px"></th></tr></thead><tbody>${laneRows||'<tr><td colspan="3" style="color:#94a3b8">No streams yet.</td></tr>'}</tbody></table></div>
        ${EDIT?'<div class="addrow"><button class="toolbtn" id="gAddLane">+ Add stream</button></div>':''}
        <p class="pill-note" style="margin-top:14px">🏁 Milestone flags on the chart come from the <b>Milestones</b> view (PM1–PM9). Edit them there and they update here automatically.</p>
      </div>
    </div>`;
  // wire gantt-specific controls
  ed.querySelectorAll('[data-color]').forEach(inp=>{ inp.oninput=()=>{ setByPath(inp.dataset.color,inp.value); renderGantt(); }; });
  ed.querySelectorAll('[data-dval]').forEach(inp=>{ inp.onchange=()=>{ setByPath(inp.dataset.dval,inp.value); renderGantt(); }; });
  ed.querySelectorAll('[data-gdel]').forEach(b=>{ b.onclick=()=>{ const [a,i]=b.dataset.gdel.split(':'); DATA.gantt[a].splice(+i,1); renderAll(); }; });
  ed.querySelectorAll('[data-gmove]').forEach(b=>{ b.onclick=()=>{ if(b.disabled)return; const [a,i,d]=b.dataset.gmove.split(':'); const arr=DATA.gantt[a],j=+i+ +d; if(j<0||j>=arr.length)return; const t=arr[+i];arr[+i]=arr[j];arr[j]=t; renderAll(); }; });
  const gat=document.getElementById('gAddTask'); if(gat) gat.onclick=()=>{ const lane=(DATA.gantt.lanes[0]||{}).id||''; DATA.gantt.tasks.push({id:'T'+Date.now(),lane,name:'New task',start:DATA.gantt.start,end:DATA.gantt.start,color:'#64748b'}); renderAll(); };
  const gal=document.getElementById('gAddLane'); if(gal) gal.onclick=()=>{ DATA.gantt.lanes.push({id:'lane'+Date.now(),name:'New stream',color:'#64748b',sublanes:[]}); renderAll(); };
  ed.querySelectorAll('[data-gsubadd]').forEach(b=>{ b.onclick=()=>{ const i=+b.dataset.gsubadd; const l=DATA.gantt.lanes[i]; l.sublanes=l.sublanes||[]; l.sublanes.push({id:'sub'+Date.now(),name:'New sub-stream'}); renderAll(); }; });
  ed.querySelectorAll('[data-gsubdel]').forEach(b=>{ b.onclick=()=>{ const [i,si]=b.dataset.gsubdel.split(':').map(Number); const l=DATA.gantt.lanes[i]; const sub=l.sublanes[si]; (DATA.gantt.tasks||[]).forEach(t=>{ if(t.lane===l.id && t.sublane===sub.id) t.sublane=''; }); l.sublanes.splice(si,1); renderAll(); }; });
  const gam=document.getElementById('gAddMs'); if(gam) gam.onclick=()=>{ DATA.gantt.milestones.push({name:'New milestone',date:DATA.gantt.start}); renderAll(); };
  const gsb=document.getElementById('gShiftBack'); if(gsb) gsb.onclick=()=>shiftGantt(-1);
  const gsf=document.getElementById('gShiftFwd'); if(gsf) gsf.onclick=()=>shiftGantt(1);
  const gsb4=document.getElementById('gShiftBack4'); if(gsb4) gsb4.onclick=()=>shiftGantt(-4);
  const gsf4=document.getElementById('gShiftFwd4'); if(gsf4) gsf4.onclick=()=>shiftGantt(4);
  attachGanttDrag();
  adjustGanttLabels();
}
function adjustGanttLabels(){
  // Labels that don't fit inside their bar are shown just outside (to the right).
  document.querySelectorAll('#ganttChart .gbar').forEach(bar=>{
    const lbl=bar.querySelector('.gbar-lbl'); if(!lbl) return;
    bar.classList.remove('gbar-out');
    if(bar.clientWidth===0) return; // hidden (other view) — skip
    if(lbl.scrollWidth > bar.clientWidth - 8) bar.classList.add('gbar-out');
  });
}
function attachGanttDrag(){
  if(!EDIT) return;
  const g=DATA.gantt; const gs=parseD(g.start), ge=parseD(g.end); if(!gs||!ge) return;
  const total=dDiff(gs,ge)||1;
  const tip=document.getElementById('dragTip');
  document.querySelectorAll('#ganttChart .gbar-edit').forEach(bar=>{
    const ti=+bar.dataset.ti; if(isNaN(ti)||!DATA.gantt.tasks[ti]) return;
    let mode=null,startX=0,trackW=1,trackTop=0,os=null,oe=null;
    function down(e,m){
      mode=m; startX=e.clientX;
      const tr=bar.parentElement.getBoundingClientRect(); trackW=tr.width||1; trackTop=tr.top;
      os=parseD(DATA.gantt.tasks[ti].start); oe=parseD(DATA.gantt.tasks[ti].end);
      window.addEventListener('pointermove',mv); window.addEventListener('pointerup',up);
      e.preventDefault(); e.stopPropagation();
    }
    function mv(e){
      const dxDays=Math.round((e.clientX-startX)/trackW*total);
      let ns=new Date(os), ne=new Date(oe);
      if(mode==='move'){ ns.setDate(ns.getDate()+dxDays); ne.setDate(ne.getDate()+dxDays); }
      else if(mode==='start'){ ns.setDate(ns.getDate()+dxDays); if(ns>ne) ns=new Date(ne); }
      else if(mode==='end'){ ne.setDate(ne.getDate()+dxDays); if(ne<ns) ne=new Date(ns); }
      const t=DATA.gantt.tasks[ti]; t.start=toYMD(ns); t.end=toYMD(ne);
      const L=Math.max(0,Math.min(100,dDiff(gs,ns)/total*100));
      const W=Math.max(dDiff(gs,ne)/total*100-L,0.6);
      bar.style.left=L+'%'; bar.style.width=W+'%';
      let rowTxt='';
      if(mode==='move'){ // also set the line (row) from vertical position so two bars can share a line
        const row=Math.max(0,Math.round((e.clientY-trackTop-3)/24));
        t.row=row; bar.style.top=(row*24+3)+'px'; rowTxt='  ·  line '+(row+1);
      }
      if(tip){ tip.style.display='block'; tip.style.left=(e.clientX+12)+'px'; tip.style.top=(e.clientY+12)+'px';
        tip.textContent=fmtD(t.start)+'  →  '+fmtD(t.end)+rowTxt; }
    }
    function up(e){
      window.removeEventListener('pointermove',mv); window.removeEventListener('pointerup',up);
      if(tip) tip.style.display='none';
      // vertical drag-drop onto another swimlane/sub-lane → reassign lane/sublane + set line
      if(mode==='move' && e){
        bar.style.pointerEvents='none';
        const el=document.elementFromPoint(e.clientX,e.clientY);
        bar.style.pointerEvents='';
        const track=el&&el.closest&&el.closest('.gtrack.gdrop');
        if(track){ const t=DATA.gantt.tasks[ti];
          if(track.dataset.lane!==t.lane || (track.dataset.sublane||'')!==(t.sublane||'')){
            t.lane=track.dataset.lane; t.sublane=track.dataset.sublane||'';
            t.row=Math.max(0,Math.round((e.clientY-track.getBoundingClientRect().top-3)/24));
          }
        }
      }
      renderGantt();
    }
    const hl=bar.querySelector('.gh-l'), hr=bar.querySelector('.gh-r');
    if(hl) hl.addEventListener('pointerdown',e=>down(e,'start'));
    if(hr) hr.addEventListener('pointerdown',e=>down(e,'end'));
    bar.addEventListener('pointerdown',e=>{ if(e.target.classList.contains('gh-l')||e.target.classList.contains('gh-r'))return; down(e,'move'); });
  });
  // draggable milestone flags — drag horizontally to set the milestone's date
  document.querySelectorAll('#ganttChart .gflag-edit').forEach(fl=>{
    const mi=+fl.dataset.mi; if(isNaN(mi)||!DATA.milestones[mi]) return;
    fl.addEventListener('pointerdown',e=>{
      const track=fl.parentElement; const rect=track.getBoundingClientRect();
      function mv(ev){ let frac=(ev.clientX-rect.left)/rect.width; frac=Math.max(0,Math.min(1,frac));
        const nd=new Date(gs); nd.setDate(nd.getDate()+Math.round(frac*total));
        DATA.milestones[mi].date=toYMD(nd); fl.style.left=(frac*100)+'%';
        if(tip){ tip.style.display='block'; tip.style.left=(ev.clientX+12)+'px'; tip.style.top=(ev.clientY+12)+'px'; tip.textContent=(DATA.milestones[mi].id||'')+'  '+fmtD(DATA.milestones[mi].date); } }
      function up(){ window.removeEventListener('pointermove',mv); window.removeEventListener('pointerup',up); if(tip) tip.style.display='none'; renderAll(); }
      window.addEventListener('pointermove',mv); window.addEventListener('pointerup',up); e.preventDefault(); e.stopPropagation();
    });
  });
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
      const gl=s.dataset.bind.match(/^gantt\.tasks\.(\d+)\.lane$/);
      if(gl){ DATA.gantt.tasks[+gl[1]].sublane=''; } // stream changed → clear sub-stream
      renderAll();
    };
  });
  document.querySelectorAll('[data-del]').forEach(b=>{
    b.onclick=()=>{ const [arr,idx]=b.dataset.del.split(':'); DATA[arr].splice(+idx,1); renderAll(); };
  });
  document.querySelectorAll('[data-move]').forEach(b=>{
    b.onclick=()=>{ if(b.disabled)return; const [arr,idx,dir]=b.dataset.move.split(':'); moveRow(arr,+idx,+dir); };
  });
  document.querySelectorAll('[data-dval]').forEach(inp=>{
    inp.onchange=()=>{ setByPath(inp.dataset.dval,inp.value); renderAll(); };
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
function softRefresh(){ renderKpis();renderPillars();renderWeekly();renderWeeklyArchive();renderTimeline();renderPayments();renderNewsletter(); fillBinds(); bindEditables(); }

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

function setTimelineView(v){
  document.querySelectorAll('[data-tlview]').forEach(x=>x.classList.toggle('active',x.dataset.tlview===v));
  const gg=document.getElementById('tlGantt'), mm=document.getElementById('tlMilestones');
  if(gg) gg.style.display = v==='gantt'?'block':'none';
  if(mm) mm.style.display = v==='milestones'?'block':'none';
  try{ localStorage.setItem('tlview',v); }catch(e){}
  if(v==='gantt' && typeof adjustGanttLabels==='function') setTimeout(adjustGanttLabels,0);
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
document.querySelectorAll('[data-tlview]').forEach(b=>{ b.onclick=()=>setTimelineView(b.dataset.tlview); });
setTimelineView((function(){try{return localStorage.getItem('tlview')||'gantt';}catch(e){return 'gantt';}})());

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

/* ---------- export menu (Email / Slack / PPT / Print) ---------- */
const expBtn=document.getElementById('exportBtn'), expMenu=document.getElementById('exportMenu');
if(expBtn&&expMenu){
  expBtn.onclick=(e)=>{ e.stopPropagation(); expMenu.classList.toggle('open'); };
  document.addEventListener('click',()=>expMenu.classList.remove('open'));
  expMenu.querySelectorAll('[data-export]').forEach(b=>{ b.onclick=()=>{ expMenu.classList.remove('open'); doExport(b.dataset.export); }; });
}
const tlExpBtn=document.getElementById('tlExportBtn'), tlExpMenu=document.getElementById('tlExportMenu');
if(tlExpBtn&&tlExpMenu){
  tlExpBtn.onclick=(e)=>{ e.stopPropagation(); tlExpMenu.classList.toggle('open'); };
  document.addEventListener('click',()=>tlExpMenu.classList.remove('open'));
  tlExpMenu.querySelectorAll('[data-tlexport]').forEach(b=>{ b.onclick=()=>{ tlExpMenu.classList.remove('open'); exportTimeline(b.dataset.tlexport); }; });
}

}

function programSummary(){
  const m=DATA.meta||{}, wp=DATA.workPackages||[];
  const avg=wp.length?Math.round(wp.reduce((a,b)=>a+(+b.pct||0),0)/wp.length):0;
  const next=(DATA.milestones||[]).find(x=>x.status!=='Complete');
  return {m, completion:avg, next, pillars:DATA.pillars||[], weekly:DATA.weekly||{}, milestones:DATA.milestones||[], risks:DATA.risks||[]};
}
function summaryText(){
  const s=programSummary(), m=s.m, L=[];
  L.push(`${m.program} — Program Update`);
  if(m.subtitle) L.push(m.subtitle);
  L.push(`As at ${m.reportWeek||m.reportDate||''}  ·  PM: ${m.projectManager||m.reportOwner||''}`);
  L.push('');
  L.push(`Overall: ${m.overallStatus}   Completion: ${s.completion}%   Next: ${s.next?(s.next.id+' '+s.next.name):'—'}`);
  if(m.overallNarrative) L.push(m.overallNarrative);
  L.push('');
  L.push('Health (Scope / Timeline / Quality):');
  s.pillars.forEach(p=>L.push(`- ${p.name} [${p.status}] ${p.summary||''}`));
  const blk=(t,a)=>{ if(a&&a.length){ L.push(''); L.push(t+':'); a.forEach(x=>L.push('- '+x)); } };
  blk('Accomplished this week',s.weekly.accomplishments);
  blk('Planned next week',s.weekly.planned);
  blk('Blockers',s.weekly.blockers);
  if(s.risks.length){ L.push(''); L.push('Risks:'); s.risks.forEach(r=>L.push(`- [${r.rag}] ${r.title}: ${r.impact}`)); }
  return L.join('\n');
}
function slackText(){
  const s=programSummary(), m=s.m;
  let t=`*${m.program} — Program Update*\n${m.subtitle||''}\n_As at ${m.reportWeek||m.reportDate||''} · PM ${m.projectManager||''}_\n\n`;
  t+=`*Overall:* ${m.overallStatus}  |  *Completion:* ${s.completion}%  |  *Next:* ${s.next?(s.next.id+' '+s.next.name):'—'}\n`;
  if(m.overallNarrative) t+=m.overallNarrative+'\n';
  t+=`\n*Health*\n`+s.pillars.map(p=>`• *${p.name}* [${p.status}] ${p.summary||''}`).join('\n')+'\n';
  const blk=(title,a)=>{ if(a&&a.length) t+=`\n*${title}*\n`+a.map(x=>`• ${x}`).join('\n')+'\n'; };
  blk('Accomplished',s.weekly.accomplishments); blk('Planned next',s.weekly.planned); blk('Blockers',s.weekly.blockers);
  if(s.risks.length) t+=`\n*Risks*\n`+s.risks.map(r=>`• [${r.rag}] ${r.title}: ${r.impact}`).join('\n')+'\n';
  return t;
}
function doExport(kind){
  const m=DATA.meta||{};
  if(kind==='print'){ window.print(); return; }
  if(kind==='email'){
    const subject=`${m.program} — Program Update (${m.reportWeek||m.reportDate||''})`;
    window.location.href='mailto:?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(summaryText());
    return;
  }
  if(kind==='slack'){
    const t=slackText();
    navigator.clipboard.writeText(t).then(()=>alert('Slack-formatted update copied — paste it into your Slack channel.'),
      ()=>{ window.prompt('Copy this Slack update:',t); });
    return;
  }
  if(kind==='ppt'){ exportPPT(); return; }
}
function loadScript(src,cb){ if(window.PptxGenJS){cb();return;} const sc=document.createElement('script'); sc.src=src; sc.onload=cb; sc.onerror=()=>alert('Could not load the PowerPoint library (need internet access).'); document.head.appendChild(sc); }
function exportPPT(){
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.js',()=>{
    try{
      const s=programSummary(), m=s.m, P=new PptxGenJS();
      P.defineLayout&&P.defineLayout({name:'W',width:10,height:5.63}); P.layout='LAYOUT_WIDE';
      let sl=P.addSlide(); sl.background={color:'0B2545'};
      sl.addText(m.program||'Program',{x:0.6,y:1.7,w:11.5,h:1,fontSize:34,bold:true,color:'FFFFFF'});
      sl.addText((m.subtitle||'')+'\nPM: '+(m.projectManager||'')+'   ·   As at '+(m.reportWeek||m.reportDate||''),{x:0.6,y:2.9,w:11.5,h:1,fontSize:15,color:'9EC5FF'});
      sl=P.addSlide(); sl.addText('Program Status',{x:0.5,y:0.3,w:12,h:0.6,fontSize:26,bold:true,color:'1E3A8A'});
      sl.addText(`Overall: ${m.overallStatus}     Completion: ${s.completion}%     Next: ${s.next?(s.next.id+' '+s.next.name):'—'}`,{x:0.5,y:1.0,w:12,h:0.5,fontSize:15,bold:true});
      if(m.overallNarrative) sl.addText(m.overallNarrative,{x:0.5,y:1.5,w:12,h:0.9,fontSize:12,color:'333333'});
      const pr=[[{text:'Pillar',options:{bold:true,color:'FFFFFF',fill:'1E3A8A'}},{text:'RAG',options:{bold:true,color:'FFFFFF',fill:'1E3A8A'}},{text:'Summary',options:{bold:true,color:'FFFFFF',fill:'1E3A8A'}}]];
      s.pillars.forEach(p=>pr.push([p.name,p.status,p.summary||'']));
      sl.addTable(pr,{x:0.5,y:2.5,w:12,fontSize:11,border:{pt:0.5,color:'D9D9D9'},colW:[2.2,1.3,8.5]});
      sl=P.addSlide(); sl.addText('Weekly Update',{x:0.5,y:0.3,w:12,h:0.6,fontSize:26,bold:true,color:'1E3A8A'});
      let y=1.1; const blk=(t,a)=>{ if(!a||!a.length)return; sl.addText(t,{x:0.5,y,w:12,h:0.35,fontSize:14,bold:true,color:'0E7490'}); y+=0.4; a.forEach(x=>{ sl.addText('• '+x,{x:0.7,y,w:11.6,h:0.3,fontSize:11}); y+=0.3; }); y+=0.15; };
      blk('Accomplished',s.weekly.accomplishments); blk('Planned next',s.weekly.planned); blk('Blockers',s.weekly.blockers);
      sl=P.addSlide(); sl.addText('Milestones',{x:0.5,y:0.3,w:12,h:0.6,fontSize:26,bold:true,color:'1E3A8A'});
      const mr=[['PM','Month','Milestone','%','Status'].map(h=>({text:h,options:{bold:true,color:'FFFFFF',fill:'1E3A8A'}}))];
      (s.milestones||[]).forEach(x=>mr.push([x.id||'',x.delMonth||'',x.name||'',x.pct||'',x.status||'']));
      sl.addTable(mr,{x:0.5,y:1.0,w:12,fontSize:10,border:{pt:0.5,color:'D9D9D9'},colW:[1.2,1.2,6,1.1,2.5]});
      P.writeFile({fileName:(m.program||'Program')+' — Update.pptx'});
    }catch(e){ alert('PPT export failed: '+e.message); }
  });
}
/* ---------- Timeline (Gantt) export — fit to A4 / PPT ---------- */
function exportTimeline(kind){
  const el=document.querySelector('#ganttChart .gantt');
  if(!el){ alert('Open the Timeline (Plan on a Page) view first.'); return; }
  const title=((DATA.meta&&DATA.meta.program)||'Program')+' — Plan on a Page';
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',()=>{
    window.html2canvas(el,{scale:2,backgroundColor:'#ffffff',width:el.scrollWidth,height:el.scrollHeight,windowWidth:el.scrollWidth}).then(canvas=>{
      const dataUrl=canvas.toDataURL('image/png');
      if(kind==='png'){ const a=document.createElement('a'); a.href=dataUrl; a.download=title+'.png'; a.click(); return; }
      if(kind==='a4'){
        const w=window.open('','_tlprint');
        w.document.write('<html><head><title>'+title+'</title><style>@page{size:A4 landscape;margin:8mm} body{margin:0;font-family:-apple-system,Arial,sans-serif} h3{margin:0 0 6px;font-size:13px;color:#1e3a8a} img{width:100%;height:auto}</style></head><body><h3>'+title+'</h3><img src="'+dataUrl+'" onload="setTimeout(function(){window.focus();window.print();},250)"></body></html>');
        w.document.close(); return;
      }
      if(kind==='ppt'){
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.js',()=>{
          try{
            const P=new PptxGenJS(); P.layout='LAYOUT_WIDE'; const SW=13.33, SH=7.5;
            const sl=P.addSlide();
            sl.addText(title,{x:0.3,y:0.2,w:SW-0.6,h:0.5,fontSize:18,bold:true,color:'1E3A8A'});
            const ax=0.3, ay=0.85, aw=SW-0.6, ah=SH-1.1, ar=canvas.width/canvas.height;
            let iw=aw, ih=iw/ar; if(ih>ah){ ih=ah; iw=ih*ar; }
            sl.addImage({data:dataUrl, x:ax+(aw-iw)/2, y:ay+(ah-ih)/2, w:iw, h:ih});
            P.writeFile({fileName:title+'.pptx'});
          }catch(e){ alert('PPT export failed: '+e.message); }
        });
      }
    }).catch(e=>alert('Could not capture the timeline: '+e.message));
  });
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
  // Payments are derived from milestones; invoice status is kept per-milestone-id here
  d.paymentStatus=(d.paymentStatus&&typeof d.paymentStatus==='object')?d.paymentStatus:{};
  if(Array.isArray(d.payments)) d.payments.forEach(p=>{ if(p&&p.id && !(p.id in d.paymentStatus)) d.paymentStatus[p.id]=p.status||'Not Due'; });
  d.gantt=d.gantt||{};
  d.gantt.start=d.gantt.start||''; d.gantt.end=d.gantt.end||'';
  ['lanes','tasks','milestones'].forEach(k=>{ if(!Array.isArray(d.gantt[k])) d.gantt[k]=[]; });
  d.gantt.lanes.forEach(l=>{ if(!Array.isArray(l.sublanes)) l.sublanes=[]; });
  d.gantt.tasks.forEach(t=>{ if(t.sublane==null) t.sublane=''; });
  DATA=d;
}
function mountDashboard(containerId){
  document.getElementById(containerId).innerHTML = DASH_HTML;
  wireDashboard();
}
