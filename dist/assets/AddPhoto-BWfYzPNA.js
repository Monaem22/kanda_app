import{u as p,r as i,A as x,j as e,a as b,$ as g,y as s}from"./index-Ccy8gSAR.js";import{A as j}from"./api-CiEY4WUz.js";function y(){const d=p(),[t,n]=i.useState(!1),{adminAddUserId:c}=i.useContext(x),[o,l]=i.useState(null),m=a=>{l(a.target.files[0])};async function f(a){if(!a){s.error("معرف المستخدم غير صالح.");return}if(!o){s.error("يرجى اختيار صورة أولاً.");return}try{n(!0);const r=new FormData,u=`${Date.now()}-${o.name}`;r.append("profile_image",o,u);const h=await j.post(`/admin/Update_Image/${a}`,r,{headers:{"Content-Type":"multipart/form-data"}});s.success(h.data.message),d("/display-users"),l(null),n(!1)}catch{s.error("حدث خطأ أثناء رفع الصورة."),n(!1)}}return e.jsxs(e.Fragment,{children:[t&&e.jsx(b,{}),e.jsxs("section",{className:"add-photo",children:[e.jsx("h4",{className:"fw-bold main-bg mb-4",children:"إضافة المعلومات الدقيقة :"}),e.jsx("div",{className:"container",children:e.jsx("div",{className:"row flex-column p-4",children:e.jsxs("div",{className:"col-md-6",children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"profile_image",className:"form-label",children:"صورة الملف الشخصي:"}),e.jsx("input",{type:"file",id:"profile_image",className:"form-control",onChange:m})]}),e.jsx("button",{type:"button",className:"main-bg text-white border-0 rounded-1 fw-bold py-2 w-100 d-flex justify-content-center",onClick:()=>f(c),disabled:t,children:t?e.jsx(g,{height:"20",width:"50",color:"#fff",ariaLabel:"bars-loading",visible:!0}):"ارسال الصورة"})]})})})]})]})}export{y as default};
