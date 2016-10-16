angular.module("rbc", []).controller("rbcController", function($scope){

	function buildFeaturesModel(headRow){
		var features = [];
		console.log(headRow.cells);
		headRow.cells.forEach(function(head){
			features.push({ nome: head, grau: 1})
		});
		$scope.features = features;
	}

	function buildTableCases(csvRows){
		var rows = collectCsvRows(csvRows);
		var headRow = rows.slice(0,1);
		var otherRows = rows.slice(1);
		buildFeaturesModel(headRow[0]);
		$scope.rows = rows;
	}

	function collectRowCells(csvRow){
		var cells = [];
		var csvCells = csvRow.split(",");
		csvCells.forEach(function(csvCell){
			cells.push(csvCell);
		});
		return cells;
	}

	function collectCsvRows(csvRows){
		var rows = [];
		var csvRows = csvRows.split("\n");
		csvRows.forEach(function(csvRow){			
			var row = { cells: collectRowCells(csvRow) };
			rows.push(row);
		});
		return rows;
	}

	$scope.analisar = function(csvRows){
		buildTableCases(csvRows);
	}

});