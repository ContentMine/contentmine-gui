// Angular





// App:

var app = angular.module('contentMineApp', ['ngRoute']);





// Config:

app.config(function($routeProvider, $locationProvider) {

    // Angular Routes.
    $routeProvider

        .when('/', {
            templateUrl : 'partials/index',
            controller  : IndexCtrl
        })

        .when('/getpapers', {
            templateUrl : 'partials/getpapers',
            controller  : GetPapersCtrl
        })

        .when('/quickscrape', {
            templateUrl : 'partials/quickscrape',
            controller  : QuickScrapeCtrl
        })

        .when('/norma', {
            templateUrl : 'partials/norma',
            controller  : NormaCtrl
        })

        .when('/ami', {
            templateUrl : 'partials/ami',
            controller  : AmiCtrl
        })

        .when('/command', {
            templateUrl : 'partials/command',
            controller  : CommandCtrl
        })

        .otherwise({redirectTo: '/'});

    // The way of avoiding the old html "#" use. Requires HTML5.
    $locationProvider.html5Mode(true);

});





// Services:

// Command Data
app.factory('CommandData', function(){
    return {
        programName: '', // getpapers, quickscrape, norma, ami, [command].
        command: '' // full command as string.
    }
});

// Command Parser (class-like)
app.factory('CommandParser', function() {
    return function(programData, formData) {
        this.programName = programData;
        this.formData = formData;

        // TODO: Adapt to OS's.
        this.defaultDirectory = 'C:\\Temp\\test';

        // Parsing method: -----------------------------------

        this.getCommand = function() {
            var finalCommand = '';

            // GetPapers:
            if (programData.name === 'getpapers')
            {
                // [REQUIRED]:
                // Command.
                finalCommand += programData.cmdText + ' ';
                // Query.
                if (formData.query !== undefined && formData.query != '') {
                    finalCommand += programData.params.query + ' ' + formData.query + ' ';
                } else throw new Error('Query was not specified.');
                // Output.
                finalCommand += programData.params.outdir + ' ' + '\"' +this.defaultDirectory + '\"' + ' '; // TODO: set this up properly.
                // [OPTIONAL]:
                // API.
                finalCommand += programData.params.api + ' ' + formData.api + ' ';
                // Metadata.
                // TODO: I am unclear as to what argument metadata corresponds to.
                // PDF.
                if (formData.pdf) finalCommand += programData.params.pdf + ' ';
                // XML.
                if (formData.xml) finalCommand += programData.params.xml;
            }

            // QuickScrape:
            else if (programData === 'quickscrape') {

            }

            console.log(finalCommand);
            return finalCommand;
        };

        // ---------------------------------------------------
    };
});

// Programs Data
app.factory('ProgramData', function(){
    return {
        getpapers: {
            name: 'getpapers',
            cmdText: 'getpapers',
            params: {
                help: '-h',
                version: '-v',
                query: '-q',
                outdir: '-o',
                api: '--api',
                xml: '-x',
                pdf: '-p',
                supp: '-s',
                minedterms: '-t',
                loglevel: '-l',
                all: '-a',
                noexecute: '-n',
                logfile: '-f',
                limit: '-k'
            }
        },
        quickscrape: {
            name: 'quickscrape',
            cmdText: 'quickscrape',
            params: {
                help: '--help',
                version: '-V',
                url: '-u',
                urllist: '-r',
                scraper: '-s',
                scraperdir: '-d',
                output: '-o',
                ratelimit: '-i',
                headless: '-h',
                loglevel: '-l',
                outformat: '--outformat',
                logfilr: '--logfile'
            }
        },
        // Not implemented yet:
        norma: {
            name: 'norma',
            cmdText: 'norma',
            params: {

            }
        },
        // Not implemented yet:
        ami: {
            cmdText: '',
            params: {

            }
        }
    }
});