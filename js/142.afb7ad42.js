"use strict";(self["webpackChunkvue3_week7"]=self["webpackChunkvue3_week7"]||[]).push([[142],{6142:function(e,s,a){a.r(s),a.d(s,{default:function(){return E}});var l=a(6252),t=a(3577),r=a(9963);const i={class:"container"},o={class:"mt-4"},d=(0,l.uE)('<h2 class="text-center">訂單資訊</h2><div class="row"><div class="col-6">商品資訊</div><div class="col-3">數量</div><div class="col-3">小計</div></div>',2),c={class:"col-6"},m={class:"d-flex align-items-center"},n=["src","alt"],u={class:"col-3"},f={class:"col-3"},h=(0,l._)("h2",{class:"text-center"},"填寫資訊",-1),v={class:"my-5 row justify-content-center"},p={class:"mb-3"},g=(0,l._)("label",{for:"name",class:"form-label"},"收件人姓名",-1),b={class:"mb-3"},_=(0,l._)("label",{for:"email",class:"form-label"}," Email ",-1),w={class:"mb-3"},V=(0,l._)("label",{for:"tel",class:"form-label"},"收件人電話",-1),k={class:"mb-3"},y=(0,l._)("label",{for:"address",class:"form-label"},"收件人地址",-1),x={class:"mb-3"},W=(0,l._)("label",{for:"message",class:"form-label"},"備註",-1),$={class:"text-end"},C=["disabled"];function L(e,s,a,L,U,S){const q=(0,l.up)("VLoading"),E=(0,l.up)("VField"),z=(0,l.up)("ErrorMessage"),D=(0,l.up)("VForm");return(0,l.wg)(),(0,l.iD)("div",i,[(0,l._)("div",o,[(0,l.Wm)(q,{active:U.isLoading},null,8,["active"]),d,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(U.cart.carts,(s=>((0,l.wg)(),(0,l.iD)("div",{class:"row",key:s.id},[(0,l._)("div",c,[(0,l._)("div",m,[(0,l._)("img",{src:s.product.imageUrl,alt:s.title},null,8,n),(0,l._)("p",null,(0,t.zw)(s.product.title),1)])]),(0,l._)("div",u,(0,t.zw)(s.qty),1),(0,l._)("div",f,(0,t.zw)(e.$filters.currency(s.total)),1)])))),128)),h,(0,l._)("div",v,[(0,l.Wm)(D,{ref:"form",class:"col-md-6",onSubmit:S.createOrder},{default:(0,l.w5)((({errors:e})=>[(0,l._)("div",p,[g,(0,l.Wm)(E,{id:"name",name:"姓名",type:"text",class:(0,t.C_)(["form-control",{"is-invalid":e["姓名"]}]),placeholder:"請輸入姓名",rules:"required",modelValue:U.form.user.name,"onUpdate:modelValue":s[0]||(s[0]=e=>U.form.user.name=e)},null,8,["class","modelValue"]),(0,l.Wm)(z,{name:"姓名",class:"invalid-feedback"})]),(0,l._)("div",b,[_,(0,l.Wm)(E,{id:"email",name:"email",type:"email",class:(0,t.C_)(["form-control",{"is-invalid":e["email"]}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:U.form.user.email,"onUpdate:modelValue":s[1]||(s[1]=e=>U.form.user.email=e)},null,8,["class","modelValue"]),(0,l.Wm)(z,{name:"email",class:"invalid-feedback"})]),(0,l._)("div",w,[V,(0,l.Wm)(E,{id:"tel",name:"電話",type:"text",class:(0,t.C_)(["form-control",{"is-invalid":e["電話"]}]),placeholder:"請輸入電話",rules:S.isPhone,modelValue:U.form.user.tel,"onUpdate:modelValue":s[2]||(s[2]=e=>U.form.user.tel=e)},null,8,["class","rules","modelValue"]),(0,l.Wm)(z,{name:"電話",class:"invalid-feedback"})]),(0,l._)("div",k,[y,(0,l.Wm)(E,{id:"address",name:"地址",type:"text",class:(0,t.C_)(["form-control",{"is-invalid":e["地址"]}]),placeholder:"請輸入地址",rules:"required",modelValue:U.form.user.address,"onUpdate:modelValue":s[3]||(s[3]=e=>U.form.user.address=e)},null,8,["class","modelValue"]),(0,l.Wm)(z,{name:"地址",class:"invalid-feedback"})]),(0,l._)("div",x,[W,(0,l.wy)((0,l._)("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":s[4]||(s[4]=e=>U.form.message=e)},null,512),[[r.nr,U.form.message]])]),(0,l._)("div",$,[(0,l._)("button",{type:"submit",class:"btn btn-danger",disabled:Object.keys(e).length>0}," 送出訂單 ",8,C)])])),_:1},8,["onSubmit"])])])])}var U={data(){return{cart:{carts:[]},form:{user:{name:"",email:"",tel:"",address:""},message:""},id:"",isLoadingItem:"",isLoading:!1}},methods:{getCart(){this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/v2/api/rousong/cart";this.$http.get(e).then((e=>{this.cart=e.data.data,this.isLoading=!1})).catch((e=>{this.$messageState(e.response,"錯誤訊息")}))},isPhone(e){const s=/^(09)[0-9]{8}$/;return!!s.test(e)||"請輸入正確的電話號碼"},createOrder(){this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/v2/api/rousong/order",s=this.form,a="建立訂單";this.$http.post(e,{data:s}).then((e=>{this.$messageState(e,a),this.$refs.form.resetForm(),this.form.message="",this.$router.push({name:"確認訂單",params:{id:e.data.orderId}}),this.isLoading=!1})).catch((e=>{this.$messageState(e.response,"錯誤訊息")}))}},mounted(){this.getCart()}},S=a(3744);const q=(0,S.Z)(U,[["render",L]]);var E=q}}]);
//# sourceMappingURL=142.afb7ad42.js.map