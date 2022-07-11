"use strict";(self["webpackChunkvue3_week7"]=self["webpackChunkvue3_week7"]||[]).push([[232],{3123:function(e,a,s){s.d(a,{Z:function(){return P}});var i=s(6252),t=s(3577),n=s(9963);const l={"aria-label":"Page navigation example"},r={class:"pagination justify-content-center"},c=(0,i._)("span",{"aria-hidden":"true"},"第一頁",-1),g=[c],o=(0,i._)("span",{"aria-hidden":"true"},"上一頁",-1),p=[o],u=["onClick"],d=(0,i._)("span",{"aria-hidden":"true"},"下一頁",-1),_=[d],h=(0,i._)("span",{"aria-hidden":"true"},"最後一頁",-1),v=[h];function k(e,a,s,c,o,d){return(0,i.wg)(),(0,i.iD)("nav",l,[(0,i._)("ul",r,[(0,i._)("li",{class:(0,t.C_)(["page-item",{"d-none":!s.pages.has_pre}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:a[0]||(a[0]=(0,n.iM)((e=>d.changePages(s.pages.current_page-(s.pages.total_pages-1))),["prevent"]))},g)],2),(0,i._)("li",{class:(0,t.C_)(["page-item",{"d-none":!s.pages.has_pre}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:a[1]||(a[1]=(0,n.iM)((e=>d.changePages(s.pages.current_page-1)),["prevent"]))},p)],2),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.pages.total_pages,((e,a)=>((0,i.wg)(),(0,i.iD)("li",{class:(0,t.C_)(["page-item",{active:e===s.pages.current_page}]),key:a},[(0,i._)("a",{class:"page-link",href:"#",onClick:(0,n.iM)((a=>d.changePages(e)),["prevent"])},(0,t.zw)(e),9,u)],2)))),128)),(0,i._)("li",{class:(0,t.C_)(["page-item",{"d-none":!s.pages.has_next}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:a[2]||(a[2]=(0,n.iM)((e=>d.changePages(s.pages.current_page+1)),["prevent"]))},_)],2),(0,i._)("li",{class:(0,t.C_)(["page-item",{"d-none":!s.pages.has_next}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Next",onClick:a[3]||(a[3]=(0,n.iM)((e=>d.changePages(s.pages.current_page+(s.pages.total_pages-1))),["prevent"]))},v)],2)])])}var m={props:{pages:{type:Object,default(){return{}}}},methods:{changePages(e){this.$emit("change-pages",e)}}},w=s(3744);const f=(0,w.Z)(m,[["render",k]]);var P=f},232:function(e,a,s){s.r(a),s.d(a,{default:function(){return f}});var i=s(6252),t=s(3577);const n={class:"container"},l={class:"mt-4"},r={class:"row row-cols-1 row-cols-md-2 g-4"},c={key:0,class:"col"},g={class:"card"},o=["src","alt"],p={class:"card-body"},u={class:"card-title"},d={class:"card-footer"},_=(0,i.Uk)(" 文章頁面 ");function h(e,a,s,h,v,k){const m=(0,i.up)("VLoading"),w=(0,i.up)("router-link"),f=(0,i.up)("Pagination");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",n,[(0,i._)("div",l,[(0,i.Wm)(m,{active:v.isLoading},null,8,["active"]),(0,i._)("ul",r,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(v.articles,(a=>((0,i.wg)(),(0,i.iD)("li",{key:a.id},[a.isPublic?((0,i.wg)(),(0,i.iD)("div",c,[(0,i._)("div",g,[(0,i._)("img",{src:a.imageUrl,class:"card-img-top",alt:a.title},null,8,o),(0,i._)("div",p,[(0,i._)("span",null,(0,t.zw)(e.$filters.date(a.create_at)),1),(0,i._)("h5",u,(0,t.zw)(a.title),1),(0,i._)("div",null,(0,t.zw)(a.description),1)]),(0,i._)("div",d,[a.isPublic?((0,i.wg)(),(0,i.j4)(w,{key:0,to:`/article/${a.id}`,class:"btn btn-outline-primary"},{default:(0,i.w5)((()=>[_])),_:2},1032,["to"])):(0,i.kq)("",!0)])])])):(0,i.kq)("",!0)])))),128))])])]),(0,i.Wm)(f,{pages:v.pagination,onChangePages:k.getArticles},null,8,["pages","onChangePages"])],64)}var v=s(3123),k={data(){return{articles:[],isLoading:!1,pagination:{}}},components:{Pagination:v.Z},methods:{getArticles(e=1){const a=`https://vue3-course-api.hexschool.io/v2/api/rousong/articles?page=${e}`;this.$http.get(a).then((e=>{console.log(e),this.articles=e.data.articles,this.pagination=e.data.pagination})).catch((e=>{this.$messageState(e.response,"錯誤訊息")}))}},mounted(){this.getArticles()}},m=s(3744);const w=(0,m.Z)(k,[["render",h]]);var f=w}}]);
//# sourceMappingURL=232.1f32deb9.js.map