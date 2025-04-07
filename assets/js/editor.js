//THREEJS RELATED VARIABLES
	
	// var canvas = document.getElementById('canvas');
	// var context = canvas.getContext("2d");
	// function handleImage(e){
	// 	var reader = new FileReader();
	// 	var filename = '';
	// 	reader.onload = function(event){
	// 		var img = new Image();
	// 		img.onload = function(){
	// 			//canvas.width = img.width;
	// 			//canvas.height = img.height;
	// 			context.drawImage(img,15,15,220,220);
	// 			testImgUpload = true;
	// 			//applyImage()
	// 		}
	// 		img.src = event.target.result;
			
	// 	}
	// 	reader.readAsDataURL(e.target.files[0]);
	// 	filename = e.target.value.split( '\\' ).pop();
	// 	$('.content-lightbox label span').html(filename)
	// }
var scene, 
camera,
controls,
fieldOfView,
aspectRatio,
nearPlane,
farPlane,
shadowLight, 
backLight,
light, 
renderer,
mtlLoader,
mtlLoaderD,
mtlMaterial,
objObject,
objObjectD,
setColor,
setColorImg = '#ffffff',
currentMaterial,
matTexture,
designTexture,
manager,
texturePath = 'assets/models/',
sprite,
spriteMaterial,
cone,
currentNameModel,
currentModel,
currentModelC,
BeforeOrder = [
	{
		color : 'A01',
		colorHex : '0xffffff',
		designName : 'Design-01',
		tSize : 'l',
		type : 'man',
		genre : 'man',
		vinilcolor : 'black',
		custome:false
	}
],
orderID = 0,
cart = [],
ModelArray = [],
activeCouples = false,
container;

		//SCENE
		var floor, shirt_TWO, shirt_TWO_Design, shirt_ONE, shirt_ONE_Design,
		isBlowing = false;
		var stats;
		//CANVAS EDITOR FABRIC JS
		var canvas = new fabric.Canvas('canvas', {
			preserveObjectStacking: true
		});
		var activeElemCanvas;
		var textValueCanvas = "Ingresar Texto"
		var normalText;
		var testImgUpload = false;
		var imageLoader = document.getElementById('imageLoader');
		imageLoader.addEventListener('change', handleImage, false);
		// Selected Objects by now cone
			var assetsGroup = new THREE.Group();
			var mouse = new THREE.Vector2();
			var INTERSECTED, SELECTED;
			var raycaster = new THREE.Raycaster();
		//SCREEN VARIABLES
		var HEIGHT,
		WIDTH,
		windowHalfX,
		windowHalfY,
		mousePos = {x:0,y:0};
		dist = 0;
		mtlMaterial = 't-shirts.mtl';
		setColor = 0xffffff;
		currentMaterial = 't-shirt1.mtl';
		currentNameModel = 't-shirts-low-poly';
		currentNameModelD = 't-shirt1';
		// Url ParameterLoadModels
		var clr = GetURLParameter('clr');
		var dn = GetURLParameter('dn');
		var t = GetURLParameter('t');
		var idClr = GetURLParameter('idclr');
		var vnl = GetURLParameter('vnl');
		var globalUrl = 'https://www.datalanding.tech/samucato/index.html'
		var urlGenerate = '';
		var bgLoader = new THREE.TextureLoader();
		//INIT THREE JS, SCREEN AND MOUSE EVENTS

		function init(){
			scene = new THREE.Scene();

			HEIGHT = window.innerHeight;
			//WIDTH = window.innerWidth  / 4 * 3;
			WIDTH = window.innerWidth;
			// if(WIDTH <= 768){
			// 	WIDTH = window.innerWidth;
			// }
			aspectRatio = WIDTH / HEIGHT;
			fieldOfView = 60;
			nearPlane = 1;
			farPlane = 2000; 
			camera = new THREE.PerspectiveCamera(
				fieldOfView,
				aspectRatio,
				nearPlane,
				farPlane);
			camera.position.x = 200;
			camera.position.y = 100;
			if(WIDTH <= 768){
				camera.position.z = 500;
				window.removeEventListener('resize', onWindowResize, true);
			}else{
				camera.position.z = 250;  
				window.addEventListener('resize', onWindowResize, false);
			}
			camera.lookAt(new THREE.Vector3(0,0,0));
			camera.updateMatrixWorld();
				
			renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize(WIDTH, HEIGHT);
			renderer.setClearColor(0x000000, 1);
			renderer.shadowMap.enabled = true;
			container = document.getElementById('world');
			container.appendChild(renderer.domElement);
			stats = new Stats();
			stats.dom.style.display = 'none';
			container.appendChild( stats.dom );
			windowHalfX = WIDTH / 2;
			windowHalfY = HEIGHT / 2;
			document.addEventListener('mousemove', handleMouseMove, false);
			document.addEventListener('mousedown', handleMouseDown, false);
			document.addEventListener('mouseup', handleMouseUp, false);
			document.addEventListener('touchstart', handleTouchStart, false);
			document.addEventListener('touchend', handleTouchEnd, false);
			document.addEventListener('touchmove',handleTouchMove, false);

			//Load background texture
			//var fogColor = new THREE.Color(0x000000);
			//scene.fog = new THREE.Fog(fogColor, 0.1);
			bgLoader.load('assets/textures/background.jpeg' , function(texture){scene.background = texture});
		  	/////////////////////////////////////////
			// Orbit Controller
			/////////////////////////////////////////

			controls = new THREE.OrbitControls( camera, renderer.domElement);
			// controls = new THREE.TrackballControls( camera );
			// controls.rotateSpeed = 3.0;
			// //controls.zoomSpeed = 1.2;
			// controls.panSpeed = 8.8;
			// controls.noZoom = true;
			controls.enablePan = true;
			// controls.staticMoving = false;
			controls.dampingFactor = 0.2;
			controls.minPolarAngle = (Math.PI / 2) - 0.5;
			controls.maxPolarAngle = (Math.PI / 2) + 0.2;
			controls.minAzimuthAngle = - (Math.PI / 2) + 0.5; // radians
			controls.maxAzimuthAngle = (Math.PI / 2) - 0.5; // radians
			controls.minDistance = 150;
			controls.maxDistance = 500;
			let temp = false;
			/*Acces to url*/
			if(clr){
				switch(t){
					case 'women':
						currentNameModel = 't-shirts-w'
						currentNameModelD = 't-shirts-wd'
					break;
					case 'couples':
						temp = true;
					break;
					default:
        				//texturePath = 'assets/models/'
				}
				BeforeOrder[orderID].colorHex = clr;
				setColor = parseInt(clr);
				setColorImg = '#' + clr.replace('0x','');
				let current = clr.replace('0x','')
				BeforeOrder[orderID].type = t;
				BeforeOrder[orderID].color = idClr;
				BeforeOrder[orderID].designName = dn;
				BeforeOrder[orderID].vinilcolor = vnl;
				switch(vnl){
					case 'golden':
						texturePath = 'assets/models/dgold/'
					break;
					case 'white':
						texturePath = 'assets/models/dwhite/'
					break;
					default:
        				texturePath = 'assets/models/'
				}
				if ($('.active') !== null) {
					$('.active').removeClass('active');
				}
				if ($('.active-color') !== null) {
					$('.active-color').removeClass('active-color');
				}
				if ($('.active-model') !== null) {
					$('.active-model').removeClass('active-model');
				}
				if ($('.active-vinil') !== null) {
					$('.active-vinil').removeClass('active-vinil');
				}
				$('.designs').find('[data-dn="'+dn+'"]').addClass('active');
				$('#colorPicker ul').find('[data-clr="'+current+'"]').addClass('active-color');
				$('#type-shirt').find('[data-t="'+t+'"]').addClass('active-model');
				$('#vinil-color').find('[data-vnl="'+vnl+'"]').addClass('active-vinil');

				if(WIDTH <= 768){
					$('.designs').scrollLeft(eval($(".active").offset().left));
				}else{
					$('.content-designs').scrollTop(eval($(".active").offset().top - 150));
				}
			}
			urlGenerate = globalUrl+'?dn='+BeforeOrder[orderID].designName+'&clr='+BeforeOrder[orderID].colorHex+'&t='+BeforeOrder[orderID].type+'&idclr='+BeforeOrder[orderID].color+'&vnl='+BeforeOrder[orderID].vinilcolor;
			
			// Preload manager
			THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
			manager = new THREE.LoadingManager();
			manager.onProgress = function ( item, loaded, total ) {
				$('#dvLoading').html('<p style="position:absolute;top:calc(48.5%);left:calc(48.7%)">' + Math.round(loaded / total * 100, 2) + '%</p>');
				console.log( item, loaded, total );
			};
			manager.onLoad = function () {
				console.log('Loading complete');
				scene.add(shirt_ONE.ModelRender());
				scene.add(shirt_ONE_Design.ModelRender());
				currentModel = shirt_ONE_Design.ModelRender();
					//currentModel.name = 't-shirt';
					//currentModel.group = 'elements';
					// assetsGroup.add( ModelArray[1] );
					// scene.add(assetsGroup)
				if(temp)changeTshirtType(currentNameModel,currentNameModelD,'','couples')
				$('#dvLoading').fadeOut(3000);
				$('#world-load').fadeOut();
				$('#world').css('opacity',1)
				$('#dvLoading').append('<p style="position:absolute;top:calc(58.5%);left:calc(45.7%)">Carga completa</p>');
			};
			// MTL material OBJ
			shirt_ONE = new ModelLoader(texturePath,currentNameModel,'design-white');
			mtlLoader = new THREE.MTLLoader();
			mtlLoader.setTexturePath('assets/models/');
			mtlLoader.setPath('assets/models/');
			mtlLoader.load(mtlMaterial, shirt_ONE.loadModel);
			shirt_ONE_Design = new ModelLoader(texturePath,currentNameModelD,BeforeOrder[orderID].designName);
			mtlLoaderD = new THREE.MTLLoader();
			mtlLoaderD.setTexturePath(texturePath);
			mtlLoaderD.setPath('assets/models/');
			mtlLoaderD.load(currentMaterial, shirt_ONE_Design.loadModel);
			setOrder();
			
			var spriteMap = new THREE.TextureLoader().load( "assets/models/instructions.png" );
			spriteMaterial = new THREE.SpriteMaterial( { 
				map: spriteMap, 
				color: 0xffffff,
				transparent: true,
				opacity: 0.9
				} );
			sprite = new THREE.Sprite( spriteMaterial );
			sprite.position.set( 0, -50, 140 );
			sprite.scale.set( 100, 100, 100 );
			scene.add( sprite );
			// getColors();
			// getDesigns();
		}
		// Called get params
		function GetURLParameter(sParam){
		    var sPageURL = window.location.search.substring(1);
		    var sURLVariables = sPageURL.split('&');
		    for (var i = 0; i < sURLVariables.length; i++)
		    {
		        var sParameterName = sURLVariables[i].split('=');
		        if (sParameterName[0] == sParam)
		        {
		            return sParameterName[1];
		        }
		    }
		}
		
		function getColors () {
			
			$.ajax({
				data:  {},
				url:   'https://services.datalanding.tech/v1/proxy/editor-colors',
				type:  'options',
				beforeSend: function () {                    
					$('#colorPicker ul').html('<li style="text-indent:0">Cargando colores</li>');
				},
				success:  function (data) {
					if(data.status == 200){
						console.log("getColors",data)
						$('#colorPicker ul').html('');
						let color = '',activeClass = '';
						data.data.forEach(function(obj, index){
							color = "0x"+obj.namehex;
							index == 0 ? activeClass = 'active-color' : activeClass = '';
							$('#colorPicker ul').append("<li class='"+activeClass+"' data-clr='"+obj.namehex+"' style='background: #"+obj.namehex+"' onclick=\"changeColor('"+color+"', event)\">"+obj.name+"</li>")
							console.log(color)
						})
					}
				}
			});
			// $.get('https://services.datalanding.tech/v1/proxy',
			// 	{},
			// 	function (data) {
			// 		if(data.status == 200){
			// 			console.log("getColors",data);
			// 			$('#colorPicker ul').html('');
			// 			let color = '',activeClass = '';
			// 			data.data.forEach(function(obj, index){
			// 				color = "0x"+obj.namehex;
			// 				index == 0 ? activeClass = 'active-color' : activeClass = '';
			// 				$('#colorPicker ul').append("<li class='"+activeClass+"' data-clr='"+obj.namehex+"' style='background: #"+obj.namehex+"' onclick=\"changeColor('"+color+"', event)\">"+obj.name+"</li>")
			// 				console.log(color)
			// 			})
			// 		}else{
			// 			console.log("getColors error")
			// 		}
			// 	}
			// );
		}

		function getDesigns () {
			$('.designs').html('<li>Cargando Diseños</li>');
			$.get('http://zelvy.com.co/api/web/designs',
				{},
				function (data) {
					if(data.status == 'success'){
						console.log("getDesigns",data);
						$('.designs').html('');
						// let color = '',activeClass = '';
						data.data.forEach(function(obj, index){
							//color = "0x"+obj.namehex;
							index == 0 ? activeClass = 'active' : activeClass = '';
							$('.designs').append("<li class='"+activeClass+"' data-dn='"+obj.name.replace(' ','-')+"' onclick='changeDesign(event)'>"+obj.name+"</li>");
						})
					}else{
						console.log("getColors error")
					}
				}
			);
		}

		function addToCar(OrderObj){
			const arr = JSON.parse(JSON.stringify( OrderObj ));;
			arr.forEach(function(obj){
				cart.push(obj);
			});
			alert('Añadido al carrito')
			console.log('cart',cart);
			console.log('OrderObj',OrderObj);
		}
		function sendOrder(OrderObjCart) {
			let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjksInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW4xQGFkbWluMS5jb20iLCJuYW1lIjoiTWFybHkgQW5kcmVhIiwic3VybmFtZSI6IkNhc3RyaWxsb24gSGVuYW8iLCJpYXQiOjE1NDczMjM4OTAsImV4cCI6MTU0NzkyODY5MH0.cjtnaAGxF6h53XUIMCCUtvqBBmTorFk9G70qt7JaFyY";
			let url = "http://zelvy.com.co/api/web";
			//let url = "http://127.0.0.1/projects/Order-Manager/api/web/app_dev.php";
			let urlImg = "http://zelvy.com.co/api/web/uploads/designs/default/"
			//let urlImg = "http://127.0.0.1/projects/Order-Manager/api/web/uploads/designs/default/"
			let urlTemp = '';
			let jsonObj = {};
			let vinilPath = '';
			if(OrderObjCart.length > 0){
				jsonObj['title'] = "APP-" + OrderObjCart[0].designName;
				jsonObj['description']=[];
				OrderObjCart.forEach(function(obj){
					switch(obj.vinilcolor){
						case 'white' :  
							vinilPath = 'dwhite/';
						break;
						case 'golden' :  
							vinilPath = 'dgold/';
						break;
					}
					if(obj.custome){
						urlTemp = canvas.toDataURL();
						
					}else{
						urlTemp = urlImg+vinilPath+obj.designName.toLowerCase()+'.png';
						
					}
					jsonObj['description'].push({
						color:'#'+obj.colorHex.replace('0x',''),
						size:obj.tSize,
						vinilcolor:obj.vinilcolor,
						imgurl:urlTemp,
						desc:'',
						type:obj.type,
						genre:obj.genre,
						product:'t-shirt',
						design:obj.designName,
						status:'new'
					});
				})
				
				jsonObj['status'] = "new";
				jsonObj['description'] = JSON.stringify(jsonObj['description']);
				jsonObj = JSON.stringify(jsonObj)
				console.log('jsonObj',jsonObj)
				console.log('OrderObjCart',OrderObjCart)
				
				$.post(url + '/task/new',
					{json:jsonObj, authorization:token},
					function (data) {
						console.log("data",data)
						alert('Pedido realizado')
					}
				);
			}
		}
		
		// called when loading is in progresses
		function onProgress ( xhr ) {
			var percentComplete = eval(xhr.loaded / xhr.total) * 100;
			console.log( Math.round(percentComplete, 2 ) , '% loaded' );
			if ( xhr.lengthComputable ) {
				percentComplete = xhr.loaded / xhr.total * 100;
				console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
			}
			console.log("msg",xhr.lengthComputable)

		}

		function onProgressD ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded Diseño' );
		}

		// called when loading has errors
		function onError ( error ) {
			alert( 'An error happened' );
		}

		function onWindowResize() {
			HEIGHT = window.innerHeight;
			WIDTH = window.innerWidth;
			windowHalfX = WIDTH / 2;
			windowHalfY = HEIGHT / 2;
			renderer.setSize(WIDTH, HEIGHT);
			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();
		}

		function handleMouseMove(event) {
			event.preventDefault();
			mousePos = {x:event.clientX, y:event.clientY};
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			findIntersections();
		}

		function handleMouseDown(event) {
			isBlowing = true;
			new TWEEN.Tween( spriteMaterial ).to( { opacity: 0 }, 1000 ).start();
				//event.preventDefault();

				var intersects = raycaster.intersectObjects( assetsGroup.children , true);

				if ( intersects.length > 0 ) {

					controls.enabled = false;

					SELECTED = intersects[ 0 ].object;

					//if ( SELECTED.group == "elements" ) {
					if ( SELECTED ) {
						//speakerActivated( SELECTED );
						activeCouples = false;
						$('.both').removeClass('active-couple');
						if(orderID == 0){
							changeCouple ('two');
							$('.one').removeClass('active-couple');
							$('.two').addClass('active-couple');
						}else{
							changeCouple ('one');
							$('.two').removeClass('active-couple');
							$('.one').addClass('active-couple');
						}
						console.log("Socio cogio",SELECTED)
					}

				}
		}

		function handleMouseUp(event) {
			isBlowing = false;
			new TWEEN.Tween( spriteMaterial ).to( { opacity: 1 }, 1000 ).start();
				event.preventDefault();

				controls.enabled = true;

				if ( INTERSECTED ) {
					SELECTED = null;
				}
		}

		function handleTouchStart(event) {
			if (event.touches.length > 1) {
				event.preventDefault();
				mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
				isBlowing = true;
			}
			new TWEEN.Tween( spriteMaterial ).to( { opacity: 0 }, 1000 ).start();
		}

		function handleTouchEnd(event) {
			mousePos = {x:windowHalfX, y:windowHalfY};
			isBlowing = false;
			new TWEEN.Tween( spriteMaterial ).to( { opacity: 1 }, 1000 ).start();
		}

		function handleTouchMove(event) {
			if (event.touches.length == 1) {
				//event.preventDefault();
				mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY};
			}
		}
		function findIntersections() {

			raycaster.setFromCamera( mouse, camera );
			var intersects = raycaster.intersectObjects( assetsGroup.children , true );

			if ( intersects.length > 0 ) {
				if ( INTERSECTED != intersects[ 0 ].object ) {
					if ( INTERSECTED ) {
						INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
						container.style.cursor = 'auto';
					}
					INTERSECTED = intersects[ 0 ].object;
					console.log(INTERSECTED.name);

					if ( INTERSECTED.name.indexOf('male') >= 0 || INTERSECTED.group == "elements") {
					//if ( INTERSECTED.group == "t-shirts" ) {
						INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
						INTERSECTED.material.color.set( 0xf0de7b );
						container.style.cursor = 'pointer';
						console.log("t-shirt model")
					}

				}

			} else {

				if ( INTERSECTED ) {
					INTERSECTED.material.color.set( INTERSECTED.currentHex );
					container.style.cursor = 'auto';
				}

				INTERSECTED = null;

			}
		}

		function setOrder () {
			console.log("ingreso a setOrder")
			$('.color').text('Color : '+BeforeOrder[orderID].color)
			$('.design-name').text('Diseño : ' + BeforeOrder[orderID].designName);
				//if(){
					$('.design-img').html('<img src="'+ texturePath + BeforeOrder[orderID].designName.toLowerCase().replace(' ', '-' ) + '.png" alt="" style="background:'+ setColorImg +'">');
				//}
			$('.vinil-color').text('Vinilo : ' + BeforeOrder[orderID].vinilcolor.toUpperCase());
			$('.type').text('Tipo : Camiseta '+BeforeOrder[orderID].type.toUpperCase());
			$('.url').val(urlGenerate);
			setColorImg = $('.active-color').css('background');
			$('.canvas-container').css({'background':setColorImg});
			$('.design-img img').css({'background':setColorImg});
			//$('#size option[value="'+ BeforeOrder[orderID].tSize +'"]').attr("selected", true);
			$('#size').val(BeforeOrder[orderID].tSize)
		}

		function createLights() {
			var AmbientLight = new THREE.AmbientLight( 0xffffff , 0.6); // soft white light
			scene.add( AmbientLight );
			//light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)
			light = new THREE.SpotLight( 0xffffff, .5 );
			light.position.set( 0, 1500, 200 );
			light.castShadow = true;
			light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 70, 1, 200, 2000 ) );
			light.shadow.bias = -0.000222;
			light.shadow.mapSize.width = 1024;
			light.shadow.mapSize.height = 1024;

			shadowLight = new THREE.DirectionalLight(0xffffff, .3);
			shadowLight.position.set(200, 200, 200);
			shadowLight.castShadow = true;
			//shadowLight.shadowDarkness = .2;

			backLight = new THREE.DirectionalLight(0xffffff, .4);
			backLight.position.set(-100, 200, 50);
			backLight.castShadow = true;
			//backLight.shadowDarkness = .1;

			//scene.add(backLight);
			scene.add(light);
			scene.add(shadowLight);

		}

		function createFloor(){ 
			var planeGeometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
			//planeGeometry.rotateX( - Math.PI / 2 );
			var planeMaterial = new THREE.ShadowMaterial( { opacity: 0.1 } );
			//floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,500), new THREE.MeshBasicMaterial({color: 0xebe5e7}));
			//floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,500), new THREE.MeshBasicMaterial({color: 0xffffff}));
			floor = new THREE.Mesh( planeGeometry, planeMaterial );
			floor.rotation.x = -Math.PI/2;
			floor.position.y = -180;
			floor.receiveShadow = true;
			scene.add(floor);
		}

		function changeDesign(e){
			BeforeOrder[orderID].custome = false;
			if ($('.active') !== null) {
				$('.active').removeClass('active');
			}
			e.target.className = "active";
			let designName = $('.active').attr('data-dn');
			BeforeOrder[orderID].designName = designName;
			var geometryTexture = new THREE.TextureLoader();
				
			new TWEEN.Tween( currentModel.children[0].material ).to( { opacity: 0 }, 200 ).start();
			setTimeout(function() {
					new TWEEN.Tween( currentModel.children[0].material ).to( {opacity: 1 }, 200 )
					.easing( TWEEN.Easing.Back.In).start();
					
					if(activeCouples){
						let indexed = 0;
						let designName = BeforeOrder[orderID].designName;
						ModelArray.forEach(function(obj,index){
							if(obj.name !== ''){
								indexed ++
								texturePath = 'assets/models/couples/'+BeforeOrder[indexed-1].genre+'/';
								
								geometryTexture.load(texturePath+designName.toLowerCase()+'.png',function(texture){
										designTexture = new THREE.MeshPhongMaterial({
											map:texture,
											wireframe:false,
											needsUpdate : true,
											transparent:true,
											opacity:0.9,
											specular:new THREE.Color( 1, 1, 1 )
										});
										obj.traverse( function ( child ) {
											if ( child instanceof THREE.Mesh ) {
												child.material = designTexture;
											}
										});
										console.log('indexed',indexed)
										console.log('texture',texture)
										console.log('ModelArray', obj)
									
								});
								BeforeOrder[indexed-1].designName = designName;
								console.log('BeforeOrder.designName',BeforeOrder[indexed-1].designName)
							}
						});
						setOrder();
					}else{
						geometryTexture.load(texturePath+BeforeOrder[orderID].designName.toLowerCase()+'.png',function(texture){
							designTexture = new THREE.MeshPhongMaterial({
								map: texture,
								wireframe:false,
								needsUpdate : true,
								transparent:true,
								opacity:0.9,
								specular:new THREE.Color( 1, 1, 1 )
							});
							currentModel.traverse( function ( child ) {
								if ( child instanceof THREE.Mesh ) {
									child.material = designTexture;
								}
							});
						});
					}
				}, 200);
			generateLink();
			setOrder();

		}

		function changeColor(color, e){
			if ($('.active-color') !== null) {
				$('.active-color').removeClass('active-color');
			}
			e.target.className = "active-color";
			let idColor = $('.active-color').text();
			// setColorImg = $('.active-color').css('background');
			BeforeOrder[orderID].color = idColor;
			BeforeOrder[orderID].colorHex = color;
			//$('.color').text('Color : '+BeforeOrder[orderID].color)
			setColor = parseInt(color);
			var cHex = new THREE.Color(setColor);
			if(BeforeOrder[orderID].type == 'couples'){
				if(activeCouples){
					shirt_ONE.Material().color.set(cHex);
					shirt_TWO.Material().color.set(cHex);
					BeforeOrder[0].colorHex = color;
					BeforeOrder[1].colorHex = color;
				}else{
					currentModelC.Material().color.set(cHex);
				}
			}else{
				currentModelC = shirt_ONE;
				currentModelC.Material().color.set(cHex);
			}
			generateLink();
			setOrder();
		}

		function generateLink(){
			urlGenerate = globalUrl+'?dn='+BeforeOrder[orderID].designName+'&clr='+BeforeOrder[orderID].colorHex+'&t='+BeforeOrder[orderID].type+'&idclr='+BeforeOrder[orderID].color+'&vnl='+BeforeOrder[orderID].vinilcolor;
			console.log('url generada' , urlGenerate);
			$('.url').val(urlGenerate);
		}

		function copyToClipBoard() {
			var el = $(".url");
			el.select();
			document.execCommand("copy");
			alert('Copiado al portapapeles!');
		}

		function setVinil(color,el) {
			new TWEEN.Tween( currentModel.position ).to( {
						//x: Math.random() * 800 - 400,
						//y: Math.random() * 800 - 400,
						z:30 }, 1000 )
					.easing( TWEEN.Easing.Elastic.Out).start();
				setTimeout(function() {
					new TWEEN.Tween( currentModel.position ).to( {
						//x: Math.random() * 800 - 400,
						//y: Math.random() * 800 - 400,
						z:1 }, 1000 )
					.easing( TWEEN.Easing.Bounce.Out).start();
				}, 1000);
			if ($('.active-vinil') !== null) {
				$('.active-vinil').removeClass('active-vinil');
			}
			el.addClass("active-vinil");
			switch(color){
				case 'golden':
				texturePath = 'assets/models/dgold/';
				BeforeOrder[orderID].vinilcolor = color;
				break;
				case 'white':
				texturePath = 'assets/models/dwhite/';
				BeforeOrder[orderID].vinilcolor = color;
				break;
				case 'black':
				texturePath = 'assets/models/';
				BeforeOrder[orderID].vinilcolor = color;
			}
			var geometryTexture = new THREE.TextureLoader();
				geometryTexture.load(texturePath+BeforeOrder[orderID].designName.toLowerCase()+'.png',function(texture){
					designTexture = new THREE.MeshPhongMaterial({
						map:texture,
						wireframe:false,
						needsUpdate : true,
						transparent:true,
						opacity:0.9,
						specular:new THREE.Color( 1, 1, 1 )
					});
					currentModel.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material = designTexture;
						}
					});
				});
			//$('.vinil-color').text('Vinilo : ' + BeforeOrder[orderID].vinilcolor);
			//$('.design-img').html('<img src="'+ texturePath + BeforeOrder[orderID].designName.toLowerCase().replace(' ', '-' ) + '.png" alt="" style="background:'+ setColorImg +'">');
			generateLink();
			setOrder();
		}

		function changeCouple (type) {
					
			// if(type == 'one'){
			// 	currentModel = shirt_ONE_Design.ModelRender();
			// 	currentModelC = shirt_ONE;
			// 	orderID = 0;
			// 	cone.position.set(-100,150,0)
			// }else{
			// 	currentModel = shirt_TWO_Design.ModelRender();
			// 	currentModelC = shirt_TWO;
			// 	orderID = 1;
			// 	cone.position.set(100,150,0)
			// }
			switch(type){
				case 'one':
				currentModel = shirt_ONE_Design.ModelRender();
				currentModelC = shirt_ONE;
				orderID = 0;
				cone.position.set(-100,150,0);
				break;
				case 'two':
				currentModel = shirt_TWO_Design.ModelRender();
				currentModelC = shirt_TWO;
				orderID = 1;
				cone.position.set(100,150,0)
				break;
				case 'both':
				
				break;
			}
			switch(BeforeOrder[orderID].vinilcolor){
				case 'golden':
				texturePath = 'assets/models/dgold/';
				break;
				case 'white':
				texturePath = 'assets/models/dwhite/';
				break;
				case 'black':
				texturePath = 'assets/models/';
				break;
			}
			if ($('.active') !== null) {
				$('.active').removeClass('active');
			}
			if ($('.active-color') !== null) {
				$('.active-color').removeClass('active-color');
			}
			if ($('.active-vinil') !== null) {
				$('.active-vinil').removeClass('active-vinil');
			}

			$('.designs').find('[data-dn="'+BeforeOrder[orderID].designName+'"]').addClass('active');
			$('.content-designs').scrollTop(eval($(".active").offset().top - 150));
			$('#colorPicker ul').find('[data-clr="'+BeforeOrder[orderID].colorHex.replace('0x','')+'"]').addClass('active-color');
			$('#vinil-color').find('[data-vnl="'+BeforeOrder[orderID].vinilcolor+'"]').addClass('active-vinil');
			setOrder();
			console.log('BeforeOrder',BeforeOrder)
		}

		function changeTshirtType (modelOne, modelTwo, e, type) {
			$('#world-load').fadeIn();
			if ($('.active-model') !== null) {
				$('.active-model').removeClass('active-model');
			}
			if(e != ''){
				e.target.className = "active-model";
			}else{
				$('#type-shirt').find('[data-t="'+type+'"]').addClass('active-model');
			}
			switch(BeforeOrder[orderID].vinilcolor){
				case 'golden':
				texturePath = 'assets/models/dgold/';
				break;
				case 'white':
				texturePath = 'assets/models/dwhite/';
				break;
				case 'black':
				texturePath = 'assets/models/';
				break;
			}
			console.log("e.preventDefault",e)
			BeforeOrder[orderID].type = type;
			// $('.type').text('Tipo : Camiseta '+BeforeOrder[orderID].type);
			scene.remove(sprite);
			scene.remove(shirt_ONE.ModelRender());
			scene.remove(shirt_ONE_Design.ModelRender());
			manager.onProgress = function (item, loaded, total) {
				console.log('Loading completeee');
				$('#world-load').html('<p style="position:absolute;top:calc(48.5%);left:calc(48.7%)">' + Math.round(loaded / total * 100, 2) + '%</p>');
			};
			manager.onLoad = function () {
				console.log('Loading completeee');
				if(type == 'couples'){
					//Order load
						let currentType = currentNameModel == 't-shirts-low-poly' ? 'women' :  'man'
						//if(BeforeOrder.length == 1){
							BeforeOrder.push({
								color : BeforeOrder[orderID].color,
								colorHex : BeforeOrder[orderID].colorHex,
								designName : BeforeOrder[orderID].designName,
								tSize : BeforeOrder[orderID].tSize,
								type : BeforeOrder[orderID].type,
								genre : currentType,
								vinilcolor : BeforeOrder[orderID].vinilcolor
							})
						//}
						console.log("BeforeOrder", BeforeOrder);
					scene.add(shirt_TWO.ModelRender());
					scene.add(shirt_TWO_Design.ModelRender());
					scene.add(shirt_ONE.ModelRender());
					scene.add(shirt_ONE_Design.ModelRender());
					shirt_ONE.ModelRender().position.set(-100,0,0);
					shirt_ONE_Design.ModelRender().position.set(-100,0,1);
					$('#choose-couple').fadeIn();
					var geometry = new THREE.ConeGeometry( 5, 20, 32 );
					var material = new THREE.MeshPhongMaterial( {color: 0xa52a2a} );
					cone = new THREE.Mesh( geometry, material );
					cone.rotation.x = 135;
					cone.name = 'cone';
					cone.group = 'elements';
					assetsGroup.add( cone );
						// assetsGroup.add( ModelArray[1]);
						// assetsGroup.add( ModelArray[3]);
					scene.add( assetsGroup );
					console.log("assetsGroup", assetsGroup)
					changeCouple('one');
					if ($('.active-couple') !== null) {
						$('.active-couple').removeClass('active-couple');
					}
					$('.one').addClass('active-couple');
					
					new TWEEN.Tween( camera.position ).to( {z: 500 }, 1000 )
					.easing( TWEEN.Easing.Linear.None).start();
				}else{
					assetsGroup.remove(cone);
					scene.add(shirt_ONE.ModelRender());
					scene.add(shirt_ONE_Design.ModelRender());
					$('#choose-couple').fadeOut();
					currentModel = shirt_ONE_Design.ModelRender();
					if(WIDTH <= 768){
						new TWEEN.Tween( camera.position ).to( {z: 500 }, 1000 )
						.easing( TWEEN.Easing.Linear.None).start();
					}else{
						new TWEEN.Tween( camera.position ).to( {z: 250 }, 1000 )
						.easing( TWEEN.Easing.Linear.None).start();
					}
				}
				generateLink();
				setOrder();
				$('#world-load').fadeOut(3000);
				$('#world').fadeIn();
				$('#world-load').append('<p style="position:absolute;top:calc(58.5%);left:calc(45.7%)">Carga completa</p>');
			};
			
			setTimeout(function() {
				currentNameModel = modelOne;
				currentNameModelD = modelTwo;

				switch(type){
					case 'couples':
						let currentM = modelOne == 't-shirts-low-poly' ? 't-shirts-w' :  't-shirts-low-poly';
						let currentMD = modelTwo == 't-shirt1' ? 't-shirts-wd' :  't-shirt1';
						shirt_TWO = new ModelLoader(texturePath,currentM,'design-white','couples');
						shirt_TWO_Design = new ModelLoader(texturePath,currentMD,BeforeOrder[orderID].designName,'couples');
						mtlLoader = new THREE.MTLLoader();
						mtlLoader.setTexturePath('assets/models/');
						mtlLoader.setPath('assets/models/');
						mtlLoader.load(mtlMaterial, shirt_TWO.loadModel);
						mtlLoaderD = new THREE.MTLLoader();
						mtlLoaderD.setTexturePath(texturePath);
						mtlLoaderD.setPath('assets/models/');
						mtlLoaderD.load(currentMaterial, shirt_TWO_Design.loadModel);
					break;
					case 'women' :
						
						ModelArray = [];
						if( shirt_TWO && typeof shirt_TWO.ModelRender() == 'object'){
							scene.remove(shirt_TWO.ModelRender());
							scene.remove(shirt_TWO_Design.ModelRender());
							if (orderID == 1) {
								BeforeOrder.splice(0,1);
								orderID = 0;
							}else{
								BeforeOrder.splice(1,1);
							}
						}
						BeforeOrder[0].genre = type;
						// MTL material OBJ
						shirt_ONE = new ModelLoader(texturePath,currentNameModel,'design-white');
						mtlLoader = new THREE.MTLLoader();
						mtlLoader.setTexturePath('assets/models/');
						mtlLoader.setPath('assets/models/');
						mtlLoader.load(mtlMaterial, shirt_ONE.loadModel);
						shirt_ONE_Design = new ModelLoader(texturePath,currentNameModelD,BeforeOrder[0].designName);
						mtlLoaderD = new THREE.MTLLoader();
						mtlLoaderD.setTexturePath(texturePath);
						mtlLoaderD.setPath('assets/models/');
						mtlLoaderD.load(currentMaterial, shirt_ONE_Design.loadModel);
						currentModelC = shirt_ONE;
						console.log("BeforeOrder", BeforeOrder);
					break;
					case 'man' :

						ModelArray = [];
						if( shirt_TWO && typeof shirt_TWO.ModelRender() == 'object'){
							scene.remove(shirt_TWO.ModelRender());
							scene.remove(shirt_TWO_Design.ModelRender());
							if (orderID == 1) {
								BeforeOrder.splice(0,1);
								orderID = 0;
							}else{
								BeforeOrder.splice(1,1);
							}
						}
						BeforeOrder[0].genre = type;
						// MTL material OBJ
						shirt_ONE = new ModelLoader(texturePath,currentNameModel,'design-white');
						mtlLoader = new THREE.MTLLoader();
						mtlLoader.setTexturePath('assets/models/');
						mtlLoader.setPath('assets/models/');
						mtlLoader.load(mtlMaterial, shirt_ONE.loadModel);
						shirt_ONE_Design = new ModelLoader(texturePath,currentNameModelD,BeforeOrder[0].designName);
						mtlLoaderD = new THREE.MTLLoader();
						mtlLoaderD.setTexturePath(texturePath);
						mtlLoaderD.setPath('assets/models/');
						mtlLoaderD.load(currentMaterial, shirt_ONE_Design.loadModel);
						currentModelC = shirt_ONE;
					break;
				}
				activeCouples = false;
				scene.add(sprite);
			}, 1000);
		}
		
		/**ModelLoader*/
		var ModelLoader = function (setTexturePath, modelName, designName, type) {
			let ModelInstance;
			let materialAssign;
			this.loadModel = function (materials) {
				materials.preload();
			};
			this.objLoader = new THREE.OBJLoader(manager);
			//objLoader.setMaterials(materials);
			this.objLoader.setPath('assets/models/');
			this.objLoader.load( modelName +'.obj', function (object) {
				object.position.y -= 60;
				object.scale.set(5, 5, 5);
				var geometryTexture = new THREE.TextureLoader();
				geometryTexture.load(setTexturePath+designName.toLowerCase()+'.png',function(texture){

					matTexture = new THREE.MeshPhongMaterial({
						map:texture,
						side:THREE.DoubleSide,
						wireframe:false,
						color:setColor,
						needsUpdate : true
					});
					designTexture = new THREE.MeshPhongMaterial({
						map:texture,
						wireframe:false,
						needsUpdate : true,
						transparent:true,
						opacity:0.9,
						specular:new THREE.Color( 1, 1, 1 )
					});
					
					if(designName == 'design-white'){
						materialAssign = matTexture;
						if(type == 'couples'){
							object.position.set(100, 0, 0);
						}else{
							object.position.set(0, 0, 0);
						}
					}else{
						materialAssign = designTexture;
						if(type == 'couples'){
							object.position.set(100, 0, 1);
						}else{
							object.position.set(0, 0, 1);
						}
						object.name = 'design-' + ModelArray.length; 
					}
					object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material = materialAssign;
							child.castShadow = true;
							child.receiveShadow = false;
		  				}
		  			} );
				});
				ModelInstance = object;
				ModelArray.push(object)
				console.log("ModelArray", ModelArray)
			});
			this.ModelRender = function () {
				return ModelInstance
			};
			this.Material = function () {
				return materialAssign
			}
		}
		/** END ModelLoader*/

		// function createShirt(){
		// 	shirt = new Shirt();
		// 	scene.add(shirt.threegroup);
		// }

		// Shirt = function(){
		//   this.threegroup = new THREE.Group();
		//   var textura_geometrias = new THREE.ImageUtils.loadTexture('assets/textures/sprite.png');
		//   this.material_geometrias = new THREE.MeshBasicMaterial({
		//   	map:textura_geometrias,
		//   	side:THREE.DoubleSide,
		//   	wireframe:false
		//   });
		//   this.yellowMat = new THREE.MeshLambertMaterial ({
		//   	color: 0xfdd276, 
		//   	//shading:THREE.FlatShading,
		//   	//map:texture
		//   });
		//   this.redMat = new THREE.MeshLambertMaterial ({
		//   	color: 0xad3525, 
		//   	//shading:THREE.FlatShading
		//   });

		//   var faceGeom = new THREE.BoxGeometry(80,80,80);

		//   // face
		//   //this.face = new THREE.Mesh(faceGeom, this.yellowMat);
		//   this.face = new THREE.Mesh(faceGeom, this.material_geometrias);
		//   this.face.position.z = 135;
		  
		//   // head
		//   this.head = new THREE.Group();
		//   this.head.add(this.face);

		//   this.head.position.y = 60;

		//   this.threegroup.add(this.head);

		//   this.threegroup.traverse( function ( object ) {
		//   	if ( object instanceof THREE.Mesh ) {
		//   		object.castShadow = true;
		//   		object.receiveShadow = false;
		//   	}
		//   } );
		// }

		// Shirt.prototype.updateBody = function(speed){

		// 	this.head.rotation.y += (this.tHeagRotY - this.head.rotation.y) / speed;
		// 	this.head.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
		// 	this.head.position.x += (this.tHeadPosX-this.head.position.x) / speed; 
		// 	this.head.position.y += (this.tHeadPosY-this.head.position.y) / speed; 
		// 	this.head.position.z += (this.tHeadPosZ-this.head.position.z) / speed; 

		// }

		// Shirt.prototype.look = function(xTarget, yTarget){
		// 	this.tHeagRotY = rule3(xTarget, -200, 200, -Math.PI/4, Math.PI/4);
		// 	this.tHeadRotX = rule3(yTarget, -200,200, -Math.PI/4, Math.PI/4);
		// 	this.tHeadPosX = rule3(xTarget, -200, 200, 70,-70);
		// 	this.tHeadPosY = rule3(yTarget, -140, 260, 20, 100);
		// 	this.tHeadPosZ = 0;

		// 	this.updateBody(10);

		// }
		
	function loop(){
		// var xTarget = (mousePos.x-windowHalfX);
		// var yTarget= (mousePos.y-windowHalfY);
		
		if(isBlowing) {
		    //shirt.cool(xTarget, yTarget);
			//spriteMaterial.opacity = 0;
			//new TWEEN.Tween( spriteMaterial ).to( { opacity: 0 }, 2000 ).start();
		}else{
			//shirt.look(xTarget, yTarget);
			//spriteMaterial.opacity = 1;
		}
		requestAnimationFrame(loop);
		render();
		stats.update();

	}

	function render(){
		TWEEN.update();
		if (controls) controls.update();
		renderer.render(scene, camera);
	}
	
	
	/*Init*/
	$(function(){
		init();
		createLights();
		createFloor();
		loop();
		$('.color-change-b').click(function(){
			setVinil('black',$(this))
		});
		$('.color-change-w').click(function(){
			setVinil('white',$(this))
		});
		$('.color-change-g').click(function(){
			setVinil('golden',$(this))
		});
		$("select#size").change(function(){
			BeforeOrder[orderID].tSize = $(this).val();
		});
		$('.one').click(function() {
			changeCouple('one');
			$(this).addClass('active-couple');
			$('.two').removeClass('active-couple');
			$('.both').removeClass('active-couple');
			activeCouples = false;
		});
		$('.two').click(function(){
			changeCouple('two');
			$(this).addClass('active-couple');
			$('.one').removeClass('active-couple');
			$('.both').removeClass('active-couple');
			activeCouples = false;
		});
		$('.both').click(function(){
			activeCouples = true;
			changeCouple('both');
			$(this).addClass('active-couple');
			$('.one').removeClass('active-couple');
			$('.two').removeClass('active-couple');
		});

		$('.option-terms').click(function(){
			$('.terms').fadeToggle()
		});
		$('.option-order').click(function(){
			$('.order').fadeIn()
		});
		$('.option-close').click(function(){
			$('.order').fadeOut()
		});
		$('.font-text').click(function(){
			$('.font-bubble').fadeIn()
		});
		// $(window).bind("load", function() {
		// 	$('#dvLoading').fadeOut(3000);
		// });
		if(WIDTH <= 768){
			$('.terms').click(function(){
				$('.terms').fadeToggle();
			});
		}
		/*Canvas Events*/
		canvas.on('mouse:down', function(options) {
			$('.input-text-canvas').val('');
			activeElemCanvas = '';
			if (options.target) {
				console.log('an object was clicked! ', options.target.type);
				options.target.set({
					borderColor: '#d3394c',
					cornerColor: '#a52a2a',
					cornerSize: 12,
					transparentCorners: true
				});
				if (options.target.type == 'text') {
					$('.input-text-canvas').val(options.target.text)
					console.log('canvas',options.target.type)
				}
				canvas.setActiveObject(options.target);
				activeElemCanvas = options.target;
				canvas.renderAll();
				console.log('canvas.getObjects() ', canvas.getObjects());
			}
		});
		/*End Canvas Event*/
		// Basic usage, array of color values
		$('[name="UNIQUE_NAME"]').paletteColorPicker({
			colors: [
				{"black": "#000000"},
				{"white": "#ffffff"},
				{"golden": "#D4AF37"},
				{"pink": "#f0557f"},			],
			// Events
		    // Callback on bubbl show
		    onbeforeshow_callback: function( what ) {
		    	console.log(what);
		    },

		    // Callback on change value
		    onchange_callback: function( clicked_color ) {
		    	console.log(clicked_color);
		    	colorCanvasText(clicked_color)
		    }
		}).hide();
		
	})
	/*function rule3(v,vmin,vmax,tmin, tmax){
		var nv = Math.max(Math.min(v,vmax), vmin);
		var dv = vmax-vmin;
		var pc = (nv-vmin)/dv;
		var dt = tmax-tmin;
		var tv = tmin + (pc*dt);
		return tv;
	}*/