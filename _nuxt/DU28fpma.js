import{d as m,D as y,E as u,c as r,e as n,f as i,n as s,G as e,t as d,h as l,H as g,g as x,I as b}from"./w2V3gROd.js";const k=m({inheritAttrs:!1,__name:"Field",props:{name:{type:String,required:!0},description:{type:String,default:void 0},type:{type:String,default:void 0},required:{type:Boolean,default:!1},default:{type:String,default:void 0},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:()=>({})}},setup(t){const f={wrapper:"mt-5",container:"flex items-start gap-x-2.5 font-mono text-sm",name:"rounded-md font-semibold text-primary",required:"text-gray-500 dark:text-gray-400",type:"text-right",label:"flex flex-1 gap-x-2.5",description:"mt-3 mb-0 text-gray-600 dark:text-gray-300 text-sm space-y-3"},o=t,{ui:a,attrs:p}=y("content.field",u(o,"ui"),f,u(o,"class"),!0);return(c,S)=>(r(),n("div",b({class:e(a).wrapper},e(p)),[i("div",{class:s(e(a).container)},[i("div",{class:s(e(a).label)},[i("span",{class:s(e(a).name)},d(t.name),3),t.required?(r(),n("span",{key:0,class:s(e(a).required)},"required",2)):l("",!0)],2),t.type?(r(),n("div",{key:0,class:s(e(a).type)},d(t.type),3)):l("",!0)],2),c.$slots.default||t.description?(r(),n("div",{key:0,class:s(e(a).description)},[g(c.$slots,"default",{},()=>[x(d(t.description),1)])],2)):l("",!0)],16))}}),v=Object.assign(k,{__name:"Field"});export{v as default};
