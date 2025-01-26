import{u as C}from"./uV88l-Zo.js";import{m as I,u as T,r as u,n as q,o,c as l,a as t,d as r,t as a,F as w,p as _,q as D,s as y}from"./GJOK1xqK.js";import{_ as M}from"./DlAUqK2U.js";const P={class:"max-w-7xl mx-auto px-4 py-8"},$={class:"text-lg text-gray-700 mb-4"},N={class:"text-lg text-gray-700 mb-4"},R={class:"text-lg text-gray-700 mb-4"},S={class:"border-b-2 border-solid mb-4 pb-4"},V={class:"flex gap-2"},j=["onClick"],E={key:1,class:"text-gray-500 mt-4"},F={key:2,class:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"},z={class:"bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"},A={class:"mt-4"},K={key:1,class:"text-red-500"},L={key:2,class:"text-blue-500 mt-2"},G={key:3,class:"text-red-500 mt-2"},H=I({__name:"booking",setup(J){const b=C(),x=T(),g=u(x.query.movie_id),d=u(x.query.showdate),v=u(x.query.daytime),k=u(b.places),n=u(null),m=u(!1),p=u(null);q(async()=>{g.value&&d.value&&v.value?await b.fetchPlaces(parseInt(g.value,10),v.value,d.value):console.error("Missing query parameters.")});const h=c=>{n.value=c},f=()=>{n.value=null},B=async c=>{var e,i;if(!m.value){m.value=!0,p.value=null;try{const s=await b.bookTicket({movie_id:parseInt(g.value,10),row:c.row,seat:c.seat,showdate:d.value,daytime:v.value});alert(`Ticket booked! Ticket key: ${s}`),await b.fetchPlaces(parseInt(g.value,10),v.value,d.value),f()}catch(s){p.value=((i=(e=s==null?void 0:s.response)==null?void 0:e.data)==null?void 0:i.error_message)||"Booking failed.",console.error("Booking failed:",s)}finally{m.value=!1}}};return(c,e)=>(o(),l("div",P,[e[9]||(e[9]=t("h1",{class:"text-4xl font-extrabold text-gray-900 mb-4"},"Booking",-1)),t("p",$,[e[1]||(e[1]=t("strong",null,"Movie ID:",-1)),r(" "+a(g.value),1)]),t("p",N,[e[2]||(e[2]=t("strong",null,"Date:",-1)),r(" "+a(d.value),1)]),t("p",R,[e[3]||(e[3]=t("strong",null,"Time:",-1)),r(" "+a(v.value),1)]),e[10]||(e[10]=t("h2",{class:"text-2xl font-semibold text-gray-800 mb-4"},"Available Places",-1)),k.value?(o(!0),l(w,{key:0},_(k.value,i=>(o(),l("div",S,[r(" Row - "+a(i[0].row)+" ",1),t("div",V,[(o(!0),l(w,null,_(i[1],s=>(o(),l("div",{key:`${c.rowIndex}-${s.seat}`,class:D(["flex justify-center items-center w-6 h-6 rounded-lg cursor-pointer border text-xs",s.is_free?"bg-green-200 hover:bg-green-300":"bg-red-300"]),onClick:O=>h({...s,row:i[0].row})},a(s.seat),11,j))),128))])]))),256)):(o(),l("p",E,"No available places.")),n.value?(o(),l("div",F,[t("div",z,[e[8]||(e[8]=t("h3",{class:"text-xl font-bold mb-4"},"Booking Details",-1)),t("p",null,[e[4]||(e[4]=t("strong",null,"Row:",-1)),r(" "+a(n.value.row),1)]),t("p",null,[e[5]||(e[5]=t("strong",null,"Seat:",-1)),r(" "+a(n.value.seat),1)]),t("p",null,[e[6]||(e[6]=t("strong",null,"Date:",-1)),r(" "+a(d.value),1)]),t("p",null,[e[7]||(e[7]=t("strong",null,"Time:",-1)),r(" "+a(v.value),1)]),t("div",A,[n.value.is_free&&!m.value?(o(),l("button",{key:0,onClick:e[0]||(e[0]=i=>B(n.value)),class:"w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"}," Book ")):n.value.is_free?y("",!0):(o(),l("p",K," This seat is already booked. ")),m.value?(o(),l("p",L," Booking your ticket... ")):y("",!0),p.value?(o(),l("p",G,a(p.value),1)):y("",!0)]),t("button",{onClick:f,class:"mt-4 w-full px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"}," Close ")])])):y("",!0)]))}}),X=M(H,[["__scopeId","data-v-8b8efb8d"]]);export{X as default};
