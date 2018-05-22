var LayerController = {
	buildLayerSelector: function(layerDetail, layerToBeHide, map){
		//layerDetail = {layerName : [layer_id]}
		var  layerName = Object.keys(layerDetail)[0];
		var layerIDlist = layerDetail[layerName];
		var link = document.createElement('a');
		link.name = layerName;
		link.href = '#';
		link.textContent = ModelManager.layerData[layerName].label;
		link.className = 'active';
		link.data = layerIDlist;
		if(link.textContent == layerToBeHide){
			link.data.forEach(function(id){
				map.setLayoutProperty(id, 'visibility', 'none');
			});
			link.className = '';
		}
		link.onclick = function(e){
			this.data.forEach(function(id){
				var selectedLayer = id;
    			e.preventDefault();
    			e.stopPropagation();

    			LayerController.toggleFeatureTobeDisplayed(selectedLayer, map);
			});
			if(this.className === 'active'){
				this.className = '';
			}
			else{
				this.className = 'active';
				// When a building or wall layer is selected, we need to trigger the change for the filter
				// to update the map data with the existing filter options.
				var filterSelectionList = FilterController.getFilterSelectionList();
				$.each(filterSelectionList, function(key,filterID){
					$("#"+filterID).trigger("change");
					console.log(1);
				});
			}
		}
		$('#menu').append(link);
	},
	toggleFeatureTobeDisplayed: function(selectedLayer, map){
		var visibility = map.getLayoutProperty(selectedLayer, 'visibility');
		if(visibility === 'visible'){
			map.setLayoutProperty(selectedLayer, 'visibility', 'none');
		}
		else{
			map.setLayoutProperty(selectedLayer, 'visibility', 'visible');
		}
	},
};