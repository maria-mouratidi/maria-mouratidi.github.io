import{u as x,r,j as e,w as u,b as y,a as w,v as c}from"./index-DzlHFg9Y.js";import{r as p}from"./index.esm-DJZpe5Kp.js";const l={light:{cardBg:"bg-white/15 backdrop-blur-xl border-yellow-200/20",cardHover:"hover:bg-yellow-50/25 hover:border-yellow-400/40 hover:shadow-yellow-400/20",text:"text-gray-800",textSecondary:"text-gray-600",accent:"text-yellow-600",button:"bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-900 border-yellow-500/40",badge:"bg-yellow-100/30 text-yellow-900 border-yellow-400/40",glow:"shadow-yellow-400/20",linkButton:"bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-800 border-yellow-500/40"},dark:{cardBg:"bg-gray-900/15 backdrop-blur-xl border-gray-700/20",cardHover:"hover:bg-gray-900/25 hover:border-blue-500/40 hover:shadow-blue-400/20",text:"text-gray-100",textSecondary:"text-gray-300",accent:"text-blue-400",button:"bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 border-blue-500/40",badge:"bg-blue-900/30 text-blue-200 border-blue-500/40",glow:"shadow-blue-400/20",linkButton:"bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 border-blue-500/40"}},d=[{id:1,title:"Comparing Eye-gaze and Transformer Attention Mechanisms in Reading Tasks",conference:"Recent Advances in Natural Language Processing (RANLP) 2025",journal:"",place:"Varna, Bulgaria",year:"2025",authors:"Maria Mouratidi, Massimo Poesio",abstract:`As transformers become increasingly prevalent in NLP research, evaluating their cognitive alignment with human language processing has become essential for validating them as
                models of human language. This study compares eye-gaze patterns in human reading with
                transformer attention using different attention
                representations (raw attention, attention flow,
                gradient-based saliency). We employ both statistical correlation analysis and predictive modeling using PCA-reduced representations of
                eye-tracking features across two reading tasks.
                The findings reveal lower correlations and predictive capacity for the decoder model compared to the encoder model, with implications
                for the gap between behavioral performance
                and cognitive plausibility of different transformer designs.`,link:"https://aclanthology.org/2025.gaze4nlp-1.4/",type:"Conference Paper",status:"Accepted",image:"images/attn.png"}],f=({publication:t,index:a})=>{const{theme:o}=x(),s=l[o]||l.light,[n,m]=r.useState(!1),[i,b]=r.useState(!1);r.useEffect(()=>{const g=setTimeout(()=>m(!0),a*100);return()=>clearTimeout(g)},[a]);const h=t.abstract?.length>150?t.abstract.substring(0,150)+"...":t.abstract;return e.jsxs("div",{className:`
        ${s.cardBg} ${s.cardHover} border rounded-2xl p-6
        transition-all duration-500 transform ${s.glow} shadow-lg
        ${n?"translate-y-0 opacity-100":"translate-y-8 opacity-0"}
        hover:scale-105
      `,style:{transitionDelay:`${a*50}ms`},children:[t.image&&e.jsxs("div",{className:"w-full h-48 rounded-xl overflow-hidden bg-white border mb-4 relative",children:[e.jsx("img",{src:t.image,alt:t.title,className:"absolute inset-0 w-full h-full object-cover"}),e.jsx("div",{className:"absolute top-2 right-2",children:e.jsx("span",{className:`px-2 py-1 rounded-full border font-bold ${s.badge} text-xs`,children:t.type})}),t.status&&e.jsx("div",{className:"absolute top-2 left-2",children:e.jsx("span",{className:`px-2 py-1 rounded-full border font-bold text-xs ${t.status==="Published"?"bg-green-100/80 text-green-800 border-green-400":t.status==="Accepted"?"bg-blue-100/80 text-blue-800 border-blue-400":"bg-yellow-100/80 text-yellow-800 border-yellow-400"}`,children:t.status})})]}),e.jsx("h3",{className:`font-bold ${s.text} text-xl leading-tight mb-3`,children:t.title}),e.jsx("p",{className:`${s.textSecondary} text-sm mb-3 italic`,children:t.authors}),e.jsxs("div",{className:"space-y-2 mb-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(u,{className:`${s.accent} text-sm`}),e.jsx("span",{className:`${s.accent} font-semibold text-sm`,children:t.conference||t.journal})]}),e.jsxs("div",{className:"flex items-center justify-between text-sm",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(y,{className:`${s.textSecondary}`}),e.jsx("span",{className:`${s.textSecondary}`,children:t.place})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(w,{className:`${s.textSecondary}`}),e.jsx("span",{className:`${s.textSecondary}`,children:t.year})]})]})]}),t.abstract&&e.jsxs("div",{className:"mb-4",children:[e.jsx("h4",{className:`${s.text} font-semibold text-sm mb-2`,children:"Abstract:"}),e.jsx("p",{className:`${s.textSecondary} text-sm leading-relaxed`,children:i?t.abstract:h}),t.abstract.length>150&&e.jsx("button",{onClick:()=>b(!i),className:`${s.accent} text-sm font-medium mt-1 hover:underline`,children:i?"Show less":"Read more"})]}),e.jsx("div",{className:"flex gap-3 mt-4",children:t.link?e.jsxs("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:`
              ${s.linkButton} border px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-300 hover:scale-105 flex items-center gap-2
            `,children:[e.jsx(c,{className:"text-xs"}),"View Publication"]}):e.jsxs("div",{className:`
              bg-gray-400/20 border border-gray-400/40 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium
              flex items-center gap-2 cursor-not-allowed
            `,children:[e.jsx(c,{className:"text-xs"}),"View Publication"]})})]})},N=()=>{const{theme:t}=x(),a=l[t]||l.light,o=r.useRef(null);return e.jsxs("div",{className:"min-h-screen p-4 sm:p-8",children:[e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsx("div",{id:"publications",ref:o,className:"pt-[120px] -mt-[120px]"}),e.jsxs("div",{className:"text-center mb-12",children:[e.jsxs("h1",{className:`pt-10 text-4xl sm:text-5xl font-bold ${a.text} mb-4 flex flex-wrap items-center justify-center gap-2 break-words`,style:{wordBreak:"break-word",overflowWrap:"break-word",minWidth:0,maxWidth:"100%",whiteSpace:"normal"},children:[e.jsx(p,{className:`shrink-0 ${a.accent}`,style:{fontSize:"1.2em"}}),e.jsx("span",{style:{minWidth:0,maxWidth:"100%"},children:"Publications"})]}),e.jsx("p",{className:`text-xl ${a.textSecondary} max-w-3xl mx-auto`})]}),e.jsx("div",{className:`grid gap-8 ${d.length===1?"grid-cols-1 max-w-2xl mx-auto":"grid-cols-1 lg:grid-cols-2"}`,children:d.map((s,n)=>e.jsx(f,{publication:s,index:n},s.id))}),d.length===0&&e.jsxs("div",{className:"text-center py-20",children:[e.jsx("div",{className:`text-6xl ${a.textSecondary} mb-4`,children:"📚"}),e.jsx("h3",{className:`text-2xl font-bold ${a.text} mb-2`,children:"No publications yet"}),e.jsx("p",{className:`${a.textSecondary}`,children:"Publications will be displayed here as they become available."})]})]}),e.jsx("style",{children:`
        @media (max-width: 767px) {
          .max-w-7xl, .grid, .flex, .publications-section {
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box;
          }
          h1, .publications-title {
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          .grid > div {
            min-width: 0 !important;
          }
        }
      `})]})};export{N as default};
