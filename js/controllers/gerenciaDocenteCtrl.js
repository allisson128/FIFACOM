angular.module("gerenciaDocente").controller("gerenciaDocenteCtrl", function ($scope, $http) {
	$scope.appDocente = "Gerência de Docentes";
	$scope.docentes = [{nome:"Alexandro",cpf:"000.000.000-00", },
				{nome: "Maria Adriana", cpf: "111.111.111-11"},
				{nome: "Maria Camila", cpf: "222.222.222-22"}
			];

	$scope.carregarDocentes = function () {
		$http.get("http://localhost:3000/docentes").success(function (data) {
			$scope.docentes = data;
		}).error(function (data, status) {
			$scope.message = "Aconteceu um problema: " + data;
		});
	};

	$scope.adicionarDocente = function (docente) {
		$scope.docentes.push(angular.copy(docente));
		delete $scope.docente;
		$scope.docenteForm.$setPristine();
	};
	$scope.apagarDocentes = function (docentes) {
		$scope.docentes = docentes.filter(function (docente) {
			if (!docente.selecionado) return docente;
		});
	};
	$scope.isDocenteSelecionado = function (docentes) {
		return docentes.some(function (docente) {
			return docente.selecionado;
		});
	};
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};



});
