function IndexCtrl($scope, $http) {
    //
}
function GetPapersCtrl($scope, $sce, CommandData, CommandParser, ProgramData, StdCmdExec) {

    var commandData = CommandData;
    var programData = ProgramData.getpapers;

    // Initial values.
    $scope.form = {
        api: 'eupmc',
        query: undefined,
        metadata: true,
        metadata_enabled: true,
        pdf: false,
        pdf_show: true,
        xml: false,
        xml_show: true,
        submit_enabled: false
    };

    // Update the form structure when API changed.
    var saver = true;
    var saved = false;
    $scope.$watch('form.api', function(newValue, oldValue) {
        if ($scope.form.api === 'crossref') {
            if (!saved) saver = {
                metadata: $scope.form.metadata,
                pdf: $scope.form.pdf,
                xml: $scope.form.xml
            };
            saved = true;
            $scope.form.metadata = true;
            $scope.form.pdf = false;
            $scope.form.xml = false;
            $scope.form.metadata_enabled = false;
            $scope.form.pdf_show = false;
            $scope.form.xml_show = false;
        } else if ($scope.form.api === 'eupmc') {
            saved = false;
            $scope.form.metadata = saver.metadata;
            $scope.form.pdf = saver.pdf;
            $scope.form.xml = saver.xml;
            $scope.form.metadata_enabled = true;
            $scope.form.pdf_show = true;
            $scope.form.xml_show = true;
        }
    });

    // Update the execute button structure when query value changed.
    $scope.$watch('form.query', function(newValue, oldValue) {
        if ($scope.form.query !== undefined && $scope.form.query !== '') {
            $scope.form.submit_enabled = true;
        } else {
            $scope.form.submit_enabled = false;
        }
    });

    // Execute the command.
    $scope.executeCmd = function () {

        var formData = $scope.form;

        var parsedCommand = (new CommandParser(programData, formData)).getCommand();

        commandData.programName = '';
        commandData.command = parsedCommand;

        /*
        $http.post('/api/cmd', commandData).
        success(function(response) {
            $scope.output = $sce.trustAsHtml(response);
        });
        */

        StdCmdExec(commandData, '#output-panel', $scope, $sce);

    };
}
function QuickScrapeCtrl($scope, $http) {
    //
}
function NormaCtrl($scope, $http) {
    //
}
function AmiCtrl($scope, $http) {
    //
}
function CommandCtrl($scope, $sce, CommandData, StdCmdExec) {

    var commandData = CommandData;

    $scope.form_submitCmd = function () {

        commandData.command = $scope.form_command;

        StdCmdExec(commandData, '#output-panel', $scope, $sce);

    };

}