angular.module("rbc", []).controller("rbcController", function ($scope) {

    $scope.newCase = []

    $scope.analisar = function (newCase, csvCases) {
        calculateAllSimilarities(newCase);
    };

    $scope.buildCasesTable = function(csvCases){
        buildCasesTable(csvCases);
    };

    // build table cases ---------------------------------------------------

    function buildCasesTable(csvCases) {
        var cases = collectCsvCases(csvCases);
        var headRow = cases.slice(0, 1);
        var otherCases = cases.slice(1);
        buildFeaturesModel(headRow[0]);
        $scope.cases = otherCases;
    }

    function collectCsvCases(csvCases) {
        var cases = [];
        csvCases = csvCases.split("\n");
        csvCases.forEach(function (csvRow) {
            var row = {cells: collectRowCells(csvRow)};
            cases.push(row);
        });
        return cases;
    }

    function collectRowCells(csvRow) {
        var cells = [];
        var csvCells = csvRow.split(",");
        csvCells.forEach(function (csvCell) {
            cells.push(csvCell);
        });
        return cells;
    }

    function buildFeaturesModel(headRow) {
        var features = [];
        headRow.cells.forEach(function (head) {
            features.push({name: head, grau: 10})
        });
        $scope.features = features;
    }

    // calculate similarity ------------------------------------------------

    function calculateAllSimilarities(newCase){
        var cases = $scope.cases;
        cases.forEach(function(caseObject){
            var comparingCase = caseObject.cells;
            caseObject.similarity = calculateSimilarity(newCase, comparingCase);
        })
    }

    function calculateSimilarity(newCase, comparingCase) {
        var similarity = 0;
        var nrItensCompare = newCase.length;
        for(var i = 0; i < nrItensCompare; i++){
            var valNewCase = newCase[i] || 0;
            var valCmpCase = comparingCase[i] || 0;
            var diff = valNewCase - valCmpCase;
            similarity += Math.abs(diff);
        }
        return similarity;
    }
});