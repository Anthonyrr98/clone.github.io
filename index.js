$(function(){
	var provinces = ['shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan'];
	var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'];
	
	var selected = 'china';
	mapEcharts(selected);

		
	//返回中国地图	 
	$('.close-back').click(function(e){
//  	echarts.init(document.getElementById('cityMap'));

		mapEcharts(selected);
		console.log(option.series);
	});
	

	myCharts.on('click', function (param) {
		var service ='';
			console.log(param);
	        //遍历取到provincesText 中的下标  去拿到对应的省js
			event.stopPropagation();
	        for(var  i= 0 ; i < provincesText.length ; i++ ){
	            if(param.name == provincesText[i]){
	                //显示对应省份的方法
	                // showProvince(provinces[i]) ;
	                $('.close-back').show();
	                mapEcharts(provinces[i]);
	                break ;
	            }
	        }
	});

	
	function mapEcharts(name) {		
		
		
	var url = '';		
	name == 'china' ? url = './libs/json/' + name + '.json' : url = './libs/json/province/' + name + '.json'		
	
	myCharts = echarts.init(document.getElementById('cityMap'));
	
    $.ajaxSettings.async = false;	
	$.get(url,function(data){
		var dataMap = data;
		echarts.registerMap(name, dataMap);
		myCharts.hideLoading();

		var sanData = [ // 散点数据 (value控制散点大小以及是否在省份地图显示)
			{name: '散点1', value: 1,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'hubei'},
			{name: '散点2', value: 1,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'sichuan'},
			{name: '散点3', value: 100,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'qinghai'},
			{name: '散点4', value: 1,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'guangxi'},
			{name: '散点5', value: 100,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'hebei'},
			{name: '散点6', value: 1,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'guangdong'}
		];
		
		var geoCoordMap = { // 散点坐标
			'散点1': [113.52, 30.179],
			'散点2': [103.42, 32.279],
			'散点3': [98.32, 34.379],
			'散点4': [108.22, 23.479],
			'散点5': [118.12, 40.579],
			'散点6': [113.62, 23.179],
		};
		
		var ceshi = [{name: '广西建工集团1', value: [113.52, 30.179], size: 1, url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'hubei'},
			{name: '广西建工集团2', value: [103.42, 32.279], size: 1, url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'sichuan'},
			{name: '广西建工集团3', value: [98.32, 34.379], size: 80,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'qinghai'},
			{name: '广西建工集团4', value: [108.22, 23.479], size: 1,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'guangxi'},
			{name: '广西建工集团5', value: [118.12, 40.579], size: 100,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'hebei'},
			{name: '广西建工集团6', value: [113.62, 23.179], size: 1,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'guangdong'},
			{name: '广西建工集团7', value: [114.62, 23.179], size: 100,url:'https://www.baidu.com/',symbol: 'image://img/point.png',img:'img/demo.jpg',areaname:'guangdong'}
		];
		
		var convertData = function (data) { // 处理数据函数
			var res = [];
			for (var i = 0; i < data.length; i++) {
				var geoCoord = geoCoordMap[data[i].name];;
				var geoAreaname = data[i].areaname;
				if ((geoCoord && name==geoAreaname)) { //跳转到省级图标需放大
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value * 101),
						url:data[i].url,
						symbol:data[i].symbol,
						img:data[i].img,
						areaname:data[i].areaname
					});
				}
				
				if(name == 'china'){  //在中国地图上图标显示同value
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].value),
						url:data[i].url,
						symbol:data[i].symbol,
						img:data[i].img,
						areaname:data[i].areaname
					});
				}	
			}
			return res;
		};
		
		var convertData2 = function (data) { // 处理数据函数
			var res = [];
			for (var i = 0; i < data.length; i++) {
				var geoCoord = data[i].value;
				console.log(geoCoord);
				var geoAreaname = data[i].areaname;
				
				if ((geoCoord && name==geoAreaname)) { //跳转到省级图标需放大
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].size * 101),
						url:data[i].url,
						symbol:data[i].symbol,
						img:data[i].img,
						areaname:data[i].areaname
					});
				}
				
				if(name == 'china'){  //在中国地图上图标显示同value
					res.push({
						name: data[i].name,
						value: geoCoord.concat(data[i].size),
						url:data[i].url,
						symbol:data[i].symbol,
						img:data[i].img,
						areaname:data[i].areaname
					});
				}	
			}
			return res;
		};
		
//		console.log(convertData2(ceshi));
	    
		myCharts.setOption(option = {
//		var option = { // echarts 配置
			tooltip: {
			    trigger: 'item',
			    show:false
			},
			tooltip: {
				trigger: 'item',
				enterable: true, //鼠标是否可进入提示框
	            transitionDuration: 1, //提示框移动动画过渡时间
	            triggerOn : 'click', //点击事件
				formatter: function(params) {
					console.log(params);
	                if(params.name &&params.value && params.data.value[2] > 100) { //params.data.value[2] > 100目的是为了在省级不弹窗
	                    var str = '<a target="_blank" class="layui-btn layui-btn-normal layui-btn-sm pull-right" href="'+params.data.url+'"><img src='+params.data.img+'/><p class="conut-next">'+ params.name +'</p></a>';
	                    return str;
	                }
	          },
				backgroundColor: '#fff',
		        extraCssText: 'box-shadow: 0 3px 6px rgba(109, 130, 188,0.6);',
		        padding: 10
			},
			
			geo: { // 地图配置
				show: true,
				map: name,
				label: {
					normal: {
						show: true
					},
					emphasis: {
						show: true
					}
				},
				roam: false,//控制缩放
				itemStyle: {
		            normal: {
		                areaColor: "#6cf",
		                shadowBlur: 1,
		                shadowColor: "#0074BC",
		                shadowOffsetX: 10,
		                shadowOffsetY: 10,
		            },
		            emphasis: {
		            	
		            	label: {
                            show: true,//选中状态是否显示省份名称
                        },
		                areaColor: "#fff",
		                shadowOffsetX: 10,
		                shadowOffsetY: 10,
		                shadowBlur: 5,
		                borderWidth: 10,
		                shadowColor: "rgba(0, 0, 0, 0.1)"
		            }
	          },
	          regions: [
		          {
		            name: "南海诸岛",
		            itemStyle: {
		              // 隐藏地图
		            normal: {
		                opacity: 0, // 为 0 时不绘制该图形
		              }
		            },
		            emphasis: {
		            	opacity: 0,
		            },
		            label: {
		              show: false // 隐藏文字
		            }
		          }
		        ]
//				zoom: 1.2,
			},
			series: [
			{ // 散点配置
			    name: '数量',
			    type: 'effectScatter',
			    zlevel:2,
			    coordinateSystem: 'geo',
				symbolSize: function(val){
					if(val[2]>100){
						return ([20,27]); 
					}else{
						return ([0.2*val[2],0.27*val[2]]);//两个参数对应宽高，点击进去省级后对应宽高乘以相应倍数
					}
					
//					console.log(val);
//					if(val[2]>100){
//						return ([13,8]); 
//					}else{
//						return ([0.13*val[2],0.08*val[2]]);//两个参数对应宽高，点击进去省级后对应宽高乘以相应倍数
//					}
                },
			    symbolKeepAspect: true,
			    showEffectOn: 'emphasis',
			    rippleEffect: {
			        brushType: 'stroke'
			    },
			    hoverAnimation: true,
//			    data: convertData(sanData),
				data:convertData2(ceshi),
			}, 
			{ // 地图配置
			    name: '地图',
			    type: 'map',
			    mapType: name, // 自定义扩展图表类型
			    geoIndex: 1,
			    aspectScale: 0.75, // 长宽比
			    textFixed: {
                    Alaska: [20, -20]
              	},
//            	animation:true,
//	            animationDuration: 5000,
//				animationEasing: 'cubicInOut',
			    label: {
                    normal: {
                      show: true,
                      textStyle: {
                        color: '#fff'
                      }
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        color: '#000'
                      }
                    }
                },
                itemStyle: {
		            normal: {
		                areaColor: '#4A9DE4',
		                borderColor: '#A2D9FC',
		                borderWidth: 1
		            },
		            emphasis: {
		            	
		                areaColor: '#fff',
		                shadowOffsetX: 10,
		                shadowOffsetY: 10,
		                shadowBlur: 5,
		                borderWidth: 2,
		                shadowColor: "#0074BC",
		                borderColor: 'rgba(0, 0, 0, 0)',
		            }
		        },

			}]
		});

		
		myCharts.setOption(option);
				
	});
	
	
	}
	

	
});