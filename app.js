angular.module("rbc", []).controller("rbcController", function ($scope) {

    $scope.newCase = []

    $scope.analisar = function (newCase, csvCases) {
        calculateAllSimilarities(newCase);
    };

    $scope.buildCasesTable = function(csvCases){
        buildCasesTable(csvCases);
    };

    $scope.dados = dados;
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
        headRow.cells.forEach(function (head, index) {
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
        });
    }

    function calculateSimilarity(newCase, comparingCase) {
        var similarity = 0;
        var sumWeigth = 0;
        var nrItensCompare = $scope.features.length;
        for(var i = 0; i < nrItensCompare; i++){
            var valNewCase = newCase[i] || 0;
            var valCmpCase = comparingCase[i] || 0;
            var weigth = $scope.features[i].grau;
            similarity += weigth * similarityFunction(valNewCase, valCmpCase, i);
            sumWeigth += weigth;
        }
        similarity = similarity / sumWeigth;
        return similarity;
    }

    function similarityFunction(newCaseVal, compCaseVal, column){

        // Gênero
        if(column == 0){
            return newCaseVal == compCaseVal ? 1 : 0;
        }

        // Idade
        if(column == 1){
            var max = 123;
            var diff = Math.abs(newCaseVal - compCaseVal);
            var result = (max - diff) / max;
            return result;
        }

        // Importância Raça .. Gosto por Compras
        if(column >= 2 && column <= 13){
            var max = 10;
            var diff = Math.abs(newCaseVal - compCaseVal);
            var result = (max - diff) / max;
            return result;
        }

        // Importância Aparência .. Importância Interesses Comuns
        if(column >= 14 && column <= 19){
            var max = 100;
            var diff = Math.abs(newCaseVal - compCaseVal);
            var result = (max - diff) / max;
            return result;
        }
    }

});