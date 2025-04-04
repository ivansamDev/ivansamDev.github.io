//Canvas Methods
		function changeContent (optionclass,e) {
			$('.content-active').hide();
			$('.menu-content-active').removeClass('menu-content-active');
			if ($('.content-active') !== null) {
				//e.target.className = "menu-content-active";
				$(e).addClass('menu-content-active');
				$('.content-active').removeClass('content-active');
				$('.'+ optionclass).show();
				$('.'+ optionclass).addClass('content-active');
			}
		}
		function deleteElemCanvas () {
			canvas.remove(activeElemCanvas)
		}
		function addCanvasText () {
			normalText = new fabric.Text(textValueCanvas, {
				top:20,
				left:20,
				fontWeight: 'normal',
				fontSize: 24,
				fontFamily: 'Roboto',
				textAlign: 'center',
				fill:'#000000'
			});
			canvas.add(normalText).setActiveObject(normalText)
			activeElemCanvas = normalText;
			testImgUpload = true;
		}
		// function addCurvedText () {
		// 	Example = new CurvedText( canvas, {angle:0} );
  // 			//Example.center();
		// 	canvas.setActiveObject(Example.group);
		// 	activeElemCanvas = Example.group;
		// 	activeElemCanvas.setCoords();
		// 	testImgUpload = true;
		// 	console.log('Example',Example.opts.text)
		// }
		function colorCanvasText (value) {
			if(activeElemCanvas && activeElemCanvas.type == 'text'){
				activeElemCanvas.set({
					fill:value
				});
				canvas.setActiveObject(activeElemCanvas);
				console.log(value)
			}
		}
		function fontCanvasText(font) {
			if(activeElemCanvas && activeElemCanvas.type == 'text'){
				activeElemCanvas.set({
					fontFamily:font
				});
				canvas.setActiveObject(activeElemCanvas);
			}
			$('.font-bubble').hide();
		}
		function editCanvasText (value) {
			textValueCanvas = value;
			if(activeElemCanvas && activeElemCanvas.type == 'text'){
				activeElemCanvas.set({
					text:textValueCanvas
				});
				canvas.setActiveObject(activeElemCanvas);
			}
			console.log(value)
		}
		function textAlign (value) {
			if(activeElemCanvas.type == 'text'){
				activeElemCanvas.set({
					textAlign:value
				});
				canvas.setActiveObject(activeElemCanvas);
			}
		}
		function addShape (shapeName,color) {
			fabric.loadSVGFromURL('assets/models/svg/' + shapeName.toLowerCase() + '.svg', function(objects, options) {

				var loadedObject = fabric.util.groupSVGElements(objects, options);

				loadedObject.set({
					left: 10,
					top: 10,
					angle: 0
				});
				// loadedObject.paths.forEach(function(obj){
				// 	if (obj.fill != "#FFFFFF") {
				// 		obj.fill = color;
				// 		console.log(obj.fill)	
				// 	}
				// })
				canvas.add(loadedObject);
				canvas.renderAll();
				activeElemCanvas = loadedObject;
				testImgUpload = true;
			});
		}

		function handleImage(e){
			var reader = new FileReader();
			var filename = '';
			reader.onload = function(event){
				var img = new Image();
				img.onload = function(){
					testImgUpload = true;
					var imgInstance = new fabric.Image(img, {
						left: 0,
						top: 0,
						angle: 0,
						opacity: 1
					});
					if (this.width > 300) {
						imgInstance.scale(0.2);
					}else{
						imgInstance.scale(1);
					}
					canvas.add(imgInstance).setActiveObject(imgInstance);
					activeElemCanvas = imgInstance;
					console.log("file", e.target.files[0])
				}
				img.src = event.target.result;
				
			}
			reader.readAsDataURL(e.target.files[0]);
			filename = e.target.value.split( '\\' ).pop();
			$('.content-lightbox label span').html(filename)
			$('#imageLoader').val();
		}
		function applyImage(){
			if(testImgUpload){
				var modelTexture = new THREE.TextureLoader();
				modelTexture.load(canvas.toDataURL(),function(texture){
					designTexture = new THREE.MeshPhongMaterial({
						map:texture,
						wireframe:false,
						needsUpdate : true,
						transparent:true,
						opacity:0.9,
						specular:0
					});
					currentModel.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material = designTexture;
						}
					});
				});
				BeforeOrder[orderID].custome = true;
				if ($('.active') !== null) {
					$('.active').removeClass('active');
					$('.designs').find('[data-dn="diseño-personalizado"]').remove();
				}
				$(".design-img img").attr("src",canvas.toDataURL());
				$('.designs').prepend("<li class='active' data-dn='diseño-personalizado' onclick='applyImage()'>Diseño Personalizado</li>");
			}
		}
		// Order elements
		function sendBackwards() {
			//var activeObject = canvas.getActiveObject();
			if (activeElemCanvas) {
				canvas.sendBackwards(activeElemCanvas);
			}
		};

		function sendToBack() {
			//var activeObject = canvas.getActiveObject();
			if (activeElemCanvas) {
				canvas.sendToBack(activeElemCanvas);
			}
		};

		function bringForward() {
			//var activeObject = canvas.getActiveObject();
			if (activeElemCanvas) {
				canvas.bringForward(activeElemCanvas);
			}
		};

		function bringToFront() {
			//var activeObject = canvas.getActiveObject();
			if (activeElemCanvas) {
				canvas.bringToFront(activeElemCanvas);
			}
		};
		// End Orer elements
		//End Canvas Methods