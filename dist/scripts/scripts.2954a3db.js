angular.module("angularCharts",["angularChartsTemplates"]),angular.module("angularCharts").directive("acChart",["$templateCache","$compile","$rootElement","$window","$timeout","$sce",function(a,b,c,d,e,f){function g(){for(var a="0123456789ABCDEF".split(""),b="#",c=0;6>c;c++)b+=a[Math.round(15*Math.random())];return b}function h(a,b){var c=null;for(var d in a)if(angular.isElement(a[d])&&(c=angular.element(a[d]),c.hasClass(b)))return c;return c}function i(c,i){function j(){m(),k(),l();var a=n(L);a(),x()}function k(){if(!B.legend.display)return H=D,void(I=C);switch(B.legend.position){case"top":case"bottom":H=.75*D,I=C;break;case"left":case"right":H=D,I=.75*C}}function l(){var d=a.get("angularChartsTemplate_"+B.legend.position);i.html(d),b(i.contents())(c);var e=i.find("div");J=h(e,"ac-chart"),K=h(e,"ac-legend"),H-=h(e,"ac-title")[0].clientHeight}function m(){E=c.acData,L=c.acChart,F=E?E.series||[]:[],G=E?E.data||[]:[],c.acConfig&&angular.extend(B,c.acConfig)}function n(a){var b={pie:s,bar:p,line:q,area:r,point:t};return b[a]}function o(a,b){var c=b.domain();if(B.xAxisMaxTicks&&c.length>B.xAxisMaxTicks){var d=Math.ceil(c.length/B.xAxisMaxTicks);a.tickValues(c.filter(function(a,b){return b%d===0}))}}function p(){var a={top:0,right:20,bottom:30,left:40};I-=a.left+a.right,H-=a.top+a.bottom;var b=d3.scale.ordinal().rangeRoundBands([0,I],.1),d=d3.scale.linear().range([H,10]),e=d3.scale.ordinal().rangeRoundBands([0,I],.1),f=[0];G.forEach(function(a){a.nicedata=a.y.map(function(b,c){return f.push(b),{x:a.x,y:b,s:c,tooltip:angular.isArray(a.tooltip)?a.tooltip[c]:a.tooltip}})});var g=d3.max(G.map(function(a){return a.y.length}));c.yMaxData=g,b.domain(G.map(function(a){return a.x}));var h=.2*d3.max(f);d.domain([d3.min(f),d3.max(f)+h]),e.domain(d3.range(g)).rangeRoundBands([0,b.rangeBand()]);var i=d3.svg.axis().scale(b).orient("bottom");o(i,b);var j=d3.svg.axis().scale(d).orient("left").ticks(10).tickFormat(d3.format("s")),k=d3.select(J[0]).append("svg").attr("width",I+a.left+a.right).attr("height",H+a.top+a.bottom).append("g").attr("transform","translate("+a.left+","+a.top+")");k.append("g").attr("class","x axis").attr("transform","translate(0,"+H+")").call(i),k.append("g").attr("class","y axis").call(j);var l=k.selectAll(".state").data(G).enter().append("g").attr("class","g").attr("transform",function(a){return"translate("+b(a.x)+",0)"}),m=l.selectAll("rect").data(function(a){return a.nicedata}).enter().append("rect");m.attr("width",e.rangeBand()),m.attr("x",function(a,b){return e(b)}).attr("y",H).style("fill",function(a){return A(a.s)}).attr("height",0).transition().ease("cubic-in-out").duration(B.isAnimate?1e3:0).attr("y",function(a){return d(Math.max(0,a.y))}).attr("height",function(a){return Math.abs(d(a.y)-d(0))}),m.on("mouseover",function(a){u({index:a.x,value:a.tooltip?a.tooltip:a.y,series:F[a.s]},d3.event),B.mouseover(a,d3.event),c.$apply()}).on("mouseleave",function(a){v(),B.mouseout(a,d3.event),c.$apply()}).on("mousemove",function(a){w(a,d3.event)}).on("click",function(a){B.click.call(a,d3.event),c.$apply()}),B.labels&&l.selectAll("not-a-class").data(function(a){return a.nicedata}).enter().append("text").attr("x",function(a,b){return e(b)}).attr("y",function(a){return H-Math.abs(d(a.y)-d(0))}).text(function(a){return a.y}),k.append("line").attr("x1",I).attr("y1",d(0)).attr("y2",d(0)).style("stroke","silver")}function q(){function a(a){return Math.round(d(a))+d.rangeBand()/2}var b={top:0,right:40,bottom:20,left:40};I-=b.left+b.right,H-=b.top+b.bottom;var d=d3.scale.ordinal().domain(G.map(function(a){return a.x})).rangeRoundBands([0,I]),e=d3.scale.linear().range([H,10]),f=d3.svg.axis().scale(d).orient("bottom");o(f,d);var g=d3.svg.axis().scale(e).orient("left").ticks(5).tickFormat(d3.format("s")),h=d3.svg.line().interpolate(B.lineCurveType).x(function(b){return a(b.x)}).y(function(a){return e(a.y)}),i=[0],j=[];G.forEach(function(a){a.y.map(function(a){i.push(a)})});var k=d3.max(G.map(function(a){return a.y.length}));c.yMaxData=k,F.slice(0,k).forEach(function(a,b){var c={};c.series=a,c.values=G.map(function(a){return a.y.map(function(b){return{x:a.x,y:b,tooltip:a.tooltip}})[b]||{x:G[b].x,y:0}}),j.push(c)});var l=d3.select(J[0]).append("svg").attr("width",I+b.left+b.right).attr("height",H+b.top+b.bottom).append("g").attr("transform","translate("+b.left+","+b.top+")"),m=.2*d3.max(i);e.domain([d3.min(i),d3.max(i)+m]),l.append("g").attr("class","x axis").attr("transform","translate(0,"+H+")").call(f),l.append("g").attr("class","y axis").call(g);var n=l.selectAll(".points").data(j).enter().append("g"),p=n.attr("points","points").append("path").attr("class","ac-line").style("stroke",function(a,b){return A(b)}).attr("d",function(a){return h(a.values)}).attr("stroke-width","2").attr("fill","none");if(j.length>0){var q=j[j.length-1].values;if(q.length>0){var r=p.node().getTotalLength()+a(q[q.length-1].x);p.attr("stroke-dasharray",r+" "+r).attr("stroke-dashoffset",r).transition().duration(B.isAnimate?1500:0).ease("linear").attr("stroke-dashoffset",0).attr("d",function(a){return h(a.values)})}}return angular.forEach(j,function(b){var d=l.selectAll(".circle").data(b.values).enter();d.append("circle").attr("cx",function(b){return a(b.x)}).attr("cy",function(a){return e(a.y)}).attr("r",3).style("fill",A(j.indexOf(b))).style("stroke",A(j.indexOf(b))).on("mouseover",function(a){return function(b){u({index:b.x,value:b.tooltip?b.tooltip:b.y,series:a},d3.event),B.mouseover(b,d3.event),c.$apply()}}(b.series)).on("mouseleave",function(a){v(),B.mouseout(a,d3.event),c.$apply()}).on("mousemove",function(){w(d3.event)}).on("click",function(a){B.click(a,d3.event),c.$apply()}),B.labels&&d.append("text").attr("x",function(b){return a(b.x)}).attr("y",function(a){return e(a.y)}).text(function(a){return a.y})}),"lineEnd"===B.lineLegend&&n.append("text").datum(function(a){return{name:a.series,value:a.values[a.values.length-1]}}).attr("transform",function(b){return"translate("+a(b.value.x)+","+e(b.value.y)+")"}).attr("x",3).text(function(a){return a.name}),j}function r(){function a(a){return Math.round(d(a))+d.rangeBand()/2}var b={top:0,right:40,bottom:20,left:40};I-=b.left+b.right,H-=b.top+b.bottom;var d=d3.scale.ordinal().domain(G.map(function(a){return a.x})).rangePoints([0,I]),e=d3.scale.linear().range([H,10]),f=d3.svg.axis().scale(d).orient("bottom");o(f,d);var g=d3.svg.axis().scale(e).orient("left").ticks(5).tickFormat(d3.format("s"));d3.svg.line().interpolate(B.lineCurveType).x(function(b){return a(b.x)}).y(function(a){return e(a.y)});var h=[0],i=[];G.forEach(function(a){a.y.map(function(a){h.push(a)})});var j=d3.max(G.map(function(a){return a.y.length}));c.yMaxData=j,F.slice(0,j).forEach(function(a,b){var c={};c.series=a,c.values=G.map(function(a){return a.y.map(function(b){return{x:a.x,y:b}})[b]||{x:G[b].x,y:0}}),i.push(c)});var k=d3.select(J[0]).append("svg").attr("width",I+b.left+b.right).attr("height",H+b.top+b.bottom).append("g").attr("transform","translate("+b.left+","+b.top+")"),l=.2*d3.max(h);e.domain([d3.min(h),d3.max(h)+l]),k.append("g").attr("class","x axis").attr("transform","translate(0,"+H+")").call(f),k.append("g").attr("class","y axis").call(g);var m=k.selectAll(".points").data(i).enter().append("g"),n=d3.svg.area().interpolate("basis").x(function(b){return a(b.x)}).y0(function(){return e(0)}).y1(function(a){return e(0+a.y)});m.append("path").attr("class","area").attr("d",function(a){return n(a.values)}).style("fill",function(a,b){return A(b)}).style("opacity","0.7")}function s(){function a(a){a.innerRadius=0;var b=d3.interpolate({startAngle:0,endAngle:0},a);return function(a){return g(b(a))}}var b=Math.min(I,H)/2,d=d3.select(J[0]).append("svg").attr("width",I).attr("height",H).append("g").attr("transform","translate("+I/2+","+H/2+")"),e=0;if(B.innerRadius){var f=B.innerRadius;f="string"==typeof f&&f.indexOf("%")>0?.01*b*parseFloat(f):Number(f),f>=0&&(e=f)}c.yMaxData=G.length;var g=d3.svg.arc().outerRadius(b-10).innerRadius(e);d3.svg.arc().outerRadius(b+5).innerRadius(0);var h=d3.layout.pie().sort(null).value(function(a){return a.y[0]}),i=d.selectAll(".arc").data(h(G)).enter().append("g"),j=!1;i.append("path").style("fill",function(a,b){return A(b)}).transition().ease("linear").duration(B.isAnimate?500:0).attrTween("d",a).attr("class","arc").each("end",function(){j||(j=!0,i.on("mouseover",function(a){u({value:a.data.tooltip?a.data.tooltip:a.data.y[0]},d3.event),d3.select(this).select("path").transition().duration(200).style("stroke","white").style("stroke-width","2px"),B.mouseover(a,d3.event),c.$apply()}).on("mouseleave",function(a){d3.select(this).select("path").transition().duration(200).style("stroke","").style("stroke-width",""),v(),B.mouseout(a,d3.event),c.$apply()}).on("mousemove",function(a){w(a,d3.event)}).on("click",function(a){B.click(a,d3.event),c.$apply()}))}),B.labels&&i.append("text").attr("transform",function(a){return"translate("+g.centroid(a)+")"}).attr("dy",".35em").style("text-anchor","middle").text(function(a){return a.data.y[0]})}function t(){function a(a){return Math.round(d(a))+d.rangeBand()/2}var b={top:0,right:40,bottom:20,left:40};I-=b.left-b.right,H-=b.top-b.bottom;var d=d3.scale.ordinal().domain(G.map(function(a){return a.x})).rangeRoundBands([0,I]),e=d3.scale.linear().range([H,10]),f=d3.svg.axis().scale(d).orient("bottom");o(f,d);var g=d3.svg.axis().scale(e).orient("left").ticks(5).tickFormat(d3.format("s")),h=[0],i=[];G.forEach(function(a){a.y.map(function(a){h.push(a)})});var j=d3.max(G.map(function(a){return a.y.length}));c.yMaxPoints=j,F.slice(0,j).forEach(function(a,b){var c={};c.series=a,c.values=G.map(function(a){return a.y.map(function(b){return{x:a.x,y:b}})[b]||{x:G[b].x,y:0}}),i.push(c)});var k=d3.select(J[0]).append("svg").attr("width",I+b.left+b.right).attr("height",H+b.top+b.bottom).append("g").attr("transform","translate("+b.left+","+b.top+")"),l=.2*d3.max(h);e.domain([d3.min(h),d3.max(h)+l]),k.append("g").attr("class","x axis").attr("transform","translate(0,"+H+")").call(f),k.append("g").attr("class","y axis").call(g),k.selectAll(".points").data(i).enter().append("g"),angular.forEach(i,function(b){var d=k.selectAll(".circle").data(b.values).enter();d.append("circle").attr("cx",function(b){return a(b.x)}).attr("cy",function(a){return e(a.y)}).attr("r",3).style("fill",A(i.indexOf(b))).style("stroke",A(i.indexOf(b))).on("mouseover",function(a){return function(b){u({index:b.x,value:b.tooltip?b.tooltip:b.y,series:a},d3.event),B.mouseover(b,d3.event),c.$apply()}}(b.series)).on("mouseleave",function(a){v(),B.mouseout(a,d3.event),c.$apply()}).on("mousemove",function(){w(d3.event)}).on("click",function(a){B.click(a,d3.event),c.$apply()}),B.labels&&d.append("text").attr("x",function(b){return a(b.x)}).attr("y",function(a){return e(a.y)}).text(function(a){return a.y})})}function u(a,b){if(B.tooltips){a="function"==typeof B.tooltips?B.tooltips(a):a.value;var d=angular.element('<p class="ac-tooltip"></p>').html(a).css({left:b.pageX+20+"px",top:b.pageY-30+"px"});angular.element(document.querySelector(".ac-tooltip")).remove(),angular.element(document.body).append(d),c.$tooltip=d}}function v(){c.$tooltip&&c.$tooltip.remove()}function w(a){c.$tooltip&&c.$tooltip.css({left:a.pageX+20+"px",top:a.pageY-30+"px"})}function x(){c.legends=[],"pie"===L&&angular.forEach(G,function(a,b){c.legends.push({color:B.colors[b],title:z(a.x)})}),("bar"===L||"area"===L||"point"===L||"line"===L&&"traditional"===B.lineLegend)&&angular.forEach(F,function(a,b){c.legends.push({color:B.colors[b],title:z(a)})})}function y(a){return String(a).replace(/[&<>"'\/]/g,function(a){return M[a]})}function z(a){return f.trustAsHtml(B.legend.htmlEnabled?a:y(a))}function A(a){if(a<B.colors.length)return B.colors[a];var b=g();return B.colors.push(b),b}var B={title:"",tooltips:!0,labels:!1,mouseover:function(){},mouseout:function(){},click:function(){},legend:{display:!0,position:"left",htmlEnabled:!1},colors:[],innerRadius:0,lineLegend:"lineEnd",lineCurveType:"cardinal",isAnimate:!0},C=i[0].clientWidth,D=i[0].clientHeight;if(0===D||0===C)throw new Error("Please set height and width for the chart element");var E,F,G,H,I,J,K,L,M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},N=angular.element(d),O=null;N.bind("resize",function(){O&&e.cancel(O),O=e(function(){C=i[0].clientWidth,D=i[0].clientHeight,j()},100)}),c.getWindowDimensions=function(){return{h:N[0].clientHeight,w:N[0].clientWidth}},c.$watch("[acChart, acData, acConfig]",j,!0),c.$watch(function(){return{w:i[0].clientWidth,h:i[0].clientHeight}},function(a){C=a.w,D=a.h,j()},!0)}return{restrict:"EA",link:i,transclude:"true",scope:{acChart:"=",acData:"=",acConfig:"="}}}]),function(){var a=".angular-charts-template .axis path,.angular-charts-template .axis line{fill:none;stroke:#333}.angular-charts-template .ac-title{font-weight:700;font-size:1.2em}.angular-charts-template .ac-chart{float:left;width:75%}.angular-charts-template .ac-line{fill:none;stroke-width:2px}.angular-charts-template table{float:left;max-width:25%;list-style:none;margin:0;padding:0}.angular-charts-template td[ng-bind]{display:inline-block}.angular-charts-template .ac-legend-box{border-radius:5px;height:15px;width:15px}.ac-tooltip{display:block;position:absolute;border:2px solid rgba(51,51,51,.9);background-color:rgba(22,22,22,.7);border-radius:5px;padding:5px;color:#fff}",b=document.createElement("style");if(document.getElementsByTagName("head")[0].appendChild(b),b.styleSheet)b.styleSheet.disabled||(b.styleSheet.cssText=a);else try{b.innerHTML=a}catch(c){b.innerText=a}}(),angular.module("angularChartsTemplates",["angularChartsTemplate_left","angularChartsTemplate_right"]),angular.module("angularChartsTemplate_left",[]).run(["$templateCache",function(a){a.put("angularChartsTemplate_left",'<div class="angular-charts-template"><div class="ac-title">{{acConfig.title}}</div><div class="ac-legend" ng-show="{{acConfig.legend.display}}"><table><tr ng-repeat="l in legends"><td><div class="ac-legend-box" ng-attr-style="background:{{l.color}};"></div></td><td ng-bind-html="l.title"></td></tr></table></div><div class="ac-chart"></div></div>')}]),angular.module("angularChartsTemplate_right",[]).run(["$templateCache",function(a){a.put("angularChartsTemplate_right",'<div class="angular-charts-template"><div class="ac-title">{{acConfig.title}}</div><div class="ac-chart"></div><div class="ac-legend" ng-show="{{acConfig.legend.display}}"><table><tr ng-repeat="l in legends | limitTo:yMaxData"><td><div class="ac-legend-box" ng-attr-style="background:{{l.color}};"></div></td><td ng-bind-html="l.title"></td></tr></table></div></div>')}]),angular.module("clientApp",["angularCharts","uiGmapgoogle-maps","flash","ngProgress","ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/activity",{templateUrl:"views/activity.html",controller:"ActivityCtrl"}).when("/map",{templateUrl:"views/map.html",controller:"MapCtrl"}).when("/logout",{templateUrl:"views/logout.html",controller:"LogoutCtrl"}).when("/createaccount",{templateUrl:"views/createaccount.html",controller:"CreateaccountCtrl"}).when("/app",{templateUrl:"views/app.html",controller:"AppCtrl"}).when("/chat",{templateUrl:"views/chat.html",controller:"ChatCtrl"}).when("/screenshot",{templateUrl:"views/chat.html",controller:"ChatCtrl"}).when("/chatclient",{templateUrl:"views/chatclient.html",controller:"ChatclientCtrl"}).when("/clientlogin",{templateUrl:"views/clientlogin.html",controller:"ClientloginCtrl"}).when("/clientcreateaccount",{templateUrl:"views/clientcreateaccount.html",controller:"ClientcreateaccountCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("clientApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.name="johan"}]),angular.module("clientApp").controller("ActivityCtrl",["$scope","$rootScope","activityFactory","dateFactory","ngProgress","$location",function(a,b,c,d,e,f){function g(){c.getDeviceData(function(b){var d=b.deviceid,e=b.devicename;a.devicename=e,a.deviceData={first:e},a.deviceDataArray.push(b),c.getOnlineData(function(b){null==b||0===b.length?(a.onlinestatus="?",a.onlinetime="?"):(a.onlinestatus=b[0].status,a.onlinetime=b[0].timestamp,"online"===a.onlinestatus&&i())},d)}),c.registerUpdateCallback(function(){{var b=new Date;b.getMonth()+1,b.getDate()}a.chartdata=c.getChartData(),a.tableDataArray=c.getTableData(),a.savedData=a.tableDataArray;var e=d.getTodayString();e=e.substring(4,8),h(e)}),c.triggerChartData()}function h(b){for(var c,d,e=[],f=0;f<a.savedData.length;f++)d=a.savedData[f].timeid,c=d.toString(),c.indexOf(b)>-1&&e.push(a.savedData[f]);a.tableDataArray=e}function i(){a.customStyle.style={color:"green"}}(null==b.user||0==b.user.length)&&f.path("/"),a.deviceDataArray=[],a.deviceData="",a.tableDataArray=[],a.savedData,a.onlinestatus,a.devicename,a.onlinetime,a.customStyle={},g(),a.chartType="bar",a.chartconfig={title:"Activity hours (click for details)",tooltips:!0,labels:!1,mouseover:function(){},mouseout:function(){},click:function(){var a;a=this.x.substring(0,2)+this.x.substring(3,5),h(a)},legend:{display:!0,position:"right"}}}]),angular.module("clientApp").controller("AppCtrl",["$scope","$rootScope","activityFactory","appFactory","chartFactory","dateFactory","$location",function(a,b,c,d,e,f,g){function h(){c.getDeviceData(function(b){var d=b.deviceid,e=b.devicename;a.devicename=e,a.deviceData={first:e},a.deviceDataArray.push(b),c.getOnlineData(function(b){null==b||0===b.length?(a.onlinestatus="?",a.onlinetime="?"):(a.onlinestatus=b[0].status,a.onlinetime=b[0].timestamp,"online"===a.onlinestatus&&j())},d)}),c.registerUpdateCallback(function(){a.chartdata=c.getChartData()}),c.triggerChartData(),d.getApps(function(b){a.savedData=b;var c=e.getAppChartData(b,f.getTodayString());a.chartDataPie=c,a.tableDataArray=e.getAppTableData()})}function i(b){for(var c,d,g=[],h=0;h<a.savedData.length;h++)d=a.savedData[h].timeid,c=d.toString(),c.indexOf(b)>-1&&g.push(a.savedData[h]);b=f.getYearString()+b;var i=e.getAppChartData(a.savedData,b);a.chartDataPie=i,a.tableDataArray=e.getAppTableData()}function j(){a.customStyle.style={color:"green"}}(null==b.user||0==b.user.length)&&g.path("/"),a.deviceDataArray=[],a.deviceData="",a.tableDataArray=[],a.savedData,a.onlinestatus,a.devicename,a.onlinetime,a.customStyle={},h(),a.chartType="bar",a.chartconfig={title:"Activity hours (click for details)",tooltips:!0,labels:!1,mouseover:function(){},mouseout:function(){},click:function(){var a;a=this.x.substring(0,2)+this.x.substring(3,5),i(a)},legend:{display:!0,position:"right"}},a.chartTypePie="pie",a.chartConfigPie={title:"Apps",tooltips:!0,labels:!0,mouseover:function(){},mouseout:function(){},click:function(){},legend:{display:!0,position:"left"}}}]),angular.module("clientApp").controller("MapCtrl",["$scope","$http","$rootScope","configFactory","activityFactory","$location",function(a,b,c,d,e,f){function g(){var c,f,g,i,j;e.getDeviceData(function(b){var c=b.deviceid,d=b.devicename;a.devicename=d,a.deviceData={first:d},a.deviceDataArray.push(b),e.getOnlineData(function(b){null==b||0===b.length?(a.onlinestatus="?",a.onlinetime="?"):(a.onlinestatus=b[0].status,a.onlinetime=b[0].timestamp,"online"===a.onlinestatus&&h())},c)}),j=d.getBaseURL()+"map",b.get(j).success(function(b){if(a.posData=b,b.length>0){g=b[0],c=g.lat,f=g.lon,i=g.devicename;var d=[];d.push({id:1,latitude:c,longitude:f,showWindow:!0,title:i}),a.map.markers=d,a.map.center={latitude:c,longitude:f}}}).error(function(){})}function h(){a.customStyle.style={color:"green"}}(null==c.user||0==c.user.length)&&f.path("/"),a.deviceDataArray=[],a.deviceData="",a.posData="",a.onlinestatus,a.devicename,a.onlinetime,a.customStyle={},google.maps.visualRefresh=!0,angular.extend(a,{map:{control:{},center:{latitude:45,longitude:-73},options:{streetViewControl:!1,panControl:!1,maxZoom:20,minZoom:3},zoom:15,dragging:!0,bounds:{},markers:[],refresh:function(){a.map.control.refresh(origCenter)}}}),g(),a.onDeviceClick=function(){window.alert("click")}}]),angular.module("clientApp").controller("LoginCtrl",["$scope","flash","loginFactory",function(a,b,c){a.master={},a.flash=b,a.text="",a.login=function(){c.startProgress(),c.registerUpdateCallback(function(a){c.stopProgress(),"success"===a?c.succesfullLogin():b.setMessage(a)}),c.login(a.user.email,a.user.password)},a.reset=function(){a.user=angular.copy(a.master)},a.reset()}]),angular.module("clientApp").controller("LogoutCtrl",["$scope","$location","$rootScope",function(a,b,c){c.logedin=!1,b.path("/login")}]),angular.module("clientApp").controller("CreateaccountCtrl",["$scope","$http","$location","$rootScope","flash","configFactory","ngProgress",function(a,b,c,d,e,f,g){function h(){g.stop(),g.hide()}var i,j,k,l,m,n;a.flash=e,a.create=function(){if(a.user.email&&a.pw1){n={timeid:"",user:"",password:""},i=new Date,j=i.getFullYear(),k=i.getMonth()+1,l=i.getDate(),m=j.toString()+k.toString()+l.toString(),n.timeid=m,n.user=a.user.email,n.password=a.pw1,n.type="free",g.start();var o=f.getBaseURL()+"user";b.post(o,n).success(function(){h(),d.user=a.user.email,c.path("/activity")}).error(function(){h(),e.setMessage("Error could not contact server!")})}}}]),angular.module("clientApp").directive("pwCheck",[function(){return{require:"ngModel",link:function(a,b,c,d){var e="#"+c.pwCheck;b.add(e).on("keyup",function(){a.$apply(function(){var a=b.val()===$(e).val();d.$setValidity("pwmatch",a)})})}}}]),angular.module("flash",[]).factory("flash",["$rootScope",function(a){var b="",c=!1;return a.$on("$routeChangeSuccess",function(){b="",c=!1}),{clear:function(){b="",c=!1},show:function(){return c},setMessage:function(a){b=a,c=!0},getMessage:function(){return b}}}]),angular.module("clientApp").factory("appFactory",["$http","dateFactory","configFactory",function(a,b,c){var d={};return d.getApps=function(d){var e;e=b.getSearchDateInt(14);var f=c.getBaseURL()+"app/getitems?timeid=";a.get(f+e).success(d)},d}]),angular.module("clientApp").factory("activityFactory",["$http","dateFactory","configFactory",function(a,b,c){function d(a,b,c,d,e,f){this.timeid=a,this.device=b,this.day=c,this.start=d,this.stop=e,this.dur=f}function e(a){return a/=3600,a=a.toFixed(1),a=parseFloat(a)}function f(a){return a/=60,a=a.toFixed(0),a=parseFloat(a)}function g(a){for(var b,c;j.length>0;)j.pop();for(var e=0;e<a.length;e++)b=a[e],c=new d(b.timeid,b.devicename,b.sleep.substring(0,10),b.awake.substring(11,19),b.sleep.substring(11,19),f(b.duration)),j.push(c)}var h={},i=[],j=[],k={series:[],data:[]};return h.registerUpdateCallback=function(a){i[0]=a},h.getTableData=function(){return j},h.getChartData=function(){return k},h.getDeviceData=function(b){var d=c.getBaseURL()+"activity/getdevices";a.get(d).success(b)},h.getOnlineData=function(b,d){var e=c.getBaseURL()+"online/get?deviceid="+d;a.get(e).success(b)},h.triggerChartData=function(){var d;d=b.getSearchDateInt(14);var f=c.getBaseURL()+"activity/getitems?timeid=";a.get(f+d).success(function(a){var c,f,h,j,l,m,n,o=[];if(g(a),a.length>0){for(l=!0,j=0;l;){for(f=a[j],h=f.timeid;h!==d&&null!==b.checkDateInt(d);)m=d.toString(),m=m.substring(4,6)+"-"+m.substring(6,8),o.push({x:m,y:[0]}),d++;for(c=0;h===f.timeid;){if(c+=f.duration,m=f.timeid.toString(),m=m.substring(4,6)+"-"+m.substring(6,8),j++,!(j<a.length)){l=!1;break}f=a[j]}c=e(c),o.push({x:m,y:[c]})}k.data=o,console.log(k)}if(n=a[a.length-1].timeid,n<b.getTodayInt()&&(m=b.getTodayString().substring(4,6)+"-"+b.getTodayString().substring(6,8),o.push({x:m,y:[0]})),i.length>0){var p=i[0];p()}}).error(function(){})},h}]),angular.module("clientApp").factory("chartFactory",[function(){function a(a,b){this.name=a,this.runtime=0,this.timeid=b}function b(a,b){var c,d;for(c=0;c<b.length;c++)if(d=b[c],a.valueOf()===d.name.valueOf())return!0;return!1}function c(a){return a/=60,a=a.toFixed(0),a=parseFloat(a)}function d(a,b){var c,d=[];for(c=0;c<a.length;c++)parseInt(b)===a[c].timeid&&d.push(a[c]);return d}function e(a,b){return parseInt(b.runtime)-parseInt(a.runtime)}var f={},g=[];return f.sortArray=function(a){return a.sort(e)},f.getAppTableData=function(){return g},f.getAppChartData=function(f,h){var i,j,k,l,m,n,o;for(o={series:[],data:[]},g=[],f=d(f,h),l=0;l<f.length;l++){for(i=f[l],k=new a(i.name,i.timeid);b(k.name,g)===!0;){if(l++,!(l<f.lenth)){k=null;break}i=f[l],k=new a(i.name)}if(null!==k){for(m=0;m<f.length;m++)j=f[m],k.name.valueOf()===j.name.valueOf()&&(n=c(parseInt(j.runtime)),k.runtime=k.runtime+n);g.push(k)}}for(g.sort(e),l=0;l<g.length;l++)k=g[l],o.series.push(k.name),n=parseInt(k.runtime),o.data.push({x:k.name,y:[n]});return o},f}]),angular.module("clientApp").factory("dateFactory",[function(){var a={};return a.checkDateInt=function(a){var b,c,d,e;b=a.toString(),c=b.substring(0,4),d=b.substring(4,6),e=b.substring(6,8);var f=new Date(c,d,e);return f.getFullYear()!==parseInt(c)||f.getMonth()!==parseInt(d)||f.getDate()!==parseInt(e)?null:f},a.getYearString=function(){var a,b;return a=new Date,b=a.getFullYear()},a.getTodayString=function(){var a,b,c,d,e;return a=new Date,b=a.getFullYear(),c=a.getMonth()+1,d=a.getDate(),1===c.toString().length&&(c="0"+c),1===d.toString().length&&(d="0"+d),e=b.toString()+c.toString()+d.toString()},a.getTodayInt=function(){var a,b,c,d,e;return a=new Date,b=a.getFullYear(),c=a.getMonth()+1,d=a.getDate(),1===c.toString().length&&(c="0"+c),1===d.toString().length&&(d="0"+d),e=parseInt(b.toString()+c.toString()+d.toString())},a.getSearchDateInt=function(a){var b,c,d,e,f,g;return b=new Date,c=b.setDate(b.getDate()-a),b=new Date(c),d=b.getFullYear(),e=b.getMonth()+1,f=b.getDate(),1===e.toString().length&&(e="0"+e),1===f.toString().length&&(f="0"+f),g=parseInt(d.toString()+e.toString()+f.toString())},a}]),angular.module("clientApp").factory("configFactory",[function(){var a={},b=!1;return a.check=function(a){return a},a.getBaseURL=function(){return b?"http://localhost:1337/":"http://cloud-monitor-server.herokuapp.com/"},a}]),angular.module("ngProgress.provider",["ngProgress.directive"]).provider("ngProgress",function(){"use strict";this.autoStyle=!0,this.count=0,this.height="2px",this.color="firebrick",this.$get=["$document","$window","$compile","$rootScope","$timeout",function(a,b,c,d,e){var f=this.count,g=this.height,h=this.color,i=d,j=a.find("body")[0],k=c("<ng-progress></ng-progress>")(i);j.appendChild(k[0]),i.count=f,void 0!==g&&k.eq(0).children().css("height",g),void 0!==h&&(k.eq(0).children().css("background-color",h),k.eq(0).children().css("color",h));var l,m=0;return{start:function(){this.show();var a=this;clearInterval(m),m=setInterval(function(){if(isNaN(f))clearInterval(m),f=0,a.hide();else{var b=100-f;f+=.15*Math.pow(1-Math.sqrt(b),2),a.updateCount(f)}},200)},updateCount:function(a){i.count=a,i.$$phase||i.$apply()},height:function(a){return void 0!==a&&(g=a,i.height=g,i.$$phase||i.$apply()),g},color:function(a){return void 0!==a&&(h=a,i.color=h,i.$$phase||i.$apply()),h},hide:function(){k.children().css("opacity","0");var a=this;a.animate(function(){k.children().css("width","0%"),a.animate(function(){a.show()},500)},500)},show:function(){var a=this;a.animate(function(){k.children().css("opacity","1")},100)},animate:function(a,b){l&&e.cancel(l),l=e(a,b)},status:function(){return f},stop:function(){clearInterval(m)},set:function(a){return this.show(),this.updateCount(a),f=a,clearInterval(m),f},css:function(a){return k.children().css(a)},reset:function(){return clearInterval(m),f=0,this.updateCount(f),0},complete:function(){f=100,this.updateCount(f);var a=this;return clearInterval(m),e(function(){a.hide(),e(function(){f=0,a.updateCount(f)},500)},1e3),f},setParent:function(a){if(null===a||void 0===a)throw new Error("Provide a valid parent of type HTMLElement");null!==j&&void 0!==j&&j.removeChild(k[0]),j=a,j.appendChild(k[0])},getDomElement:function(){return k}}}],this.setColor=function(a){return void 0!==a&&(this.color=a),this.color},this.setHeight=function(a){return void 0!==a&&(this.height=a),this.height}}),angular.module("ngProgress.directive",[]).directive("ngProgress",["$window","$rootScope",function(a,b){var c={replace:!0,restrict:"E",link:function(a,c){b.$watch("count",function(b){(void 0!==b||null!==b)&&(a.counter=b,c.eq(0).children().css("width",b+"%"))}),b.$watch("color",function(b){(void 0!==b||null!==b)&&(a.color=b,c.eq(0).children().css("background-color",b),c.eq(0).children().css("color",b))}),b.$watch("height",function(b){(void 0!==b||null!==b)&&(a.height=b,c.eq(0).children().css("height",b))})},template:'<div id="ngProgress-container"><div id="ngProgress"></div></div>'};return c}]),angular.module("ngProgress",["ngProgress.directive","ngProgress.provider"]),angular.module("clientApp").controller("ChatCtrl",["$http","$log","$scope","$rootScope","activityFactory","configFactory","$location","ngProgress","flash",function(a,b,c,d,e,f,g,h,i){function j(){e.getDeviceData(function(a){var b=a.deviceid;c.deviceid=b;var d=a.devicename;c.devicename=d,c.deviceData={first:d},c.deviceDataArray.push(a),e.getOnlineData(function(a){null==a||0===a.length?(c.onlinestatus="?",c.onlinetime="?"):(c.onlinestatus=a[0].status,c.onlinetime=a[0].timestamp,"online"===c.onlinestatus&&k())},b)})}function k(){c.customStyle.style={color:"green"}}function l(){h.stop(),h.hide()}c.deviceDataArray=[],c.deviceData="",c.image,c.deviceid,c.onlinestatus,c.devicename,c.onlinetime,c.customStyle={},c.flash=i,j(),c.predicate="-id",c.reverse=!1,c.baseUrl=f.getBaseURL(),c.chatList=[],c.getAllchat=function(){io.socket.get(c.baseUrl+"chat/addconv")},c.getAllchat(),io.socket.on("chat",function(b){"created"===b.verb&&setTimeout(function(){a.get(c.baseUrl+"screenshot/get?deviceid="+c.deviceid).success(function(a){var b=a[0];null!=b?(c.image=b.screenshot,c.screenshotTimestamp=b.timestamp,l()):(i.setMessage("Failed to extract Screenshot from server"),l())})},4e3)}),c.sendMsg=function(){i.clear(),h.start(),b.info(c.chatMessage),io.socket.post(c.baseUrl+"chat/addconv/",{user:"user",message:c.deviceid}),c.chatMessage=""}}]),angular.module("clientApp").factory("socket",["$rootScope",function(a){var b=io.connect("http://localhost:1337");return{on:function(c,d){b.on(c,function(){var c=arguments;a.$apply(function(){d.apply(b,c)})})},emit:function(c,d,e){b.emit(c,d,function(){var c=arguments;a.$apply(function(){e&&e.apply(b,c)})})}}}]),angular.module("clientApp").controller("ChatclientCtrl",["$scope","$http","configFactory","snapshotFactory",function(a,b,c,d){a.baseUrl=c.getBaseURL(),io.socket.get(a.baseUrl+"chat/addconv"),io.socket.on("chat",function(a){"created"===a.verb&&d.setSnapshotRequested()})}]),angular.module("clientApp").controller("ClientloginCtrl",["$scope","flash","loginFactory",function(a,b,c){a.master={},a.flash=b,a.text="",a.login=function(){c.startProgress(),c.registerUpdateCallback(function(a){c.stopProgress(),"success"===a?c.succesfullLogin():b.setMessage(a)}),c.registerClientLogin(),c.login(a.user.email,a.user.password)},a.reset=function(){a.user=angular.copy(a.master)},a.reset()}]),angular.module("clientApp").controller("ClientcreateaccountCtrl",["$scope","$http","$location","$rootScope","flash","configFactory","loginFactory","ngProgress",function(a,b,c,d,e,f,g,h){function i(){h.stop(),h.hide()}var j,k,l,m,n,o;a.flash=e,a.create=function(){if(a.user.email&&a.pw1){o={timeid:"",user:"",password:""},j=new Date,k=j.getFullYear(),l=j.getMonth()+1,m=j.getDate(),n=k.toString()+l.toString()+m.toString(),o.timeid=n,o.user=a.user.email,o.password=a.pw1,o.type="free",h.start();var p=f.getBaseURL()+"user";b.post(p,o).success(function(){i(),d.user=a.user.email,g.setUser(o.user),g.setPass(o.password),c.path("/chatclient")}).error(function(){e.setMessage("Error could not contact server!"),i()})}}}]),angular.module("clientApp").factory("loginFactory",["$http","configFactory","ngProgress","$location","$rootScope",function(a,b,c,d,e){function f(a){if(k.length>0){var b=k[0];
b(a)}}var g,h,i,j={},k=[];return j.getUser=function(){return g},j.setUser=function(a){g=a},j.getPass=function(){return h},j.setPass=function(a){h=a},j.startProgress=function(){c.start()},j.stopProgress=function(){c.stop(),c.hide()},j.succesfullLogin=function(){e.user=g,d.path(i?"/chatclient":"/activity"),i=!1},j.registerClientLogin=function(){i=!0},j.registerUpdateCallback=function(a){k[0]=a},j.login=function(c,d){var e,i;g=c,h=d,e=b.getBaseURL()+"user?user=",a.get(e+c).success(function(a){a.length>0?(i=a[0].password,f(i===d?"success":"Incorrect password!")):f("Failed to login!")}).error(function(){f("Internal Error!")})},j}]),angular.module("clientApp").factory("snapshotFactory",[function(){var a={},b=!1;return a.setSnapshotRequested=function(){b=!0},a.getSnapshotRequested=function(){return b?(b=!1,"pressed"):""},a}]);