(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n.n(r),u=n(15),o=n.n(u),a=n(6),i=n(3),s=n(0),l=function(e){var t=e.handleSubmit,n=e.setNewName,r=e.newName,c=e.setNewNumber,u=e.newNumber;return Object(s.jsxs)("form",{onSubmit:t,children:[Object(s.jsxs)("label",{children:["Name: ",Object(s.jsx)("input",{type:"text",value:r,onChange:function(e){return n(e.target.value)}})]}),Object(s.jsx)("br",{}),Object(s.jsxs)("label",{children:["Number: ",Object(s.jsx)("input",{type:"text",value:u,onChange:function(e){return c(e.target.value)}})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"Add to phonebook"})})]})},b=function(e){var t=e.searchString,n=e.setSearchString;return Object(s.jsxs)("label",{children:["Filter persons: ",Object(s.jsx)("input",{type:"text",value:t,onChange:function(e){return n(e.target.value)}})]})},d=function(e){var t=e.name,n=e.number,r=e.handleDelete;return Object(s.jsxs)("p",{children:[t," - ",n," ",Object(s.jsx)("button",{onClick:function(){return r()},children:"Delete"})]},t)},j=function(e){var t=e.people,n=e.handleDelete;return t.map((function(e){return Object(s.jsx)(d,{name:e.name,number:e.number,handleDelete:function(){return n(e.name,e.id)}},e.name)}))},f=function(e){var t=e.message;return null===t?null:Object(s.jsx)("div",{style:{color:"LightCoral",backgroundColor:"LightPink",fontSize:"20px",border:"3px solid LightCoral",borderRadius:"5px",padding:"20px",margin:"20px 0"},children:t})},h=function(e){var t=e.message;return null===t?null:Object(s.jsx)("div",{style:{color:"ForestGreen",backgroundColor:"LightGreen",fontSize:"20px",border:"3px solid ForestGreen",borderRadius:"5px",padding:"20px",margin:"20px 0"},children:t})},p=n(4),m=n.n(p),O="api/persons",x=function(){return m.a.get(O).then((function(e){return e.data}))},g=function(e){return m.a.post(O,e).then((function(e){return e.data}))},v=function(e,t){return m.a.put("".concat(O,"/").concat(e),t).then((function(e){return e.data}))},w=function(e){return m.a.delete("".concat(O,"/").concat(e))},S=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(""),o=Object(i.a)(u,2),d=o[0],p=o[1],m=Object(r.useState)(""),O=Object(i.a)(m,2),S=O[0],N=O[1],y=Object(r.useState)("No users found"),k=Object(i.a)(y,2),C=k[0],D=k[1],L=Object(r.useState)(null),A=Object(i.a)(L,2),E=A[0],F=A[1],G=Object(r.useState)(""),P=Object(i.a)(G,2),z=P[0],J=P[1],R=n.filter((function(e){return e.name.toLowerCase().includes(z.toLowerCase())}));return Object(r.useEffect)((function(){x().then((function(e){c(e),D(null),F(null)}))}),[]),Object(r.useEffect)((function(){setTimeout((function(){D(null),F(null)}),3e3)}),[C,E]),Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:"Phone book"}),Object(s.jsx)(f,{message:C}),Object(s.jsx)(h,{message:E}),Object(s.jsx)(b,{searchString:z,setSearchString:J}),Object(s.jsx)("h2",{children:"Add a new person and number"}),Object(s.jsx)(l,{handleSubmit:function(e){if(e.preventDefault(),n.some((function(e){return e.name===d}))){if(window.confirm("".concat(d," already exists. Do you want to update the number?"))){var t=n.find((function(e){return e.name===d})),r=Object(a.a)(Object(a.a)({},t),{},{number:S});v(t.id,r).then((function(e){c(n.map((function(t){return t.id!==e.id?t:e}))),F("".concat(e.name," successfully updated!"))})).catch((function(){D("Unable to find and update ".concat(d)),c(n.filter((function(e){return e.id!==t.id})))}))}}else g({name:d,number:S}).then((function(e){c(n.concat(e)),F("".concat(d," successfully added to the phone book"))}));p(""),N("")},setNewName:p,newName:d,setNewNumber:N,newNumber:S}),Object(s.jsx)("h2",{children:"People in the phone book"}),Object(s.jsx)(j,{people:R,handleDelete:function(e,t){window.confirm("Are you sure you want to delete ".concat(e,"? (id: ").concat(t,")"))&&(w(t),c(n.filter((function(e){return e.id!==t}))),F("".concat(e," successfully deleted")))}})]})};o.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(S,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.1b2d16bd.chunk.js.map