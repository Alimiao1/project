class More{
	constructor(){
		this.init();

	}
	init(){
		var that =this;
		$.ajax({
			type:"get",
			url:"./data/index.json",
			dataType:"json",
			success:function(res){ 
              that.Display(res); 
                 
			}
		})

		
	}
	Display(res){
		this.res=res;
		console.log(res)
		var str="";
		for(var i=0;i<this.res.length;i++){
			if(this.res[i].id==getCookie("id")){
				str+=`<div class="product-l">
					<div class="case s_box">
					<img src="${this.res[i].src}"/>
					<span></span>
					<p></p>
					
				</div>
				<div class="mirror b_box">
					<img src="${this.res[i].src}"/>
				</div>
				<ul>
						<li><a ><img src="${this.res[i].src1}"/></a></li>
						<li><a><img src="${this.res[i].src2}"/></a></li>
						<li><a><img src="${this.res[i].src3}"/></a></li>
				</ul>
			</div>
			<div class="product-r">
				<h1>${this.res[i].title}</h1>
				<h5>${this.res[i].title2}</h5>
				<div class="action">
					<span class="time">血亏大促销哦</span>
				</div>
				<div class="pricefloor">
					<div class="price_wrap">
						<div class="new">
							<span class="money">¥</span>
							<b class="price">${this.res[i].price}</b>
						</div>
						<div class="old">
							${this.res[i].oldprice}
						</div>
					</div>
					
				</div>
				<div class="onsale">
					<h3>优惠</h3>
					<div class="onsale1">
						<span class="icon_act">送积分</span>
						<span class="icon_text">${this.res[i].grade}</span>
					</div>
				</div>
				<div class="onsale2">
					<h3>领券</h3>
					<div class="onsale3">
						<span class="icon_act1">满50减30</span>
						<span class="icon_text1"><a href="#">领取</a></span>
					</div>
				</div>
				<div class="sku">
					<div class="skuNum">
						<p>库存666(限购十件)</p>
					</div>
				</div>
				<div class="foot">
					<a href="ShopCar.html" class="car">加入购物车</a>
				</div>
			</div>`;
			}
			
		}
		    
		$("#main").html(str);	
		
		new Magnifier();
		var that =this;
		$(".car").on("click",function(){
			var id = $.cookie("id");
					if($.cookie("product") == null){
						that.product = [{
							id:id,
							num:1
						}]
					}else{
						that.product = JSON.parse($.cookie("product"));
						that.onoff = true;
						that.product.forEach((v)=>{
							if(v.id == id){
								v.num++;
								that.onoff = false;
							}
						})
						if(that.onoff){
							that.product.push({
								id:id,
								num:1
							})
						}
					}
			setCookie("product",JSON.stringify(that.product))
		})
		
	}

}
 new More();

function Magnifier(){
			this.oSbox = document.querySelector(".s_box");
			console.log(this.oSbox)
			this.oPbox = this.oSbox.children[1];
			this.oBbox = document.querySelector(".b_box");
			this.oBimg = this.oBbox.children[0];
			this.select = $('.product-l').find('li');
			this.addEvent();
			this.Select();
		}
		Magnifier.prototype.addEvent = function(){
			var that = this;
			this.oSbox.onmouseover = function(){
				that.show();
			}
			this.oSbox.onmouseout = function(){
				that.hide();
			}
		}
		Magnifier.prototype.show = function(){
			this.oPbox.style.display="block";
			this.oBbox.style.display="block";
			this.addMove()
		}
		Magnifier.prototype.hide = function(){
			this.oPbox.style.display="none";
			this.oBbox.style.display="none";
		}
		Magnifier.prototype.addMove = function(){
			var that = this;
			this.oSbox.onmousemove = function(eve){
				var e = eve||window.event
				that.pBoxMove(e);
			}
		}
		Magnifier.prototype.pBoxMove = function(e){
			
			 this.l = e.offsetX -this.oPbox.offsetWidth/2;
			 this.t = e.offsetY -this.oPbox.offsetHeight/2;
			 if(this.l<0)this.l=0;
			 if(this.t<0)this.t=0;
			 if(this.l>this.oSbox.offsetWidth-this.oPbox.offsetWidth){
			 	this.l=this.oSbox.offsetWidth-this.oPbox.offsetWidth;
			 }
			 if(this.t>this.oSbox.offsetHeight-this.oPbox.offsetHeight){
			 	this.t=this.oSbox.offsetHeight-this.oPbox.offsetHeight ;
			 }
			 this.oPbox.style.left = this.l+"px";
			 this.oPbox.style.top = this.t+"px";
			 this.x = this.l/(this.oSbox.offsetWidth-this.oPbox.offsetWidth);
			 this.y = this.t/(this.oSbox.offsetHeight-this.oPbox.offsetHeight);
			 this.Move();
		}
		Magnifier.prototype.Move = function(){
			this.oBimg.style.left = -(this.oBimg.offsetWidth-this.oBbox.offsetWidth)*this.x+"px";
			this.oBimg.style.top = -(this.oBimg.offsetHeight-this.oBbox.offsetHeight)*this.y+"px";
		}
		Magnifier.prototype.Select = function(){
			let that = this
			for(let i=0;i<this.select.length;i++){
				this.select[i].onclick=function(){
					that.Switchpic(that.select[i])
				}
			}
		}
		Magnifier.prototype.Switchpic = function(a){
			
			this.sss= $(a).find('img').attr('src')
			
			$('.s_box').find('img').attr({'src':this.sss})
		    $('.b_box').find('img').attr({'src':this.sss})

		}
