"use strict";(self["webpackChunkvue3_week7"]=self["webpackChunkvue3_week7"]||[]).push([[191],{3123:function(e,a,t){t.d(a,{Z:function(){return m}});var i=t(6252),s=t(3577),n=t(9963);const r={"aria-label":"Page navigation example"},o={class:"pagination justify-content-center"},l=(0,i._)("span",{"aria-hidden":"true"},"第一頁",-1),c=[l],g=(0,i._)("span",{"aria-hidden":"true"},"上一頁",-1),p=[g],u=["onClick"],h=(0,i._)("span",{"aria-hidden":"true"},"下一頁",-1),d=[h],_=(0,i._)("span",{"aria-hidden":"true"},"最後一頁",-1),v=[_];function f(e,a,t,l,g,h){return(0,i.wg)(),(0,i.iD)("nav",r,[(0,i._)("ul",o,[(0,i._)("li",{class:(0,s.C_)(["page-item",{"d-none":!t.pages.has_pre}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:a[0]||(a[0]=(0,n.iM)((e=>h.changePages(t.pages.current_page-(t.pages.total_pages-1))),["prevent"]))},c)],2),(0,i._)("li",{class:(0,s.C_)(["page-item",{"d-none":!t.pages.has_pre}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:a[1]||(a[1]=(0,n.iM)((e=>h.changePages(t.pages.current_page-1)),["prevent"]))},p)],2),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(t.pages.total_pages,((e,a)=>((0,i.wg)(),(0,i.iD)("li",{class:(0,s.C_)(["page-item",{active:e===t.pages.current_page}]),key:a},[(0,i._)("a",{class:"page-link",href:"#",onClick:(0,n.iM)((a=>h.changePages(e)),["prevent"])},(0,s.zw)(e),9,u)],2)))),128)),(0,i._)("li",{class:(0,s.C_)(["page-item",{"d-none":!t.pages.has_next}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:a[2]||(a[2]=(0,n.iM)((e=>h.changePages(t.pages.current_page+1)),["prevent"]))},d)],2),(0,i._)("li",{class:(0,s.C_)(["page-item",{"d-none":!t.pages.has_next}])},[(0,i._)("a",{class:"page-link",href:"#","aria-label":"Next",onClick:a[3]||(a[3]=(0,n.iM)((e=>h.changePages(t.pages.current_page+(t.pages.total_pages-1))),["prevent"]))},v)],2)])])}var k={props:{pages:{type:Object,default(){return{}}}},methods:{changePages(e){this.$emit("change-pages",e)}}},y=t(3744);const C=(0,y.Z)(k,[["render",f]]);var m=C},6191:function(e,a,t){t.r(a),t.d(a,{default:function(){return Z}});var i=t(6252),s=t(9963),n=t(3577);const r={class:"container"},o={class:"mt-4"},l=(0,i._)("h2",{class:"text-center"},"產品列表",-1),c={class:"d-flex menu"},g={class:"row row-cols-1 row-cols-lg-4 g-3"},p={class:"card h-100"},u=["src"],h={class:"card-body"},d={class:"d-flex justify-content-between"},_={class:"card-title"},v=["onClick"],f={key:0},k=(0,i._)("i",{class:"bi bi-heart-fill"},null,-1),y=[k],C={key:1},m=(0,i._)("i",{class:"bi bi-heart"},null,-1),w=[m],b={class:"card-text"},P=(0,i.Uk)("查看更多");function M(e,a,t,k,m,M){const x=(0,i.up)("VLoading"),$=(0,i.up)("router-link"),D=(0,i.up)("Pagination");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",r,[(0,i._)("div",o,[(0,i.Wm)(x,{active:m.isLoading},null,8,["active"]),l,(0,i._)("ul",c,[(0,i._)("li",null,[(0,i._)("a",{href:"#",onClick:a[0]||(a[0]=(0,s.iM)((e=>M.changeCategory("all")),["prevent"]))},"全部")]),(0,i._)("li",null,[(0,i._)("a",{href:"#",onClick:a[1]||(a[1]=(0,s.iM)((e=>M.changeCategory("toast")),["prevent"]))},"吐司系列")]),(0,i._)("li",null,[(0,i._)("a",{href:"#",onClick:a[2]||(a[2]=(0,s.iM)((e=>M.changeCategory("hamburger")),["prevent"]))},"漢堡系列")]),(0,i._)("li",null,[(0,i._)("a",{href:"#",onClick:a[3]||(a[3]=(0,s.iM)((e=>M.changeCategory("fried")),["prevent"]))},"炸物系列")]),(0,i._)("li",null,[(0,i._)("a",{href:"#",onClick:a[4]||(a[4]=(0,s.iM)((e=>M.changeCategory("platter")),["prevent"]))},"拼盤系列")]),(0,i._)("li",null,[(0,i._)("a",{href:"#",onClick:a[5]||(a[5]=(0,s.iM)((e=>M.changeCategory("mainmeal")),["prevent"]))},"主餐系列")])]),(0,i._)("div",g,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(m.products,(e=>((0,i.wg)(),(0,i.iD)("div",{class:"col",key:e.id},[(0,i._)("div",p,[(0,i._)("img",{src:e.imageUrl,class:"card-img-top",alt:"..."},null,8,u),(0,i._)("div",h,[(0,i._)("div",d,[(0,i._)("h5",_,(0,n.zw)(e.title),1),(0,i._)("button",{type:"button",onClick:(0,s.iM)((a=>M.toggleFavorite(e.id)),["prevent"])},[m.favorite.includes(e.id)?((0,i.wg)(),(0,i.iD)("span",f,y)):((0,i.wg)(),(0,i.iD)("span",C,w))],8,v)]),(0,i._)("p",b,(0,n.zw)(e.description),1),(0,i.Wm)($,{class:"btn btn-primary w-100",to:`/product/${e.id}`},{default:(0,i.w5)((()=>[P])),_:2},1032,["to"])])])])))),128))])])]),(0,i.Wm)(D,{pages:m.pagination,onChangePages:M.getProducts},null,8,["pages","onChangePages"])],64)}var x=t(3123),$=t(4902),D={data(){return{products:[],isLoading:!1,pagination:{},category:"all",favorite:JSON.parse(localStorage.getItem("favorite"))||[]}},components:{Pagination:x.Z},watch:{favorite:{handler(){localStorage.setItem("favorite",JSON.stringify(this.favorite)),$.Z.emit("get-favorite")},deep:!0}},methods:{changeCategory(e){this.category=e,this.getProducts()},getProducts(e=1){this.isLoading=!0;let a=`https://vue3-course-api.hexschool.io/v2/api/rousong/products?page=${e}`;this.$router.push("/products"),"all"!==this.category&&(a=`https://vue3-course-api.hexschool.io/v2/api/rousong/products?category=${this.category}`,this.$router.push(`/products?category=${this.category}`)),this.$http.get(a).then((e=>{this.products=e.data.products,this.pagination=e.data.pagination,this.isLoading=!1})).catch((e=>{this.$messageState(e.response,"錯誤訊息")}))},toggleFavorite(e){const a=this.favorite.findIndex((a=>a===e));-1===a?this.favorite.push(e):this.favorite.splice(a,1)}},mounted(){this.$route.query.category&&(this.category=this.$route.query.category),this.getProducts()}},L=t(3744);const S=(0,L.Z)(D,[["render",M]]);var Z=S}}]);
//# sourceMappingURL=191.6b00cce4.js.map